import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import baseRouter from "src/routes";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

function createApp(db: Database<sqlite3.Database, sqlite3.Statement>): express.Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser());

  app.use(cors());

  app.use("/api", baseRouter(db));

  // app.use(errorHandler);

  return app;
}

export default createApp;
