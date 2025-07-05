import { pdfEmbedderTool } from "../tools/pdfembedder";

export async function embedPDFs(folderRelativePath: string) {
  return pdfEmbedderTool.execute({
    context: { folderRelativePath },
  });
}
