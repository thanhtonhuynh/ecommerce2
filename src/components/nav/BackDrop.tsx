type BackDropProps = {
  onClick: () => void;
};

export function BackDrop({ onClick }: BackDropProps) {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 z-20 h-screen w-screen bg-slate-200 opacity-50"
    ></div>
  );
}
