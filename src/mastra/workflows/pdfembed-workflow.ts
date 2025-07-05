// workflows/pdfEmbed.workflow.ts
import { createWorkflow } from "@mastra/core/workflow";
import { z } from "zod";
import { pdfEmbedderTool } from "../tools/pdfembedder";

const folderPath = path.join(__dirname, '../data');

export const pdfEmbedWorkflow = createWorkflow({
  id: "pdf-embed-workflow",
  name: "PDF Embed Workflow",
  description: "Runs PDF embedding tool on a folder of PDFs.",
  inputSchema: z.object({
    folderRelativePath: z.literal(folderPath),
  }),
  steps: {
    embed: {
      tool: pdfEmbedderTool,
      input: ({ input }) => input,
    },
  },
  output: ({ steps }) => steps.embed.output,
});
