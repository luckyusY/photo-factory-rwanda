"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  adminInput,
  useContentSave,
} from "@/components/admin/content-editor-shared";
import type { HeroSlide } from "@/lib/site-content-types";

const emptySlide: HeroSlide = {
  brand: "",
  title: "",
  body: "",
  cta: "Shop now",
  href: "/deals",
  image: "",
  tone: "dark",
};

export function HeroEditor({ initial }: { initial: HeroSlide[] }) {
  const [slides, setSlides] = useState(initial);
  const { save, saving } = useContentSave("hero");

  function update(index: number, patch: Partial<HeroSlide>) {
    setSlides((prev) =>
      prev.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setSlides((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setSlides((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div key={index} className="rounded bg-white p-4 ring-1 ring-black/10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e7eb] pb-3">
              <p className="text-sm font-black">
                Slide {index + 1}
                {slide.title ? ` — ${slide.title}` : ""}
              </p>
              <div className="flex gap-1">
                <IconButton
                  label="Move up"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                >
                  <ArrowUp size={16} />
                </IconButton>
                <IconButton
                  label="Move down"
                  onClick={() => move(index, 1)}
                  disabled={index === slides.length - 1}
                >
                  <ArrowDown size={16} />
                </IconButton>
                <IconButton label="Delete slide" onClick={() => remove(index)} danger>
                  <Trash2 size={16} />
                </IconButton>
              </div>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-[140px_minmax(0,1fr)]">
              <div className="relative h-32 w-full overflow-hidden rounded bg-[#15110a] lg:h-full lg:min-h-36">
                {slide.image && (
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Badge (optional, e.g. New)">
                  <input
                    value={slide.label ?? ""}
                    onChange={(e) => update(index, { label: e.target.value })}
                    className={adminInput}
                  />
                </Field>
                <Field label="Brand / kicker *">
                  <input
                    value={slide.brand}
                    onChange={(e) => update(index, { brand: e.target.value })}
                    className={adminInput}
                  />
                </Field>
                <Field label="Title *" full>
                  <input
                    value={slide.title}
                    onChange={(e) => update(index, { title: e.target.value })}
                    className={adminInput}
                  />
                </Field>
                <Field label="Body text" full>
                  <textarea
                    value={slide.body}
                    onChange={(e) => update(index, { body: e.target.value })}
                    rows={2}
                    className={adminInput}
                  />
                </Field>
                <Field label="Price line (optional)">
                  <input
                    value={slide.priceLine ?? ""}
                    onChange={(e) => update(index, { priceLine: e.target.value })}
                    className={adminInput}
                  />
                </Field>
                <Field label="Button text">
                  <input
                    value={slide.cta}
                    onChange={(e) => update(index, { cta: e.target.value })}
                    className={adminInput}
                  />
                </Field>
                <Field label="Button link (e.g. /c/cameras)">
                  <input
                    value={slide.href}
                    onChange={(e) => update(index, { href: e.target.value })}
                    className={adminInput}
                  />
                </Field>
                <Field label="Text color theme">
                  <select
                    value={slide.tone}
                    onChange={(e) =>
                      update(index, { tone: e.target.value as "light" | "dark" })
                    }
                    className={adminInput}
                  >
                    <option value="dark">White text (dark image)</option>
                    <option value="light">Black text (light image)</option>
                  </select>
                </Field>
                <Field label="Desktop image URL *" full>
                  <input
                    value={slide.image}
                    onChange={(e) => update(index, { image: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className={adminInput}
                  />
                </Field>
                <Field label="Mobile image URL (optional)" full>
                  <input
                    value={slide.mobileImage ?? ""}
                    onChange={(e) => update(index, { mobileImage: e.target.value })}
                    className={adminInput}
                  />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSlides((prev) => [...prev, { ...emptySlide }])}
        className="press mt-4 flex items-center gap-2 rounded-sm border-2 border-dashed border-[#9ca3af] px-5 py-3 text-sm font-black uppercase text-[#4b5563] hover:border-[#8b641e] hover:text-[#8b641e]"
      >
        <Plus size={16} />
        Add slide
      </button>

      <div className="sticky bottom-0 mt-5 flex flex-wrap gap-3 border-t border-[#e7ddc7] bg-[#f6f2ea] py-4">
        <button
          onClick={() => save(slides)}
          disabled={saving}
          className="press rounded-sm bg-[#8b641e] px-8 py-3 text-sm font-black uppercase text-white hover:bg-[#15110a] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          onClick={() => save(null)}
          disabled={saving}
          className="press rounded-sm border-2 border-[#9ca3af] px-6 py-3 text-sm font-black uppercase text-[#4b5563] hover:border-[#8b641e] hover:text-[#8b641e] disabled:opacity-60"
        >
          Restore defaults
        </button>
        <p className="w-full text-xs font-semibold text-[#6b7280] sm:ml-auto sm:w-auto sm:self-center">
          Slides need brand, title, and image. Images: res.cloudinary.com or
          images.unsplash.com.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block text-xs font-bold text-[#374151] ${full ? "sm:col-span-2" : ""}`}>
      {label}
      <span className="mt-1 block font-semibold">{children}</span>
    </label>
  );
}

function IconButton({
  label,
  onClick,
  disabled = false,
  danger = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-8 w-8 place-items-center rounded border disabled:opacity-30 ${
        danger
          ? "border-[#fca5a5] text-[#15110a] hover:bg-[#fef2f2]"
          : "border-[#e7ddc7] text-[#374151] hover:bg-[#f6f2ea]"
      }`}
    >
      {children}
    </button>
  );
}
