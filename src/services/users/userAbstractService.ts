import UserEntity from "src/services/users/userEntity";

interface UserAbstarctService {
  createUser(name: string): Promise<string>;
  removeUser(id: string): Promise<boolean>;
  searchById(id: string): Promise<UserEntity | undefined>;
  searchByPseudo(pseudo: string): Promise<UserEntity | undefined>;
}

export default UserAbstarctService;
