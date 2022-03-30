import UserEntity from "src/services/users/userEntity";

interface UserAbstarctService {
  createUser(): Promise<void>;
  removeUser(id: string): Promise<void>;
  searchById(id: string): Promise<UserEntity>;
  searchByPseudo(pseudo: string): Promise<UserEntity>;
}

export default UserAbstarctService;
