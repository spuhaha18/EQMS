import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { User, UserRole } from "../models/User";
import { Department } from "../models";

// 로그인 컨트롤러
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "사용자 이름 또는 비밀번호가 올바르지 않습니다." });
    }

    // 비밀번호 확인
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "사용자 이름 또는 비밀번호가 올바르지 않습니다." });
    }

    // 승인 상태 확인
    if (!user.isApproved) {
      return res
        .status(403)
        .json({
          message: "계정이 아직 승인되지 않았습니다. 관리자에게 문의하세요.",
        });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1d" }
    );

    // 사용자 정보에서 비밀번호 제외
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });

    res.status(200).json({
      message: "로그인 성공",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 회원가입 컨트롤러
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, name, departmentId, email } = req.body;

    // 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "이미 사용 중인 사용자 이름 또는 이메일입니다." });
    }

    // 부서 존재 확인
    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(400).json({ message: "유효하지 않은 부서입니다." });
    }

    // 기본 역할은 User로 설정하고 승인 대기 상태로 생성
    const newUser = await User.create({
      username,
      password,
      name,
      departmentId,
      email,
      role: UserRole.USER,
      isApproved: false,
    });

    // admin에게 알림 (추후 구현)
    // TODO: 알림 시스템 구현

    // 비밀번호 제외하고 응답
    const { password: _, ...userWithoutPassword } = newUser.get({
      plain: true,
    });

    res.status(201).json({
      message:
        "회원가입이 완료되었습니다. 관리자 승인 후 로그인할 수 있습니다.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 현재 사용자 정보 가져오기
export const getProfile = async (req: Request, res: Response) => {
  try {
    // auth 미들웨어에서 설정된 user 객체 사용
    const userId = (req as any).user.id;

    const user = await User.findByPk(userId, {
      include: [{ model: Department }],
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 사용자 승인 처리
export const approveUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // 사용자 찾기
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 이미 승인된 사용자 확인
    if (user.isApproved) {
      return res.status(400).json({ message: "이미 승인된 사용자입니다." });
    }

    // 사용자 승인 처리
    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: "사용자 승인이 완료되었습니다." });
  } catch (error) {
    console.error("Approve user error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
