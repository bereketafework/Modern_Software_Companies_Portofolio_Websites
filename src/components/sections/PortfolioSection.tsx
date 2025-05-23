
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, List, Globe, DatabaseZap, Smartphone, Filter } from "lucide-react"; 

interface Project {
  id: string;
  title: string;
  industry: string;
  projectType: "Web App" | "Data Platform" | "Mobile App" | "Other";
  thumbnailUrl: string;
  aiHint: string;
  clientLogoUrl: string;
  clientAiHint: string;
  description: string;
  techStack: string[];
  keyMetrics?: string[];
  caseStudyLink: string;
}

const projectsData: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform Modernization",
    industry: "Retail",
    projectType: "Web App",
    thumbnailUrl: "https://placehold.co/600x400.png",
    aiHint: "ecommerce trends", // Updated hint
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientA",
    clientAiHint: "retail company logo",
    description: "Revamped a legacy e-commerce system, improving performance by 60% and user engagement by 40%.",
    techStack: ["Next.js", "TypeScript", "AWS", "Stripe"],
    keyMetrics: ["+60% Performance", "+40% Engagement"],
    caseStudyLink: "#",
  },
  {
    id: "project-2",
    title: "Healthcare Data Analytics Dashboard",
    industry: "Healthcare",
    projectType: "Data Platform",
    thumbnailUrl: "https://placehold.co/600x400.png",
    aiHint: "healthcare dashboard", // Updated hint
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientB",
    clientAiHint: "healthcare provider logo",
    description: "Developed a secure dashboard for visualizing patient data, enabling better clinical decisions.",
    techStack: ["Python (Flask)", "React", "D3.js", "HIPAA Compliance"],
    keyMetrics: ["Faster Insights", "Improved Compliance"],
    caseStudyLink: "#",
  },
  {
    id: "project-3",
    title: "Mobile App for Logistics Management",
    industry: "Logistics",
    projectType: "Mobile App",
    thumbnailUrl: "https://placehold.co/400x600.png", // Aspect ratio for mobile
    aiHint: "logistics app", // Updated hint
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientC",
    clientAiHint: "logistics company logo",
    description: "Cross-platform mobile app for real-time tracking and fleet management, reducing operational costs.",
    techStack: ["React Native", "Node.js", "Firebase", "Google Maps API"],
    caseStudyLink: "#",
  },
   {
    id: "project-4",
    title: "AI Powered Recommendation Engine",
    industry: "Entertainment",
    projectType: "Data Platform",
    thumbnailUrl: "https://placehold.co/600x400.png",
    aiHint: "ai recommendation", // Updated hint
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientD",
    clientAiHint: "streaming service logo",
    description: "Built an AI recommendation engine that increased user retention by 25% for a streaming service.",
    techStack: ["Python", "TensorFlow", "Kubernetes", "GCP"],
    keyMetrics: ["+25% User Retention"],
    caseStudyLink: "#",
  },
  {
    id: "project-5",
    title: "Smart City IoT Solution",
    industry: "Public Sector",
    projectType: "Other", 
    thumbnailUrl: "https://placehold.co/600x400.png",
    aiHint: "smart city", // Updated hint
    clientLogoUrl: "https://placehold.co/100x50.png?text=CityGov",
    clientAiHint: "government entity logo",
    description: "Developed an IoT platform for managing city infrastructure, improving resource allocation.",
    techStack: ["MQTT", "Node.js", "React", "Azure IoT"],
    caseStudyLink: "#",
  },
];

const filterOptions = [
  { label: "All", value: "All", icon: List },
  { label: "Web Apps", value: "Web App", icon: Globe },
  { label: "Data Platforms", value: "Data Platform", icon: DatabaseZap },
  { label: "Mobile Apps", value: "Mobile App", icon: Smartphone },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projectsData;
    }
    return projectsData.filter(project => project.projectType === activeFilter);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <Filter className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Success Stories
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore a selection of projects that demonstrate our capability to deliver outstanding results.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterOptions.map(option => (
            <Button
              key={option.value}
              variant={activeFilter === option.value ? "default" : "outline"}
              onClick={() => setActiveFilter(option.value)}
              className={`transition-all duration-200 ${activeFilter === option.value ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'}`}
              aria-label={`Filter by ${option.label}`}
            >
              <option.icon className="mr-2 h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>
        
        {filteredProjects.length === 0 ? (
          <p className="text-center text-lg text-foreground/70">No projects found for this filter.</p>
        ) : (
          <div className="column-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out break-inside-avoid animate-fade-in hover:scale-[1.02] group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-w-16 aspect-h-9 bg-muted overflow-hidden">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    width={project.projectType === "Mobile App" ? 400 : 600} // Adjust width based on aspect ratio
                    height={project.projectType === "Mobile App" ? 600 : 400} // Adjust height based on aspect ratio
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={project.aiHint}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                    priority={index < 3} 
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{project.title}</h3>
                    <Image
                      src={project.clientLogoUrl}
                      alt={`${project.title} client logo`}
                      width={80}
                      height={40}
                      className="object-contain h-8"
                      data-ai-hint={project.clientAiHint}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  {project.keyMetrics && project.keyMetrics.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Key Results</h4>
                       <div className="flex flex-wrap gap-2">
                        {project.keyMetrics.map((metric) => (
                          <Badge key={metric} variant="outline" className="text-xs border-primary/50 text-primary">{metric}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button asChild variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group transition-all duration-300">
                    <Link href={project.caseStudyLink}>
                      View Case Study <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

