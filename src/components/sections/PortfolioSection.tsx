import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  industry: string;
  projectType: string;
  thumbnailUrl: string;
  aiHint: string;
  clientLogoUrl: string;
  clientAiHint: string;
  description: string;
  techStack: string[];
  keyMetrics?: string[];
  caseStudyLink: string;
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform Modernization",
    industry: "Retail",
    projectType: "Web App",
    thumbnailUrl: "https://placehold.co/600x400.png",
    aiHint: "online store",
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientA",
    clientAiHint: "company logo",
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
    thumbnailUrl: "https://placehold.co/600x338.png", // 16:9
    aiHint: "data dashboard",
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientB",
    clientAiHint: "company logo",
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
    thumbnailUrl: "https://placehold.co/400x600.png",
    aiHint: "logistics app",
    clientLogoUrl: "https://placehold.co/100x50.png?text=ClientC",
    clientAiHint: "company logo",
    description: "Cross-platform mobile app for real-time tracking and fleet management, reducing operational costs.",
    techStack: ["React Native", "Node.js", "Firebase", "Google Maps API"],
    caseStudyLink: "#",
  },
];

// Simple Masonry-like grid with CSS (flexbox or CSS Grid)
// For true masonry, a JS library might be needed, but this is a good start.
// Using CSS columns for a simple masonry effect.
export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Success Stories
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore a selection of projects that demonstrate our capability to deliver outstanding results.
          </p>
        </div>

        {/* Placeholder for Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button variant="outline" className="bg-background">Filter: All</Button>
          <Button variant="ghost">Industry</Button>
          <Button variant="ghost">Technology</Button>
          <Button variant="ghost">Project Type</Button>
        </div>
        
        <div className="column-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out break-inside-avoid animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-muted">
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  width={600}
                  height={400} // This should match aspect ratio for best results, even if actual image is different.
                  className="object-cover w-full h-full"
                  data-ai-hint={project.aiHint}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
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
      </div>
    </section>
  );
}
