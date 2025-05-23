
import { Button } from "@/components/ui/button";
import TypewriterEffect from "@/components/effects/TypewriterEffect";
import { SoftwareDevelopmentProcessIcon } from "@/components/elements/LottiePlaceholder";
import { ArrowRight, Zap, Users, Award } from "lucide-react";
import Link from "next/link";

const keyMetrics = [
  { value: "10+", label: "Years in Business", icon: Award },
  { value: "150+", label: "Projects Completed", icon: Zap },
  { value: "98%", label: "Client Satisfaction", icon: Users },
];

const servicesForTypewriter = ["Innovative", "Scalable", "Secure", "User-Centric"];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-20 md:py-32 gradient-mesh-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Building
              <br />
              <span className="text-primary">
                <TypewriterEffect texts={servicesForTypewriter} />
              </span>
              <br />
              Solutions
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 mb-10 max-w-xl mx-auto md:mx-0">
              Smart Tech Solution empowers businesses with cutting-edge software,
              transforming ideas into impactful digital realities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-cta-accent text-cta-accent-foreground hover:bg-cta-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Link href="#contact">
                  Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-all duration-300 transform hover:scale-105">
                <Link href="#portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <SoftwareDevelopmentProcessIcon className="w-full max-w-md h-auto text-primary opacity-80 dark:opacity-60" />
          </div>
        </div>
        <div className="mt-20 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {keyMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-background/50 dark:bg-foreground/5 p-6 rounded-xl shadow-lg animate-slide-up hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <metric.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-foreground/70">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
