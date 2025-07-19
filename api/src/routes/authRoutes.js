import express from "express"
import { register, login, refresh } from "../controllers/authController.js"

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/refresh', refresh)

export default router;