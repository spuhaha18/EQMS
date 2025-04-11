import { Router } from "express";
import * as departmentController from "../controllers/department.controller";
import {
  verifyToken,
  isLocalAdminOrAbove,
} from "../middleware/auth.middleware";

const router = Router();

// 부서 관련 엔드포인트
router.get("/", verifyToken, departmentController.getAllDepartments);
router.get("/:id", verifyToken, departmentController.getDepartmentById);
router.post(
  "/",
  verifyToken,
  isLocalAdminOrAbove,
  departmentController.createDepartment
);
router.put(
  "/:id",
  verifyToken,
  isLocalAdminOrAbove,
  departmentController.updateDepartment
);
router.delete(
  "/:id",
  verifyToken,
  isLocalAdminOrAbove,
  departmentController.deleteDepartment
);

export default router;
