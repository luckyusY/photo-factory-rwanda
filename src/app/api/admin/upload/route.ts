import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

const allowedFolders = new Set(["hero", "promos", "categories", "products"]);

function uploadBuffer(
  buffer: Buffer,
  options: {
    folder: string;
    publicId?: string;
    width?: number;
    height?: number;
  },
) {
  const cloudinary = getCloudinary();
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `photo-factory-rwanda/${options.folder}`,
        public_id: options.publicId,
        overwrite: true,
        resource_type: "image",
        transformation:
          options.width && options.height
            ? [
                {
                  width: options.width,
                  height: options.height,
                  crop: "fill",
                  quality: "auto",
                  fetch_format: "auto",
                },
              ]
            : [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Upload failed."));
          return;
        }
        resolve({ secure_url: result.secure_url });
      },
    );
    stream.end(buffer);
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "hero");
  const publicId = String(formData.get("publicId") ?? "") || undefined;
  const width = Number(formData.get("width") ?? 0) || undefined;
  const height = Number(formData.get("height") ?? 0) || undefined;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be 8MB or smaller." }, { status: 400 });
  }
  if (!allowedFolders.has(folder)) {
    return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadBuffer(buffer, { folder, publicId, width, height });
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
