class UserEntity {
  public id: string;
  public username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}

export default UserEntity;
