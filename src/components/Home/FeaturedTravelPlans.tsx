import { Plane, Calendar, Wallet, Users } from "lucide-react"; 

export default function FeaturedTravelPlans() {
  const plans = [
    { place: "Thailand", date: "Jan - Feb", budget: "$1200", link: "/find-buddy/thailand" },
    { place: "Japan", date: "March", budget: "$2000", link: "/find-buddy/japan" },
    { place: "Turkey", date: "April", budget: "$1500", link: "/find-buddy/turkey" },
  ];

 

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* --- Enhanced Heading (Indigo Gradient) --- */}
        <p className="text-sm font-semibold uppercase text-indigo-600 mb-2 tracking-widest">
          Connect with Buddies Now
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Featured Travel Plans
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          Explore ready-made travel plans and instantly connect with travelers heading there.
        </p>

        {/* --- Plans Grid --- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100 text-left 
                         hover:shadow-xl hover:border-indigo-400 transition-all duration-300" // Hover border changed
            >
              
              {/* Place Name */}
              <div className="flex items-center mb-4">
                <Plane className="w-6 h-6 mr-3 text-indigo-600" /> {/* Icon color changed */}
                <h3 className="text-2xl font-bold text-gray-800">{plan.place}</h3>
              </div>
              
              {/* Details */}
              <div className="space-y-3 mb-6 border-t border-b border-gray-200 py-4">
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-500" /> {/* Icon color changed */}
                  <span className="font-medium">Dates:</span>
                  <span className="ml-2">{plan.date}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Wallet className="w-5 h-5 mr-3 text-indigo-500" /> {/* Icon color changed */}
                  <span className="font-medium">Estimated Budget:</span>
                  <span className="ml-2 font-semibold text-gray-800">{plan.budget}</span>
                </div>
                
              </div>
              
              {/* Call to Action Button (Indigo Theme) */}
              <a
                href={plan.link}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent 
                           text-base font-medium rounded-lg text-white bg-indigo-600 shadow-md 
                           hover:bg-indigo-700 transition duration-150 ease-in-out" // Button colors changed
                role="button"
              >
                Find Travel Buddy
                <Users className="w-5 h-5 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}