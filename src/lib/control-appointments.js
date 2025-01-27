import {
  deleteAppointment,
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
} from "./crud-appointments.js";
import { Appointment } from "./models/appointment.js";
import {
  LOGGEDUSER_KEY,
  DESCRIPTION_KEY,
  CATEGORY_KEY,
  DUEDATE_KEY,
  CURRENTAPPOINTMENTS_KEY,
} from "./common.js";
import {
  sortAppointmentsByCreationDate,
  sortAppointmentsByDueDate,
  sortAppointmentsByCategory,
} from "./sort-appointment.js";

let currentPage = 0;
const itemsPerPage = 10;
let paginatedAppointments = [];
let currentAppointment = [];
let currentSortType = null;
let currentSortDirection = true;
let selectedAppointment;

function paginateAppointments(appointments) {
  const pages = [];
  for (let i = 0; i < appointments.length; i += itemsPerPage) {
    pages.push(appointments.slice(i, i + itemsPerPage));
  }
  return pages;
}

function renderTable(appointments) {
  paginatedAppointments = paginateAppointments(appointments);
  clearAppointments();
  paginatedAppointments[currentPage]?.forEach((appointment) => {
    addAppointmentRow(appointment);
  });

  document.getElementById("previousButton").disabled = currentPage === 0;
  document.getElementById("nextButton").disabled =
    currentPage === paginatedAppointments.length - 1;
}

document.addEventListener("DOMContentLoaded", () => {
  sessionStorage.setItem(
    CURRENTAPPOINTMENTS_KEY,
    JSON.stringify(getAppointments())
  );
  currentAppointment = JSON.parse(
    sessionStorage.getItem(CURRENTAPPOINTMENTS_KEY)
  );

  if (!sessionStorage.getItem(LOGGEDUSER_KEY)) {
    window.location = "../../src/login.html";
  }
  document
    .getElementById("previousButton")
    .addEventListener("click", function () {
      if (currentPage > 0) {
        currentPage--;
        renderTable(currentAppointment);
      }
    });

  document.getElementById("nextButton").addEventListener("click", function () {
    if (currentPage < paginatedAppointments.length - 1) {
      currentPage++;
      renderTable(currentAppointment);
    }
  });
  const form = document.getElementById("editAppointmentForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = form.elements["edit-dialog-description"].value;
    const dueDate = new Date(form.elements["dueDate"].value);
    const category = form.elements["edit-dialog-category"].value;
    const updatedAppointment = {
      ...selectedAppointment,
      description,
      dueDate,
      category
    };
    const errors = validatePayload(updatedAppointment);
    resetPayloadErrors();
    if (!!Object.keys(errors).length) {
      setEditPayloadErrors(errors);
    } else {
      updateAppointment(updatedAppointment);
      document.getElementById("editDialog").close();
      e.target.reset();
      applyCurrentSort();
      renderTable(getAppointments());
    }
  });
  renderTable(currentAppointment);

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    setDeleteRowBtn(btn);
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
      document.getElementById("createForm").reset();
      document.getElementById("dialog").close();
      sessionStorage.setItem(
        CURRENTAPPOINTMENTS_KEY,
        JSON.stringify(getAppointments())
      );
      currentAppointment = JSON.parse(
        sessionStorage.getItem(CURRENTAPPOINTMENTS_KEY)
      );
      applyCurrentSort();
      renderTable(currentAppointment);
    }
  });

  document.getElementById("dialog").addEventListener("reset", () => {
    resetPayloadErrors();
  });

  const sortCreationDateBtn = document.querySelector("#creationDateBtn");
  sortCreationDateBtn.addEventListener("click", () => {
    currentSortType = "creationDate";
    currentSortDirection = !currentSortDirection;
    const sorted = sortAppointmentsByCreationDate(
      getAppointments(),
      currentSortDirection
    );
    sessionStorage.setItem(CURRENTAPPOINTMENTS_KEY, JSON.stringify(sorted));
    currentAppointment = sorted;
    renderTable(sorted);
  });

  const sortDueDateBtn = document.querySelector("#arrowDueDateBtn");
  sortDueDateBtn.addEventListener("click", () => {
    currentSortType = "dueDate";
    currentSortDirection = !currentSortDirection;
    const existDueDate = sortAppointmentsByDueDate(
      getAppointments().filter((appointment) => appointment.dueDate !== null),
      currentSortDirection
    );
    const notExistDueDate = getAppointments().filter(
      (appointment) => appointment.dueDate === null
    );
    const sorted = existDueDate.concat(notExistDueDate);
    sessionStorage.setItem(CURRENTAPPOINTMENTS_KEY, JSON.stringify(sorted));
    currentAppointment = sorted;
    renderTable(sorted);
  });

  const sortCategoriesBtn = document.querySelector("#arrowCategoryBtn");
  sortCategoriesBtn.addEventListener("click", () => {
    currentSortType = "category";
    currentSortDirection = !currentSortDirection;
    const sorted = sortAppointmentsByCategory(
      getAppointments(),
      currentSortDirection
    );
    sessionStorage.setItem(CURRENTAPPOINTMENTS_KEY, JSON.stringify(sorted));
    currentAppointment = sorted;
    renderTable(sorted);
  });
});

