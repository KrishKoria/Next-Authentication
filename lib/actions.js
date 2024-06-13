"use server";

import { redirect } from "next/navigation";
import { hashUserPassword } from "./hash";
import createUser from "./user";

export default async function Signup(prevState, formdata) {
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
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: { email: "Email already in use." } };
    }
    throw error;
  }
  redirect("/training");
}
