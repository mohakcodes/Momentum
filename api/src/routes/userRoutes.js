import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { unlockTheme } from "../controllers/userController.js";

const router = express.Router();

router
    .post('/unlock-theme', protect, unlockTheme)

export default router;