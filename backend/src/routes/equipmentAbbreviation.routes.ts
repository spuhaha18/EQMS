import { Router } from "express";
import * as equipmentAbbreviationController from "../controllers/equipmentAbbreviation.controller";
import {
  verifyToken,
  isLocalAdminOrAbove,
} from "../middleware/auth.middleware";

const router = Router();

// 기기 약어 관련 엔드포인트
router.get(
  "/",
  verifyToken,
  equipmentAbbreviationController.getAllEquipmentAbbreviations
);
router.get(
  "/:id",
  verifyToken,
  equipmentAbbreviationController.getEquipmentAbbreviationById
);
router.post(
  "/",
  verifyToken,
  isLocalAdminOrAbove,
  equipmentAbbreviationController.createEquipmentAbbreviation
);
router.put(
  "/:id",
  verifyToken,
  isLocalAdminOrAbove,
  equipmentAbbreviationController.updateEquipmentAbbreviation
);
router.delete(
  "/:id",
  verifyToken,
  isLocalAdminOrAbove,
  equipmentAbbreviationController.deleteEquipmentAbbreviation
);

export default router;
