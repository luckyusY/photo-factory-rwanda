import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <SearchX size={56} className="mx-auto text-[#9ca3af]" />
      <h1 className="mt-6 text-3xl font-black">Page not found.</h1>
      <p className="mt-3 text-[#4b5563]">
        The page you are looking for doesn&apos;t exist or has moved. Try
        searching for the gear you need instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-sm bg-[#005aa6] px-6 py-3 text-sm font-black uppercase text-white"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="rounded-sm border-2 border-[#005aa6] px-6 py-3 text-sm font-black uppercase text-[#005aa6]"
        >
          Browse all products
        </Link>
      </div>
    </main>
  );
}
