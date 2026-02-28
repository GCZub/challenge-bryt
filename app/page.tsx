import * as Components from "./components";
import { client } from "@/lib/shopify/serverClient";
import { getShop } from "@/lib/shopify/graphql/query";
import { getCollectionProducts } from "@/lib/shopify/graphql/query";
import ProductCard from "@/app/components/productCard";
export default async function Home() {
  "use cache";
  const resp = await client.request(getShop);
  const productsResp = await client.request(getCollectionProducts, {
  variables: { handle: "graphics-cards" },
});

  return (
    <Components.NameInputRoot initialValue="world">
      <main className="w-screen h-screen flex flex-col gap-8 justify-center items-center max-w-2xl mx-auto">
        <h1 className="text-6xl">
          Hello <Components.NameDisplay /> and good luck 😄!
        </h1>
        {resp.data?.shop.name && (
          <h2 className="text-4xl">Store name: {resp.data?.shop?.name}</h2>
        )}
        <form>
          <Components.NameInput
            className="border-2 border-yellow-500 rounded p-4 text-2xl w-full dark:bg-black dark:text-gray-300 dark:placeholder:text-gray-400"
            name="name"
            placeholder="name"
          />
        </form>
        
        {productsResp.data?.collectionByHandle?.products?.edges.map(({ node }: any) => (
          <ProductCard key={node.id} product={node} />
        ))}

      </main>
    </Components.NameInputRoot>
  );
}
