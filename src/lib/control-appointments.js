import { deleteAppointment } from "./crud-appointments.js";

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    setDeleteRowBtn(button);
  });
});

function setDeleteRowBtn(btn) {
  btn.addEventListener("click", () => {
    if (window.confirm("Do you really want to delete your appointment?")) {
      const id = btn.dataset.row;
      deleteAppointment(id);
      const appointment = document.getElementById(id);
      appointment.remove();
    }
  });
}
