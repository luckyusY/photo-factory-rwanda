"use client";

import { ArrowDown, ArrowUp, ImageIcon, Plus, Trash2 } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, type Product } from "@/lib/catalog";

const TINYMCE_API_KEY = "wp1cro1p0yeuzcvdwyejs4pfm061yj4mzoflk6yak9z6obef";

const inputClass =
  "w-full rounded border border-[#e7ddc7] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#8b641e]";

const panelClass = "rounded bg-white p-5 ring-1 ring-black/10";

type Props = {
  product?: Product;
};

type SpecRow = { label: string; value: string };

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [images, setImages] = useState<string[]>(
    product?.images.length ? product.images : [""],
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [shortSpecs, setShortSpecs] = useState<string[]>(
    product?.shortSpecs.length ? product.shortSpecs : [""],
  );
  const [specs, setSpecs] = useState<SpecRow[]>(
    product?.specs.length ? product.specs : [{ label: "", value: "" }],
  );
  const [category, setCategory] = useState(product?.category ?? "cameras");
  const [subcategory, setSubcategory] = useState(product?.subcategory ?? "");
  const subOptions =
    categories.find((c) => c.slug === category)?.subcategories ?? [];

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      originalSlug: product?.slug,
      name: String(form.get("name") ?? ""),
      brand: String(form.get("brand") ?? ""),
      category,
      subcategory: subcategory || null,
      price: Number(form.get("price") ?? 0),
      oldPrice: Number(form.get("oldPrice") ?? 0) || null,
      badge: String(form.get("badge") ?? ""),
      condition: String(form.get("condition") ?? "New"),
      stock: Number(form.get("stock") ?? 0),
      rating: Number(form.get("rating") ?? product?.rating ?? 4.5),
      reviews: Number(form.get("reviews") ?? product?.reviews ?? 0),
      description,
      images: images.map((image) => image.trim()).filter(Boolean),
      shortSpecs: shortSpecs.map((spec) => spec.trim()).filter(Boolean),
      specs: specs
        .map((spec) => ({
          label: spec.label.trim(),
          value: spec.value.trim(),
        }))
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
    <form onSubmit={submit} className="mt-5 space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <section className={panelClass}>
            <SectionTitle
              title="Product Identity"
              description="These fields control the title, breadcrumbs, category pages, search, and the top of the product page."
            />
            <div className="mt-4 space-y-4">
              <Field
                label="Product name"
                name="name"
                defaultValue={product?.name}
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Brand" name="brand" defaultValue={product?.brand} required />
                <label className="block text-sm font-bold">
                  Category
                  <select
                    name="category"
                    required
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                      setSubcategory("");
                    }}
                    className={`mt-1 ${inputClass}`}
                  >
                    {categories.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-bold">
                  Subcategory
                  <select
                    name="subcategory"
                    value={subcategory}
                    onChange={(event) => setSubcategory(event.target.value)}
                    className={`mt-1 ${inputClass}`}
                  >
                    <option value="">No subcategory</option>
                    {subOptions.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {product && (
                <div className="grid gap-4 rounded bg-[#f8fafc] p-3 text-xs font-semibold text-[#4b5563] sm:grid-cols-2">
                  <p>
                    Product URL slug
                    <span className="mt-1 block text-sm text-black">{product.slug}</span>
                  </p>
                  <p>
                    Product ID / SKU
                    <span className="mt-1 block text-sm text-black">{product.id}</span>
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className={panelClass}>
            <SectionTitle
              title="Product Images"
              description="The first image is the main product image. Add full image URLs or local paths like /products/item/1.jpg."
            />
            <ImageManager images={images} setImages={setImages} />
          </section>

          <section className={panelClass}>
            <SectionTitle
              title="Product Story"
              description="This content appears in the About and Key Features areas of the product page."
            />
            <label className="mt-4 block text-sm font-bold">
              Description
              <RichTextEditor
                value={description}
                onChange={setDescription}
              />
            </label>
            <DynamicTextList
              title="Key features"
              hint="One customer-facing feature per row. These appear near the top of the product page."
              values={shortSpecs}
              setValues={setShortSpecs}
              placeholder="Example: 24.2MP Full-Frame CMOS Sensor"
            />
          </section>

          <section className={panelClass}>
            <SectionTitle
              title="Detailed Specs"
              description="These rows build the specs table on the product page."
            />
            <SpecEditor specs={specs} setSpecs={setSpecs} />
          </section>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <section className={panelClass}>
            <SectionTitle
              title="Pricing & Inventory"
              description="Use Rwandan francs. Old price must be higher than price to show savings."
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
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
              <Field
                label="Stock"
                name="stock"
                type="number"
                defaultValue={product?.stock ?? 0}
                required
              />
              <Field label="Badge" name="badge" defaultValue={product?.badge} />
            </div>
            <label className="mt-4 block text-sm font-bold">
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
          </section>

          <section className={panelClass}>
            <SectionTitle
              title="Reviews"
              description="These numbers appear beside the star rating on the product page."
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <Field
                label="Rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                defaultValue={product?.rating ?? 4.5}
              />
              <Field
                label="Review count"
                name="reviews"
                type="number"
                min="0"
                defaultValue={product?.reviews ?? 0}
              />
            </div>
          </section>

          <section className={panelClass}>
            <SectionTitle
              title="Preview"
              description="This is the main product card image customers will see first."
            />
            <div className="mt-4 overflow-hidden rounded border border-[#e7ddc7] bg-white">
              <ImagePreview
                url={images.map((image) => image.trim()).filter(Boolean)[0]}
                label="Main product image"
                large
              />
              <div className="border-t border-[#e5e7eb] p-3">
                <p className="line-clamp-2 text-sm font-bold">
                  {String(product?.name ?? "Product name")}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#6b7280]">
                  {images.map((image) => image.trim()).filter(Boolean).length} image
                  {images.map((image) => image.trim()).filter(Boolean).length === 1 ? "" : "s"} ready
                </p>
              </div>
            </div>
          </section>

          {error && <p className="text-sm font-bold text-[#15110a]">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-sm bg-[#8b641e] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#8b641e] disabled:opacity-60"
          >
            {sending ? "Saving..." : product ? "Save changes" : "Add product"}
          </button>
        </aside>
      </div>
    </form>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-black text-black">{title}</h2>
      <p className="mt-1 text-sm font-semibold leading-5 text-[#6b7280]">
        {description}
      </p>
    </div>
  );
}

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-1 overflow-hidden rounded border border-[#e7ddc7] bg-white">
      <Editor
        apiKey={TINYMCE_API_KEY}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 320,
          menubar: false,
          branding: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline | bullist numlist | link table | removeformat | code preview",
          block_formats: "Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4",
          content_style:
            "body{font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#222} h2,h3,h4{margin:1em 0 .45em;font-weight:700} ul,ol{padding-left:1.4rem}",
        }}
      />
    </div>
  );
}

function ImageManager({
  images,
  setImages,
}: {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const update = (index: number, value: string) => {
    setImages((current) =>
      current.map((image, imageIndex) => (imageIndex === index ? value : image)),
    );
  };
  const move = (index: number, direction: -1 | 1) => {
    setImages((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <div className="mt-4 space-y-3">
      {images.map((image, index) => (
        <div
          key={index}
          className="grid gap-3 rounded border border-[#e7ddc7] bg-[#f8fafc] p-3 md:grid-cols-[132px_minmax(0,1fr)]"
        >
          <ImagePreview
            url={image.trim()}
            label={index === 0 ? "Main image" : `Image ${index + 1}`}
          />
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-black">
                {index === 0 ? "Main image" : `Gallery image ${index + 1}`}
              </p>
              <div className="flex gap-1">
                <IconButton
                  label="Move image up"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp size={15} />
                </IconButton>
                <IconButton
                  label="Move image down"
                  disabled={index === images.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown size={15} />
                </IconButton>
                <IconButton
                  label="Remove image"
                  disabled={images.length === 1}
                  onClick={() =>
                    setImages((current) => current.filter((_, i) => i !== index))
                  }
                >
                  <Trash2 size={15} />
                </IconButton>
              </div>
            </div>
            <input
              value={image}
              onChange={(event) => update(index, event.target.value)}
              placeholder="https://res.cloudinary.com/... or /products/product-name/1.jpg"
              className={inputClass}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setImages((current) => [...current, ""])}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-[#8b641e] px-4 py-2 text-sm font-black text-[#8b641e] hover:bg-[#f6f2ea]"
      >
        <Plus size={16} /> Add another image
      </button>
    </div>
  );
}

function ImagePreview({
  url,
  label,
  large = false,
}: {
  url?: string;
  label: string;
  large?: boolean;
}) {
  const previewUrl = (url ?? "").trim();

  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded border border-[#e7ddc7] bg-white ${
        large ? "aspect-[4/3]" : "h-[112px] md:h-[118px]"
      }`}
    >
      {previewUrl ? (
        <div
          aria-label={label}
          role="img"
          className="absolute inset-2 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${cssUrl(previewUrl)}")` }}
        />
      ) : (
        <div className="grid justify-items-center gap-2 text-center text-xs font-bold text-[#9ca3af]">
          <ImageIcon size={24} />
          No image
        </div>
      )}
    </div>
  );
}

function DynamicTextList({
  title,
  hint,
  values,
  setValues,
  placeholder,
}: {
  title: string;
  hint: string;
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
}) {
  return (
    <div className="mt-5">
      <p className="text-sm font-black">{title}</p>
      <p className="mt-1 text-xs font-semibold text-[#6b7280]">{hint}</p>
      <div className="mt-3 space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={value}
              onChange={(event) =>
                setValues((current) =>
                  current.map((item, i) => (i === index ? event.target.value : item)),
                )
              }
              placeholder={placeholder}
              className={inputClass}
            />
            <IconButton
              label="Remove feature"
              disabled={values.length === 1}
              onClick={() => setValues((current) => current.filter((_, i) => i !== index))}
            >
              <Trash2 size={15} />
            </IconButton>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setValues((current) => [...current, ""])}
        className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#8b641e] px-3 py-2 text-xs font-black text-[#8b641e] hover:bg-[#f6f2ea]"
      >
        <Plus size={15} /> Add feature
      </button>
    </div>
  );
}

function SpecEditor({
  specs,
  setSpecs,
}: {
  specs: SpecRow[];
  setSpecs: React.Dispatch<React.SetStateAction<SpecRow[]>>;
}) {
  return (
    <div className="mt-4 space-y-3">
      {specs.map((spec, index) => (
        <div key={index} className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)_44px]">
          <input
            value={spec.label}
            onChange={(event) =>
              setSpecs((current) =>
                current.map((item, i) =>
                  i === index ? { ...item, label: event.target.value } : item,
                ),
              )
            }
            placeholder="Label, e.g. Mount"
            className={inputClass}
          />
          <input
            value={spec.value}
            onChange={(event) =>
              setSpecs((current) =>
                current.map((item, i) =>
                  i === index ? { ...item, value: event.target.value } : item,
                ),
              )
            }
            placeholder="Value, e.g. Canon RF"
            className={inputClass}
          />
          <IconButton
            label="Remove spec"
            disabled={specs.length === 1}
            onClick={() => setSpecs((current) => current.filter((_, i) => i !== index))}
          >
            <Trash2 size={15} />
          </IconButton>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setSpecs((current) => [...current, { label: "", value: "" }])}
        className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#8b641e] px-3 py-2 text-xs font-black text-[#8b641e] hover:bg-[#f6f2ea]"
      >
        <Plus size={15} /> Add spec row
      </button>
    </div>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-[#e7ddc7] bg-white text-[#8b641e] transition hover:border-[#8b641e] hover:bg-[#f6f2ea] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  step,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        step={step}
        min={min}
        max={max}
        className={`mt-1 ${inputClass}`}
      />
    </label>
  );
}

function cssUrl(url: string) {
  return url.replace(/["\\]/g, "\\$&");
}
