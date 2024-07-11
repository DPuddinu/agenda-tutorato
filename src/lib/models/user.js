export class User {
  id;
  name;
  constructor(user) {
    Object.assign(this, user);
  }
}
