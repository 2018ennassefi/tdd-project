import { Router, Request, Response } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import IngredientSQLRepository from "src/data/ingredientsRepository/ingredientSQLRepository";
import IngredientDomainService from "src/services/ingredients/ingredientDomainService";

class IngredientRouter {
  public _router: Router;
  private readonly service: IngredientDomainService;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    const repository = new IngredientSQLRepository(db);
    this.service = new IngredientDomainService(repository);
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
        const ingredientId = await this.service.createIngredient(String(req.body.ingredientname),
          String(req.body.category), Number(req.body.calories));
        res.send({ ingredientId });
      }
    );


    this._router.get(
      '/:ingredientId',
      async (req: Request, res: Response) => {
        const ingredient = await this.service.getById(String(req.params.ingredientId));
        res.send({ ingredient });
      }
    );
  }
}

export default IngredientRouter;
