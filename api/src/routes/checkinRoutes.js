import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { isCheckInDoneToday, checkInNow, getAllCheckIns } from "../controllers/checkinController.js";

const router = express.Router();

router
    .get('/:roomId', protect, isCheckInDoneToday)
    .get('/all-checks/:roomId', protect, getAllCheckIns)

    .post('/check/:roomId', protect, checkInNow)

export default router;