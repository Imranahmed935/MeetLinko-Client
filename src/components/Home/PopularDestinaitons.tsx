import { ArrowRight } from "lucide-react";

export default function PopularDestinations() {
  
  const destinations = [
    {
      city: "Paris",
      imageSrc: "/paris.jpg", 
      imageAlt: "Eiffel Tower in Paris",
    },
    {
      city: "Bangkok",
      imageSrc: "/20.jpg", 
      imageAlt: "Wats in Bangkok, Thailand",
    },
    {
      city: "Bali",
      imageSrc: "/bali.jpg",
      imageAlt: "Rice paddies in Bali, Indonesia",
    },
    {
      city: "Dubai",
      imageSrc: "/dubai.jpg", 
      imageAlt: "Skyscrapers in Dubai, UAE",
    },
    {
      city: "Tokyo",
      imageSrc: "/Tokio.jpg", 
      imageAlt: "Shibuya Crossing in Tokyo, Japan",
    },
    {
      city: "Istanbul",
      imageSrc: "/istanbul.jpg", 
      imageAlt: "Hagia Sophia in Istanbul, Turkey",
    },
  ];

  return (
    <section className="py-24 bg-gray-50"> {/* Added padding and light background */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* --- Enhanced Heading --- */}
        <p className="text-sm font-semibold uppercase text-blue-600 mb-2 tracking-widest">
          Where Adventure Awaits
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Popular Destinations
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Find travel buddies for some of the world s most desired locations.
        </p>

        {/* --- Destination Grid --- */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div 
              key={dest.city} 
              className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer group"
            >
              {/* Image */}
              <img
                src={dest.imageSrc}
                alt={dest.imageAlt}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Overlay (Gradient) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-6 text-white text-left z-10">
                <h3 className="text-3xl font-bold mb-1 group-hover:text-blue-300 transition-colors">
                  {dest.city}
                </h3>
                
                {/* Explore Button/Link */}
                <button className="flex items-center text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  Explore Plans
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}