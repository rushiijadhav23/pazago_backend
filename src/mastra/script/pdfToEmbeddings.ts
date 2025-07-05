import { embedPDFs } from "./pdfRunner";

(async () => {
  const result = await embedPDFs("../data"); // Replace with your path if needed
  console.log("✅ Embedding complete:", result);
})();
