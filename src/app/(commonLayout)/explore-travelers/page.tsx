/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UserCard from "@/components/shared/UserCard";
import TablePagination from "@/components/shared/TablePagination";
import { exploreTravelers } from "@/services/user/exploreTravelers";
import { UserInfo } from "@/types/user.interface";

const ExploreTravelsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10; 

  const [travelers, setTravelers] = useState<UserInfo[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [filters, setFilters] = useState({ interests: "" });


  useEffect(() => {
    const fetchData = async () => {
      const response = await exploreTravelers({ page, limit, ...filters });
      console.log(response)
      if (response.success) {
        setTravelers(response.data);
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

  if (!travelers || travelers.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50 p-8">
        <p className="text-xl text-gray-500">
          No travelers found. 😔
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Explore Travelers</h1>
      <p className="text-sm text-gray-500 mb-6">
        Discover amazing people around the world and connect with your perfect travel buddy.
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by interests"
          value={filters.interests}
          onChange={(e) => handleFilter({ interests: e.target.value })}
          className="border p-2 rounded w-full sm:w-1/2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {travelers.map((traveler: UserInfo) => (
          <UserCard key={traveler.id} traveler={traveler} />
        ))}
      </div>


      {meta && (
        <div className="mt-6">
          <TablePagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default ExploreTravelsPage;
