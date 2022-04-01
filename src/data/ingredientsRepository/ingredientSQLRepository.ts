import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import IngredientRepository from "src/data/ingredientsRepository/ingredientRepository";
import IngredientEntity from "src/services/ingredients/ingredientEntity";

class IngredientSQLRepository implements IngredientRepository {
  private readonly sqliteDB;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.sqliteDB = db;
  }
  deleteIngredient(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
    
  async createIngredient(i: IngredientEntity): Promise<void> {
    await this.sqliteDB.run('INSERT INTO "ingredients" (id, name, category, calories) VALUES (:id, :name, :category , :calories)',
        { ':id':i.id,':name':i.name,':category':i.category,':calories':i.calories});
  }
    
}

export default IngredientSQLRepository;
