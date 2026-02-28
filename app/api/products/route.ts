import { client } from "@/lib/shopify/serverClient";
import { getCollectionProducts } from "@/lib/shopify/graphql/query";



export async function GET() {
  const data = await client.request(getCollectionProducts, {
    variables: { handle: "graphics-cards" },
  });
  return Response.json(data);
}