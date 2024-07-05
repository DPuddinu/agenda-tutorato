import {
  getCredentialRegister,
  validateRegister,
  register,
  setRegisterErrors,
} from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const credential = getCredentialRegister();
    const errors = validateRegister(credential);

    if (!!Object.keys(errors).length) {
      setRegisterErrors(errors);
    } else {
      register(credential);
      window.location = "./homepage.html";
    }
  });
});
