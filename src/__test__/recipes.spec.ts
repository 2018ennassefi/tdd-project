import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import RecipeRepository from "src/data/recipesRepository/recipeRepository";
import RecipeSQLRepository from "src/data/recipesRepository/recipeSQLRepository";
import RecipeDomainService from "src/services/recipes/recipeDomainService";
import { createRecipesTable, clearRecipesTable } from "src/utils/sql-scripts";

let recipeService: RecipeDomainService;
let recipeRepository: RecipeRepository;
let db: Database<sqlite3.Database, sqlite3.Statement>;

describe("Testing recipes ", () => {
  beforeAll(async () => {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    await createRecipesTable(db);

    recipeRepository = new RecipeSQLRepository(db);
    recipeService = new RecipeDomainService(recipeRepository);
  });

  afterAll(async () => {
    await clearRecipesTable(db);
  });

    it("should create a recipe", async () => {
        const recipeName = "My first Recipe"
        const ingredients = ['Carrots', 'Eggs']
        const creatorId = '5'
    const recipeId = await recipeService.createRecipe(recipeName,creatorId, ingredients);

    expect(recipeId).toBeTruthy();
  });

});
