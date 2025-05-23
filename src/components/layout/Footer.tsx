
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com",
    icon: Github,
    label: "GitHub",
    ariaLabel: "Smart Tech Solution on GitHub",
  },
  {
    href: "https://linkedin.com",
    icon: Linkedin,
    label: "LinkedIn",
    ariaLabel: "Smart Tech Solution on LinkedIn",
  },
  {
    href: "https://twitter.com",
    icon: Twitter,
    label: "Twitter",
    ariaLabel: "Smart Tech Solution on Twitter",
  },
];

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label={social.ariaLabel}
            >
              <social.icon className="h-6 w-6" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Smart Tech Solution. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          Crafting Digital Excellence
        </p>
      </div>
    </footer>
  );
}
