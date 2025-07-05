// agents/pdfEmbedAgent.ts
import { Agent } from "@mastra/core/agent";
import { pdfEmbedderTool } from "../tools/pdfembedder";

export const pdfEmbedAgent = new Agent({
  name: 'PDF Embed Agent',
  description: 'Agent that parses, chunks, embeds and indexes PDFs into the vector store.',
  tools: {
    pdfEmbedderTool, // You can call this just `embed` or `pdfProcessor` if more readable
  },
});
