"use client";

import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const adminInput =
  "w-full rounded border border-[#e7ddc7] bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-[#8b641e]";

/**
 * Image URL input paired with a "Upload" button that sends a file to
 * /api/admin/upload (Cloudinary) and writes the returned URL back. Lets admins
 * change images by uploading a file instead of having to paste a hosted URL.
 */
export function ImageUploadField({
  value,
  folder,
  publicId,
  width,
  height,
  crop = "fill",
  ariaLabel,
  placeholder = "Upload a file, or paste https://res.cloudinary.com/...",
  onChange,
}: {
  value: string;
  folder: "hero" | "promos" | "categories" | "products";
  publicId: string;
  width: number;
  height?: number;
  crop?: "fill" | "fit";
  ariaLabel?: string;
  placeholder?: string;
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
      if (height) formData.set("height", String(height));
      formData.set("crop", crop);
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
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        placeholder={placeholder}
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
  );
}

export function useContentSave(key: "hero" | "categories" | "promos") {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save(items: unknown[] | null) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, items }),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; reset?: boolean }
        | null;
      if (!res.ok) throw new Error(body?.error ?? "Save failed.");
      toast.success(
        items === null ? "Restored defaults" : "Saved — live on the site now",
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return { save, saving };
}
