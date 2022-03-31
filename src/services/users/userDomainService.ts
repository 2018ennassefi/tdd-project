import UserRepository from "src/data/usersRepository/userRepository";
import UserAbstarctService from "src/services/users/userAbstractService";
import UserEntity from "src/services/users/userEntity";
import { v4 as uuidv4 } from 'uuid';

class UserDomainService implements UserAbstarctService {
  private readonly userRepository: UserRepository;

  constructor(repo: UserRepository) {
    this.userRepository = repo;
  }

  public async createUser(name: string): Promise<string> {
    const id = uuidv4();
    await this.userRepository.createUser(new UserEntity(id, name));

    return id;
  }

  public async removeUser(id: string): Promise<boolean> {
    await this.userRepository.deleteUser(id);

    return true;
  }

  public async searchById(id: string): Promise<UserEntity> {
    const sqlUser = await this.userRepository.getById(id);

    return new UserEntity(String(sqlUser.id), String(sqlUser.username));
  }

  public async searchByPseudo(pseudo: string): Promise<UserEntity> {
    const sqlUser = await this.userRepository.getByName(pseudo);

    return new UserEntity(String(sqlUser.id), String(sqlUser.username));
  }
}

export default UserDomainService;
