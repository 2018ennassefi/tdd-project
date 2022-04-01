import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { Express } from "express";
import UserRepository from "src/data/usersRepository/userRepository";
import UserSQLRepository from "src/data/usersRepository/userSQLRepository";
import UserDomainService from "src/services/users/userDomainService";
import { createUsersTable, clearUsersTable } from "src/utils/sql-scripts";
import { v4 as uuid4 } from "uuid";
import createApp from "src/app";
import request from "supertest";


describe("Testing user resource", () => {
  let userService: UserDomainService;
  let userRepository: UserRepository;
  let db: Database<sqlite3.Database, sqlite3.Statement>;

  beforeAll(async () => {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    await createUsersTable(db);

    userRepository = new UserSQLRepository(db);
    userService = new UserDomainService(userRepository);
  });

  afterAll(async () => {
    await clearUsersTable(db);
  });

  describe("# Creating users", () => {
    it("should create a new user", async () => {
      const userId = await userService.createUser("epit");

      expect(userId).toBeTruthy();
    });
  });

  describe("# Deleting users", () => {
    it("should delete an existing user", async () => {
      const userId = await userService.createUser("iamadeadman");
      const isDeleted = await userService.removeUser(userId);

      expect(isDeleted).toBe(true);
    });
  });

  describe("# Searching users", () => {
    it("should get a user by id", async () => {
      const userId = await userService.createUser("newusername");
      const user = await userService.searchById(userId);

      expect(user).toBeTruthy();
      expect(user?.id).toBe(userId);
      expect(user?.username).toBe("newusername");
    });

    it("should return undefined if user not found by id", async () => {
      const someId = uuid4();
      const user = await userService.searchById(someId);

      expect(user).toBeUndefined();
    });
  
    it("should get a user by pseudoname", async () => {
      const userId = await userService.createUser("some-pseudo");
      const user = await userService.searchByPseudo("some-pseudo");

      expect(user).toBeTruthy();
      expect(user?.id).toBe(userId);
      expect(user?.username).toBe("some-pseudo");
    });

    it("should return undefined if user not found by username", async () => {
      const user = await userService.searchByPseudo("non-existing-name");

      expect(user).toBeUndefined();
    });
  });
});

describe("Testing users route", () => {
  let db: Database<sqlite3.Database, sqlite3.Statement>;
  let app: Express;

  beforeAll(async () => {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    await createUsersTable(db);

    app = createApp(db);
  });

  afterAll(async () => {
    await clearUsersTable(db);
  });

  describe("# User creation route", () => {
    it("should create a user from post request", async () => {
      const res = await request(app).post("/api/users").send({ username: "my-name-1" });

      expect(res.body.userId).toBeTruthy();
    });
  });

  describe("# User deletion route", () => {
    it("should delete a user from delete request", async () => {
      const createRes = await request(app).post("/api/users").send({ username: "my-name-2" });
      const res = await request(app).delete(`/api/users/${createRes.body.userId}`).send();

      expect(res.text).toBe("OK");
    });
  });

  describe("# User search by id routes", () => {
    it("should get a user from search by id request", async () => {
      const createRes = await request(app).post("/api/users").send({ username: "my-name-3" });
      const res = await request(app).get(`/api/users/${createRes.body.userId}`).send();

      expect(res.body.user.id).toBe(createRes.body.userId);
      expect(res.body.user.username).toBe("my-name-3");
    });

    it("should get a user from search by id request if user non existing", async () => {
      const id = uuid4();
      const res = await request(app).get(`/api/users/${id}`).send();

      expect(res.body.user).toBeUndefined();
    });
  });

  describe("# User search by pseudo routes", () => {
    it("should get a user from search by pseudo request", async () => {
      const createRes = await request(app).post("/api/users").send({ username: "my-name-4" });
      const res = await request(app).get("/api/users").send({ username: "my-name-4" });

      expect(res.body.user.id).toBe(createRes.body.userId);
      expect(res.body.user.username).toBe("my-name-4");
    });

    it("should get undefined from search by pseudo request if user non existing", async () => {
      const res = await request(app).get("/api/users").send({ username: "non-exsting-user" });

      expect(res.body.user).toBeUndefined();
    });
  });

});
