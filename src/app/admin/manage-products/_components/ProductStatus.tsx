import { IconType } from "react-icons";

type ProductStatusProps = {
  text: string;
  icon: IconType;
  color: string;
};

export function ProductStatus({ text, icon: Icon, color }: ProductStatusProps) {
  return (
    <div
      className={`${color} flex items-center gap-1 rounded px-1 font-medium`}
    >
      {text} <Icon size={15} />
    </div>
  );
}
