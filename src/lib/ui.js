function revealPassword(toggleButtonId, inputField) {
  const passwordInputField = document.getElementById(inputField);
  const icon = document.querySelector(`#${toggleButtonId}>img`);
  const hiddenPassword = passwordInputField.getAttribute("type") === "password";
  

  icon.src = hiddenPassword
    ? "../../assets/img/eye.svg"
    : "../../assets/img/eye-slash.svg";

  passwordInputField.setAttribute("type", hiddenPassword ? "text" : "password");
}
