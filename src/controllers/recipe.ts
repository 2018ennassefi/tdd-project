import { Router, Request, Response } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import RecipeSQLRepository from "src/data/recipesRepository/recipeSQLRepository";
import RecipeDomainService from "src/services/recipes/recipeDomainService";

class RecipeRouter {
  public _router: Router;
  private readonly service: RecipeDomainService;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    const repository = new RecipeSQLRepository(db);
    this.service = new RecipeDomainService(repository);
    this._router = Router();
  }

  public build(): Router {
    this.assign();

    return this._router;
  }

  private assign(): void {
    this._router.post(
      '/',
      async (req: Request, res: Response) => {
          const recipeId = await this.service.createRecipe(String(req.body.name),String(req.body.creator),Array(req.body.ingredients));
        res.send({ recipeId });
      }
      );
    this._router.get(
    '/',
    async (req: Request, res: Response) => {
    res.sendStatus(200);
    }
);
  }
}

export default RecipeRouter;
