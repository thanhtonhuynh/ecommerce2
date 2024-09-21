type HeadingProps = {
  title: string;
  center?: boolean;
};

export function Heading({ title, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
}
