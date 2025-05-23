
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Briefcase, Code, Users, MessageSquare, HomeIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "#services", label: "Services", icon: Briefcase },
  { href: "#portfolio", label: "Portfolio", icon: Code },
  { href: "#about", label: "About Us", icon: Users }, // Combines Tech Expertise & Dev Process
  { href: "#contact", label: "Contact", icon: MessageSquare },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onItemClick}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md flex items-center gap-2"
          aria-label={item.label}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/90 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Smart Tech Solution Home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary mr-2">
              <path d="M12 2L1 9l3 11h16l3-11L12 2zm0 2.38l7.36 5.15-2.18 8.02H6.82l-2.18-8.02L12 4.38zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span className="text-2xl font-bold text-foreground">
              Smart<span className="text-primary">Tech</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            <NavLinks />
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-6">
                <div className="flex justify-between items-center mb-6">
                   <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary mr-1.5">
                       <path d="M12 2L1 9l3 11h16l3-11L12 2zm0 2.38l7.36 5.15-2.18 8.02H6.82l-2.18-8.02L12 4.38zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                     </svg>
                     <span className="text-xl font-bold text-foreground">Smart<span className="text-primary">Tech</span></span>
                   </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-3">
                  <NavLinks onItemClick={() => setMobileMenuOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
