import express from "express"
import {
  chatWithAssistant,
  getRecommendations,
  compareProducts,
  reviewAnalysis,
  generateReport
} from "../controllers/aiController.js"

const router = express.Router()

router.post("/chat", chatWithAssistant)
router.post("/recommend", getRecommendations)
router.post("/compare", compareProducts)
router.post("/reviews", reviewAnalysis)
router.post("/report", generateReport)

export default router
