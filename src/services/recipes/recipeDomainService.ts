import RecipeRepository from "src/data/recipesRepository/recipeRepository";
import RecipeAbstarctService from "src/services/recipes/recipeAbstractService";
import RecipeEntity from "src/services/recipes/recipeEntity";
import { v4 as uuidv4 } from 'uuid';

class RecipeDomainService implements RecipeAbstarctService {
  private readonly recipeRepository: RecipeRepository;

  constructor(repo: RecipeRepository) {
    this.recipeRepository = repo;
  }
    getCreatorRecipes(creator: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

  public async createRecipe(name: string, creator: string, ingredients: string[]): Promise<string> {
      const id = uuidv4();
    await this.recipeRepository.createRecipe(new RecipeEntity(id, ingredients, creator, name));
    return id;
    }
public async returnAll(): Promise<RecipeEntity[]> {
    const recipes = await this.recipeRepository.returnAll();
    console.log(recipes)
    return recipes;
}

}

export default RecipeDomainService;
