"use server";
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

  const userId = await createUser(email, password);
}
