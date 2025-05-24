
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTopButton from "@/components/elements/ScrollToTopButton";
import ScrollProgressBar from "@/components/elements/ScrollProgressBar";
import Chatbot from "@/components/elements/Chatbot";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Tech Solution Portfolio",
  description:
    "Modern Software Development Company Portfolio Website | Smart Tech Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground rounded-md"
            >
              Skip to main content
            </a>
            <ScrollProgressBar />
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
            <ScrollToTopButton />
            <Chatbot />
            <SpeedInsights />
            <Analytics /> {/* Added Vercel Analytics component */}
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
