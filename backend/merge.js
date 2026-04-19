import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Updated paths to match your renamed files
const arabicPath = join(__dirname, "data", "arabic.json");
const englishPath = join(__dirname, "data", "english.json");
const outputPath = join(__dirname, "data", "database.json");

try {
  console.log("Reading files...");
  const arabicData = JSON.parse(readFileSync(arabicPath, "utf8")).quran;
  const englishData = JSON.parse(readFileSync(englishPath, "utf8")).quran;

  console.log("Merging verses...");
  // We map through the Arabic verses and attach the English text from the same index
  const merged = arabicData.map((v, index) => ({
    chapter: v.chapter,
    verse: v.verse,
    arabic: v.text,
    english: englishData[index].text,
  }));

  // Save as database.json
  writeFileSync(outputPath, JSON.stringify({ quran: merged }, null, 2));
  console.log("✅ Success! 'database.json' has been created in backend/data/");
} catch (error) {
  console.error("❌ Error merging files:", error.message);
}
