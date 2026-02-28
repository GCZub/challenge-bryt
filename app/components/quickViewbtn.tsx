'use client';
import { useRouter } from "next/navigation";

export default function QuickViewBtn({ handle }: { handle: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`?product=${handle}`)}
      className="text-white px-6 py-2 rounded-lg text-sm font-semibold border border-purple-500/50 bg-purple-900/50 backdrop-blur-sm transition-all duration-300 hover:bg-purple-600 hover:border-purple-400 hover:shadow-md hover:shadow-purple-700/40"
    >
      Quick View
    </button>
  );
}