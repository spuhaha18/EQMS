// backend/src/routes/equipmentList.routes.ts
import { Router } from "express";
import { EquipmentListController } from "../controllers/equipmentList.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new EquipmentListController();

router.use(authMiddleware);

router.get("/", controller.getAllEquipmentList);
router.get("/search", controller.searchEquipmentList);
router.get("/generate-code/:masterId", controller.generateEquipmentCode);
router.get("/:id", controller.getEquipmentListById);
router.post("/", controller.createEquipmentList);
router.put("/:id", controller.updateEquipmentList);
router.delete("/:id", controller.deleteEquipmentList);

export default router;
