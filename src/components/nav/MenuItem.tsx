import { ReactNode } from "react";

type MenuItemProps = {
  children: ReactNode;
  onClick: () => void;
};

export function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 transition hover:bg-neutral-100"
    >
      {children}
    </div>
  );
}
