export default function productCard({ product }: any) {
  return (
    <div className="bg-linear-135 from-indigo-900 to-indigo-80 border-2 rounded-2xl border-indigo-950 p-3 text-2xl w-full dark:bg-black dark:text-gray-300 flex flex-col h-full">
      <img 
        className="w-full h-48 object-cover rounded-lg mb-4" 
        src={product.images.edges[0]?.node.url} 
        alt={product.title} 
      />
      <h3 className="text-base font-bold">{product.title}</h3>
      <p className="text-sm">{product.description}</p>
      <p className="mt-auto pt-4 text-xl">${parseFloat(product.priceRange.minVariantPrice.amount)}</p>
    </div>
  );
}