"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function SearchBar() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const params = useSearchParams();

  function formAction(formData: FormData) {
    const searchTerm = formData.get("searchTerm") as string;
    if (!searchTerm) return;

    const currentQuery = Object.fromEntries(params);

    const updatedQuery = {
      ...currentQuery,
      searchTerm,
    };

    const url = new URLSearchParams(updatedQuery).toString();
    router.push(`/?${url}`);

    formRef.current?.reset();
  }
  return (
    <form
      ref={formRef}
      action={formAction}
      className="relative flex items-center"
    >
      <Search size={20} className="absolute left-2 text-slate-800" />

      <input
        autoComplete="off"
        type="text"
        name="searchTerm"
        placeholder="Explore ESHOP"
        className="w-80 rounded-l-md border-y border-l border-gray-300 p-2 pl-8 text-slate-800 focus:outline-none"
      />

      <button
        type="submit"
        className="rounded-r-md border bg-slate-100 p-2.5 text-sm text-slate-800 hover:opacity-80"
      >
        Search
      </button>
    </form>
  );
}
