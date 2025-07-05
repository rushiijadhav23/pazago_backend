import { mastra } from "./mastra";
const agent = mastra.getAgent("financialAnalystAgent");
 
// Basic query about concepts
const query1 =
  "What problems does sequence modeling face with neural networks?";
const response1 = await agent.generate(query1);
console.log("\nQuery:", query1);
console.log("Response:", response1.text);

