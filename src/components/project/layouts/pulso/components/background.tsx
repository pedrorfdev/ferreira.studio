export function BackgroundTexture() {
  return (
    <div
      className="
        absolute
        inset-0
        opacity-20
        pointer-events-none
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-radial
        "
      />

      <div
        className="
          absolute
          inset-0
          backdrop-blur-[120px]
        "
      />
    </div>
  );
}
