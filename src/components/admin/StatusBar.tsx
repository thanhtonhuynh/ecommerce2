import { ReactNode } from "react";
import { IconType } from "react-icons";

type StatusBarProps = {
  icon: IconType;
  color: string;
  children: ReactNode;
  bgColor?: string;
};

export function StatusBar({
  icon: Icon,
  color,
  children,
  bgColor,
}: StatusBarProps) {
  return (
    <div className={`${color} flex items-center gap-1 rounded ${bgColor} px-1`}>
      <Icon size={15} />
      {children}
    </div>
  );
}
