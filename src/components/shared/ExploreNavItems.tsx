import { NavSection } from "@/types/dashboard.interface";

export const exploreNavItems: NavSection[] = [
  {
    title: "Explore & Match",
    items: [
      {
        title: "Explore Travelers",
        href: "/explore-travelers",
        icon: "Search",
        roles: ["USER", "ADMIN"],
      },
      {
        title: "Find Travel Buddy",
        href: "/find-buddy",
        icon: "Users",
        roles: ["USER", "ADMIN"],
      },
    ],
  },
];
