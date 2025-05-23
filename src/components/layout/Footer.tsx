
import Link from "next/link";
import { Github, Linkedin, Send } from "lucide-react"; // Added Send for Telegram

const socialLinks = [
  {
    href: "https://github.com/BereketAfework", 
    icon: Github,
    label: "GitHub",
    ariaLabel: "Bereket Afework on GitHub",
  },
  {
    href: "https://linkedin.com/in/bereket-afework", 
    icon: Linkedin,
    label: "LinkedIn",
    ariaLabel: "Bereket Afework on LinkedIn",
  },
  {
    href: "https://t.me/Bksmile", // Changed username
    icon: Send, 
    label: "Telegram",
    ariaLabel: "Connect on Telegram", // Updated aria-label
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
          Developed by Bereket Afework
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Crafting Digital Excellence
        </p>
      </div>
    </footer>
  );
}
