// import RecipeEntity from "src/services/recipes/recipeEntity";

import RecipeEntity from "./recipeEntity";

interface RecipeAbstarctService {
    createRecipe(name: string, creator: string, ingredients: string[]): Promise<string>;
    returnAll(): Promise<any[]>;
    getCreatorRecipes(creator: string): Promise<any[]>;
    getRecipeByName(name: string): Promise<RecipeEntity>;
}

export default RecipeAbstarctService;
