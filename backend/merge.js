import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const arabicPath = join(__dirname, "data", "arabic.json");
const englishPath = join(__dirname, "data", "english.json");
const outputPath = join(__dirname, "data", "database.json");

try {
  console.log("Reading raw files...");
  const arabicData = JSON.parse(readFileSync(arabicPath, "utf8")).quran;
  const englishData = JSON.parse(readFileSync(englishPath, "utf8")).quran;

  console.log("Merging verses... This might take a second.");

  // We map through the Arabic verses and attach the English text
  const merged = arabicData.map((v, index) => ({
    chapter: v.chapter,
    verse: v.verse,
    arabic: v.text,
    english: englishData[index].text,
  }));

  // Save as database.json
  writeFileSync(outputPath, JSON.stringify({ quran: merged }, null, 2));

  console.log("---------------------------------------");
  console.log("✅ Success! 'database.json' is ready.");
  console.log(`📍 Location: ${outputPath}`);
  console.log("---------------------------------------");
} catch (error) {
  console.error("❌ Error merging files:", error.message);
}
