// // pages/FindBuddyPage.tsx
// import TravelBuddICard from '@/components/shared/TravelBuddICard';
// import { travelBuddy } from '@/services/user/travelBuddy';
// import { TTravelPlan } from '@/types/travelPlan.interface';


// const FindBuddyPage = async () => {
//     const findBuddiesResponse = await travelBuddy();
//     const allTravelPlans: TTravelPlan[] = findBuddiesResponse?.data || [];

//     if (!allTravelPlans || allTravelPlans.length === 0) {
//         return (
//             <div className="min-h-[50vh] flex items-center justify-center bg-gray-50 p-8">
//                 <p className="text-xl text-gray-500">
//                     No active travel plans found to match with yet. 😔
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-4xl font-extrabold text-gray-900 mb-10 pb-3 border-b-4 border-indigo-500">
//                     🌍 Discover Travel Buddies
//                 </h1>

//                 {/* Responsive Grid Layout */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {allTravelPlans.map((travelPlan: TTravelPlan) => (
//                         <TravelBuddICard
//                             key={travelPlan.id}
//                             travelPlan={travelPlan}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FindBuddyPage;

"use client";

import { useState, useEffect } from "react";
import TravelBuddICard from '@/components/shared/TravelBuddICard';
import { travelBuddy } from '@/services/user/travelBuddy';
import { TTravelPlan } from '@/types/travelPlan.interface';
import TravelBuddyFilter from "@/components/shared/FindTravelBuddyFilter";


const FindBuddyPage = () => {
  const [allTravelPlans, setAllTravelPlans] = useState<TTravelPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<TTravelPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await travelBuddy();
      if (response.success) {
        setAllTravelPlans(response.data);
        setFilteredPlans(response.data);
      }
    };
    fetchPlans();
  }, []);

  const handleFilter = (filters: { destination: string; startDate: string; endDate: string }) => {
    const { destination, startDate, endDate } = filters;

    const filtered = allTravelPlans.filter(plan => {
      const matchesDestination = destination ? plan.destination.toLowerCase().includes(destination.toLowerCase()) : true;
      const matchesStartDate = startDate ? new Date(plan.startDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(plan.endDate) <= new Date(endDate) : true;


      return matchesDestination && matchesStartDate && matchesEndDate;
    });

    setFilteredPlans(filtered);
  };

  if (!allTravelPlans || allTravelPlans.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50 p-8">
        <p className="text-xl text-gray-500">
          No active travel plans found to match with yet. 😔
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 pb-3 border-b-4 border-indigo-500">
          🌍 Discover Travel Buddies
        </h1>

        {/* Filter Section */}
        <TravelBuddyFilter onFilter={handleFilter} />

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((travelPlan: TTravelPlan) => (
            <TravelBuddICard key={travelPlan.id} travelPlan={travelPlan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindBuddyPage;
