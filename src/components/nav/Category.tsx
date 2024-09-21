"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

type CategoryProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

export function Category({ label, icon: Icon, selected }: CategoryProps) {
  const router = useRouter();
  const params = useSearchParams();

  function handleClick() {
    if (label === "All") {
      router.push("/");
    } else {
      const currentQuery = Object.fromEntries(params);

      const updatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = new URLSearchParams(updatedQuery).toString();
      router.push(`/?${url}`);
    }
  }
  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer items-center justify-center gap-1 border-b-2 p-2 text-center transition hover:text-slate-800 ${selected ? "border-b-slate-800 text-slate-800" : "border-transparent text-slate-500"}`}
    >
      <Icon size={20} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
