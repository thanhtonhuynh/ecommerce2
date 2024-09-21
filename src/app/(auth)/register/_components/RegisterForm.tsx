"use client";

import { createUser } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { AiOutlineGoogle } from "react-icons/ai";

export function RegisterForm() {
  const [result, action] = useFormState(createUser, {});

  return (
    <>
      <Heading title="Sign Up" />

      <Button
        outline
        Icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      >
        Sign Up with Google
      </Button>

      <hr className="h-px w-full bg-slate-300" />

      <form action={action} className="flex w-full flex-col gap-4">
        {result.error && <div className="text-red-500">{result.error}</div>}
        {result.success && (
          <div className="text-green-500">{result.success}</div>
        )}

        <Input id="name" label="Name" required />
        {result.fieldErrors?.name && (
          <div className="text-red-500">{result.fieldErrors.name}</div>
        )}

        <Input id="email" label="Email" required />
        {result.fieldErrors?.email && (
          <div className="text-red-500">{result.fieldErrors.email[0]}</div>
        )}

        <Input id="password" label="Password" type="password" required />
        {result.fieldErrors?.password && (
          <div className="text-red-500">{result.fieldErrors.password}</div>
        )}

        <SubmitButton />
      </form>

      <p className="text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="underline">
          Log In
        </Link>
      </p>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Signing up..." : "Sign Up"}
    </Button>
  );
}
