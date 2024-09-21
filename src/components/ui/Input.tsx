"use client";

import { Dispatch, SetStateAction } from "react";
import { FormError } from "../Message";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors?: { [key: string]: string[] };
  setErrors?: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
};

export function Input({
  id,
  label,
  type = "text",
  disabled = false,
  required = false,
  errors,
  setErrors,
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${errors?.[id] && errors?.[id].length > 0 ? "border-rose-400 focus:border-rose-400" : "border-slate-300 focus:border-slate-300"}`}
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        placeholder=""
        disabled={disabled}
        required={required}
        onChange={() => setErrors?.({ ...errors, [id]: [] })}
      />

      <label
        htmlFor={id}
        className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-3 transform cursor-text duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75`}
      >
        {label}
      </label>

      {errors?.[id] && errors?.[id].length > 0 && (
        <FormError message={errors?.[id][0]} />
      )}
    </div>
  );
}
