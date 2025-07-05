import { createVectorQueryTool } from "@mastra/rag";
import { openai } from "@ai-sdk/openai";
 
export const retrivalTool = createVectorQueryTool({
  vectorStoreName: "pgVector",
  indexName: "papers",
  model: openai.embedding("text-embedding-3-small"),
});