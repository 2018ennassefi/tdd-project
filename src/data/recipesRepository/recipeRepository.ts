import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeRepository {
  createRecipe(r: RecipeEntity): Promise<void>;
}

export default RecipeRepository;
