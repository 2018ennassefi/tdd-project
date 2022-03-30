class UserEntity {
  public id: string;
  public username: string;
  public recipes: any[];

  constructor(id: string, username: string, recipes?: any[]) {
    this.id = id;
    this.username = username;
    this.recipes = recipes || [];
  }
}

export default UserEntity;
