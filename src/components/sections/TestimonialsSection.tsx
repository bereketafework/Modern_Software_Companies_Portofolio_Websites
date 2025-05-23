
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl?: string;
  aiHintAvatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote: "Smart Tech Solution delivered an outstanding product that exceeded our expectations. Their team is professional, skilled, and truly understood our vision.",
    name: "Jane Doe",
    title: "CEO",
    company: "Innovatech Ltd.",
    avatarUrl: "https://placehold.co/100x100.png?text=JD",
    aiHintAvatar: "female executive portrait",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote: "Working with Smart Tech Solution was a game-changer for us. Their expertise in cloud solutions helped us scale our operations seamlessly.",
    name: "John Smith",
    title: "CTO",
    company: "TechCorp Inc.",
    avatarUrl: "https://placehold.co/100x100.png?text=JS",
    aiHintAvatar: "male tech executive",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote: "The mobile app they developed for us has received fantastic user feedback. Highly recommend Smart Tech Solution for their quality and dedication.",
    name: "Alice Brown",
    title: "Product Manager",
    company: "MobileFirst Co.",
    avatarUrl: "https://placehold.co/100x100.png?text=AB",
    aiHintAvatar: "female product manager",
    rating: 4,
  },
];

const clientLogos = [
  { name: "Google", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png", aiHint: "Google logo" },
  { name: "Microsoft", logoUrl: "https://threatconnect.com/wp-content/uploads/2019/05/Microsoft-Logo.png", aiHint: "Microsoft logo" },
  { name: "GitHub", logoUrl: "https://nextgen.group/hubfs/github_PNG65.png", aiHint: "GitHub logo" },
  { name: "Apple", logoUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8e/fb/c1/8efbc1ca-8c84-1eea-d8c9-c2fa4d0a9612/AppIcon-0-1x_U007emarketing-0-8-0-85-220-0.png/1200x600wa.png", aiHint: "Apple logo" },
  { name: "Redbubble Design", logoUrl: "https://ih1.redbubble.net/image.4738350686.1489/flat,750x,075,f-pad,750x1000,f8f8f8.jpg", aiHint: "Creative design logo" },
];

const successMetrics = [
  { value: 500, label: "Happy Clients", icon: Users, suffix: "+" },
  { value: 99, label: "Project Success Rate", icon: CheckCircle, suffix: "%" },
  { value: 30, label: "Avg. ROI Increase", icon: TrendingUp, suffix: "%" },
];

const CountUpNumber = ({ endValue, duration = 1500, suffix = "" }: { endValue: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); 
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const stepTime = Math.max(10, Math.floor(duration / endValue));
      const increment = Math.max(1, Math.ceil(endValue / (duration / stepTime)));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, endValue, duration]);


  return <span ref={ref} className="animate-count-up">{count}{suffix}</span>;
};


export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); 
    return () => clearTimeout(timer);
  }, [currentTestimonial]);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We pride ourselves on building strong relationships and delivering exceptional value.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto mb-16 h-80 md:h-72">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentTestimonial ? "opacity-100 z-10" : "opacity-0 z-0"
              } bg-card text-card-foreground shadow-xl p-8 flex flex-col items-center text-center`}
            >
                <Avatar className="h-20 w-20 mb-4 border-4 border-primary/20">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.aiHintAvatar || "person portrait"} loading="lazy"/>
                  <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <p className="text-lg italic text-card-foreground/90 mb-4">"{testimonial.quote}"</p>
                <div className="flex mb-2">
                  {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                <p className="text-sm text-card-foreground/70">{testimonial.title}, {testimonial.company}</p>
            </Card>
          ))}
          <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {testimonials.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-primary" : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16 mt-24">
          {successMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-muted/30 dark:bg-muted/10 p-6 rounded-xl shadow-lg animate-slide-up hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <metric.icon className="h-10 w-10 text-primary mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <p className="text-3xl font-bold text-foreground">
                <CountUpNumber endValue={metric.value} suffix={metric.suffix} />
              </p>
              <p className="text-sm text-foreground/70">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Trusted by Industry Leaders</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8">
          {clientLogos.map((client, index) => (
            <div key={client.name} className="animate-fade-in group" style={{ animationDelay: `${index * 100}ms` }}>
              <Image
                src={client.logoUrl}
                alt={client.name}
                width={130} // Increased from 120
                height={55}  // Increased from 50, adjust as needed for aspect ratio
                className="object-contain h-12 filter grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out opacity-60 group-hover:opacity-100 group-hover:scale-105 rounded-md"
                data-ai-hint={client.aiHint}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
