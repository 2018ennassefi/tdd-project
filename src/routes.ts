import { Router } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import UserRouter from "src/controllers/users";

const baseRouter = (db: Database<sqlite3.Database, sqlite3.Statement>): Router => {
  const router = Router();

  router.use('/users', new UserRouter(db).build());

  return router;
};

export default baseRouter;