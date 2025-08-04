import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { unlockToast, selectToast } from "../controllers/storeController.js";

const router = express.Router();

router
    .post('/unlock-toast', protect, unlockToast)
    .post('/select-toast', protect, selectToast)

export default router;