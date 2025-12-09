import Image from "next/image";
import { getExploreTravelerById } from "@/services/user/exploreTravelers";

// Import icons for visual enhancement (assuming you use a library like 'lucide-react' or similar)
import { MapPin, Plane, Globe, Mail, Phone, Clock } from 'lucide-react';

const TravelerDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const travelerDetails = await getExploreTravelerById(id);
  const traveler = travelerDetails?.data.data;

  // Data formatting helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!traveler) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Traveler not found or data is unavailable.
      </div>
    );
  }

  return (
    // Set a very subtle dark background for the whole page
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      
        {/* ---- HERO/HEADER SECTION (CENTERED & FOCUSED) ---- */}
        <header className="text-center mb-12">
          
          {/* Profile Image - Large and centrally focused */}
          <div className="relative inline-block mb-4">
            <Image
              src={traveler.profileImage}
              width={140}
              height={140}
              alt={traveler.fullName}
              className="rounded-full object-cover border-4 border-gray-300"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {traveler.fullName}
          </h1>

          {/* Current Location & Verification Tag on one line */}
          <div className="mt-2 flex items-center justify-center text-lg text-gray-600 space-x-3">
            <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                {traveler.currentLocation || "Globetrotter"}
            </span>

            <div className="h-4 w-px bg-gray-300"></div> {/* Vertical Divider */}

            <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase ${
                traveler.verified
                    ? "bg-teal-500 text-white" // High contrast verified tag
                    : "bg-gray-200 text-gray-600"
                }`}
            >
                {traveler.verified ? "Verified" : "Explorer"}
            </span>
          </div>
          
          {/* Bio - Set apart with style */}
          <p className="mt-6 text-xl text-gray-700 italic max-w-2xl mx-auto border-l-4 border-gray-300 pl-4 py-1">
            {traveler.bio || "Seeking new adventures and cultural experiences around the world."}
          </p>
        </header>

        {/* ---- MAIN CONTENT SECTIONS ---- */}
        <div className="space-y-10">

          {/* ---- Travel Interests & Countries (Grid Layout) ---- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Interests Column */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Plane className="w-5 h-5 mr-2 text-indigo-500" />
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {traveler.travelInterests?.length > 0 ? (
                  traveler.travelInterests.map((interest: string) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm transition hover:bg-gray-200 border border-gray-300"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="italic text-gray-500">Not specified.</p>
                )}
              </div>
            </div>

            {/* Countries Column */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-500" />
                Countries Visited
              </h2>
              <div className="flex flex-wrap gap-2">
                {traveler.visitedCountries?.length > 0 ? (
                  traveler.visitedCountries.map((country: string) => (
                    <span
                      key={country}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm transition hover:bg-gray-200 border border-gray-300"
                    >
                      {country}
                    </span>
                  ))
                ) : (
                  <p className="italic text-gray-500">No trips recorded yet.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* ---- Contact Information (Structured List) ---- */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                Contact Details
            </h2>
            
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              
              {/* Email */}
              <div className="flex items-center space-x-3">
                <dt className="text-gray-500 font-medium w-20">Email:</dt>
                <dd className="text-gray-800 truncate">
                  <a href={`mailto:${traveler.email}`} className="hover:text-indigo-600 transition">
                    {traveler.email}
                  </a>
                </dd>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <dt className="text-gray-500 font-medium w-20">Phone:</dt>
                <dd className="text-gray-800">
                  {traveler.contactNumber ? (
                    <a href={`tel:${traveler.contactNumber}`} className="hover:text-indigo-600 transition">
                      {traveler.contactNumber}
                    </a>
                  ) : (
                    <span className="italic text-gray-500">N/A</span>
                  )}
                </dd>
              </div>
              
              {/* Joined Date */}
              <div className="flex items-center space-x-3">
                <dt className="text-gray-500 font-medium w-20">Joined:</dt>
                <dd className="text-gray-800 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {formatDate(traveler.createdAt)}
                </dd>
              </div>
              
              {/* Status */}
              <div className="flex items-center space-x-3">
                <dt className="text-gray-500 font-medium w-20">Status:</dt>
                <dd className="text-gray-800">
                    <span className={`font-semibold ${traveler.verified ? 'text-teal-600' : 'text-yellow-600'}`}>
                        {traveler.userStatus || "New"}
                    </span>
                </dd>
              </div>
            </dl>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TravelerDetailsPage;