import { open } from "sqlite";
import sqlite3 from "sqlite3";
import UserRepository from "src/data/usersRepository/userRepository";
import UserSQLRepository from "src/data/usersRepository/userSQLRepository";
import UserDomainService from "src/services/users/userDomainService";

let userService: UserDomainService;
let userRepository: UserRepository;

describe("Testing user resource", () => {
  beforeAll(async () => {
    const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    userRepository = new UserSQLRepository(db);
    userService = new UserDomainService(userRepository);
  });

  it("should create a new user", async () => {
    const userId = await userService.createUser("epit");

    expect(userId).toBeTruthy();
  });

  it("should delete an existing user", async () => {
    const userId = await userService.createUser("iamadeadman");
    const isDeleted = await userService.removeUser(userId);

    expect(isDeleted).toBe(true);
  });

  it("should get a user by id", async () => {
    const userId = await userService.createUser("newusername");
    const user = await userService.searchById(userId);

    expect(user.id).toBe(userId);
    expect(user.username).toBe("newusername");
  });

  it("should get a user by pseudoname", async () => {
    const userId = await userService.createUser("some-pseudo");
    const user = await userService.searchByPseudo("some-pseudo");

    expect(user.id).toBe(userId);
    expect(user.username).toBe("some-pseudo");
  });
});
