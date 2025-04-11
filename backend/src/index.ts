import app from "./app";
import { sequelize } from "./models";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // 데이터베이스 연결 및 동기화
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // 테이블 생성 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database tables synchronized.");
    }

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
