"use client";

import { IconType } from "react-icons";

type ActionButtonProps = {
  icon: IconType;
  // onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick: () => void;
  disabled?: boolean;
};

export function ActionButton({
  icon: Icon,
  onClick,
  disabled,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[30px] w-[40px] cursor-pointer items-center justify-center rounded border border-slate-400 text-slate-700 ${disabled && "cursor-not-allowed opacity-50"}`}
    >
      <Icon size={18} />
    </button>
  );
}
