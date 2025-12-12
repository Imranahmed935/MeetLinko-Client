import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-utils";
import { exploreNavItems } from "@/components/shared/ExploreNavItems";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = role === "ADMIN" ? "/admin/dashboard" : "/dashboard";

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "ADMIN"],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: ["USER", "ADMIN"],
        },
      ],
    },
  ];
};

export const userNavItems: NavSection[] = [
  {
    title: "Travel Plans",
    items: [
      {
        title: "My Travel Plans",
        href: "/dashboard/my-plan",
        icon: "MapPin",
        roles: ["USER"],
      },
    ],
  },
  ...exploreNavItems,
  {
    title: "Reviews & Ratings",
    items: [
      {
        title: "My Reviews",
        href: "/dashboard/my-review",
        icon: "Star",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Change Password",
        href: "/change-password",
        icon: "Settings",
        roles: ["USER", "ADMIN"],
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        title: "Home",
        href: "/",
        icon: "Home",
        roles: ["USER", "ADMIN"],
      },
    ],
  },
];

// Admin-specific navigation
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/all-users",
        icon: "Users",
        roles: ["ADMIN"],
      },
      {
        title: "All Travel Plans",
        href: "/admin/dashboard/all-plan",
        icon: "MapPin",
        roles: ["ADMIN"],
      },
      {
        title: "All Review",
        href: "/admin/dashboard/all-review",
        icon: "Review",
        roles: ["ADMIN"],
      },
    ],
  },
  ...exploreNavItems,
  {
    title: "Settings",
    items: [
      {
        title: "Change Password",
        href: "/change-password",
        icon: "Settings",
        roles: ["USER", "ADMIN"],
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        title: "Home",
        href: "/",
        icon: "Home",
        roles: ["USER", "ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
