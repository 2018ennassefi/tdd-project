import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeRepository {
    createRecipe(r: RecipeEntity): Promise<void>;
    returnAll(): Promise<any[]>;
    getCreatorRecipes(creator: string): Promise<any[]>;
    getRecipeByName(recipeName: string): Promise<RecipeEntity>;
}

export default RecipeRepository;
