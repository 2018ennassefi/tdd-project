import UserEntity from "src/services/users/userEntity";

interface UserRepository {
  createUser(u: UserEntity): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getById(id: string): Promise<any>;
  getByName(name: string): Promise<any>;
}

export default UserRepository;
