// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Express Request 타입에 user 필드 추가
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // backend/src/middleware/auth.middleware.ts (계속)
    if (!token) {
      return res.status(401).json({ message: "인증 토큰이 필요합니다" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }

    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "계정이 아직 승인되지 않았습니다" });
    }

    // req.user 객체 설정
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      departmentId: user.departmentId,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다" });
  }
};
