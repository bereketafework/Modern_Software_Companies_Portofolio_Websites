
"use client";
import type { SVGProps } from "react";
import { Code, Database, Cloud, TerminalSquare, Search, Palette, Code2, ClipboardCheck, Rocket, LifeBuoy, type LucideIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Text } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number; // 0-100
  details: string;
}

interface TechCategory {
  name: string;
  icon: React.ElementType;
  skills: Skill[];
}

const techCategories: TechCategory[] = [
  {
    name: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React", level: 95, details: "Extensive experience building complex UIs and SPAs with React and its ecosystem (Redux, Zustand)." },
      { name: "Next.js", level: 90, details: "Expertise in server-side rendering, static site generation, and API routes with Next.js." },
      { name: "Vue.js", level: 80, details: "Proficient in Vue.js for progressive web apps and component-based UIs." },
      { name: "Tailwind CSS", level: 95, details: "Building responsive and modern designs rapidly with utility-first CSS." },
    ],
  },
  {
    name: "Backend Development",
    icon: Database,
    skills: [
      { name: "Node.js", level: 90, details: "Building scalable and high-performance server-side applications with Node.js and Express/NestJS." },
      { name: "Python (Django/Flask)", level: 85, details: "Developing robust backends, APIs, and data processing tasks with Python." },
      { name: "Java (Spring Boot)", level: 80, details: "Enterprise-grade application development using Java and the Spring framework." },
      { name: "Go", level: 75, details: "High-concurrency systems and microservices development with Go." },
    ],
  },
  {
    name: "Cloud Platforms",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 90, details: "Designing, deploying, and managing scalable applications on AWS (EC2, S3, Lambda, RDS, etc.)." },
      { name: "GCP", level: 85, details: "Leveraging GCP services for data analytics, machine learning, and application hosting." },
      { name: "Azure", level: 80, details: "Building and managing cloud solutions on Azure, including VMs, App Service, and Azure Functions." },
    ],
  },
  {
    name: "DevOps & Automation",
    icon: TerminalSquare,
    skills: [
      { name: "Docker", level: 95, details: "Containerizing applications for consistent development and deployment environments." },
      { name: "Kubernetes", level: 85, details: "Orchestrating containerized applications at scale with Kubernetes." },
      { name: "CI/CD", level: 90, details: "Implementing automated build, test, and deployment pipelines (Jenkins, GitHub Actions)." },
      { name: "Terraform", level: 80, details: "Managing infrastructure as code for reproducible and version-controlled environments." },
    ],
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltipContent = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // skill object
    return (
      <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md shadow-lg border border-border text-foreground text-sm">
        <p className="font-bold mb-1">{`${label} (${data.level}%)`}</p>
        <p className="text-xs text-foreground/80">{data.details}</p>
      </div>
    );
  }
  return null;
};

// Custom tick for XAxis to handle long labels
const CustomizedAxisTick = (props: any) => {
  const { x, y, payload, width } = props;
  const maxTextWidth = width / techCategories[0].skills.length - 10; // Approximate max width for text
  
  return (
    <Text x={x} y={y} width={maxTextWidth} textAnchor="middle" verticalAnchor="start" className="text-xs fill-muted-foreground">
      {payload.value}
    </Text>
  );
};

interface DevelopmentStep {
  title: string;
  icon: LucideIcon;
}

const developmentProcessSteps: DevelopmentStep[] = [
  { title: "Discovery", icon: Search },
  { title: "Design", icon: Palette },
  { title: "Development", icon: Code2 },
  { title: "Testing", icon: ClipboardCheck },
  { title: "Deployment", icon: Rocket },
  { title: "Support", icon: LifeBuoy },
];

export default function TechExpertiseSection() {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? "#A1A1AA" : "#71717A"; // Zinc 400 / Zinc 500 from Tailwind
  const gridColor = theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const primaryColor = "hsl(var(--primary))";


  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technology Stack & Expertise
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We harness the power of modern technologies to build exceptional software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techCategories.map((category, catIndex) => (
            <Card key={category.name} className="animate-fade-in shadow-lg bg-card" style={{ animationDelay: `${catIndex * 150}ms` }}>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <category.icon className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-2xl text-card-foreground">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={category.skills} margin={{ top: 5, right: 0, left: -25, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis 
                      dataKey="name" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={<CustomizedAxisTick />}
                      interval={0}
                      dy={10}
                      className="text-xs"
                      stroke={tickColor}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[0, 100]} 
                      tickFormatter={(value) => `${value}%`} 
                      className="text-xs"
                      stroke={tickColor}
                    />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.5 }} 
                      content={<CustomTooltipContent />} 
                    />
                    <Bar dataKey="level" fill={primaryColor} radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Our Development Process</h3>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12">
              A transparent and agile approach to ensure project success from concept to launch.
            </p>
            <div className="relative border-l-2 border-primary/50 pl-6 py-8 space-y-16 
                            md:border-l-0 md:border-t-2 md:flex md:space-y-0 md:min-h-[16rem] md:items-center md:px-4">
              {developmentProcessSteps.map((step, index) => {
                const isAlternatingUp = (index + 1) % 2 === 0; 

                return (
                  <div key={step.title} className="relative md:flex-1 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                    {/* Mobile View: Icon left, Text right */}
                    <div className="md:hidden flex items-center relative py-2">
                      <div className="absolute -left-[calc(1.5rem+1px)] top-1/2 -translate-y-1/2 z-10">
                           <div className="h-12 w-12 rounded-full bg-primary border-4 border-background flex items-center justify-center text-primary-foreground">
                              <step.icon className="h-6 w-6" />
                          </div>
                      </div>
                      <div className="ml-10 pl-2">
                        <h4 className="text-xl font-semibold text-primary">{step.title}</h4>
                      </div>
                    </div>

                    {/* Desktop View: Icon & Title group alternating above/below the line */}
                    <div className="hidden md:block relative text-center">
                       <div className={cn(
                        "flex flex-col items-center",
                        isAlternatingUp 
                          ? "mb-16" // Pushes the group UP from the timeline
                          : "mt-16"  // Pushes the group DOWN from the timeline
                      )}>
                        <div className="h-12 w-12 rounded-full bg-primary border-4 border-background flex items-center justify-center text-primary-foreground">
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h4 className="mt-2 text-xl font-semibold text-primary whitespace-nowrap">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>

      </div>
    </section>
  );
}

