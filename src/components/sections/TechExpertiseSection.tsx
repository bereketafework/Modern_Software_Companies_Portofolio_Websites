import SkillBar from "@/components/elements/SkillBar";
import { Code, Database, Cloud, TerminalSquare } from "lucide-react";

const techCategories = [
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
      { name: "Amazon Web Services (AWS)", level: 90, details: "Designing, deploying, and managing scalable applications on AWS (EC2, S3, Lambda, RDS, etc.)." },
      { name: "Google Cloud Platform (GCP)", level: 85, details: "Leveraging GCP services for data analytics, machine learning, and application hosting." },
      { name: "Microsoft Azure", level: 80, details: "Building and managing cloud solutions on Azure, including VMs, App Service, and Azure Functions." },
    ],
  },
  {
    name: "DevOps & Automation",
    icon: TerminalSquare,
    skills: [
      { name: "Docker", level: 95, details: "Containerizing applications for consistent development and deployment environments." },
      { name: "Kubernetes", level: 85, details: "Orchestrating containerized applications at scale with Kubernetes." },
      { name: "CI/CD (Jenkins, GitHub Actions)", level: 90, details: "Implementing automated build, test, and deployment pipelines." },
      { name: "Terraform", level: 80, details: "Managing infrastructure as code for reproducible and version-controlled environments." },
    ],
  },
];

export default function TechExpertiseSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technology Stack
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We harness the power of modern technologies to build exceptional software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {techCategories.map((category, catIndex) => (
            <div key={category.name} className="animate-fade-in" style={{ animationDelay: `${catIndex * 200}ms` }}>
              <div className="flex items-center mb-6">
                <category.icon className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-semibold text-foreground">{category.name}</h3>
              </div>
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    experienceDetails={skill.details}
                    animationDelay={`${skillIndex * 100}ms`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Placeholder for Development Process Timeline */}
        <div className="mt-20 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Our Development Process</h3>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
              A transparent and agile approach to ensure project success from concept to launch.
            </p>
            <div className="relative border-l-2 border-primary pl-8 py-4 space-y-12 md:border-l-0 md:border-t-2 md:flex md:space-y-0 md:space-x-8 md:py-8 md:pl-0">
              {["Discovery", "Design", "Development", "Testing", "Deployment", "Support"].map((step, index) => (
                <div key={step} className="relative md:flex-1 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="absolute -left-[38px] top-0 h-6 w-6 rounded-full bg-primary border-4 border-background md:hidden"></div>
                  <div className="hidden md:block absolute -top-[15px] left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary border-4 border-background"></div>
                  <div className="md:text-center">
                    <h4 className="text-lg font-semibold text-primary mb-1">{`0${index + 1}. ${step}`}</h4>
                    <p className="text-sm text-foreground/70">Details about the {step.toLowerCase()} phase would go here, explaining our approach.</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

      </div>
    </section>
  );
}
