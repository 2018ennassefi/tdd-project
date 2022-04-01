import IngredientEntity from "src/services/ingredients/ingredientEntity";

interface IngredientRepository {
    createIngredient(i: IngredientEntity): Promise<void>;
    getById(id: string): Promise<IngredientEntity|undefined>;
    deleteIngredient(id: string): Promise<void>;
}

export default IngredientRepository;
