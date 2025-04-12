// backend/src/routes/masterList.routes.ts
import { Router } from "express";
import { MasterListController } from "../controllers/masterList.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new MasterListController();

router.use(authMiddleware);

router.get("/", controller.getAllMasterList);
router.get("/search", controller.searchMasterList);
router.get("/:id", controller.getMasterListById);
router.post("/", controller.createMasterList);
router.put("/:id", controller.updateMasterList);
router.delete("/:id", controller.deleteMasterList);

export default router;
