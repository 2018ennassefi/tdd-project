import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeRepository {
    createRecipe(r: RecipeEntity): Promise<void>;
    returnAll(): Promise<any[]>;
    getCreatorRecipes(): Promise<any[]>;
}

export default RecipeRepository;
