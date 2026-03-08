import express from "express"
import { registerUser, loginUser, updateProfile, getProfile, getUsers } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/profile", updateProfile)
router.get("/profile", getProfile)

router.get("/", getUsers)

export default router