import { Users, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const imageUrl = "/view.jpg";

  return (
    <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Diverse travelers exploring together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/50 to-cyan-900/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 text-center z-10 text-white">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-lg">
          Connect, Explore, <br className="hidden sm:inline" />
          And Share Adventures
        </h1>

        <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-light text-cyan-100/90 drop-shadow-md">
          Discover your perfect travel buddy and share unforgettable adventures
          with a global community of explorers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          {/* Primary CTA */}
          <button className="relative inline-flex items-center justify-center px-10 py-4 font-semibold rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/40 hover:scale-105 transition-transform duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-white opacity-10 rounded-xl animate-pulse"></span>
            <Users className="w-5 h-5 mr-3 z-10" />
            <Link href={`/find-buddy`} className="relative z-10">Find Travel Buddy</Link>
          </button>
        </div>
      </div>

      {/* Optional subtle animated shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
    </section>
  );
}
