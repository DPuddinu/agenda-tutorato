const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#showDialog");
const closeButton = document.querySelector("#closeDialog");

// "Show the dialog" button opens the dialog modally
showButton?.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton?.addEventListener("click", () => {
  dialog.close();
});
