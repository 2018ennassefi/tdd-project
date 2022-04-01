import { Router, Request, Response } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import UserSQLRepository from "src/data/usersRepository/userSQLRepository";
import UserDomainService from "src/services/users/userDomainService";

class UserRouter {
  public _router: Router;
  private readonly service: UserDomainService;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    const repository = new UserSQLRepository(db);
    this.service = new UserDomainService(repository);
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
        const userId = await this.service.createUser(String(req.body.username));
        res.send({ userId });
      }
    );

    this._router.get(
      '/',
      async (req: Request, res: Response) => {
        const user = await this.service.searchByPseudo(String(req.body.username));
        res.send({ user });
      }
    );

    this._router.delete(
      '/:userId',
      async (req: Request, res: Response) => {
        await this.service.removeUser(String(req.params.userId));
        res.send("OK");
      }
    );

    this._router.get(
      '/:userId',
      async (req: Request, res: Response) => {
        const user = await this.service.searchById(String(req.params.userId));
        res.send({ user });
      }
    );
  }
}

export default UserRouter;
