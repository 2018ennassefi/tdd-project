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
    
  createIngredient(i: IngredientEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
    
}

export default IngredientSQLRepository;
