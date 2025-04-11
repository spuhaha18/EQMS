import { Request, Response } from "express";
import { Department } from "../models";
import { AuditTrail } from "../models";

// 모든 부서 조회
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Get all departments error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 부서 상세 조회
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "부서를 찾을 수 없습니다." });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Get department by id error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 부서 생성
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // 이미 존재하는 부서 확인
    const existingDepartment = await Department.findOne({ where: { name } });
    if (existingDepartment) {
      return res.status(400).json({ message: "이미 존재하는 부서명입니다." });
    }

    const department = await Department.create({ name });

    // Audit Trail 기록
    await AuditTrail.create({
      userId: (req as any).user.id,
      action: "CREATE",
      entityType: "Department",
      entityId: department.id,
      oldValues: null,
      newValues: department.toJSON(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    res.status(201).json(department);
  } catch (error) {
    console.error("Create department error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 부서 수정
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: "부서를 찾을 수 없습니다." });
    }

    // 변경된 값이 없는 경우
    if (department.name === name) {
      return res.status(200).json(department);
    }

    // 이미 존재하는 부서명 확인
    const existingDepartment = await Department.findOne({ where: { name } });
    if (existingDepartment && existingDepartment.id !== id) {
      return res.status(400).json({ message: "이미 존재하는 부서명입니다." });
    }

    const oldValues = department.toJSON();

    // 부서명 업데이트
    department.name = name;
    await department.save();

    // Audit Trail 기록
    await AuditTrail.create({
      userId: (req as any).user.id,
      action: "UPDATE",
      entityType: "Department",
      entityId: department.id,
      oldValues,
      newValues: department.toJSON(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    res.status(200).json(department);
  } catch (error) {
    console.error("Update department error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 부서 삭제
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: "부서를 찾을 수 없습니다." });
    }

    const oldValues = department.toJSON();

    // 부서 삭제
    await department.destroy();

    // Audit Trail 기록
    await AuditTrail.create({
      userId: (req as any).user.id,
      action: "DELETE",
      entityType: "Department",
      entityId: id,
      oldValues,
      newValues: null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    res.status(200).json({ message: "부서가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Delete department error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
