import * as Components from "./components";
import { client } from "@/lib/shopify/serverClient";
import { getShop } from "@/lib/shopify/graphql/query";
import { getCollectionProducts } from "@/lib/shopify/graphql/query";
import ProductGrid from "@/app/components/productGrid";

export default async function Home() {
  "use cache";
  const resp = await client.request(getShop);
  const productsResp = await client.request(getCollectionProducts, {
    variables: { handle: "graphics-cards" },
  });

  const products = productsResp.data?.collectionByHandle?.products?.edges ?? [];

  return (
    <Components.NameInputRoot initialValue="world">
      <main className="w-screen min-h-screen flex flex-col gap-8 justify-center p-4 lg:max-w-5xl xl:max-w-7xl mx-auto">
        <h1 className="text-6xl text-left mb-4">
          {resp.data?.shop?.name}
        </h1>

        <ProductGrid products={products} />

      </main>
    </Components.NameInputRoot>
  );
}