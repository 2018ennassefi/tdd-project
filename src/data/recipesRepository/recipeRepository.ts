import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeRepository {
    createRecipe(r: RecipeEntity): Promise<void>;
    returnAll(): Promise<RecipeEntity[]>;
}

export default RecipeRepository;
