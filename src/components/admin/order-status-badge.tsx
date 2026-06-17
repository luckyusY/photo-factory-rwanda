const styles: Record<string, string> = {
  pending: "bg-[#f3f4f6] text-[#374151]",
  confirmed: "bg-[#dbeafe] text-[#1e40af]",
  shipped: "bg-[#fef3c7] text-[#92400e]",
  delivered: "bg-[#dcfce7] text-[#166534]",
  cancelled: "bg-[#fee2e2] text-[#b91c1c]",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${
        styles[status] ?? styles.pending
      }`}
    >
      {status}
    </span>
  );
}
