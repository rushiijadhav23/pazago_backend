import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { mastra } from "./mastra";

// Setup ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📝 UPDATE THIS to your PDF folder path
const inputDir = path.resolve(__dirname, "./mastra/data");

async function runPdfEmbeddingAgentOnDir(directory: string) {
  try {
    // Check if directory exists
    await fs.access(directory);
  } catch {
    console.error(`❌ Directory does not exist: ${directory}`);
    process.exit(1);
  }

  const files = await fs.readdir(directory);
  const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"));

  if (pdfFiles.length === 0) {
    console.warn("⚠️ No PDF files found in directory.");
    return;
  }

  console.log(`📂 Found ${pdfFiles.length} PDFs. Running agent in parallel...`);

  const agent = mastra.getAgent("pdfEmbedAgent");

  const results = await Promise.allSettled(
    pdfFiles.map(async (file) => {
      const filePath = path.join(directory, file);
      try {
        const res = await agent.invoke({ filePath });
        return { file, status: "fulfilled", message: res.message };
      } catch (err: any) {
        return { file, status: "rejected", error: err.message || err.toString() };
      }
    })
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log(`✅ ${result.value.file}: ${result.value.message}`);
    } else {
      console.error(`❌ ${result.reason.file}: ${result.reason.error}`);
    }
  }

  console.log("🏁 All PDF embedding agents finished.");
}

runPdfEmbeddingAgentOnDir(inputDir);
