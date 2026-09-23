import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.get("/me", authController.me);

export default router;