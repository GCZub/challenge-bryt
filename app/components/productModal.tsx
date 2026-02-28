"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type {
  ShopifyProduct,
  ShopifyVariant,
  ShopifyProductDetailResponse,
} from "@/lib/shopify/shopify-types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductModalProps {
  handle: string;
  onClose: () => void;
}

type CTAState = "idle" | "loading" | "success";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/10 ${className ?? ""}`}
    />
  );
}

function ModalSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Skeleton className="w-full md:w-1/2 h-64 md:h-auto md:min-h-[360px]" />
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
        <Skeleton className="h-7 w-24 mt-2" />
        <Skeleton className="h-12 w-full mt-auto rounded-xl" />
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function ProductModal({ handle, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [ctaState, setCtaState] = useState<CTAState>("idle");
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [imageFading, setImageFading] = useState(false);
  const [visible, setVisible] = useState(false);

  // Animate in
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handle }),
        });
        const data: ShopifyProductDetailResponse = await res.json();
        if (data.product) {
          setProduct(data.product);
          // Set default selected options
          const defaults: Record<string, string> = {};
          data.product.options.forEach((opt) => {
            defaults[opt.name] = opt.values[0];
          });
          setSelectedOptions(defaults);
          setDisplayImage(
            data.product.images.edges[0]?.node.url ?? null
          );
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle]);

  // Focus management
  useEffect(() => {
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      (window as { __lastFocusedElement?: HTMLElement }).__lastFocusedElement?.focus();
    };
  }, []);

  // Resolve selected variant
  const resolvedVariant: ShopifyVariant | null = product
    ? (product.variants.edges.find(({ node }) =>
        node.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      )?.node ?? null)
    : null;

  // Update image when variant changes
  useEffect(() => {
    if (!resolvedVariant) return;
    const newImage =
      resolvedVariant.image?.url ??
      product?.images.edges[0]?.node.url ??
      null;
    if (newImage && newImage !== displayImage) {
      setImageFading(true);
      setTimeout(() => {
        setDisplayImage(newImage);
        setImageFading(false);
      }, 200);
    }
  }, [resolvedVariant?.id]);

  // Check if an option value is available given current selections
  const isValueAvailable = useCallback(
    (optionName: string, value: string): boolean => {
      if (!product) return false;
      const testOptions = { ...selectedOptions, [optionName]: value };
      return product.variants.edges.some(({ node }) =>
        node.availableForSale &&
        node.selectedOptions.every(
          (opt) => testOptions[opt.name] === opt.value
        )
      );
    },
    [product, selectedOptions]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  const handleAddToBag = async () => {
    if (!resolvedVariant?.availableForSale) return;
    setCtaState("loading");
    const delay = 800 + Math.random() * 400;
    await new Promise((r) => setTimeout(r, delay));
    setCtaState("success");
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const displayPrice = resolvedVariant?.price ?? product?.priceRange.minVariantPrice;
  const isDefaultOnly =
    product?.options.length === 1 &&
    product.options[0].name === "Title" &&
    product.options[0].values[0] === "Default Title";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: `rgba(0,0,0,${visible ? 0.75 : 0})`,
        transition: "background-color 250ms ease",
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={product?.title ?? "Product details"}
        className="relative w-full max-w-3xl outline-none rounded-2xl border border-purple-500/50 bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-purple-900/30"
        style={{
          transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition: "transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 250ms ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="p-6">
          {loading ? (
            <ModalSkeleton />
          ) : product ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Image */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="relative w-full h-64 md:h-full min-h-[280px] rounded-xl overflow-hidden bg-white/5">
                  {displayImage && (
                    <img
                      src={displayImage}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-xl"
                      style={{
                        opacity: imageFading ? 0 : 1,
                        transition: "opacity 200ms ease",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <h2 className="text-xl font-bold text-white leading-snug">
                  {product.title}
                </h2>

                {product.description && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Variant options — hide if only Default Title */}
                {!isDefaultOnly && (
                  <div className="flex flex-col gap-3">
                    {product.options.map((option) => (
                      <div key={option.name}>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                          {option.name}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => {
                            const available = isValueAvailable(option.name, value);
                            const selected = selectedOptions[option.name] === value;
                            return (
                              <button
                                key={value}
                                disabled={!available}
                                onClick={() =>
                                  setSelectedOptions((prev) => ({
                                    ...prev,
                                    [option.name]: value,
                                  }))
                                }
                                className="relative px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
                                style={{
                                  borderColor: selected ? "#a855f7" : "rgba(255,255,255,0.15)",
                                  backgroundColor: selected ? "rgba(168,85,247,0.2)" : "transparent",
                                  color: available ? "white" : "rgba(255,255,255,0.3)",
                                  transform: selected ? "scale(1.05)" : "scale(1)",
                                  textDecoration: !available ? "line-through" : "none",
                                  cursor: !available ? "not-allowed" : "pointer",
                                }}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price */}
                <p className="text-2xl font-bold text-white mt-auto">
                  ${new Intl.NumberFormat("en-US").format(
                    parseFloat(displayPrice?.amount ?? "0")
                  )}{" "}
                  <span className="text-sm font-normal text-gray-400">
                    {displayPrice?.currencyCode}
                  </span>
                </p>

                {/* CTA */}
                <button
                  onClick={handleAddToBag}
                  disabled={
                    !resolvedVariant?.availableForSale || ctaState !== "idle"
                  }
                  className="relative w-full rounded-xl py-3 px-6 text-base font-semibold transition-all duration-200 overflow-hidden"
                  style={{
                    backgroundColor:
                      ctaState === "success"
                        ? "#16a34a"
                        : !resolvedVariant?.availableForSale
                        ? "rgba(255,255,255,0.1)"
                        : "#6d28d9",
                    color:
                      !resolvedVariant?.availableForSale && ctaState === "idle"
                        ? "rgba(255,255,255,0.3)"
                        : "white",
                    transform:
                      ctaState === "idle" && resolvedVariant?.availableForSale
                        ? "scale(1)"
                        : "scale(0.98)",
                    cursor:
                      !resolvedVariant?.availableForSale || ctaState !== "idle"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {ctaState === "idle" && (
                    resolvedVariant?.availableForSale
                      ? "Add to Bag"
                      : "Unavailable"
                  )}
                  {ctaState === "loading" && (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </span>
                  )}
                  {ctaState === "success" && (
                    <span className="flex items-center justify-center gap-2">
                      <span>✓</span> Added!
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">Product not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
