import IngredientEntity from "src/services/ingredients/ingredientEntity";

interface IngredientAbstractService {
  createIngredient(name: string, category: string, calories:number): Promise<string>;
  getById(id: string): Promise<IngredientEntity|undefined>;
}

export default IngredientAbstractService;
