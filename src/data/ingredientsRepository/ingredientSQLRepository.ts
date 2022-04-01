import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import IngredientRepository from "src/data/ingredientsRepository/ingredientRepository";
import IngredientEntity from "src/services/ingredients/ingredientEntity";

class IngredientSQLRepository implements IngredientRepository {
  private readonly sqliteDB;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.sqliteDB = db;
  }
  async deleteIngredient(id: string): Promise<void> {
    await this.sqliteDB.run('DELETE FROM ingredients WHERE id=:id', { ':id': id });
  }

  async getById(id: string): Promise<IngredientEntity | undefined> {
    const res = await this.sqliteDB.get('SELECT * FROM ingredients WHERE id=:id', { ':id': id });
    if (res) {
      return new IngredientEntity(res.id, res.name, res.category, res.calories);

    }
    return undefined;
  }

  getByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async createIngredient(i: IngredientEntity): Promise<void> {
    await this.sqliteDB.run('INSERT INTO "ingredients" (id, name, category, calories) VALUES (:id, :name, :category , :calories)',
      { ':id': i.id, ':name': i.name, ':category': i.category, ':calories': i.calories });
  }

}

export default IngredientSQLRepository;
