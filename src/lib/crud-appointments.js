import { Appointment } from "./models/appointment.js";
import { generateId, APPOINTMENTS_KEY, LOGGEDUSER_KEY } from "./common.js";

export function getAppointments() {
  const parsed = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
  const allAppointments = parsed.map((appointment) => {
    return {
      ...appointment,
      userId: Number(appointment.userId),
      creationDate: new Date(appointment.creationDate),
      updateDate: new Date(appointment.updateDate),
      dueDate: appointment.dueDate ? new Date(appointment.dueDate) : undefined,
    };
  });
  const loggedUserId = Number(sessionStorage.getItem(LOGGEDUSER_KEY));
  const userAppointments = allAppointments.filter(
    (appointment) => appointment.userId === loggedUserId
  );
  return userAppointments;
}

export function getAppointmentById(id) {
  return getAppointments().find((appointment) => appointment.id === id);
}

export function createAppointment(appointment) {
  const loggedUserId = sessionStorage.getItem(LOGGEDUSER_KEY);
  if (!loggedUserId) return;

  const appointments = getAppointments();
  const id = generateId();
  const newAppointment = new Appointment({
    ...appointment,
    id,
    userId: Number(loggedUserId),
    creationDate: new Date(),
    updateDate: new Date(),
  });
  appointments.push(newAppointment);
  saveAppointments(appointments);
  return newAppointment;
}

export function saveAppointments(appointments) {
  const loggedUserId = sessionStorage.getItem(LOGGEDUSER_KEY);
  if (!loggedUserId) return;
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function updateAppointment(updatedAppointment) {
  const appointments = getAppointments();
  saveAppointments(
    appointments.map((appointment) =>
      Number(appointment.id) === updatedAppointment.id
        ? {
            ...updatedAppointment,
            updateDate: new Date(),
          }
        : appointment
    )
  );
}

export function deleteAppointment(id) {
  const numberId = Number(id);
  const appointments = getAppointments();
  saveAppointments(appointments.filter((appointment) => appointment.id !== Number(id)));
}
