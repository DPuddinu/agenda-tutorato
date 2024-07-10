export class UserAuth {
  id;
  password;
  user_id;
  constructor(UserAuth) {
    Object.assign(this, UserAuth);
  }
}
