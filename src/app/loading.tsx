export default function Loading() {
  return (
    <div className="fixed inset-0 z-[220] grid place-items-center bg-white/55 backdrop-blur-[2px]">
      <div className="h-12 w-12 rounded-full border-4 border-[#d7e7f7] border-t-[#005098] shadow-sm blur-[0.15px] animate-spin" />
    </div>
  );
}
