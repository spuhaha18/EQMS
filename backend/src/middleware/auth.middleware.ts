import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../models/User";

// Request 인터페이스 확장
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

// JWT 토큰 확인 미들웨어
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "인증 토큰이 필요합니다." });
    }

    const token = authHeader.split(" ")[1];

    // 토큰 검증
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    ) as { id: string; role: UserRole };

    // 사용자 존재 여부 확인
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }

    // 사용자 승인 상태 확인
    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "계정이 아직 승인되지 않았습니다." });
    }

    // 요청 객체에 사용자 정보 설정
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

// 권한 확인 미들웨어 생성 함수
export const checkRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "접근 권한이 없습니다." });
    }

    next();
  };
};

// 슈퍼 관리자 권한 확인
export const isSuperAdmin = checkRole([UserRole.SUPER_ADMIN]);

// 로컬 관리자 이상 권한 확인
export const isLocalAdminOrAbove = checkRole([
  UserRole.SUPER_ADMIN,
  UserRole.LOCAL_ADMIN,
]);

// QA 관리자 이상 권한 확인
export const isQAAdminOrAbove = checkRole([
  UserRole.SUPER_ADMIN,
  UserRole.LOCAL_ADMIN,
  UserRole.QA_ADMIN,
]);

// QA 이상 권한 확인
export const isQAOrAbove = checkRole([
  UserRole.SUPER_ADMIN,
  UserRole.LOCAL_ADMIN,
  UserRole.QA_ADMIN,
  UserRole.QA,
]);

// 모든 인증된 사용자 권한 확인
export const isAuthenticated = checkRole([
  UserRole.SUPER_ADMIN,
  UserRole.LOCAL_ADMIN,
  UserRole.QA_ADMIN,
  UserRole.QA,
  UserRole.USER,
]);
