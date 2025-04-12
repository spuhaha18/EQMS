// backend/src/services/equipmentList.service.ts
import { Op } from "sequelize";
import EquipmentList from "../models/EquipmentList";
import MasterList from "../models/MasterList";
import Department from "../models/Department";
import RiskAssessment from "../models/RiskAssessment";

export class EquipmentListService {
  public async getAllEquipmentList() {
    return EquipmentList.findAll({
      include: [
        { model: MasterList, as: "masterList" },
        { model: Department, as: "department" },
        { model: RiskAssessment, as: "riskAssessment" },
      ],
    });
  }

  public async getEquipmentListById(id: string) {
    return EquipmentList.findByPk(id, {
      include: [
        { model: MasterList, as: "masterList" },
        { model: Department, as: "department" },
        { model: RiskAssessment, as: "riskAssessment" },
      ],
    });
  }

  public async createEquipmentList(equipmentData: any) {
    // 마스터 코드를 통해 마스터 리스트 조회
    const masterItem = await MasterList.findOne({
      where: { masterCode: equipmentData.masterCode },
    });

    if (!masterItem) {
      throw new Error("유효하지 않은 마스터 코드입니다");
    }

    // 기기 코드 생성
    equipmentData.equipmentCode = await this.generateEquipmentCode(
      masterItem.UniqueID
    );

    // 새 기기 아이템 생성
    return EquipmentList.create(equipmentData);
  }

  public async updateEquipmentList(id: string, equipmentData: any) {
    const equipmentItem = await EquipmentList.findByPk(id);

    if (!equipmentItem) {
      return null;
    }

    // 기기 코드는 변경하지 않음 (자동 생성된 값이므로)
    delete equipmentData.equipmentCode;

    await equipmentItem.update(equipmentData);
    return equipmentItem;
  }

  public async deleteEquipmentList(id: string) {
    const deletedCount = await EquipmentList.destroy({
      where: { UniqueID: id },
    });

    return deletedCount > 0;
  }

  public async searchEquipmentList(searchParams: any) {
    const whereClause: any = {};

    // 검색 조건 구성
    if (searchParams.status) {
      whereClause.status = searchParams.status;
    }

    if (searchParams.masterCode) {
      whereClause.masterCode = searchParams.masterCode;
    }

    if (searchParams.departmentId) {
      whereClause.departmentId = searchParams.departmentId;
    }

    if (searchParams.gxpImportance) {
      whereClause.gxpImportance = searchParams.gxpImportance;
    }

    if (searchParams.group) {
      whereClause.group = searchParams.group;
    }

    if (searchParams.equipmentCode) {
      whereClause.equipmentCode = {
        [Op.like]: `%${searchParams.equipmentCode}%`,
      };
    }

    if (searchParams.sopCreated) {
      whereClause.sopCreated = searchParams.sopCreated === "true";
    }

    if (searchParams.calibrationQualificationRequired) {
      whereClause.calibrationQualificationRequired =
        searchParams.calibrationQualificationRequired === "true";
    }

    if (searchParams.equipmentRecordRequired) {
      whereClause.equipmentRecordRequired =
        searchParams.equipmentRecordRequired === "true";
    }

    if (searchParams.calibrationType) {
      whereClause.calibrationType = searchParams.calibrationType;
    }

    if (searchParams.qualificationPeriod) {
      whereClause.qualificationPeriod = searchParams.qualificationPeriod;
    }

    return EquipmentList.findAll({
      where: whereClause,
      include: [
        { model: MasterList, as: "masterList" },
        { model: Department, as: "department" },
        { model: RiskAssessment, as: "riskAssessment" },
      ],
    });
  }

  public async generateEquipmentCode(masterId: string) {
    // 마스터 아이템 조회
    const masterItem = await MasterList.findByPk(masterId);

    if (!masterItem) {
      throw new Error("유효하지 않은 마스터 ID입니다");
    }

    // 같은 마스터 코드를 가진 기기 중 마지막 기기 코드 조회
    const lastItem = await EquipmentList.findOne({
      where: {
        masterCode: masterItem.masterCode,
      },
      order: [["equipmentCode", "DESC"]],
    });

    // 기기 코드 생성 로직: Group 정보를 포함한 코드 체계
    let group = "G1"; // 기본 그룹
    let sequenceNumber = 1;

    if (lastItem) {
      // 이미 존재하는 코드가 있다면 해당 코드 파싱 후 다음 번호 결정
      const regex = new RegExp(`${masterItem.masterCode}-(\\w+)-(\\d+)`);
      const match = lastItem.equipmentCode.match(regex);

      if (match) {
        group = match[1];
        sequenceNumber = parseInt(match[2], 10) + 1;
      }
    }

    // 최종 기기 코드 생성 (예: LC01-G1-01)
    const paddedNumber = sequenceNumber.toString().padStart(2, "0");
    return `${masterItem.masterCode}-${group}-${paddedNumber}`;
  }
}
