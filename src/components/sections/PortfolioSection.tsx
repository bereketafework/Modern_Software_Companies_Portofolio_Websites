
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, List, Globe, DatabaseZap, Smartphone, Settings } from "lucide-react"; 
import { useSettings } from '@/contexts/SettingsContext'; // Import useSettings

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
    thumbnailUrl: "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2024/11/Digital-Platform-@umnat-seebuaphans-images.jpg",
    aiHint: "digital e-commerce platform",
    clientLogoUrl: "https://placehold.co/100x50.png", 
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
    thumbnailUrl: "https://www.bridgingminds.net/wp-content/uploads/2022/01/top-4-benefits-of-using-data-analytics-in-healthcare.jpg", 
    aiHint: "healthcare data charts",
    clientLogoUrl: "https://placehold.co/100x50.png", 
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
    thumbnailUrl: "https://blog.fleetx.io/content/images/2022/10/logistic-management-3.jpg", 
    aiHint: "logistics app dashboard",
    clientLogoUrl: "https://placehold.co/100x50.png",
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
    thumbnailUrl: "https://cepr.org/sites/default/files/styles/og_image/public/2023-06/AdobeStock_605418326.jpeg?itok=NoYTPVeq",
    aiHint: "ai brain network",
    clientLogoUrl: "https://placehold.co/100x50.png",
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
    thumbnailUrl: "https://www.keysight.com/content/dam/keysight/en/img/soln/internet-of-things-iot/smart-city/solutions_iot-smart-city_slice4.jpg?wid=388&hei=291",
    aiHint: "smart city infrastructure",
    clientLogoUrl: "https://placehold.co/100x50.png",
    clientAiHint: "government entity logo",
    description: "Developed an IoT platform for managing city infrastructure, improving resource allocation.",
    techStack: ["MQTT", "Node.js", "React", "Azure IoT"],
    caseStudyLink: "#",
  },
  {
    id: "project-6",
    title: "Fintech Mobile Banking App",
    industry: "Finance",
    projectType: "Mobile App",
    thumbnailUrl: "https://sii.pl/blog/wp-content/uploads/2025/03/Jak-zyskac-klienta-w-procesie-onboardingu-cyfrowego-z-Financial-Services-Cloud-1.jpg",
    aiHint: "mobile banking interface",
    clientLogoUrl: "https://placehold.co/100x50.png",
    clientAiHint: "finance company logo",
    description: "A secure and user-friendly mobile banking application with modern features.",
    techStack: ["Swift", "Kotlin", "Node.js", "PostgreSQL"],
    keyMetrics: ["High Security Rating"],
    caseStudyLink: "#",
  },
  {
    id: "project-7",
    title: "Cloud Migration for SaaS Company",
    industry: "Technology",
    projectType: "Other",
    thumbnailUrl: "https://www.openaccessgovernment.org/wp-content/uploads/2020/02/dreamstime_xxl_143701086.jpg",
    aiHint: "cloud infrastructure diagram",
    clientLogoUrl: "https://placehold.co/100x50.png",
    clientAiHint: "saas company logo",
    description: "Successfully migrated a large SaaS platform to a scalable cloud infrastructure, reducing costs by 20%.",
    techStack: ["AWS", "Terraform", "Docker", "Kubernetes"],
    keyMetrics: ["-20% Operational Costs", "Improved Scalability"],
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
  const { portfolioItemsPerPage } = useSettings(); // Consume settings

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projectsData;
    }
    return projectsData.filter(project => project.projectType === activeFilter);
  }, [activeFilter]);

  const projectsToDisplay = useMemo(() => {
    // 0 means show all
    if (portfolioItemsPerPage === 0 || portfolioItemsPerPage >= filteredProjects.length) { 
      return filteredProjects;
    }
    return filteredProjects.slice(0, portfolioItemsPerPage);
  }, [filteredProjects, portfolioItemsPerPage]);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Removed Filter icon that was here */}
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Success Stories
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore a selection of projects that demonstrate our capability to deliver outstanding results.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
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
           {/* Link to settings page for item count */}
           <Button variant="ghost" asChild size="sm" className="text-sm text-muted-foreground hover:text-primary">
                <Link href="/settings" aria-label="Adjust items per page">
                    <Settings className="mr-2 h-4 w-4" /> Items per page
                </Link>
            </Button>
        </div>
        
        {projectsToDisplay.length === 0 && filteredProjects.length > 0 && (
          <p className="text-center text-lg text-foreground/70 py-8">
            No projects match the current filter for the selected number of items.
            <br />Try adjusting the items per page in <Link href="/settings" className="text-primary hover:underline">Settings</Link> or select a different filter.
          </p>
        )}
        {projectsToDisplay.length === 0 && filteredProjects.length === 0 && (
          <p className="text-center text-lg text-foreground/70 py-8">No projects found for this filter.</p>
        )}

        {projectsToDisplay.length > 0 && (
          <div className="column-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {projectsToDisplay.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out break-inside-avoid animate-fade-in hover:scale-[1.02] group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-w-16 aspect-h-9 bg-muted overflow-hidden">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    width={project.projectType === "Mobile App" ? 400 : 600} 
                    height={project.projectType === "Mobile App" ? 600 : 400} 
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
