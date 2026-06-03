export function Background() {
  return (
    <>
      <div
        className="
          absolute
          inset-0
          bg-(--color-bg-primary)
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          w-[900px]
          h-[900px]

          rounded-full

          opacity-20
          blur-[180px]

          bg-(--color-pulso-primary)
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0D_75%)]
        "
      />
    </>
  );
}
