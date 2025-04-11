import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

// Express 애플리케이션 생성
const app: Application = express();

// 미들웨어 설정
app.use(helmet()); // 보안 헤더 설정
app.use(cors()); // CORS 활성화
app.use(morgan("dev")); // 로깅
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱

// API 라우트 설정
app.use("/api", routes);

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Equipment Management System API" });
});

// 404 에러 핸들링
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// 에러 핸들링 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
