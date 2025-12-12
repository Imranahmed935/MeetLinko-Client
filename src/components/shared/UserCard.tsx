"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { UserInfo } from "@/types/user.interface";

interface TravelerCardProps {
  traveler: UserInfo;
}

export default function UserCard({ traveler }: TravelerCardProps) {
  return (
    <div className="border rounded-xl shadow hover:shadow-md transition bg-white overflow-hidden">
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={traveler?.profileImage || "/default-user.png"}
          alt={traveler.fullName}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold">{traveler.fullName}</h3>

        <p className="text-sm text-gray-500">{traveler.email}</p>

        <div>
          <p className="font-medium text-sm">Interests:</p>
          <p className="text-sm text-gray-600">
            {traveler.travelInterests?.length
              ? traveler.travelInterests.join(", ")
              : "No interests listed"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          {traveler.currentLocation || "Unknown location"}
        </div>

        <Link
          href={`/explore-travelers/${traveler.id}`}
          className="w-full mt-4 inline-flex items-center justify-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          View Details <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
