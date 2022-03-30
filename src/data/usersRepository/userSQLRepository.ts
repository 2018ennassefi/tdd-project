import UserRepository from "src/data/usersRepository/userRepository";
import UserEntity from "src/services/users/userEntity";

class UserSQLRepository implements UserRepository {
  private readonly sqliteDB;

  constructor(db: any) {
    this.sqliteDB = db;
  }

  createUser(u: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}

export default UserSQLRepository;
