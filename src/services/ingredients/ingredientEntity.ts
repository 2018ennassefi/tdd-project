export default class IngredientEntity {
  public id: string;
  public name: string;
  public category: string;
  public calories: number;

  constructor(id: string, username: string, category:string, calories: number) {
    this.id = id;
    this.name = username;
    this.category = category;
    this.calories = calories;
  }
}

