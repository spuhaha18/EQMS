// backend/src/controllers/equipmentList.controller.ts
import { Request, Response } from "express";
import { EquipmentListService } from "../services/equipmentList.service";
import { createAuditTrail } from "../utils/auditTrail";

export class EquipmentListController {
  private equipmentListService: EquipmentListService;

  constructor() {
    this.equipmentListService = new EquipmentListService();
  }

  public getAllEquipmentList = async (req: Request, res: Response) => {
    try {
      const equipmentList =
        await this.equipmentListService.getAllEquipmentList();
      res
        .status(200)
        .json({ data: equipmentList, message: "기기 리스트 조회 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getEquipmentListById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const equipmentItem =
        await this.equipmentListService.getEquipmentListById(id);

      if (!equipmentItem) {
        res
          .status(404)
          .json({ message: "해당 기기 아이템을 찾을 수 없습니다" });
        return;
      }

      res
        .status(200)
        .json({ data: equipmentItem, message: "기기 아이템 조회 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createEquipmentList = async (req: Request, res: Response) => {
    try {
      const userData = req.user;
      if (!userData) {
        res.status(401).json({ message: "인증이 필요합니다" });
        return;
      }

      const equipmentData = req.body;

      const newEquipmentItem =
        await this.equipmentListService.createEquipmentList(equipmentData);

      // 감사 이력 생성
      await createAuditTrail({
        userId: userData.id,
        action: "CREATE",
        targetType: "EquipmentList",
        targetId: newEquipmentItem.UniqueID,
        details: JSON.stringify(newEquipmentItem),
      });

      res
        .status(201)
        .json({ data: newEquipmentItem, message: "기기 아이템 생성 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public updateEquipmentList = async (req: Request, res: Response) => {
    try {
      const userData = req.user;
      if (!userData) {
        res.status(401).json({ message: "인증이 필요합니다" });
        return;
      }

      const { id } = req.params;
      const equipmentData = req.body;

      const updatedEquipmentItem =
        await this.equipmentListService.updateEquipmentList(id, equipmentData);

      if (!updatedEquipmentItem) {
        res
          .status(404)
          .json({ message: "해당 기기 아이템을 찾을 수 없습니다" });
        return;
      }

      // 감사 이력 생성
      await createAuditTrail({
        userId: userData.id,
        action: "UPDATE",
        targetType: "EquipmentList",
        targetId: id,
        details: JSON.stringify(equipmentData),
      });

      res
        .status(200)
        .json({
          data: updatedEquipmentItem,
          message: "기기 아이템 업데이트 성공",
        });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteEquipmentList = async (req: Request, res: Response) => {
    try {
      const userData = req.user;
      if (!userData) {
        res.status(401).json({ message: "인증이 필요합니다" });
        return;
      }

      const { id } = req.params;

      const deleted = await this.equipmentListService.deleteEquipmentList(id);

      if (!deleted) {
        res
          .status(404)
          .json({ message: "해당 기기 아이템을 찾을 수 없습니다" });
        return;
      }

      // 감사 이력 생성
      await createAuditTrail({
        userId: userData.id,
        action: "DELETE",
        targetType: "EquipmentList",
        targetId: id,
        details: `기기 아이템 ID: ${id} 삭제됨`,
      });

      res.status(200).json({ message: "기기 아이템 삭제 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public searchEquipmentList = async (req: Request, res: Response) => {
    try {
      const searchParams = req.query;
      const results = await this.equipmentListService.searchEquipmentList(
        searchParams
      );

      res.status(200).json({ data: results, message: "기기 리스트 검색 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public generateEquipmentCode = async (req: Request, res: Response) => {
    try {
      const { masterId } = req.params;
      const code = await this.equipmentListService.generateEquipmentCode(
        masterId
      );

      res
        .status(200)
        .json({
          data: { equipmentCode: code },
          message: "기기 코드 생성 성공",
        });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
