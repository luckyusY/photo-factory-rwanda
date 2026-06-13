"use client";

import {
  ArrowDown,
  ArrowUp,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  adminInput,
  useContentSave,
} from "@/components/admin/content-editor-shared";
import type { HeroSlide, PromoContent } from "@/lib/site-content-types";

const emptySlide: HeroSlide = {
  brand: "",
  title: "",
  body: "",
  cta: "Shop now",
  href: "/deals",
  image: "",
  mobileImage: "",
  tone: "dark",
};

export function HeroEditor({
  initial,
  initialPromos,
}: {
  initial: HeroSlide[];
  initialPromos: PromoContent[];
}) {
  const [slides, setSlides] = useState(initial);
  const [promos, setPromos] = useState(initialPromos);
  const heroSave = useContentSave("hero");
  const promoSave = useContentSave("promos");

  function update(index: number, patch: Partial<HeroSlide>) {
    setSlides((prev) =>
      prev.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)),
    );
  }

  function updatePromo(key: PromoContent["key"], patch: Partial<PromoContent>) {
    setPromos((prev) =>
      prev.map((promo) => (promo.key === key ? { ...promo, ...patch } : promo)),
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
    <div className="space-y-8">
      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">Homepage Slider</h2>
            <p className="mt-1 text-sm font-semibold text-[#6b7280]">
              Desktop images work best at 2400 x 670px. Mobile images work best
              at 720 x 560px.
            </p>
          </div>
          <button
            onClick={() => setSlides((prev) => [...prev, { ...emptySlide }])}
            className="press flex items-center gap-2 rounded-sm border-2 border-dashed border-[#9ca3af] px-5 py-3 text-sm font-black uppercase text-[#4b5563] hover:border-[#8b641e] hover:text-[#8b641e]"
          >
            <Plus size={16} />
            Add slide
          </button>
        </div>

        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div key={index} className="rounded bg-white p-4 ring-1 ring-black/10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e7eb] pb-3">
                <p className="text-sm font-black">
                  Slide {index + 1}
                  {slide.title ? ` - ${slide.title}` : ""}
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

              <div className="mt-4 grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
                <div className="space-y-3">
                  <PreviewBox
                    label="Desktop preview"
                    image={slide.image}
                    aspect="aspect-[24/7]"
                  />
                  <PreviewBox
                    label="Mobile preview"
                    image={slide.mobileImage || slide.image}
                    aspect="aspect-[9/7]"
                  />
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
                  <Field label="Text position">
                    <select
                      value={slide.copyPosition ?? "left"}
                      onChange={(e) =>
                        update(index, {
                          copyPosition:
                            e.target.value === "center" ? "center" : undefined,
                        })
                      }
                      className={adminInput}
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                    </select>
                  </Field>
                  <ImageField
                    label="Desktop image URL *"
                    value={slide.image}
                    folder="hero"
                    publicId={`slide-${index + 1}-desktop`}
                    width={2400}
                    height={670}
                    onChange={(image) => update(index, { image })}
                  />
                  <ImageField
                    label="Mobile image URL"
                    value={slide.mobileImage ?? ""}
                    folder="hero"
                    publicId={`slide-${index + 1}-mobile`}
                    width={720}
                    height={560}
                    onChange={(mobileImage) => update(index, { mobileImage })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <SaveBar
          saving={heroSave.saving}
          onSave={() => heroSave.save(slides)}
          onReset={() => heroSave.save(null)}
          note="Slides need brand, title, and desktop image."
        />
      </section>

      <section className="rounded bg-[#f6f2ea] p-4 ring-1 ring-[#e7ddc7]">
        <div className="mb-4">
          <h2 className="text-xl font-black">Promo Images Under Categories</h2>
          <p className="mt-1 text-sm font-semibold text-[#6b7280]">
            These are the Studio Upgrade, Gifts for Grads, and Wedding Season
            promo images on the homepage. Desktop: 1368 x 600px. Mobile: 720 x
            520px.
          </p>
        </div>

        <div className="grid gap-4">
          {promos.map((promo) => (
            <div key={promo.key} className="rounded bg-white p-4 ring-1 ring-black/10">
              <h3 className="text-sm font-black">{promo.name}</h3>
              <div className="mt-4 grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
                <div className="space-y-3">
                  <PreviewBox label="Desktop promo" image={promo.image} aspect="aspect-[16/7]" />
                  <PreviewBox
                    label="Mobile promo"
                    image={promo.mobileImage}
                    aspect="aspect-[18/13]"
                  />
                </div>
                <div className="grid content-start gap-3 sm:grid-cols-2">
                  <ImageField
                    label="Desktop promo image URL"
                    value={promo.image}
                    folder="promos"
                    publicId={`${promo.key}-desktop`}
                    width={1368}
                    height={600}
                    onChange={(image) => updatePromo(promo.key, { image })}
                  />
                  <ImageField
                    label="Mobile promo image URL"
                    value={promo.mobileImage}
                    folder="promos"
                    publicId={`${promo.key}-mobile`}
                    width={720}
                    height={520}
                    onChange={(mobileImage) => updatePromo(promo.key, { mobileImage })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <SaveBar
          saving={promoSave.saving}
          onSave={() => promoSave.save(promos)}
          onReset={() => promoSave.save(null)}
          note="Promo image changes update the homepage blocks below the category strip."
        />
      </section>
    </div>
  );
}

function ImageField({
  label,
  value,
  folder,
  publicId,
  width,
  height,
  onChange,
}: {
  label: string;
  value: string;
  folder: "hero" | "promos" | "categories" | "products";
  publicId: string;
  width: number;
  height: number;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", folder);
      formData.set("publicId", publicId);
      formData.set("width", String(width));
      formData.set("height", String(height));
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const body = (await res.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;
      if (!res.ok || !body?.url) throw new Error(body?.error ?? "Upload failed.");
      onChange(body.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Field label={label} full>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Upload or paste https://res.cloudinary.com/..."
          className={adminInput}
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="press inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-sm border border-[#8b641e] px-4 text-sm font-black uppercase text-[#8b641e] hover:bg-[#f6f2ea] disabled:opacity-60"
        >
          {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
          Upload
        </button>
      </div>
    </Field>
  );
}

function PreviewBox({
  label,
  image,
  aspect,
}: {
  label: string;
  image?: string;
  aspect: string;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-black uppercase text-[#6b7280]">{label}</p>
      <div className={`relative grid ${aspect} place-items-center overflow-hidden rounded bg-[#15110a]`}>
        {image ? (
          <Image src={image} alt="" fill sizes="360px" className="object-cover" />
        ) : (
          <span className="grid justify-items-center gap-2 text-xs font-black uppercase text-white/55">
            <ImageIcon size={26} />
            No image
          </span>
        )}
      </div>
    </div>
  );
}

function SaveBar({
  saving,
  onSave,
  onReset,
  note,
}: {
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
  note: string;
}) {
  return (
    <div className="sticky bottom-0 z-20 mt-5 flex flex-wrap gap-3 border-t border-[#e7ddc7] bg-[#f6f2ea]/95 py-4 backdrop-blur">
      <button
        onClick={onSave}
        disabled={saving}
        className="press rounded-sm bg-[#8b641e] px-8 py-3 text-sm font-black uppercase text-white hover:bg-[#15110a] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
      <button
        onClick={onReset}
        disabled={saving}
        className="press rounded-sm border-2 border-[#9ca3af] px-6 py-3 text-sm font-black uppercase text-[#4b5563] hover:border-[#8b641e] hover:text-[#8b641e] disabled:opacity-60"
      >
        Restore defaults
      </button>
      <p className="w-full text-xs font-semibold text-[#6b7280] sm:ml-auto sm:w-auto sm:self-center">
        {note}
      </p>
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
