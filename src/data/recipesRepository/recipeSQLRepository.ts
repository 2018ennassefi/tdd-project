import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import RecipeRepository from "src/data/recipesRepository/recipeRepository";
import RecipeEntity from "src/services/recipes/recipeEntity";

class RecipeSQLRepository implements RecipeRepository {
  private readonly sqliteDB;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.sqliteDB = db;
  }
  public async getRecipeByName(recipeName: string): Promise<RecipeEntity> {
    const res = await this.sqliteDB.get('SELECT * FROM recipes WHERE name=:name',{':name':recipeName});
    return new RecipeEntity(res.id, res.ingredients.split(','),res.creator,res.name);
  }
  public async getCreatorRecipes(creator: string): Promise<any[]> {
    const res = await this.sqliteDB.get('SELECT * FROM recipes WHERE creator=:creator',{':creator':creator});
    return Array(res);
  }
    
  public async returnAll(): Promise<any[]> {
    const res = await this.sqliteDB.get('SELECT * FROM recipes');
    return Array(res);
  }

    
  public async createRecipe(r: RecipeEntity): Promise<void> {
    await this.sqliteDB.run('INSERT INTO "recipes"(id, name, ingredients, creator) VALUES (:id, :name, :ingredients , :creator)',
      { ':id':r.id,':name':r.name,':ingredients':r.ingredients,':creator':r.creator});
  }
    
}

export default RecipeSQLRepository;
