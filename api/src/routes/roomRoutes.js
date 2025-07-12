import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getRoom, createRoom } from "../controllers/roomController.js"

const router = express.Router();

router
    .get('/', protect, getRoom)
    .get('/:id', protect, getRoom)
    .post('/', protect, createRoom)

export default router;