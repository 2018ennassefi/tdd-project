import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import UserRepository from "src/data/usersRepository/userRepository";
import UserEntity from "src/services/users/userEntity";

class UserSQLRepository implements UserRepository {
  private readonly sqliteDB;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.sqliteDB = db;
  }

  public async createUser(u: UserEntity): Promise<void> {
    await this.sqliteDB.run('INSERT INTO user VALUES (:id, :username)', { ':id': u.id, ':username': u.username });
  }

  public async deleteUser(id: string): Promise<void> {
    await this.sqliteDB.run('DELETE FROM user WHERE id = :id', { ':id': id });
  }

  public async getById(id: string): Promise<any> {
    const res = await this.sqliteDB.get('SELECT * FROM user WHERE id = :id', { ':id': id });

    return res;
  }
  public async getByName(name: string): Promise<any> {
    const res = await this.sqliteDB.get('SELECT * FROM user WHERE username = :pseudo', { ':pseudo': name });

    return res;
  }
}

export default UserSQLRepository;
