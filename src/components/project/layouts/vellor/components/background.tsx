interface Props {
  image: string;
}

export function Background({ image }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={image}
        alt=""
        className="
          absolute inset-0
          w-full h-full
          object-cover
        "
      />

      <div
        className="
          absolute inset-0
          bg-linear-to-b
          from-black/15
          via-black/25
          to-(--color-bg-primary)
        "
      />
    </div>
  );
}
