import { User } from "./models/user.js";
import { UserAuth } from "./models/user-auth.js";
import {
  USERAUTH_KEY,
  USERS_KEY,
  generateId,
  CONFIRM_KEY,
  PASS_KEY,
  USERNAME_KEY,
} from "./common.js";

//Funzione per prendere i dati
export function getCredentialRegister() {
  const { name, password } = getCredentialLogin();
  const passwordConfirm = document.getElementById(CONFIRM_KEY).value;
  return { name, password, passwordConfirm };
}
export function getCredentialLogin() {
  const name = document.getElementById(USERNAME_KEY).value;
  const password = document.getElementById(PASS_KEY).value;
  return { name, password };
}

export function register({ name, password, passwordConfirm }) {
  const validationErrors = validateRegister({
    name,
    password,
    passwordConfirm,
  });
  const user_id = generateId();
  const id = user_id;
  // prendi l'oggetto users dalla key USERS_KEY, convertilo in oggetto con JSON.parse(), verifica che non sia già presente l'utente, se non è presente fai il push del nuovo utente nell'array, infine salva il nuovo array nel localstorage
  // Recupera l'oggetto users dal localStorage
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const usersAuth = JSON.parse(localStorage.getItem(USERAUTH_KEY)) || [];

  // Verifica che l'utente non sia già presente
  const userExists = users.some((user) => user.name === name);

  if (!userExists) {
    // Aggiungi il nuovo utente all'array
    users.push(new User({ id, name }));
    usersAuth.push(new UserAuth({ id: generateId(), password, user_id }));

    // Salva il nuovo array nel localStorage
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(USERAUTH_KEY, JSON.stringify(usersAuth));
    alert("Registrazione completata!");
  } else {
    alert("Invalid credentials!");
  }
}

//Funzione login
export function login({ name, password }) {
  // Recuperare tutti gli utenti dal localStorage
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const usersAuth = JSON.parse(localStorage.getItem(USERAUTH_KEY));
  // Cicla su tutti gli utenti
  for (const user of users) {
    for (const authUser of usersAuth) {
      if (
        user.id === authUser.user_id &&
        user.name === name &&
        authUser.password === password
      ) {
        return user;
      }
    }
  }

  // Se non trova l'utente, mostra un alert
  alert("Utente non trovato");
  return null;
}
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
//Funzione per controllare i dati in ingresso
export function validateRegister({ name, password, passwordConfirm }) {
  let errors = {};
  if (name.length > 10 || name.length < 3)
    errors[USERNAME_KEY] = "The username must be between 3 and 10 characters";

  if (name === "") errors[USERNAME_KEY] = "Username required";
  if (passwordConfirm === "") errors[CONFIRM_KEY] = "Confirm password required";
  if (password !== passwordConfirm && passwordConfirm !== "")
    errors[CONFIRM_KEY] = "Password don't match retype your Password";

  if (!passwordRegex.test(password)) errors[PASS_KEY] = "Invalid password";
  return errors;
}

export function validateLogin({ name, password }) {
  let errors = {};

  if (name === "") errors[USERNAME_KEY] = "Username required";
  if (password === "") errors[PASS_KEY] = "Password required";

  return errors;
}

export function setRegisterErrors(errors) {
  if (errors[USERNAME_KEY]) {
    document.getElementById("errorUser").textContent = errors[USERNAME_KEY];
  }
  if (errors[PASS_KEY]) {
    document.getElementById("errorPass").textContent = errors[PASS_KEY];
  }
  if (errors[CONFIRM_KEY]) {
    document.getElementById("errorConfi").textContent = errors[CONFIRM_KEY];
  }
  return errors;
}

export function setLoginErrors(errors) {
  if (errors[USERNAME_KEY]) {
    document.getElementById("errorUser").textContent = errors[USERNAME_KEY];
  }
  if (errors[PASS_KEY]) {
    document.getElementById("errorPass").textContent = errors[PASS_KEY];
  }
  return errors;
}
