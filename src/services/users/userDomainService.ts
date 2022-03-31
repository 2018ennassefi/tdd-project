import UserRepository from "src/data/usersRepository/userRepository";
import UserAbstarctService from "src/services/users/userAbstractService";
import UserEntity from "src/services/users/userEntity";

class UserDomainService implements UserAbstarctService {
  private readonly userRepository: UserRepository;

  constructor(repo: UserRepository) {
    this.userRepository = repo;
  }

  createUser(name: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  removeUser(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  searchById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  searchByPseudo(pseudo: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}

export default UserDomainService;
