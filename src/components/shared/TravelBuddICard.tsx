import React from "react";
import Image from "next/image";
import { TTravelPlan } from "@/types/travelPlan.interface";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const formatDate = (date: Date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return "N/A";

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TravelBuddICard = ({ travelPlan }: { travelPlan: TTravelPlan }) => {
  const { host, participants } = travelPlan;

  const hostProfileImage = host.profileImage || "/default-avatar.png";
  const hostFullName = host.fullName || "Unknown Host";
  const hostCurrentLocation = host.currentLocation || "Global Traveler";

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="p-5 flex flex-col flex-grow">
        {/* 1. Title & Type */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
            {travelPlan.title}
          </h3>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full flex-shrink-0 uppercase tracking-wider">
            <Briefcase className="w-3 h-3 mr-1 inline-block" />
            {travelPlan.travelType}
          </span>
        </div>

        {/* 2. Destination & Budget */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4 border-b pb-3">
          <p className="flex items-center font-medium text-indigo-600">
            <MapPin className="w-4 h-4 mr-2" />
            {travelPlan.destination}
          </p>
          <p className="flex items-center font-bold text-lg text-green-700">
            <DollarSign className="w-4 h-4 mr-1" />$
            {travelPlan.budget.toLocaleString()}
          </p>
        </div>

        {/* 3. Dates */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
            <div>
              <span className="font-semibold">Start:</span>{" "}
              {formatDate(travelPlan.startDate)}
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
            <div>
              <span className="font-semibold">End:</span>{" "}
              {formatDate(travelPlan.endDate)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-2">
            <div className="relative flex-shrink-0">
              <Image
                src={hostProfileImage}
                width={36}
                height={36}
                alt={"u"}
                className="rounded-full object-cover border-2 border-blue-400"
              />

              {host.verified && (
                <CheckCircle className="w-3 h-3 text-green-500 bg-white rounded-full absolute bottom-0 right-0" />
              )}
            </div>

            <div className="leading-none">
              <h4 className="text-sm font-semibold text-gray-800">
                {hostFullName}
              </h4>
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {hostCurrentLocation}
              </p>
            </div>
          </div>

          {/* Participant Count */}
          <div className="flex items-center text-sm font-medium text-gray-600">
            <Users className="w-4 h-4 mr-1 text-gray-400" />
            {participants.length || 0} Buddies
          </div>
        </div>
      </div>

      {/* 5. Action Button */}
      <div className="p-5 pt-0">
        <Link
          href={`find-buddy/${travelPlan.id}`}
          className="flex-1 py-2.5 bg-indigo-600 text-black font-semibold rounded-lg transition duration-150 shadow-md"
        >
          <Button variant="outline" className="w-full">
            View Details&Connect
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TravelBuddICard;
