import { Router } from "express";
import  recipeRouter  from "./controllers/recipe";
import  ingredientRouter  from "./controllers/ingredients";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import UserRouter from "src/controllers/users";

const baseRouter = (db: Database<sqlite3.Database, sqlite3.Statement>): Router => {
  const router = Router();

  router.use('/users', new UserRouter(db).build());
  router.use('/recipe', new recipeRouter(db).build());
  router.use('/ingredient', new ingredientRouter(db).build());
  return router;
};

export default baseRouter;