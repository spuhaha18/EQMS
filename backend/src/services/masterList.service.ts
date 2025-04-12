// backend/src/services/masterList.service.ts
import { Op } from "sequelize";
import MasterList from "../models/MasterList";
import EquipmentAbbreviation from "../models/EquipmentAbbreviation";
import Department from "../models/Department";

export class MasterListService {
  public async getAllMasterList() {
    return MasterList.findAll({
      include: [
        { model: EquipmentAbbreviation, as: "equipmentAbbreviation" },
        { model: Department, as: "department" },
      ],
    });
  }

  public async getMasterListById(id: string) {
    return MasterList.findByPk(id, {
      include: [
        { model: EquipmentAbbreviation, as: "equipmentAbbreviation" },
        { model: Department, as: "department" },
      ],
    });
  }

  public async createMasterList(masterData: any) {
    // 기기 약어를 기반으로 마스터 코드 생성 로직
    const abbreviation = masterData.equipmentAbbreviation;

    // 같은 약어의 마지막 코드 번호 조회
    const lastItem = await MasterList.findOne({
      where: {
        masterCode: {
          [Op.like]: `${abbreviation}%`,
        },
      },
      order: [["masterCode", "DESC"]],
    });

    let newCodeNumber = 1;

    // 이미 존재하는 코드가 있다면 다음 번호 부여
    if (lastItem) {
      const lastCodeNumber = parseInt(
        lastItem.masterCode.replace(abbreviation, ""),
        10
      );
      newCodeNumber = lastCodeNumber + 1;
    }

    // 01부터 시작하는 두 자리 숫자 형식의 코드 생성
    const paddedNumber = newCodeNumber.toString().padStart(2, "0");
    masterData.masterCode = `${abbreviation}${paddedNumber}`;

    // 새 마스터 아이템 생성
    return MasterList.create(masterData);
  }

  public async updateMasterList(id: string, masterData: any) {
    const masterItem = await MasterList.findByPk(id);

    if (!masterItem) {
      return null;
    }

    // 마스터 코드는 변경하지 않음 (자동 생성된 값이므로)
    delete masterData.masterCode;

    await masterItem.update(masterData);
    return masterItem;
  }

  public async deleteMasterList(id: string) {
    const deletedCount = await MasterList.destroy({
      where: { UniqueID: id },
    });

    return deletedCount > 0;
  }

  public async searchMasterList(searchParams: any) {
    const whereClause: any = {};

    // 검색 조건 구성
    if (searchParams.status) {
      whereClause.status = searchParams.status;
    }

    if (searchParams.equipmentAbbreviation) {
      whereClause.equipmentAbbreviation = searchParams.equipmentAbbreviation;
    }

    if (searchParams.serialNumber) {
      whereClause.serialNumber = {
        [Op.like]: `%${searchParams.serialNumber}%`,
      };
    }

    if (searchParams.masterCode) {
      whereClause.masterCode = {
        [Op.like]: `%${searchParams.masterCode}%`,
      };
    }

    if (searchParams.equipmentName) {
      whereClause.equipmentName = {
        [Op.like]: `%${searchParams.equipmentName}%`,
      };
    }

    if (searchParams.manufacturer) {
      whereClause.manufacturer = {
        [Op.like]: `%${searchParams.manufacturer}%`,
      };
    }

    if (searchParams.modelName) {
      whereClause.modelName = {
        [Op.like]: `%${searchParams.modelName}%`,
      };
    }

    if (searchParams.departmentId) {
      whereClause.departmentId = searchParams.departmentId;
    }

    if (searchParams.responsiblePerson) {
      whereClause.responsiblePerson = {
        [Op.like]: `%${searchParams.responsiblePerson}%`,
      };
    }

    if (searchParams.installationLocation) {
      whereClause.installationLocation = {
        [Op.like]: `%${searchParams.installationLocation}%`,
      };
    }

    return MasterList.findAll({
      where: whereClause,
      include: [
        { model: EquipmentAbbreviation, as: "equipmentAbbreviation" },
        { model: Department, as: "department" },
      ],
    });
  }
}
