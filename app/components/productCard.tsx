export default function productCard({ product }: any) {
  return (
    <div className="border-2 border-yellow-500 rounded p-4 text-2xl w-full dark:bg-black dark:text-gray-300 dark:placeholder:text-gray-400">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  );
}