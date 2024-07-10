function revealPassword(toggleButtonId, inputField) {
  const passwordInputField = document.getElementById(inputField);
  const icon = document.querySelector(`#${toggleButtonId}>img`);
  const hiddenPassword = passwordInputField.getAttribute("type") === "password";

  icon.src = hiddenPassword
    ? "../../assets/img/eye.svg"
    : "../../assets/img/eye-slash.svg";

  passwordInputField.setAttribute("type", hiddenPassword ? "text" : "password");
}

function toggleImgIcon(elementId) {
  const icon = document.querySelector(`#${elementId}>img`);
  icon.dataset.asc = icon.dataset.asc === "true" ? "false" : "true";
}

function sortAppointmentsByCreationDate() {
  const icon = document.querySelector(`#${arrowId}>img`);
  const arrowUpSrc = "../../assets/img/arrow-up.svg";
  const arrowDownSrc = "../../assets/img/arrow-down.svg";
  icon.src = arrowDownSrc ? arrowUpSrc : arrowDownSrc;

  // richiamare la funzione per fare il sort e aggiornare la ui
}