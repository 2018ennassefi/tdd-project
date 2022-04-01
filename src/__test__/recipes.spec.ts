import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import RecipeRepository from "src/data/recipesRepository/recipeRepository";
import RecipeSQLRepository from "src/data/recipesRepository/recipeSQLRepository";
import RecipeDomainService from "src/services/recipes/recipeDomainService";
import RecipeEntity from "src/services/recipes/recipeEntity";
import { createRecipesTable, clearRecipesTable } from "src/utils/sql-scripts";
import request from "supertest"
import createApp from 'src/app'

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
    
    it("should return all recipes", async () => {
    const recipeName = "My first Recipe"
    const ingredients = "Carrots,Eggs"
    const creatorId = '5'
    const recipes = await recipeService.returnAll();
    expect(recipes.length).toBe(1)
    expect(recipes[0].name).toBe(recipeName)
    expect(recipes[0].ingredients).toBe(ingredients)
    expect(recipes[0].creator).toBe(creatorId)
    });


    it("should return all recipes of a creator given his id", async () => {
    const creatorId = '5'
    const recipes = await recipeService.getCreatorRecipes(creatorId);
    expect(recipes[0].creator).toBe(creatorId)
    })

    it('should return a recipe given its name', async () => {
        const recipeName = "My first Recipe"
        const recipe = await recipeService.getRecipeByName(recipeName);
        expect(recipe.name).toBe(recipeName)
    })

});


describe("when sending a request to the recipes api", () => {
  let app: any
  beforeAll(async () => {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });
  
  await createRecipesTable(db);
  app = createApp(db)
  recipeRepository = new RecipeSQLRepository(db);
  recipeService = new RecipeDomainService(recipeRepository);
});

afterAll(async () => {
  await clearRecipesTable(db);
});
    
  test("should respond with a 200 status code", async () => {
    const recipeName = "My first Recipe"
    const ingredients = ['Carrots', 'Eggs']
    const creatorId = '5'
    
    const response = await request(app).post("/api/recipe/").send({
      'name': recipeName,
      'ingredients': ingredients,
      'creator':creatorId
    })
    expect(response.statusCode).toBe(200)
    
  })

  test("should return the new recipe on a post request to create one", (done) => {
    const recipeName = "My first Recipe"
    const ingredients = ['Carrots', 'Eggs']
    const creatorId = '5'
    
    request(app).post("/api/recipe/").send({
      'name': recipeName,
      'ingredients': ingredients,
      'creator':creatorId
    }).expect(200)
      .expect((res) => {
        console.log('body',res.body)
        console.log("data",res.body.recipeId)
        res.body.recipeId != ""
      })
      .end((err:any) => {
        if (err) return done(err);
      return done()}
    )
    
  })
})

