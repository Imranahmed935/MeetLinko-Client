"use client";

import { useState } from "react";

interface TravelBuddyFilterProps {
  onFilter: (filters: {
    destination: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const TravelBuddyFilter = ({ onFilter }: TravelBuddyFilterProps) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ destination, startDate, endDate });
  };

  const handleReset = () => {
    setDestination("");
    setStartDate("");
    setEndDate("");
    onFilter({ destination: "", startDate: "", endDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid gap-4 md:grid-cols-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Destination
        </label>
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded w-full"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 px-4 py-2 rounded w-full"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default TravelBuddyFilter;
