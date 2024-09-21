"use server";

import { auth, signIn } from "@/auth";
import db from "@/_db/prisma";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, RegisterSchema } from "@/_schemas";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

export async function createUser(
  prevState: unknown,
  formData: FormData,
): Promise<{
  error?: string;
  success?: string;
  fieldErrors?: { [key: string]: string[] };
}> {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return { fieldErrors: validatedFields.error.formErrors.fieldErrors };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userExists = await db.user.findUnique({ where: { email } });
  if (userExists) {
    return { error: "User already exists" };
  }

  await db.user.create({
    data: {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.toLowerCase(),
      hashedPassword,
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });

  return { success: "User created!" };
}

export async function credentialsLogin(
  prevState: unknown,
  formData: FormData,
): Promise<{ error?: string }> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
}
