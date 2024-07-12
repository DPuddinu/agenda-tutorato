import { LOGGEDUSER_KEY } from "../lib/common.js";

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location = "../../src/login.html";
    sessionStorage.removeItem(LOGGEDUSER_KEY);
  });
}