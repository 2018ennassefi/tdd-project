import IngredientEntity from "src/services/ingredients/ingredientEntity";

interface IngredientRepository {
    createIngredient(i: IngredientEntity): Promise<void>;
}

export default IngredientRepository;
