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
          className=" absolute inset-0 bg-cover bg-center opacity-[0.66]"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
    </div>
  );
}
