import express from "express"
import { register, login, refresh, logout } from "../controllers/authController.js"

const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/refresh', refresh)
    .post('/logout', logout)

export default router;