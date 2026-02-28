'use client';
import { useRouter } from "next/navigation";

export default function QuickViewBtn({ handle }: { handle: string }) {
  const router = useRouter();
  
  return (
    <button onClick={() => router.push(`?product=${handle}`)} className="text-white px-8 rounded-lg border-2 border-purple-700 bg-purple-800 py-2 text-base font-semibold transition-colors hover:border-indigo-800 hover:bg-indigo-200 hover:text-indigo-900">
      Quick View
    </button>
  );
}