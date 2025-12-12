"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import LogoutButton from "./LogoutButton";

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  accessToken?: string;
  roleLinks?: NavLink[];
}

const PublicNavbar = ({ accessToken, roleLinks }: Props) => {
  const pathname = usePathname();

  const commonLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/explore-travelers", label: "Explore Travelers" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const allLinks = accessToken ? [...commonLinks, ...(roleLinks || [])] : commonLinks;

  const renderLink = (link: NavLink) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.label}
        href={link.href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
          ${isActive ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white" : "text-gray-700 hover:text-primary"}
        `}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            MeetLinkO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {allLinks.map(renderLink)}
        </nav>

        {/* Desktop Login / Logout */}
        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {allLinks.map(renderLink)}
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
