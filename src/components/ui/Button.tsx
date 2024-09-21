"use client";

import { MouseEvent, ReactNode } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  Icon?: IconType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  disabled,
  outline,
  small,
  custom,
  Icon,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-md border-slate-700 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${outline ? "bg-white text-slate-700" : "bg-slate-900 text-white"} ${
        small
          ? "border px-2 py-1 text-sm font-light"
          : "text-md border-2 px-4 py-3 font-semibold"
      } `}
    >
      {Icon && <Icon size={24} />}
      {children}
    </button>
  );
}
