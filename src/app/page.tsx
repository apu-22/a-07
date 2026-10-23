import { Suspense } from "react";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>
      <div>Home</div>
    </>
  );
}
