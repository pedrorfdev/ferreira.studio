export function GlowBackground() {
  return (
    <>
      {/* cyan */}
      <div className="absolute top-[-120px] left-[15%] w-[420px] h-[420px] rounded-full blur-[120px] bg-cyan-400/20 pointer-events-none" />

      {/* yellow */}
      <div className="absolute right-[10%] top-[20%] w-[320px] h-[320px] rounded-full blur-[100px] bg-yellow-300/10 pointer-events-none" />
    </>
  );
}
