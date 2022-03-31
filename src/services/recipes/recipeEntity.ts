class RecipeEntity {
  public id: string;
  public ingredients: string[];
  public creator: string;
  public name: string;

  constructor(id: string, ingredients: string[], creator:string, name:string) {
    this.id = id;
    this.ingredients = ingredients;
    this.creator = creator;
    this.name = name;
  }
}

export default RecipeEntity;
