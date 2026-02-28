import QuickViewbtn from "@/app/components/quickViewbtn";
export default function productCard({ product }: any) {
  return (
    <div className="bg-linear-135 from-indigo-800 to-black border-2 rounded-2xl border-indigo-950 p-3 text-2xl w-full  flex flex-col h-full">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="h-full w-full bg-linear-135 from-white from-0% to-transparent to-100% opacity-35 absolute"></div>
        <img
          className="w-full h-48 object-cover"
          src={product.images.edges[0]?.node.url}
          alt={product.title}
        />
      </div>
      <h3 className="text-base font-bold">{product.title}</h3>
      <p className="text-sm">{product.description}</p>
      <div className="mt-auto flex justify-between items-center pt-7">
        <p className="text-xl">
          ${parseFloat(product.priceRange.minVariantPrice.amount)}
        </p>
          <QuickViewbtn handle={product.handle}/>
      </div>
    </div>
  );
}
