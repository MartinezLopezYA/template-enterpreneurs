import Landing from "@/components/Landing";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl">Cargando...</div>
        </div>
      }>
        <Landing />
      </Suspense>
    </>
  );
}
