import { deleteAppointment, createAppointment } from "./crud-appointments.js";
import { Appointment } from "./models/appointment.js";
import {
  LOGGEDUSER_KEY,
  DESCRIPTION_KEY,
  CATEGORY_KEY,
  DUEDATE_KEY,
  APPOINTMENTS_KEY,
} from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    setDeleteRowBtn(button);
  });
  document.getElementById("dialog").addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = getAppointmentPayload();
    const errors = validatePayload(payload);
    resetPayloadErrors();

    if (!!Object.keys(errors).length) {
      setPayloadErrors(errors);
    } else {
      const appointment = createAppointment(payload);

      addAppointmentRow(appointment);
      document.getElementById("dialog").close();
    }
  });
  document.getElementById("dialog").addEventListener("reset", () => {
    resetPayloadErrors();
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

export function addAppointmentRow(appointment) {
  const { id, creationDate, description, category } = appointment;
  const row = document.createElement("tr");
  row.id = id;

  const dateCell = document.createElement("td");
  dateCell.textContent = creationDate.toDateString();

  const appointmentCell = document.createElement("td");
  appointmentCell.textContent = description;

  const categoryCell = document.createElement("td");
  categoryCell.textContent = category;

  const completedCell = document.createElement("td");
  const completed = document.createElement("input");
  completed.type = "checkbox";
  completed.classList.add("checkmark");
  completed.name = "checkbox";
  completed.checked = !!appointment.completionDate;
  completedCell.appendChild(completed);

  const editCell = document.createElement("td");
  const editButton = document.createElement("button");
  editButton.setAttribute("data-row", id);
  editButton.classList.add("buttons", "edit-btn");
  const pencilIcon = document.createElement("img");
  pencilIcon.src = "../assets/img/icons/pencil.svg";
  editButton.appendChild(pencilIcon);
  editCell.appendChild(editButton);
  // setEditRowBtn(editButton);

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-row", id);
  deleteButton.classList.add("buttons", "delete-btn");
  const trashCanIcon = document.createElement("img");
  trashCanIcon.src = "../assets/img/icons/trash-can.svg";
  deleteButton.appendChild(trashCanIcon);
  deleteCell.appendChild(deleteButton);
  setDeleteRowBtn(deleteButton);

  row.appendChild(dateCell);
  row.appendChild(appointmentCell);
  row.appendChild(categoryCell);
  row.appendChild(completedCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);

  document.getElementById("appointmentContainer").appendChild(row);
}

export function getAppointmentPayload() {
  return new Appointment({
    userId: sessionStorage.getItem(LOGGEDUSER_KEY),
    description: document.getElementById(DESCRIPTION_KEY).value,
    dueDate: new Date(document.getElementById(DUEDATE_KEY).value),
    category: document.getElementById(CATEGORY_KEY).value,
    completionDate: null,
  });
}

function validatePayload(appointment) {
  let errors = {};
  const { description, category } = appointment;
  if (!description) errors[DESCRIPTION_KEY] = "The description is required!";
  if (description.length > 40 && description.length < 4)
    errors[DESCRIPTION_KEY] =
      "The description must be between 4 and 40 characters!";
  if (!category) errors[CATEGORY_KEY] = "The category is required!";
  return errors;
}

function setPayloadErrors(errors) {
  if (errors[DESCRIPTION_KEY]) {
    document.getElementById("errorDescription").textContent =
      errors[DESCRIPTION_KEY];
  }
  if (errors[CATEGORY_KEY]) {
    document.getElementById("errorCategory").textContent = errors[CATEGORY_KEY];
  }
  return errors;
}

function resetPayloadErrors() {
  document.getElementById("errorDescription").textContent = "";
  document.getElementById("errorCategory").textContent = "";
}

function clearAppointmentRows() {
  const table = document.getElementById("appointmentContainer");
  const rows = table.getElementsByTagName("tr");
  
  while (rows.length > 1) {
    table.deleteRow(1);
  }
}

function updateUI(appointmentsList) {
  clearAppointmentRows();
  appointmentsList.forEach((appointment) => {
    addAppointmentRow(appointment);
  });
}
