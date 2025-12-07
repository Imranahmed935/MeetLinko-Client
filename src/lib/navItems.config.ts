// ""

// import { NavSection } from "@/types/dashboard.interface";
// import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

// export const getCommonNavItems = (role: UserRole): NavSection[] => {
//     const defaultDashboard = getDefaultDashboardRoute(role);

//     return [
//         {
//             items: [
//                 {
//                     title: "Dashboard",
//                     href: defaultDashboard,
//                     icon: "LayoutDashboard",
//                     roles: ["USER", "ADMIN"],
//                 },
//                 {
//                     title: "My Profile",
//                     href: `/my-profile`,
//                     icon: "User",
//                     roles: ["USER", "ADMIN"],
//                 },

//             ]
//         },
//         {
//             title: "Settings",
//             items: [
//                 {
//                     title: "Change Password",
//                     href: "/change-password",
//                     icon: "Settings", 
//                     roles: ["USER"],
//                 },
//             ],
//         },
//     ]
// }

// // export const doctorNavItems: NavSection[] = [
// //     {
// //         title: "Patient Management",
// //         items: [
// //             {
// //                 title: "Appointments",
// //                 href: "/doctor/dashboard/appoinments",
// //                 icon: "Calendar", // ✅ String
// //                 badge: "3",
// //                 roles: ["ADMIN"],
// //             },
// //             {
// //                 title: "My Schedules",
// //                 href: "/doctor/dashboard/my-schedules",
// //                 icon: "Clock", // ✅ String
// //                 roles: ["ADMIN"],
// //             },
// //             {
// //                 title: "Prescriptions",
// //                 href: "/doctor/dashboard/prescriptions",
// //                 icon: "FileText", // ✅ String
// //                 roles: ["ADMIN"],
// //             },
// //         ],
// //     }
// // ]

// export const patientNavItems: NavSection[] = [
//     {
//         title: "Appointments",
//         items: [
//             {
//                 title: "My Appointments",
//                 href: "/dashboard/my-appointments",
//                 icon: "Calendar", // ✅ String
//                 roles: ["USER"],
//             },
//             {
//                 title: "Book Appointment",
//                 href: "/consultation",
//                 icon: "ClipboardList", // ✅ String
//                 roles: ["USER"],
//             },
//         ],
//     },
//     {
//         title: "Medical Records",
//         items: [
//             {
//                 title: "My Prescriptions",
//                 href: "/dashboard/my-prescriptions",
//                 icon: "FileText", // ✅ String
//                 roles: ["USER"],
//             },
//             {
//                 title: "Health Records",
//                 href: "/dashboard/health-records",
//                 icon: "Activity", // ✅ String
//                 roles: ["USER"],
//             },
//         ],
//     },

// ]

// export const adminNavItems: NavSection[] = [
//     {
//         title: "User Management",
//         items: [
//             {
//                 title: "all Users",
//                 href: "/admin/dashboard/admins-management",
//                 icon: "users", 
//                 roles: ["ADMIN"],
//             },
//             {
//                 title: "all Travel Plans",
//                 href: "/admin/dashboard/doctors-management",
//                 icon: "travel", // ✅ String
//                 roles: ["ADMIN"],
//             },
//             {
//                 title: "activities",
//                 href: "/admin/dashboard/patients-management",
//                 icon: "activities", // ✅ String
//                 roles: ["ADMIN"],
//             },
//         ],
//     },
// ]

// export const getNavItemsByRole = (role: UserRole): NavSection[] => {
//     const commonNavItems = getCommonNavItems(role);

//     switch (role) {
//         case "ADMIN":
//             return [...commonNavItems, ...adminNavItems];
       
//         case "USER":
//             return [...commonNavItems, ...patientNavItems];
//         default:
//             return [];
//     }
// }


import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-utils";

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
          href: "/dashboard/my-profile/",
          icon: "User",
          roles: ["USER", "ADMIN"],
        },
      ],
    },
    
  ];
};

// User-specific navigation (Travel Buddy & Meetup)
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
      {
        title: "Create Travel Plan",
        href: "/dashboard/create-plan",
        icon: "PlusCircle",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Explore & Match",
    items: [
      {
        title: "Explore Travelers",
        href: "/dashboard/explore-travelers",
        icon: "Search",
        roles: ["USER"],
      },
      {
        title: "Find Travel Buddy",
        href: "/dashboard/find-buddy",
        icon: "Users",
        roles: ["USER"],
      },
    ],
  },
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
];

// Admin-specific navigation
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/users",
        icon: "Users",
        roles: ["ADMIN"],
      },
      {
        title: "All Travel Plans",
        href: "/admin/dashboard/travel-plans",
        icon: "MapPin",
        roles: ["ADMIN"],
      },
      {
        title: "Activities",
        href: "/admin/dashboard/activities",
        icon: "Activity",
        roles: ["ADMIN"],
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
