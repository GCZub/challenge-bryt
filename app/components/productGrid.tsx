"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./productCard";
import ProductModal from "./productModal";

export default function ProductGrid({ products }: { products: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedHandle = searchParams.get("product");

  const selected = products.find(({ node }: any) => node.handle === selectedHandle)?.node ?? null;

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(({ node }: any) => (
          <ProductCard key={node.id} product={node} />
        ))}
      </div>

      {selected && (
        <ProductModal product={selected} onClose={() => router.push("/")} />
      )}
    </>
  );
}