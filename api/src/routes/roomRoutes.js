import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getRoom, createRoom, removeRoom } from "../controllers/roomController.js"

const router = express.Router();

router
    .get('/', protect, getRoom)
    .get('/:id', protect, getRoom)
    .post('/', protect, createRoom)
    .delete('/:id', protect, removeRoom)

export default router;