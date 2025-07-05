import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { MDocument } from '@mastra/rag';
import { embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { mastra } from '../index';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const vectorStore = mastra.getVector("pgVector");
const INDEX_NAME = "papers";

// Function to parse a single PDF
async function parsePDF(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
}

// Agent Tool
export const pdfEmbedderTool = createTool({
  id: 'pdfEmbedderAgent',
  description: 'Reads PDFs from a folder, chunks, embeds, and stores them in the vector store.',
  inputSchema: z.object({
    folderRelativePath: z.string().describe('Relative path to the folder containing PDF files'),
  }),
  execute: async ({ context }) => {
    const folderPath = path.join(__dirname, context.folderRelativePath);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.pdf'));

    // Create index (only once)
    await vectorStore.createIndex({
      indexName: INDEX_NAME,
      dimension: 1536,
    });

    const processedFiles: string[] = [];

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const text = await parsePDF(filePath);

      const doc = MDocument.fromText(text);
      const chunks = await doc.chunk({
        strategy: 'recursive',
        size: 512,
        overlap: 50,
        separator: '\n',
      });

      if (chunks.length === 0) {
        console.warn(`⚠️ Skipping empty: ${filePath}`);
        continue;
      }

      const { embeddings } = await embedMany({
        model: openai.embedding("text-embedding-3-small"),
        values: chunks.map(c => c.text),
      });

      await vectorStore.upsert({
        indexName: INDEX_NAME,
        vectors: embeddings,
        metadata: chunks.map(chunk => ({
          text: chunk.text,
          source: file,
        })),
      });

      processedFiles.push(file);
    }

    return {
      message: `✅ Processed ${processedFiles.length} PDF(s).`,
      processedFiles,
    };
  },
});
