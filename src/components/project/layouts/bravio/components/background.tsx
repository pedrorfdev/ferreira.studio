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
          scale-[1.02]
        "
      />

      <div
        className="
          absolute inset-0
          bg-black/35
        "
      />

      <div
        className="
          absolute inset-0
          bg-linear-to-t
          from-(--color-bg-primary)
          via-transparent
          to-transparent
        "
      />

      <div
        className="
          absolute inset-0
          bg-linear-to-r
          from-black/25
          via-transparent
          to-black/10
        "
      />
    </div>
  );
}
