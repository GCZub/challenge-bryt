"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type CTAState = "idle" | "loading" | "success";

export default function ProductModal({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [ctaState, setCtaState] = useState<CTAState>("idle");

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 400);
  };

  const handleAddToBag = async () => {
    setCtaState("loading");
    const delay = 800 + Math.random() * 400;
    await new Promise((r) => setTimeout(r, delay));
    setCtaState("success");
    setTimeout(() => handleClose(), 1500);
  };

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
      (window as any).__lastFocusedElement?.focus();
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="bg-gradient-to-br from-indigo-950/90 via-purple-950/60 to-black border border-purple-500/40 rounded-2xl p-6 w-full mx-4 outline-none max-w-2xl shadow-xl shadow-purple-900/30"
            initial={{ opacity: 0, y: 100, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 300, scale: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={product.images.edges[0]?.node.url}
                  alt={product.title}
                  className="w-full h-72 object-cover rounded-xl"
                />
              </div>

              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
                    {product.title}
                  </h2>
                  <p className="text-purple-200/60 text-sm mb-4">
                    {product.description}
                  </p>
                  <p className="text-2xl font-semibold text-white mb-6">
                    ${new Intl.NumberFormat("en-US").format(product.priceRange.minVariantPrice.amount)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-purple-500/20 pt-4">
                  <motion.button
                    onClick={handleAddToBag}
                    disabled={ctaState !== "idle"}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-lg py-2 px-6 text-base font-semibold transition-colors"
                    animate={{
                      backgroundColor:
                        ctaState === "success" ? "#16a34a" :
                        ctaState === "loading" ? "#4c1d95" : "#6d28d9",
                    }}
                    style={{ color: "white" }}
                  >
                    <AnimatePresence mode="wait">
                      {ctaState === "idle" && (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                          Add to Bag
                        </motion.span>
                      )}
                      {ctaState === "loading" && (
                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                          Adding...
                        </motion.span>
                      )}
                      {ctaState === "success" && (
                        <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                          ✓ Added!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <button
                    onClick={handleClose}
                    className="w-full rounded-lg border border-purple-500/50 bg-purple-900/30 py-2 px-6 text-base font-semibold text-white transition-all hover:bg-purple-800/50 hover:border-purple-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}