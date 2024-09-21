"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function GoBackButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`${className} mb-8 flex w-fit items-center justify-center gap-1 rounded bg-slate-800 p-2 text-sm text-white`}
    >
      <ArrowLeft size={15} />
      {children}
    </button>
  );
}
