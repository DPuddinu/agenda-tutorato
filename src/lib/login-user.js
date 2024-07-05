import {
  getCredentialLogin,
  validateLogin,
  login,
  setLoginErrors,
} from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const credential = getCredentialLogin();
    const errors = validateLogin(credential);

    if (!!Object.keys(errors).length) {
      setLoginErrors(errors);
    }

    const user = login(credential);
    if (user) {
      window.location = "./homepage.html";
    }
  });
});
