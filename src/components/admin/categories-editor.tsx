"use client";

import Image from "next/image";
import { useState } from "react";
import {
  adminInput,
  useContentSave,
} from "@/components/admin/content-editor-shared";
import type { CategoryContent } from "@/lib/site-content-types";

export function CategoriesEditor({ initial }: { initial: CategoryContent[] }) {
  const [items, setItems] = useState(initial);
  const { save, saving } = useContentSave("categories");

  function update(slug: string, patch: Partial<CategoryContent>) {
    setItems((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, ...patch } : item)),
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.slug}
            className="grid gap-3 rounded bg-white p-4 ring-1 ring-black/10 lg:grid-cols-[96px_220px_minmax(0,1fr)]"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded bg-[#f3f5f8]">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#6b7280]">
                /c/{item.slug}
              </p>
              <input
                value={item.name}
                onChange={(e) => update(item.slug, { name: e.target.value })}
                aria-label={`Name for ${item.slug}`}
                className={`mt-1 ${adminInput}`}
              />
            </div>
            <div className="space-y-2">
              <textarea
                value={item.blurb}
                onChange={(e) => update(item.slug, { blurb: e.target.value })}
                aria-label={`Description for ${item.slug}`}
                rows={2}
                className={adminInput}
              />
              <input
                value={item.image}
                onChange={(e) => update(item.slug, { image: e.target.value })}
                aria-label={`Image URL for ${item.slug}`}
                placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                className={adminInput}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 mt-5 flex flex-wrap gap-3 border-t border-[#d7e2ef] bg-[#eef2f7] py-4">
        <button
          onClick={() => save(items)}
          disabled={saving}
          className="press rounded-sm bg-[#005aa6] px-8 py-3 text-sm font-black uppercase text-white hover:bg-[#004277] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          onClick={() => save(null)}
          disabled={saving}
          className="press rounded-sm border-2 border-[#9ca3af] px-6 py-3 text-sm font-black uppercase text-[#4b5563] hover:border-[#005aa6] hover:text-[#005aa6] disabled:opacity-60"
        >
          Restore defaults
        </button>
        <p className="w-full text-xs font-semibold text-[#6b7280] sm:ml-auto sm:w-auto sm:self-center">
          Images must be hosted on res.cloudinary.com or images.unsplash.com.
        </p>
      </div>
    </div>
  );
}
