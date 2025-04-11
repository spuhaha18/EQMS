import { Request, Response } from "express";
import { EquipmentAbbreviation, AuditTrail } from "../models";

// 모든 기기 약어 조회
export const getAllEquipmentAbbreviations = async (
  req: Request,
  res: Response
) => {
  try {
    const abbreviations = await EquipmentAbbreviation.findAll();
    res.status(200).json(abbreviations);
  } catch (error) {
    console.error("Get all equipment abbreviations error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 기기 약어 상세 조회
export const getEquipmentAbbreviationById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const abbreviation = await EquipmentAbbreviation.findByPk(id);

    if (!abbreviation) {
      return res.status(404).json({ message: "기기 약어를 찾을 수 없습니다." });
    }

    res.status(200).json(abbreviation);
  } catch (error) {
    console.error("Get equipment abbreviation by id error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 기기 약어 생성
export const createEquipmentAbbreviation = async (
  req: Request,
  res: Response
) => {
  try {
    const { abbreviation, name } = req.body;

    // 이미 존재하는 약어 확인
    const existingAbbreviation = await EquipmentAbbreviation.findOne({
      where: { abbreviation },
    });
    if (existingAbbreviation) {
      return res
        .status(400)
        .json({ message: "이미 존재하는 기기 약어입니다." });
    }

    const equipmentAbbreviation = await EquipmentAbbreviation.create({
      abbreviation,
      name,
    });

    // Audit Trail 기록
    await AuditTrail.create({
      userId: (req as any).user.id,
      action: "CREATE",
      entityType: "EquipmentAbbreviation",
      entityId: equipmentAbbreviation.id,
      oldValues: null,
      newValues: equipmentAbbreviation.toJSON(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    res.status(201).json(equipmentAbbreviation);
  } catch (error) {
    console.error("Create equipment abbreviation error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 기기 약어 수정
export const updateEquipmentAbbreviation = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { abbreviation, name } = req.body;

    const equipmentAbbreviation = await EquipmentAbbreviation.findByPk(id);
    if (!equipmentAbbreviation) {
      return res.status(404).json({ message: "기기 약어를 찾을 수 없습니다." });
    }

    // 변경된 값이 없는 경우
    if (
      equipmentAbbreviation.abbreviation === abbreviation &&
      equipmentAbbreviation.name === name
    ) {
      return res.status(200).json(equipmentAbbreviation);
    }

    // 이미 존재하는 약어 확인 (다른 ID)
    if (equipmentAbbreviation.abbreviation !== abbreviation) {
      const existingAbbreviation = await EquipmentAbbreviation.findOne({
        where: { abbreviation },
      });
      if (existingAbbreviation && existingAbbreviation.id !== id) {
        return res
          .status(400)
          .json({ message: "이미 존재하는 기기 약어입니다." });
      }
    }

    const oldValues = equipmentAbbreviation.toJSON();

    // 기기 약어 업데이트
    equipmentAbbreviation.abbreviation = abbreviation;
    equipmentAbbreviation.name = name;
    await equipmentAbbreviation.save();

    // Audit Trail 기록
    await AuditTrail.create({
      userId: (req as any).user.id,
      action: "UPDATE",
      entityType: "EquipmentAbbreviation",
      entityId: equipmentAbbreviation.id,
      oldValues,
      newValues: equipmentAbbreviation.toJSON(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    res.status(200).json(equipmentAbbreviation);
  } catch (error) {
    console.error("Update equipment abbreviation error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 기기 약어 삭제
export const deleteEquipmentAbbreviation = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const equipmentAbbreviation = await EquipmentAbbreviation.findByPk(id);
    if (!equipmentAbbreviation) {
      return res.status(404).json({ message: "기기 약어를 찾을 수 없습니다." });
    }

    const oldValues = equipmentAbbreviation.toJSON();

    // 기기 약어 삭제
    await equipmentAbbreviation.destroy();

    // Audit Trail 기록
    await AuditTrail.create({
      userId: (req as any).user.id,
      action: "DELETE",
      entityType: "EquipmentAbbreviation",
      entityId: id,
      oldValues,
      newValues: null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    res.status(200).json({ message: "기기 약어가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Delete equipment abbreviation error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
