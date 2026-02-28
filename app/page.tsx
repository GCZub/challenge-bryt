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
      <main className="w-screen min-h-screen flex flex-col gap-8 justify-center items-center p-4 lg:max-w-5xl xl:max-w-7xl mx-auto">
        <h1 className="text-6xl">
         {resp.data?.shop?.name}
        </h1>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsResp.data?.collectionByHandle?.products?.edges.map(({ node }: any) => (
          <ProductCard key={node.id} product={node} />
        ))}
        </div>

      </main>
    </Components.NameInputRoot>
  );
}
