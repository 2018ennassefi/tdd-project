// import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeAbstarctService {
  createRecipe(name: string, creator: string, ingredients: string[]): Promise<string>;
}

export default RecipeAbstarctService;
