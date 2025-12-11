import { ShieldCheck, Zap, Star, Lock } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Travelers",
      description: "Safety first. All profiles are authenticated via ID checks.",
      icon: <ShieldCheck className="w-8 h-8" />,
      iconColor: "text-green-600", // Custom Color
      bgColor: "bg-green-100",    // Custom Color
    },
    {
      title: "Smart Match System",
      description: "Our AI algorithm finds compatible buddies based on interests and plans.",
      icon: <Zap className="w-8 h-8" />,
      iconColor: "text-indigo-600", // Custom Color
      bgColor: "bg-indigo-100",   // Custom Color
    },
    {
      title: "Real Reviews & Ratings",
      description: "Build trust with honest feedback from previous co-travelers.",
      icon: <Star className="w-8 h-8" />,
      iconColor: "text-amber-600", // Custom Color
      bgColor: "bg-amber-100",    // Custom Color
    },
    {
      title: "Secure Payments",
      description: "Handle shared costs and deposits safely with encrypted transactions.",
      icon: <Lock className="w-8 h-8" />,
      iconColor: "text-red-600", // Custom Color
      bgColor: "bg-red-100",    // Custom Color
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* --- Enhanced Heading --- */}
        <p className="text-sm font-semibold uppercase text-blue-600 mb-2 tracking-widest">
          The MeetlinkO Advantage
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-indigo-600  bg-clip-text text-transparent">
          Why Travelers Choose Us
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          We go beyond simple matching to ensure every journey is safe, efficient, and enjoyable.
        </p>

        {/* --- Feature Grid --- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 text-left 
                         hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Container with Dynamic Colors */}
              <div className={`mb-4 ${feature.iconColor} ${feature.bgColor} p-3 rounded-full inline-block`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}