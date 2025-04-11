import { Router } from "express";
import authRoutes from "./auth.routes";
import departmentRoutes from "./department.routes";
import equipmentAbbreviationRoutes from "./equipmentAbbreviation.routes";
// import masterListRoutes from './masterList.routes';
// import equipmentListRoutes from './equipmentList.routes';
// import riskAssessmentRoutes from './riskAssessment.routes';
// import qualificationEvaluationRoutes from './qualificationEvaluation.routes';
// import auditTrailRoutes from './auditTrail.routes';

const router = Router();

// 라우트 설정
router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/equipment-abbreviations", equipmentAbbreviationRoutes);
// router.use('/master-list', masterListRoutes);
// router.use('/equipment-list', equipmentListRoutes);
// router.use('/risk-assessments', riskAssessmentRoutes);
// router.use('/qualification-evaluations', qualificationEvaluationRoutes);
// router.use('/audit-trail', auditTrailRoutes);

export default router;
