/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TravelBuddICard from "@/components/shared/TravelBuddICard";
import TravelBuddyFilter from "@/components/shared/FindTravelBuddyFilter";
import TablePagination from "@/components/shared/TablePagination";
import { travelBuddy } from "@/services/user/travelBuddy";
import { TTravelPlan } from "@/types/travelPlan.interface";

const FindBuddy = () => {
   const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const [plans, setPlans] = useState<TTravelPlan[]>([]);
  const [meta, setMeta] = useState<any>(null);

  const [filters, setFilters] = useState({
    destination: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await travelBuddy(filters, page, limit);
      if (response.success) {
        setPlans(response.data);
        setMeta(response.meta);
      }
    };
    fetchData();
  }, [page, limit, filters]);

  const handleFilter = (updatedFilters: any) => {
    setFilters(updatedFilters);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  if (!plans || plans.length === 0) {
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

        <Suspense fallback={null}>
          <TravelBuddyFilter onFilter={handleFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((travelPlan: TTravelPlan) => (
              <TravelBuddICard key={travelPlan.id} travelPlan={travelPlan} />
            ))}
          </div>

        
          {meta && (
            <div className="mt-10">
              <TablePagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
              />
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default FindBuddy;