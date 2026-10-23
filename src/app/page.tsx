import { Suspense } from "react";
import Marquee from "./components/Marquee";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>
      <Banner />
    </>
  );
}
