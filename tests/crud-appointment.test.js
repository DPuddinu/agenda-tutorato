import { Appointment } from "../src/lib/models/appointment.js";
import { expect, test } from "vitest";
import { generateId } from "../src/lib/common.js";
import {
  getAppointments,
  getAppointmentById,
  saveAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointment,
} from "../src/lib/crud-appointments.js";

// Test for the createAppointment function
test("createAppointment should create a new appointment", () => {
  const id = generateId();
  const userId = "testUser";
  const description = "Test appointment";
  const creationDate = new Date();
  const updateDate = new Date();
  const completionDate = null;
  const dueDate = null;
  const category = "Test category";
  const appointment = new Appointment({
    id,
    userId,
    description,
    creationDate,
    updateDate,
    completionDate,
    dueDate,
    category,
  });
  createAppointment(appointment);
  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment).toBeTypeOf("object");
  expect(appointment).not.toBe(null);

  const appointments = getAppointments();
  expect(appointments).toBeTypeOf("object");

  const found = appointments.find((app) => app.id === id);
  expect(found).toBeTruthy();
  expect(found).toBeTypeOf("object");
  expect(found).not.toBeNull;
});

// Test for the updateAppointment function
test("updateAppointment should update an existing appointment", () => {
  const id = generateId();
  const userId = "testUser";
  const description = "Test appointment";
  const creationDate = new Date();
  const updateDate = new Date();
  const completionDate = null;
  const dueDate = null;
  const category = "Test category";
  const appointment = new Appointment({
    id,
    userId,
    description,
    creationDate,
    updateDate,
    completionDate,
    dueDate,
    category,
  });
  createAppointment(appointment);

  updateAppointment({
    ...appointment,
    description: "new description",
    category: "test",
  });

  const newUpdatedAppointment = getAppointmentById(id);

  expect(newUpdatedAppointment).not.toBe(null);
  expect(newUpdatedAppointment.description).toBe("new description");
  expect(newUpdatedAppointment.category).toBe("test");
});

// Test for the deleteAppointment function
test("deleteAppointment should delete an appointment toBe(null)", () => {
  const id = generateId();
  const userId = "testUser";
  const description = "Test appointment";
  const creationDate = new Date();
  const updateDate = new Date();
  const completionDate = null;
  const dueDate = null;
  const category = "Test category";
  const appointment = new Appointment({
    id,
    userId,
    description,
    creationDate,
    updateDate,
    completionDate,
    dueDate,
    category,
  });
  createAppointment(appointment);

  const newUpdatedAppointment = getAppointmentById(id);

  expect(newUpdatedAppointment).not.toBe(null);
  expect(newUpdatedAppointment.id).toBe(id);

  deleteAppointment(newUpdatedAppointment.id);
  const deletedAppointment = getAppointmentById(id);
  expect(deletedAppointment).toBe(undefined);
});
