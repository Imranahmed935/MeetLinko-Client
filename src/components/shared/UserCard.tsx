"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";

interface TravelerCardProps {
  traveler: UserInfo;
}

export default function UserCard({ traveler }: TravelerCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative w-full h-48">
        <Image
          src={traveler?.profileImage || "/default-user.png"}
          alt={traveler.fullName}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <h3 className="text-lg font-semibold">{traveler.fullName}</h3>
        <Badge variant="secondary" className="w-fit">
          {traveler.userStatus || "Not Set"}
        </Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {traveler.bio || "No bio available."}
        </p>

        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <MapPin size={16} />
          {traveler.currentLocation || "Unknown location"}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/explore-travelers/${traveler.id}`}>
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
