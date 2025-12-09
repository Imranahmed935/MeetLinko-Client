/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo";

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");
  const userInfo = await getUserInfo();

  const userRole = userInfo.role?.toUpperCase() || "USER";

  const commonLinks = [
  { href: "/explore-travelers", label: "Explore Travelers" },
  { href: "/find-buddy", label: "Find Travel Buddy" },
];


  const userLinks = [
    { href: "/dashboard", label: "User Dashboard" },
  ];

  const adminLinks = [
    { href: "/dashboard", label: "Admin Dashboard" },
  ];

  // Determine which links to render based on role
  let roleLinks: any[] = [];
  if (userRole === "ADMIN") roleLinks = adminLinks;
  else if (userRole === "USER") roleLinks = userLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">MeetlinkO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {commonLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}

          {accessToken &&
            roleLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">MeetlinkO</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {commonLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="text-lg">
                    {link.label}
                  </Link>
                ))}

                {accessToken &&
                  roleLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="text-lg">
                      {link.label}
                    </Link>
                  ))}

                <div className="border-t pt-4 flex flex-col space-y-4">
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login">
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
