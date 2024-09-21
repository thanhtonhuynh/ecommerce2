import { ReactNode } from "react";

export function FormWrap({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-fit items-center justify-center pb-12 pt-12">
      <div className="flex w-full max-w-[650px] flex-col items-center gap-6 rounded-md p-4 shadow-xl shadow-slate-200 md:p-8">
        {children}
      </div>
    </div>
  );
}
