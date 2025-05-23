import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Globe, Cloud, Cog, Palette, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  learnMoreLink: string;
  aiHint: string;
}

const services: Service[] = [
  {
    icon: Rocket,
    title: "Custom Software Development",
    description: "Tailored software solutions to meet your unique business needs and objectives.",
    learnMoreLink: "#contact",
    aiHint: "custom software"
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Scalable and robust web applications built with modern technologies.",
    learnMoreLink: "#contact",
    aiHint: "web development"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Engaging iOS and Android applications to connect with your users on the go.",
    learnMoreLink: "#contact",
    aiHint: "mobile app"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud architecture, migration, and management services for optimal performance.",
    learnMoreLink: "#contact",
    aiHint: "cloud computing"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and visually appealing user interfaces that enhance user experience.",
    learnMoreLink: "#contact",
    aiHint: "ui ux design"
  },
  {
    icon: Cog,
    title: "DevOps & Automation",
    description: "Streamlined development pipelines and infrastructure automation for efficiency.",
    learnMoreLink: "#contact",
    aiHint: "devops automation"
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Expertise
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We deliver a comprehensive suite of software development services designed to elevate your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="h-10 w-10 text-primary" data-ai-hint={service.aiHint} />
                </div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow flex flex-col">
                <p className="text-card-foreground/80 mb-6 flex-grow">{service.description}</p>
                <Button variant="link" asChild className="text-primary hover:text-primary/80 self-center">
                  <Link href={service.learnMoreLink}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
