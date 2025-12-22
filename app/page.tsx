import Image from "next/image";
import Scene from "./components/Scene";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl items-center justify-center py-32 px-16 bg-white">
        <div className="relative z-0 w-full max-w-xl aspect-video mx-auto">
          <Scene />
        </div>
      </main>
    </div>
  );
}
