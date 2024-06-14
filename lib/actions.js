"use server";

import { redirect } from "next/navigation";
import { hashUserPassword, verifyPassword } from "./hash";
import createUser, { getUserByEmail } from "./user";
import { createAuthSession, destroyAuthSession } from "./auth";

export async function Signup(prevState, formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  let errors = {};
  if (!email.includes("@")) {
    errors.email = "Email is required.";
  }
  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (Object.keys(errors).length) {
    return { errors };
  }
  const hashedPassword = hashUserPassword(password);
  try {
    const userId = await createUser(email, hashedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: { email: "Email already in use." } };
    }
    throw error;
  }
}

export async function Login(prevState, formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { errors: { email: "Invalid email or password." } };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return { errors: { password: "Invalid email or password." } };
  }
  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function Auth(mode, prevState, formdata) {
  if (mode === "login") {
    return Login(prevState, formdata);
  }
  return Signup(prevState, formdata);
}

export async function Logout() {
  await destroyAuthSession();
  redirect("/");
}
