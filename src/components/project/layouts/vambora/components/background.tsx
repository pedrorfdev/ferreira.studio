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
      {/* overlays */} <div className="absolute inset-0 bg-black/20" />{" "}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/80" />{" "}
    </div>
  );
}
