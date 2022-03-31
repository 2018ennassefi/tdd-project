import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeRepository {
    createRecipe(r: RecipeEntity): Promise<void>;
    returnAll(): Promise<any[]>;
}

export default RecipeRepository;
