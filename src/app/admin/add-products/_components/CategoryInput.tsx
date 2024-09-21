"use client";

import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

type CategoryInputProps = {
  id: string;
  selected?: boolean;
  label: string;
  icon: IconType;
  errors?: { [key: string]: string[] };
  setErrors?: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
  onSelect: () => void;
};

export function CategoryInput({
  id,
  selected,
  label,
  icon: Icon,
  errors,
  setErrors,
  onSelect,
}: CategoryInputProps) {
  return (
    <div
      className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition hover:border-slate-500 ${selected ? "border-slate-500" : "border-slate-200"}`}
      onClick={() => {
        onSelect();
        setErrors?.({ ...errors, category: [] });
      }}
    >
      <input
        type="radio"
        name="category"
        id={id}
        value={label}
        checked={selected}
        className="hidden"
        onChange={onSelect}
      />
      <Icon size={30} />
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
    </div>
  );
}
