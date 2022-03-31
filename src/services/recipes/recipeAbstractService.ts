// import RecipeEntity from "src/services/recipes/recipeEntity";

interface RecipeAbstarctService {
    createRecipe(name: string, creator: string, ingredients: string[]): Promise<string>;
    returnAll(): Promise<any[]>;
    getCreatorRecipes(creator: string): Promise<any[]>;
}

export default RecipeAbstarctService;
