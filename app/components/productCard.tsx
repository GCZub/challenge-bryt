import QuickViewbtn from "@/app/components/quickViewbtn";

export default function productCard({ product }: any) {
  return (
    <div className="bg-gradient-to-br from-indigo-950/80 via-purple-950/40 to-black border border-purple-500/30 rounded-2xl p-3 text-2xl w-full flex flex-col h-full hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30">
      
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent absolute z-10" />
        <img
          className="w-full h-48 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
          src={product.images.edges[0]?.node.url}
          alt={product.title}
        />
      </div>

      <h3 className="text-base font-bold text-white">{product.title}</h3>
      <p className="text-sm text-purple-200/60 mt-1">{product.description}</p>

      <div className="mt-auto flex justify-between items-center pt-4 border-t border-purple-500/20 mt-4">
        <p className="text-lg font-semibold text-white">
          ${parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
        </p>
        <QuickViewbtn handle={product.handle} />
      </div>
    </div>
  );
}