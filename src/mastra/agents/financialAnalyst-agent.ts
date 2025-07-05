import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { retrivalTool } from "../tools/retrival-tool"

 
export const financialAnalystAgent = new Agent({
  name: "financialAnalystAgent",
  instructions: `You are a helpful research assistant that analyzes academic papers and technical documents.
    Use the provided vector query tool to find relevant information from your knowledge base, 
    and provide accurate, well-supported answers based on the retrieved content.
    Focus on the specific content available in the tool and acknowledge if you cannot find sufficient information to answer a question.
    Base your responses only on the content provided, not on general knowledge.`,
  model: openai("gpt-4o-mini"),
  tools: {
    retrivalTool,
  },
});