function setEditRowBtn(editBtn) {
  editBtn.addEventListener("click", () => {
    const editDialog = document.getElementById("editDialog");
    const id = Number(editBtn.dataset.row);
    const appointment = getAppointmentById(id);
    selectedAppointment = appointment;

    const { description, dueDate, category } = appointment;

    document.getElementById("edit-dialog-description").textContent =
      description;
    if (dueDate) {
      const date = dueDate.toISOString().substring(0, 10);
      const time = dueDate.toLocaleTimeString().substring(0, 5);
      document.getElementById("edit-dialog-dueDate").value = `${date}T${time}`;
    } else {
      document.getElementById("edit-dialog-dueDate").value = undefined;
    }
    document.getElementById("edit-dialog-category").value = category;
    editDialog.showModal();
  });
}

function setDeleteRowBtn(deleteBtn) {
  deleteBtn.addEventListener("click", deleteRowHandler, { once: true });
}

function deleteRowHandler(e) {
  e.preventDefault();
  if (window.confirm("Do you really want to delete your appointment?")) {
    const id = e.currentTarget.dataset.row;
    deleteAppointment(id);
    const appointment = document.getElementById(id);
    appointment?.remove();
    sessionStorage.setItem(
      CURRENTAPPOINTMENTS_KEY,
      JSON.stringify(getAppointments())
    );
    currentAppointment = getAppointments();
    applyCurrentSort();
    renderTable(currentAppointment);
  }
}

export function addAppointmentRow(appointment) {
  const { id, creationDate, description, category, dueDate } = appointment;
  let dueDateString;

  const row = document.createElement("tr");
  row.id = id;

  const creationDateCell = document.createElement("td");
  const creationDateString = new Date(creationDate);
  creationDateCell.textContent = creationDateString.toDateString();

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = description;

  const dueDateCell = document.createElement("td");
  dueDate ? (dueDateString = new Date(dueDate)) : (dueDateString = null);
  dueDateCell.textContent = dueDateString?.toDateString();

  const categoryCell = document.createElement("td");
  categoryCell.textContent = category;

  const completedCell = document.createElement("td");
  const completed = document.createElement("input");
  completed.type = "checkbox";
  completed.checked = !!appointment.completionDate;
  completedCell.appendChild(completed);
  checkState(completed, id);

  const editCell = document.createElement("td");
  const editButton = document.createElement("button");
  editButton.setAttribute("data-row", id);
  editButton.classList.add("buttons", "edit-btn");
  const pencilIcon = document.createElement("img");
  pencilIcon.src = "../assets/img/icons/pencil.svg";
  editButton.appendChild(pencilIcon);
  editCell.appendChild(editButton);
  setEditRowBtn(editButton);

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-row", id);
  deleteButton.classList.add("buttons", "delete-btn");
  const trashCanIcon = document.createElement("img");
  trashCanIcon.src = "../assets/img/icons/trash-can.svg";
  deleteButton.appendChild(trashCanIcon);
  deleteCell.appendChild(deleteButton);
  setDeleteRowBtn(deleteButton);

  row.appendChild(creationDateCell);
  row.appendChild(descriptionCell);
  row.appendChild(dueDateCell);
  row.appendChild(categoryCell);
  row.appendChild(completedCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);

  document.getElementById("table-appointment-body").appendChild(row);
  sessionStorage.setItem(
    CURRENTAPPOINTMENTS_KEY,
    JSON.stringify(getAppointments())
  );
}

export function getAppointmentPayload() {
  return new Appointment({
    userId: Number(sessionStorage.getItem(LOGGEDUSER_KEY)),
    description: document.getElementById(DESCRIPTION_KEY).value,
    dueDate: new Date(document.getElementById(DUEDATE_KEY).value),
    category: document.getElementById(CATEGORY_KEY).value,
    completionDate: null,
  });
}

function validatePayload(appointment) {
  let errors = {};
  const { description, category } = appointment;
  if (description.length > 40 || description.length < 4)
    errors[DESCRIPTION_KEY] =
      "The description must be between 4 and 40 characters!";
  if (!description) errors[DESCRIPTION_KEY] = "The description is required!";
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

function setEditPayloadErrors(errors) {
  if (errors[DESCRIPTION_KEY]) {
    document.getElementById("errorEditDescription").textContent =
      errors[DESCRIPTION_KEY];
  }
  return errors;
}
function resetPayloadErrors() {
  document.getElementById("errorDescription").textContent = "";
  document.getElementById("errorCategory").textContent = "";
}

function clearAppointments() {
  const tableBodySelector = "#table-appointment-body";
  document.querySelector(tableBodySelector)?.remove();
  const table = document.querySelector("#appointmentContainer");
  const tbody = document.createElement("tbody");
  tbody.id = "table-appointment-body";
  table.appendChild(tbody);
}

function checkState(checkbox, rowId) {
  checkbox.addEventListener("change", (e) => {
    const appointment = getAppointmentById(rowId);
    appointment.completionDate = e.target.checked ? new Date() : null;
    updateAppointment(appointment);
  });
}

function applyCurrentSort() {
  switch (currentSortType) {
    case "creationDate":
      currentAppointment = sortAppointmentsByCreationDate(
        currentAppointment,
        currentSortDirection
      );
      break;
    case "dueDate":
      const existDueDate = sortAppointmentsByDueDate(
        currentAppointment.filter(
          (appointment) => appointment.dueDate !== null
        ),
        currentSortDirection
      );
      const notExistDueDate = currentAppointment.filter(
        (appointment) => appointment.dueDate === null
      );
      currentAppointment = existDueDate.concat(notExistDueDate);
      break;
    case "category":
      currentAppointment = sortAppointmentsByCategory(
        currentAppointment,
        currentSortDirection
      );
      break;
  }
}
