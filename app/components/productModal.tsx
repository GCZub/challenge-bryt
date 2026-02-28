"use client";
import { useEffect, useRef } from "react";

export default function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      (window as any).__lastFocusedElement?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-black border-2 border-purple-400 rounded-2xl p-6 max-w-lg w-full mx-4 outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={product.images.edges[0]?.node.url}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-center">{product.title}</h2>
        <p className="text-gray-400 mb-4">{product.description}</p>
        <p className="text-xl mb-4 text-center">
          ${new Intl.NumberFormat("en-US").format(product.priceRange.minVariantPrice.amount)}
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-indigo-300 bg-indigo-300 py-2 px-6 text-base font-semibold text-black transition-colors hover:bg-indigo-950 hover:text-indigo-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}