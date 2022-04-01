import { Router } from "express";
import UserController from "src/controllers/users/controller";

class UserRouter {
  public _router: Router;
  private readonly userController: UserController;

  constructor(c: UserController) {
    this.userController = c;
    this._router = Router();
  }

  public build(): Router {
    this.assign();

    return this._router;
  }

  private assign(): void {
    this._router.post('/', this.userController.createUser);
    this._router.get('/', this.userController.getByName);
    this._router.delete('/:userId', this.userController.deleteUser);
    this._router.get('/:userId', this.userController.getById);
  }
}

export default UserRouter;
