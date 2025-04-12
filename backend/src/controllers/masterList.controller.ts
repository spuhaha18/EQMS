// backend/src/controllers/masterList.controller.ts
import { Request, Response } from "express";
import { MasterListService } from "../services/masterList.service";
import { createAuditTrail } from "../utils/auditTrail";

export class MasterListController {
  private masterListService: MasterListService;

  constructor() {
    this.masterListService = new MasterListService();
  }

  public getAllMasterList = async (req: Request, res: Response) => {
    try {
      const masterList = await this.masterListService.getAllMasterList();
      res
        .status(200)
        .json({ data: masterList, message: "마스터 리스트 조회 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getMasterListById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const masterItem = await this.masterListService.getMasterListById(id);

      if (!masterItem) {
        res
          .status(404)
          .json({ message: "해당 마스터 아이템을 찾을 수 없습니다" });
        return;
      }

      res
        .status(200)
        .json({ data: masterItem, message: "마스터 아이템 조회 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createMasterList = async (req: Request, res: Response) => {
    try {
      const userData = req.user;
      if (!userData) {
        res.status(401).json({ message: "인증이 필요합니다" });
        return;
      }

      const masterData = req.body;

      // 마스터 코드 자동 생성은 서비스 레이어에서 처리
      const newMasterItem = await this.masterListService.createMasterList(
        masterData
      );

      // 감사 이력 생성
      await createAuditTrail({
        userId: userData.id,
        action: "CREATE",
        targetType: "MasterList",
        targetId: newMasterItem.UniqueID,
        details: JSON.stringify(newMasterItem),
      });

      res
        .status(201)
        .json({ data: newMasterItem, message: "마스터 아이템 생성 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public updateMasterList = async (req: Request, res: Response) => {
    try {
      const userData = req.user;
      if (!userData) {
        res.status(401).json({ message: "인증이 필요합니다" });
        return;
      }

      const { id } = req.params;
      const masterData = req.body;

      const updatedMasterItem = await this.masterListService.updateMasterList(
        id,
        masterData
      );

      if (!updatedMasterItem) {
        res
          .status(404)
          .json({ message: "해당 마스터 아이템을 찾을 수 없습니다" });
        return;
      }

      // 감사 이력 생성
      await createAuditTrail({
        userId: userData.id,
        action: "UPDATE",
        targetType: "MasterList",
        targetId: id,
        details: JSON.stringify(masterData),
      });

      res
        .status(200)
        .json({
          data: updatedMasterItem,
          message: "마스터 아이템 업데이트 성공",
        });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteMasterList = async (req: Request, res: Response) => {
    try {
      const userData = req.user;
      if (!userData) {
        res.status(401).json({ message: "인증이 필요합니다" });
        return;
      }

      const { id } = req.params;

      const deleted = await this.masterListService.deleteMasterList(id);

      if (!deleted) {
        res
          .status(404)
          .json({ message: "해당 마스터 아이템을 찾을 수 없습니다" });
        return;
      }

      // 감사 이력 생성
      await createAuditTrail({
        userId: userData.id,
        action: "DELETE",
        targetType: "MasterList",
        targetId: id,
        details: `마스터 아이템 ID: ${id} 삭제됨`,
      });

      res.status(200).json({ message: "마스터 아이템 삭제 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public searchMasterList = async (req: Request, res: Response) => {
    try {
      const searchParams = req.query;
      const results = await this.masterListService.searchMasterList(
        searchParams
      );

      res
        .status(200)
        .json({ data: results, message: "마스터 리스트 검색 성공" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
