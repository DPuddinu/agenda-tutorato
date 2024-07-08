import { Appointment } from "./models/appointment.js";
import { generateId } from "./common.js";

const APPOINTMENTS_KEY = "appointments";

// User-generated data extracted from HTML page
// const DESCRIPTION_KEY = "description";
// const DUEDATE_KEY = "dueDate";
// const CATEGORY_KEY = "category";

export function getAppointments() {
  return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
}

export function createAppointment(appointment) {
  const appointments = getAppointments();
  const id = generateId();
  const newAppointment = new Appointment({ id, ...appointment });
  appointments.push(newAppointment);
  saveAppointments(appointments);
  return appointment;
}

export function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function updateAppointment(updatedAppointment) {
  const appointments = getAppointments();
  saveAppointments(
    appointments.map((appointment) =>
      appointment.id === updatedAppointment.id
        ? updatedAppointment
        : appointment
    )
  );
}

export function deleteAppointment(id) {
  const appointments = getAppointments();
  saveAppointments(appointments.filter((appointment) => appointment.id !== id));
}
