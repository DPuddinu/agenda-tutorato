import { createAppointment, deleteAppointment } from "./crud-appointment.js";

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (window.confirm("Do you really want to delete your appointment?")) {
        const id = button.dataset.row;
        deleteAppointment(id);
        const appointment = document.getElementById(id);
        appointment.remove();
      }
    });
  });

});
