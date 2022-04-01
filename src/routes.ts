import { Router } from "express";
import UserController from "src/controllers/users/controller";
import UserRouter from "src/controllers/users/router";
import UserSQLRepository from "src/data/usersRepository/userSQLRepository";
import UserDomainService from "src/services/users/userDomainService";
import { connectSQLite, createTables } from "src/utils/sqlite-connect";

const baseRouter = Router();

connectSQLite('main-database.sql').then(async (db) => {
  await createTables(db);

  const c = new UserController(new UserDomainService(new UserSQLRepository(db)));
  baseRouter.use('/users', new UserRouter(c).build());
});

export default baseRouter;