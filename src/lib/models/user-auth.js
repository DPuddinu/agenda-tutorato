export class UserAuth {
  id;
  password;
  user_id;
  constructor(userAuth) {
    Object.assign(this, userAuth);
  }
}
