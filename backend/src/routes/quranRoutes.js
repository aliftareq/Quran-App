import express from "express";
import {
  getAllSurahs,
  getSurahById,
  searchTranslation,
} from "../controller/quranController.js";

const router = express.Router();

router.get("/surahs", getAllSurahs);
router.get("/surah/:id", getSurahById);
router.get("/search", searchTranslation);

export default router;
