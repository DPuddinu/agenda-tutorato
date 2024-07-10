import { Appointment } from "./models/appointment.js";
import { generateId, APPOINTMENTS_KEY } from "./common.js";

export function getAppointments() {
  return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
}

export function getAppointmentById(id) {
  return getAppointments().find((appointment) => appointment.id === id);
}

export function createAppointment(appointment) {
  const appointments = getAppointments();
  const id = generateId();
  const newAppointment = new Appointment({
    ...appointment,
    id,
    creationDate: new Date(),
    updateDate: new Date(),
  });
  appointments.push(newAppointment);
  saveAppointments(appointments);
  return newAppointment;
}

export function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function updateAppointment(updatedAppointment) {
  const appointments = getAppointments();
  saveAppointments(
    appointments.map((appointment) =>
      appointment.id === updatedAppointment.id
        ? {
            ...updatedAppointment,
            updateDate: new Date(),
          }
        : appointment
    )
  );
}

export function deleteAppointment(id) {
  const appointments = getAppointments();
  saveAppointments(appointments.filter((appointment) => appointment.id !== id));
}
