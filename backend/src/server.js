import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import quranRoutes from "./routes/quranRoutes.js";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS is essential for allowing your Next.js app to fetch data
app.use(cors());

// Allows the server to understand JSON in request bodies (if needed for POST)
app.use(express.json());

// Main API Routes
// All your Quran endpoints will now be prefixed with /api
// app.use("/api", quranRoutes);

// Root Route (Health Check)
app.get("/", (req, res) => {
  res.status(200).send({
    status: "Active",
    message: "Quran App Backend is running smoothly",
    endpoints: {
      surahList: "/api/surahs",
      surahDetail: "/api/surah/:id",
      search: "/api/search?q=query",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
🚀 Server is firing up!
📡 URL: http://localhost:${PORT}
🛠️  Mode: Development (Nodemon)
    `);
});
