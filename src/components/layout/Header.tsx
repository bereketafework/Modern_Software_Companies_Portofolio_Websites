
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Briefcase, Code, Users, MessageSquare, HomeIcon, Settings as SettingsIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/#services", label: "Services", icon: Briefcase },
  { href: "/#portfolio", label: "Portfolio", icon: Code },
  { href: "/#about", label: "About Us", icon: Users },
  { href: "/#contact", label: "Contact", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
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
          onClick={(e) => {
            if (item.href.startsWith("/#")) { // Smooth scroll for hash links
              e.preventDefault();
              const targetId = item.href.substring(2);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
              }
            }
            if (onItemClick) {
              onItemClick();
            }
          }}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary mr-2" aria-label="Smart Tech Solution Logo">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM5 5H19V19H5V5Z" opacity="0.4"/>
                <path d="M7 7H9V9H7V7Z"/>
                <path d="M7 11H9V13H7V11Z"/>
                <path d="M7 15H9V17H7V15Z"/>
                <path d="M11 7H13V9H11V7Z"/>
                <path d="M11 11H13V13H11V11Z"/>
                <path d="M11 15H13V17H11V15Z"/>
                <path d="M15 7H17V9H15V7Z"/>
                <path d="M15 11H17V13H15V11Z"/>
                <path d="M15 15H17V17H15V15Z"/>
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
              <SheetContent side="right" className="w-[280px] flex flex-col p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle>
                    <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary mr-1.5" aria-label="Smart Tech Solution Logo">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM5 5H19V19H5V5Z" opacity="0.4"/>
                          <path d="M7 7H9V9H7V7Z"/>
                          <path d="M7 11H9V13H7V11Z"/>
                          <path d="M7 15H9V17H7V15Z"/>
                          <path d="M11 7H13V9H11V7Z"/>
                          <path d="M11 11H13V13H11V11Z"/>
                          <path d="M11 15H13V17H11V15Z"/>
                          <path d="M15 7H17V9H15V7Z"/>
                          <path d="M15 11H17V13H15V11Z"/>
                          <path d="M15 15H17V17H15V15Z"/>
                      </svg>
                      <span className="text-xl font-bold text-foreground">Smart<span className="text-primary">Tech</span></span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6 flex-grow overflow-y-auto">
                  <nav className="flex flex-col space-y-3">
                    <NavLinks onItemClick={() => setMobileMenuOpen(false)} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
