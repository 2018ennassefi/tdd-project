import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import baseRouter from "src/routes";
function createApp(): express.Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser());

  app.use(cors());

  app.use("/api", baseRouter);

  // app.use(errorHandler);

  return app;
}

export default createApp;
