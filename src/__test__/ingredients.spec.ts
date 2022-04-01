import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import IngredientRepository from "src/data/ingredientsRepository/ingredientRepository";
import IngredientSQLRepository from "src/data/ingredientsRepository/ingredientSQLRepository";
import IngredientDomainService from "src/services/ingredients/ingredientDomainService";
import { createIngredientsTable, clearIngredientsTable } from "src/utils/sql-scripts";

let IngredientService: IngredientDomainService;
let IngredientRepository: IngredientRepository;
let db: Database<sqlite3.Database, sqlite3.Statement>;

describe("Testing Ingredients ", () => {
  beforeAll(async () => {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    await createIngredientsTable(db);

    IngredientRepository = new IngredientSQLRepository(db);
    IngredientService = new IngredientDomainService(IngredientRepository);
  });

  afterAll(async () => {
    await clearIngredientsTable(db);
  });

  it("should create a Ingredient", async () => {
    const ingredientName = "Carrot";
    const category = "vegetable";
    const calories = 5;
    try {
      const ingredientId = await IngredientService.createIngredient(ingredientName, category, calories);
      expect(ingredientId).toBeTruthy();
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }

  });

});