import { Ban } from "lucide-react";

type ErrorBoxProps = {
  title: string;
  message?: string;
};

export function ErrorBox({ title, message }: ErrorBoxProps) {
  return (
    <div className="mb-4 mt-72 flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4 rounded bg-rose-500 p-2 text-xl text-white">
        {title}
      </div>
      <div>{message}</div>
    </div>
  );
}
