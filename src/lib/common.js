export const USERNAME_KEY = "user";
export const PASS_KEY = "password";
export const CONFIRM_KEY = "confirm";
export const USERS_KEY = "users";
export const USER_EXISTS = "user-exists";
export const USERAUTH_KEY = "userAuth";
export const APPOINTMENTS_KEY = "appointments";
export const LOGGEDUSER_KEY = "loggedUser";
export const DESCRIPTION_KEY = "description";
export const DUEDATE_KEY = "dueDate";
export const CATEGORY_KEY = "category";
export const COMPLETED_KEY = "completedDate";

export function generateId() {
  return Math.floor(Math.random() * 9999999);
}
