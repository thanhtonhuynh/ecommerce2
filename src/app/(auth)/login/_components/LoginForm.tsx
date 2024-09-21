"use client";

import { credentialsLogin } from "@/app/(auth)/_actions";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { AiOutlineGoogle } from "react-icons/ai";

export function LoginForm() {
  const [data, action] = useFormState(credentialsLogin, {});

  return (
    <>
      <Heading title="Log In" />

      <Button
        outline
        Icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      >
        Continue with Google
      </Button>

      <hr className="h-px w-full bg-slate-300" />

      <form action={action} className="flex w-full flex-col gap-4">
        {data.error && <p className="text-red-500">{data.error}</p>}

        <Input id="email" label="Email" required />

        <Input id="password" label="Password" type="password" required />

        <SubmitButton />
      </form>

      <p className="text-sm">
        Don't have an account?{" "}
        <Link href={"/register"} className="underline">
          Sign Up
        </Link>
      </p>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
}
