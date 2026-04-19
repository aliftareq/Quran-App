import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to read data safely
const getData = (fileName) => {
    const filePath = join(__dirname, '../../data', fileName);
    return JSON.parse(readFileSync(filePath, 'utf-8'));
};

export const getAllSurahs = (req, res) => {
    try {
        const info = getData('info.json');
        res.status(200).json(info.chapters);
    } catch (error) {
        console.error("Error loading info.json:", error);
        res.status(500).json({ message: "Failed to load Surah list" });
    }
};

export const getSurahById = (req, res) => {
    try {
        const surahId = parseInt(req.params.id);
        const database = getData('database.json');
        
        const verses = database.quran.filter(v => v.chapter === surahId);
        
        if (verses.length === 0) {
            return res.status(404).json({ message: "Surah not found" });
        }

        res.status(200).json(verses);
    } catch (error) {
        console.error("Error loading database.json:", error);
        res.status(500).json({ message: "Failed to load verses" });
    }
};

export const searchTranslation = (req, res) => {
    try {
        const query = req.query.q?.toLowerCase();
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const database = getData('database.json');
        
        // Filter verses that contain the search string in the English text
        const results = database.quran.filter(v => 
            v.english.toLowerCase().includes(query)
        );

        // We limit to 50 results for better performance
        res.status(200).json(results.slice(0, 50));
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Search failed" });
    }
};