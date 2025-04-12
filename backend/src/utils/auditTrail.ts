// backend/src/utils/auditTrail.ts
import AuditTrail from "../models/AuditTrail";

interface AuditTrailData {
  userId: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "VIEW";
  targetType: string;
  targetId: string;
  details: string;
}

export const createAuditTrail = async (data: AuditTrailData): Promise<void> => {
  try {
    await AuditTrail.create({
      userId: data.userId,
      action: data.action,
      targetType: data.targetType,
      targetId: data.targetId,
      details: data.details,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("감사 이력 생성 실패:", error);
  }
};
