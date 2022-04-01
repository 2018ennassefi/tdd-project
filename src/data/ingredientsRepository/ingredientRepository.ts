import IngredientEntity from "src/services/ingredients/ingredientEntity";

interface IngredientRepository {
    createIngredient(i: IngredientEntity): Promise<void>;
    getById(id: string): Promise<IngredientEntity>;
}

export default IngredientRepository;
