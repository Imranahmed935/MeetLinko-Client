import { CheckCircle, Map, Users, Calendar, ArrowRight } from "lucide-react"; // Added ArrowRight for potential use, though not needed yet

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      desc: "Create your free MeetlinkO account in seconds.",
      icon: <CheckCircle className="w-8 h-8" />, // Reduced icon size for better card balance
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Create Plan",
      desc: "Add your destination, date, and travel preferences.",
      icon: <Map className="w-8 h-8" />,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Find Buddy",
      desc: "Get matched with travelers heading to the same place.",
      icon: <Users className="w-8 h-8" />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    { 
      title: "Enjoy Trip",
      desc: "Connect, finalize details, and embark on your shared adventure!",
      icon: <Calendar className="w-8 h-8" />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <section className="py-24 bg-white"> {/* Changed background to white for better contrast */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* --- Enhanced Heading --- */}
        <p className="text-sm font-semibold uppercase text-blue-600 mb-2 tracking-widest">
            Simple & Fast Process
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          How MeetlinkO Works
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto"> {/* Increased font size */}
          Start your journey in 4 simple steps and meet the perfect travel buddy.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Adjusted gap */}
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-100 text-left 
                         hover:shadow-xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              
              {/* Step Number (New Element) */}
              <div className="absolute top-0 right-0 p-2 text-sm font-bold rounded-tr-xl rounded-bl-lg text-gray-500 bg-white border-b border-l border-gray-200">
                Step {index + 1}
              </div>

              {/* Icon Container (Enhanced) */}
              <div className={`mb-4 ${step.iconColor} ${step.bgColor} p-3 rounded-full inline-block`}>
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-800"> {/* Bolded title */}
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
              
              {/* Optional: Add separator arrow on larger screens */}
              {/* This is complex to implement purely with Tailwind Grid, so we'll skip it for simplicity
                 but the design intent is captured by the card structure.
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}