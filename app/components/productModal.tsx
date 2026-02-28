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
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="bg-black border-2 border-purple-400 rounded-2xl p-6 w-full mx-4 outline-none max-w-2xl"
            initial={{ opacity: 0, y: 100, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 300, scale: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 md:grid-cols-2 items-center gap-6">
              <img
                src={product.images.edges[0]?.node.url}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg mb-4"
              />

              <div className="p-3 flex flex-col justify-center">
                <h2 className=" text-base md:text-2xl font-bold mb-2 ">
                  {product.title}
                </h2>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="md:text-xl text-base mb-4">
                  $
                  {new Intl.NumberFormat("en-US").format(
                    product.priceRange.minVariantPrice.amount,
                  )}
                </p>

                <motion.button
                  onClick={handleAddToBag}
                  disabled={ctaState !== "idle"}
                  whileTap={{ scale: 0.95 }} // ← press feedback
                  className="w-full rounded-lg py-2 px-6 text-base font-semibold transition-colors mb-4"
                  animate={{
                    backgroundColor:
                      ctaState === "success"
                        ? "#16a34a"
                        : ctaState === "loading"
                          ? "#4c1d95"
                          : "#6d28d9",
                  }}
                  style={{ color: "white" }}
                >
                  <AnimatePresence mode="wait">
                    {ctaState === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        Add to Bag
                      </motion.span>
                    )}
                    {ctaState === "loading" && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Adding...
                      </motion.span>
                    )}
                    {ctaState === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        ✓ Added!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <button
                  onClick={handleClose}
                  className="w-full rounded-lg border-2 border-indigo-300 bg-indigo-300 py-2 px-6 text-base font-semibold text-black transition-colors hover:bg-indigo-950 hover:text-indigo-300 mb-3"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
