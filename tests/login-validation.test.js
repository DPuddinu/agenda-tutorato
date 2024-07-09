import { validateRegister, passwordRegex } from "../src/lib/auth.js";
import { generateId } from "../src/lib/common.js";
import { expect, test } from "vitest";

//Minimum eight characters, at least one letter, one number and one special character:

test("password min lenght should be 8", () => {
  expect(passwordRegex.test("dr55")).toBe(false);
});

test("password max lenght should be 15", () => {
  expect(passwordRegex.test("Drizzt3*2Do")).toBe(true);
});

test("password must contain special character", () => {
  expect(passwordRegex.test("Rr$h7hhjh")).toBe(true);
});

test("password must not contain only numbers & letters(a-z, A-Z)", () => {
  expect(passwordRegex.test("Rr78h7hhjh")).toBe(false);
});

test("password should contain special character, maiusc and number", () => {
  expect(passwordRegex.test("Dyjh47%B")).toBe(true);
});

test("password must not contain only letters", () => {
  expect(passwordRegex.test("Dyjh6fg%Bk")).toBe(true);
});

test("some special characters aren't included (€, £, +, ', -, point, comma, :, ;, blankspace, _, /, |, =, ^, à, è, ì, ò, ù, ç, é, °, <>, >, (), [], {})", () => {
  expect(passwordRegex.test("S=fg£$4bH")).toBe(false);
});

test("password must contain upper case letters", () => {
  expect(passwordRegex.test("ld0$rfkhjh")).toBe(false);
});

test("password shouldn't be null/empty", () => {
  expect(passwordRegex.test("")).toBe(false);
});

test("verify generate id function", () => {
  expect(generateId()).greaterThanOrEqual(0);
  expect(generateId()).lessThanOrEqual(9999999);
});

test("verify register form validation", () => {
  const nameError = validateRegister({
    //name length
    name: "pi",
    password: "Aasd123@",
    passwordConfirm: "Aasd123@",
  });
  const missNameError = validateRegister({
    //missing name
    name: "",
    password: "Aasd123@",
    passwordConfirm: "Aasd123@",
  });
  const pwError = validateRegister({
    //missing password
    name: "pio&amedeo",
    password: "",
    passwordConfirm: "amedeo",
  });
  const confirmPwError = validateRegister({
    //confirm password !== password
    name: "pio",
    password: "Aasd123@",
    passwordConfirm: "Aasd123$",
  });
  const missConfirmPwError = validateRegister({
    //missing confirm password
    name: "pio",
    password: "Aasd123@",
    passwordConfirm: "",
  });

  expect(nameError.user).toEqual(
    "The username must be between 3 and 10 characters"
  );
  expect(missNameError.user).toEqual("Username required");
  expect(confirmPwError.confirm).toEqual(
    "Password don't match retype your Password" // a prescindere dall'errore in "passwordConfirm" stampa questo
  );
  expect(missConfirmPwError.confirm).toEqual("Confirm password required"); //conferma del commento della riga 47
});
