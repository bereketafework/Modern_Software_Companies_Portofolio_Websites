
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
  { name: "Google", logoUrl: "https://placehold.co/150x60.png?text=Google", aiHint: "Google logo" },
  { name: "Microsoft", logoUrl: "https://placehold.co/150x60.png?text=Microsoft", aiHint: "Microsoft logo" },
  { name: "Tesla", logoUrl: "https://placehold.co/150x60.png?text=Tesla", aiHint: "Tesla logo" },
  { name: "Meta", logoUrl: "https://placehold.co/150x60.png?text=Meta", aiHint: "Meta logo" },
  { name: "Amazon", logoUrl: "https://placehold.co/150x60.png?text=Amazon", aiHint: "Amazon logo" },
  { name: "Netflix", logoUrl: "https://placehold.co/150x60.png?text=Netflix", aiHint: "Netflix logo" },
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Use optional chaining for safety
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
    }, 5000); // Auto-play every 5 seconds
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
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.aiHintAvatar || "person portrait"} />
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
          <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 flex space-x-2">
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
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
          {clientLogos.map((client, index) => (
            <div key={client.name} className="animate-fade-in group" style={{ animationDelay: `${index * 100}ms` }}>
              <Image
                src={client.logoUrl}
                alt={client.name}
                width={120}
                height={50}
                className="object-contain h-10 filter grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out opacity-60 group-hover:opacity-100 group-hover:scale-105"
                data-ai-hint={client.aiHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
