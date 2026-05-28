interface Props {
  eyebrow: string;
  title: string;
}
export function Header({ eyebrow, title }: Props) {
  return (
    <div className="space-y-3">
      <p className=" text-[11px] uppercase tracking-[0.22em] text-(--color-accent) font-medium ">
        {" "}
        {eyebrow}{" "}
      </p>
      <h2 className=" text-3xl md:text-5xl tracking-[-0.06em] leading-[1.05] text-white max-w-3xl ">
        {" "}
        {title}{" "}
      </h2>
    </div>
  );
}
