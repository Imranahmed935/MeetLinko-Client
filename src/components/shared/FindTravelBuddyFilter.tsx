"use client";

import { useState } from "react";

interface TravelBuddyFilterProps {
  onFilter: (filters: { destination: string; startDate: string; endDate: string }) => void;
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
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
        Search
      </button>
      <button type="button" onClick={handleReset} className="bg-gray-300 px-4 py-2 rounded">
        Reset
      </button>
    </form>
  );
};

export default TravelBuddyFilter;
