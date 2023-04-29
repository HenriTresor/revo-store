import { Router } from "express";
import { createUser, getMe } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/VerifyToken.js";

const router = Router()

router.post('/', createUser)
router.get('/me', verifyToken, getMe)

export default router