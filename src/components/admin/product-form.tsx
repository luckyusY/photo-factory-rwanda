"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, type Product } from "@/lib/catalog";

const inputClass =
  "w-full rounded border border-[#d7e2ef] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#005aa6]";

type Props = {
  product?: Product;
};

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      originalSlug: product?.slug,
      name: String(form.get("name") ?? ""),
      brand: String(form.get("brand") ?? ""),
      category: String(form.get("category") ?? ""),
      price: Number(form.get("price") ?? 0),
      oldPrice: Number(form.get("oldPrice") ?? 0) || null,
      badge: String(form.get("badge") ?? ""),
      condition: String(form.get("condition") ?? "New"),
      stock: Number(form.get("stock") ?? 0),
      description: String(form.get("description") ?? ""),
      images: splitLines(String(form.get("images") ?? "")),
      shortSpecs: splitLines(String(form.get("shortSpecs") ?? "")),
      specs: splitLines(String(form.get("specs") ?? ""))
        .map((line) => {
          const [label, ...valueParts] = line.split(":");
          return { label: label?.trim() ?? "", value: valueParts.join(":").trim() };
        })
        .filter((spec) => spec.label && spec.value),
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; slug?: string }
        | null;
      if (!res.ok) throw new Error(body?.error ?? "Could not save product.");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save product.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-4 rounded bg-white p-5 ring-1 ring-black/10">
        <Field label="Product name" name="name" defaultValue={product?.name} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand" name="brand" defaultValue={product?.brand} required />
          <label className="block text-sm font-bold">
            Category
            <select
              name="category"
              required
              defaultValue={product?.category ?? "cameras"}
              className={`mt-1 ${inputClass}`}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-bold">
          Description
          <textarea
            name="description"
            rows={5}
            defaultValue={product?.description}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <label className="block text-sm font-bold">
          Image URLs, one per line
          <textarea
            name="images"
            rows={4}
            defaultValue={product?.images.join("\n")}
            className={`mt-1 ${inputClass}`}
          />
        </label>
      </div>

      <div className="space-y-4 rounded bg-white p-5 ring-1 ring-black/10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Price (RWF)"
            name="price"
            type="number"
            defaultValue={product?.price}
            required
          />
          <Field
            label="Old price (RWF)"
            name="oldPrice"
            type="number"
            defaultValue={product?.oldPrice}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Stock"
            name="stock"
            type="number"
            defaultValue={product?.stock ?? 0}
            required
          />
          <Field label="Badge" name="badge" defaultValue={product?.badge} />
        </div>
        <label className="block text-sm font-bold">
          Condition
          <select
            name="condition"
            defaultValue={product?.condition ?? "New"}
            className={`mt-1 ${inputClass}`}
          >
            <option>New</option>
            <option>Open Box</option>
            <option>Pre-Owned</option>
          </select>
        </label>
        <label className="block text-sm font-bold">
          Short specs, one per line
          <textarea
            name="shortSpecs"
            rows={4}
            defaultValue={product?.shortSpecs.join("\n")}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <label className="block text-sm font-bold">
          Detailed specs, one per line as Label: Value
          <textarea
            name="specs"
            rows={4}
            defaultValue={product?.specs
              .map((spec) => `${spec.label}: ${spec.value}`)
              .join("\n")}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        {error && <p className="text-sm font-bold text-[#b91c1c]">{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-sm bg-[#ff5a1f] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#ff7440] disabled:opacity-60"
        >
          {sending ? "Saving..." : product ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className={`mt-1 ${inputClass}`}
      />
    </label>
  );
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
