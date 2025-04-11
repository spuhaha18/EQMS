import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {
  verifyToken,
  isSuperAdmin,
  isLocalAdminOrAbove,
} from "../middleware/auth.middleware";

const router = Router();

// 인증 엔드포인트
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", verifyToken, authController.getProfile);

// 관리자 전용 엔드포인트
router.patch(
  "/approve/:userId",
  verifyToken,
  isLocalAdminOrAbove,
  authController.approveUser
);

export default router;
