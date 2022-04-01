import IngredientRepository from "src/data/ingredientsRepository/ingredientRepository";
import IngredientAbstarctService from "src/services/ingredients/ingredientAbstractService";
import IngredientEntity from "src/services/ingredients/ingredientEntity";
import { v4 as uuidv4 } from 'uuid';

class IngredientDomainService implements IngredientAbstarctService {
  private readonly ingredientRepository: IngredientRepository;

  constructor(repo: IngredientRepository) {
    this.ingredientRepository = repo;
  }

  async deleteIngredient(carrotID: string): Promise<boolean> {
    try {
      await this.ingredientRepository.deleteIngredient(carrotID);
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  getByName(name: string):Promise<IngredientEntity|undefined> {
    return this.ingredientRepository.getByName(name);
  }
  
  getById(id: string): Promise<IngredientEntity|undefined> {
    return this.ingredientRepository.getById(id);
  }

  public async createIngredient(name: string, category:string, calories:number): Promise<string> {
    const id = uuidv4();
    const ingredient = new IngredientEntity(id, name, category, calories);
    await this.ingredientRepository.createIngredient(ingredient);
    return id;
  }
}

export default IngredientDomainService;
