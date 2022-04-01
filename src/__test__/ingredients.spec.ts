import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import IngredientRepository from "src/data/ingredientsRepository/ingredientRepository";
import IngredientSQLRepository from "src/data/ingredientsRepository/ingredientSQLRepository";
import IngredientDomainService from "src/services/ingredients/ingredientDomainService";
import { createIngredientsTable, clearIngredientsTable } from "src/utils/sql-scripts";
import { v4 as uuid4 } from "uuid";

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
      expect(error).toBeFalsy();
    }

  });

  it("should get a ingredient by its id", async () => {
    const ingredientName = "Carrot";
    const category = "vegetable";
    const calories = 5;
    try {
      const ingredientId = await IngredientService.createIngredient(ingredientName, category, calories);
      const ingredient = await IngredientService.getById(ingredientId);
      expect(ingredient?.name).toBe(ingredientName);
      expect(ingredient?.category).toBe(category);
      expect(ingredient?.calories).toBe(calories);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should get a ingredient by its name", async () => {
    const ingredientName = "Carrot";
    const category = "vegetable";
    const calories = 5;
    try {
      await IngredientService.createIngredient(ingredientName, category, calories);
      const ingredient = await IngredientService.getByName("Carrot");
      expect(ingredient?.name).toBe(ingredientName);
      expect(ingredient?.category).toBe(category);
      expect(ingredient?.calories).toBe(calories);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should return undefined if ingredient not found by id", async () => {
    const someId = uuid4();
    const ingredient = await IngredientService.getById(someId);

    expect(ingredient).toBeUndefined();
  });

  it("should return undefined if ingredient not found by name", async () => {
    const ingredient = await IngredientService.getByName("patates");
    expect(ingredient).toBeUndefined();
  });

  it("should be abdle to delete ingredient", async () => {
    const ingredientName = "Carrot";
    const category = "vegetable";
    const calories = 5;
    try {
      const ingredientId = await IngredientService.createIngredient(ingredientName, category, calories);
      IngredientService.deleteIngredient(ingredientId);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

});


