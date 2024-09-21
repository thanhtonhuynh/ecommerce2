"use client";

import { Dispatch, SetStateAction } from "react";
import { FormError } from "../Message";

type CheckboxProps = {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  errors?: { [key: string]: string[] };
  setErrors?: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
};

export function Checkbox({
  id,
  label,
  disabled = false,
  required = false,
  errors,
  setErrors,
}: CheckboxProps) {
  return (
    <div className="flex w-full flex-row items-center gap-2">
      <input
        className={`cursor-pointer`}
        type="checkbox"
        id={id}
        name={id}
        placeholder=""
        disabled={disabled}
        required={required}
        onChange={() => setErrors?.({ ...errors, [id]: [] })}
      />

      <label htmlFor={id} className={`cursor-pointer font-medium`}>
        {label}
      </label>

      {errors?.[id] && errors?.[id].length > 0 && (
        <FormError message={errors?.[id][0]} />
      )}
    </div>
  );
}
