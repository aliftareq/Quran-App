import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quranRoutes from "./routes/quranRoutes.js";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API Routes
// All endpoints in quranRoutes will be prefixed with /api
app.use("/api", quranRoutes);

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
