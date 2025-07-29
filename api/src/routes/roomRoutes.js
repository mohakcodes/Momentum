import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getRoom, getRoomStreaks, createRoom, removeRoom } from "../controllers/roomController.js"

const router = express.Router();

router
    .get('/', protect, getRoom)
    .get('/:id', protect, getRoom)
    .get('/streaks/:id', protect, getRoomStreaks)
    .post('/', protect, createRoom)
    .delete('/:id', protect, removeRoom)

export default router;