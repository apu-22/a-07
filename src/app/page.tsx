import { Suspense } from "react";
import Banner from "./components/Banner";
import IncreasePriceToday from "./components/IncreasePriceToday";
import DecreasePriceToday from "./components/DecreasePriceToday";
import AllProducts from "./components/AllProducts";
import { Product } from "@/types/product";

export default async function Home() {
  let products: Product[] = [];
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      cache: "force-cache",
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <>
      <Banner />

      <Suspense fallback={<h1>loading...</h1>}>
        <IncreasePriceToday products={products} />
        <DecreasePriceToday products={products} />
        <AllProducts products={products} />
      </Suspense>
    </>
  );
}
