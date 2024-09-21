import { CircleX } from "lucide-react";
import { OctagonAlert } from "lucide-react";

export function SuccessMessage({ message }: { message: string }) {
  return <div>SuccessMessage</div>;
}

export function FormError({ message }: { message: string | string[] }) {
  return (
    <div className="mt-2 flex items-center gap-2 rounded bg-red-500 p-2 text-xs font-normal text-white">
      <CircleX size={16} />
      {message}
    </div>
  );
}

export function FailureMessage({ message }: { message: string }) {
  return (
    <div className="flex w-fit items-center gap-2 rounded bg-rose-500 px-2 py-1 text-sm text-white">
      <OctagonAlert size={20} />
      {message}
    </div>
  );
}
