import { Suspense } from "react";
import Marquee from "./components/Marquee";
import Banner from "./components/Banner";
import IncreasePriceToday from "./components/IncreasePriceToday";
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
      <Suspense fallback={<h1>loading...</h1>}>
        <Marquee products={products} />
      </Suspense>

      <Banner />

      <Suspense fallback={<h1>loading...</h1>}>
        <IncreasePriceToday products={products} />
      </Suspense>
    </>
  );
}
