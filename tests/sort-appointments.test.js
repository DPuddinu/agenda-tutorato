import { expect, test } from "vitest";
import { Appointment } from "../src/lib/models/appointment.js";
import {
  sortAppointmentsByCreationDate,
  sortAppointmentsByCategory,
} from "../src/lib/sort-appointment.js";

const appointments = [
  new Appointment({
    id: 22,
    userId: 123,
    description: "asdf",
    creationDate: new Date(2024, 3, 10),
    updateDate: new Date(2024, 3, 10),
    completionDate: null,
    dueDate: null,
    category: "school",
  }),
  new Appointment({
    id: 23,
    userId: 123,
    description: "asdf",
    creationDate: new Date(2024, 3, 20),
    updateDate: new Date(2024, 3, 10),
    completionDate: null,
    dueDate: null,
    category: "sport",
  }),
  new Appointment({
    id: 24,
    userId: 123,
    description: "asdf",
    creationDate: new Date(2024, 3, 11),
    updateDate: new Date(2024, 3, 10),
    completionDate: null,
    dueDate: null,
    category: "hobby",
  }),
  new Appointment({
    id: 25,
    userId: 123,
    description: "asdf",
    creationDate: new Date(2024, 3, 28),
    updateDate: new Date(2024, 3, 10),
    completionDate: null,
    dueDate: null,
    category: "job",
  }),
];

test("appointments sort by creation date, ascending", () => {
  const sortedAppointments = sortAppointmentsByCreationDate(appointments, true);
  const sortedId = [22, 24, 23, 25];
  sortedId.forEach((id, i) => {
    expect(id).toEqual(sortedAppointments[i].id);
  });
});

test("appointments sort by creation date, descending", () => {
  const sortedAppointments = sortAppointmentsByCreationDate(
    appointments,
    false
  );
  const sortedId = [25, 23, 24, 22];
  sortedId.forEach((id, i) => {
    expect(id).toEqual(sortedAppointments[i].id);
  });
});

test("appointments sort by category, ascending", () => {
  const sortedAppointments = sortAppointmentsByCategory(appointments, true);
  const sortedId = [24, 25, 22, 23];
  sortedId.forEach((id, i) => {
    expect(id).toEqual(sortedAppointments[i].id);
  });
});

test("appointments sort by category, descending", () => {
  const sortedAppointments = sortAppointmentsByCategory(appointments, false);
  const sortedId = [23, 22, 25, 24];
  sortedId.forEach((id, i) => {
    expect(id).toEqual(sortedAppointments[i].id);
  });
});
