import { Request, Response } from "express";
import UserAbstarctService from "src/services/users/userAbstractService";

class UserController {
  private readonly userService: UserAbstarctService;

  constructor(service: UserAbstarctService) {
    this.userService = service;
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const userId = await this.userService.createUser(String(req.body.username));

    res.send({ userId });
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.removeUser(String(req.params.userId));

    res.send("OK");
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const user = await this.userService.searchById(String(req.params.userId));

    res.send({ user });
  }

  public async getByName(req: Request, res: Response): Promise<void> {
    const user = await this.userService.searchByPseudo(String(req.body.username));

    res.send({ user });
  }
}

export default UserController;
