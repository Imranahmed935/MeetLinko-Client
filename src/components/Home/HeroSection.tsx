import { Users, PlusCircle } from "lucide-react";

export default function HeroSection() {
  const imageUrl = "/view.jpg";

  return (
    <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Diverse travelers exploring together with a stunning view"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 text-center z-10 text-cyan-50">
        {" "}
        {/* Base Text Color Changed */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg text-white">
          {" "}
          {/* Heading Color Changed */}
          Connect, Explore, <br className="hidden sm:inline" />
          And Share Adventures
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light drop-shadow-md">
          Find your perfect travel buddy from a global community of explorers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="inline-flex items-center justify-center 
                             bg-indigo-500 hover:bg-indigo-600 
                             text-white text-lg px-8 py-3 rounded-xl 
                             font-semibold shadow-2xl shadow-indigo-500/50 
                             transition duration-300 transform hover:scale-[1.02]"
          >
            <Users className="w-5 h-5 mr-3" />
            Find Travel Buddy
          </button>

          {/* Secondary CTA: Create Travel Plan (Light border/Fill) */}
          <button
            className="inline-flex items-center justify-center 
                             border border-cyan-50/50 bg-transparent hover:bg-white/10 
                             text-cyan-50 text-lg px-8 py-3 rounded-xl 
                             font-semibold backdrop-blur-sm 
                             transition duration-300 transform hover:border-cyan-50"
          >
            <PlusCircle className="w-5 h-5 mr-3" />
            Create Travel Plan
          </button>
        </div>
      </div>
    </section>
  );
}
