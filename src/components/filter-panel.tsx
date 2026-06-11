"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function FilterPanel({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(active);

  return (
    <div className="space-y-3 lg:space-y-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded border border-[#cfd8e3] bg-white px-4 py-2.5 text-sm font-black lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters{active ? " · active" : ""}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#6b7280] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "block" : "hidden"} space-y-4 lg:!block`}>
        {children}
      </div>
    </div>
  );
}
