interface Props {
  image?: string;
}
export function Background({ image }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {" "}
      {/* image */}{" "}
      {image && (
        <div
          className=" absolute inset-0 bg-cover bg-center opacity-[0.86]"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}{" "}
      {/* overlays */} <div className="absolute inset-0 bg-(--color-bg-primary)/20" />{" "}
      <div className="absolute inset-0 bg-linear-to-b from-(--color-bg-primary)/10 via-(--color-bg-primary)/30 to-(--color-bg-primary)/80" />{" "}
    </div>
  );
}
