import IngredientRepository from "src/data/ingredientsRepository/ingredientRepository";
import IngredientAbstarctService from "src/services/ingredients/ingredientAbstractService";
import IngredientEntity from "src/services/ingredients/ingredientEntity";

class IngredientDomainService implements IngredientAbstarctService {
  private readonly ingredientRepository: IngredientRepository;

  constructor(repo: IngredientRepository) {
    this.ingredientRepository = repo;
  }

  public async createIngredient(name: string, category:string, calories:number): Promise<IngredientEntity> {
    throw new Error("Method not implemented.");
  }
}

export default IngredientDomainService;
