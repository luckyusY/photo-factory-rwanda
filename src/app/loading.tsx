export default function Loading() {
  return (
    <div className="fixed inset-0 z-[220] grid place-items-center bg-white/55 backdrop-blur-[2px]">
      <div className="h-12 w-12 rounded-full border-4 border-[#2a2113] border-t-[#ffcf57] shadow-sm blur-[0.15px] animate-spin" />
    </div>
  );
}
