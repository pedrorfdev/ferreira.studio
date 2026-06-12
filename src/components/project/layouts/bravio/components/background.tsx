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
    </div>
  );
}
