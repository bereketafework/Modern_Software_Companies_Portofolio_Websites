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
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote: "Apex Solutions delivered an outstanding product that exceeded our expectations. Their team is professional, skilled, and truly understood our vision.",
    name: "Jane Doe",
    title: "CEO",
    company: "Innovatech Ltd.",
    avatarUrl: "https://placehold.co/100x100.png?text=JD",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote: "Working with Apex Solutions was a game-changer for us. Their expertise in cloud solutions helped us scale our operations seamlessly.",
    name: "John Smith",
    title: "CTO",
    company: "TechCorp Inc.",
    avatarUrl: "https://placehold.co/100x100.png?text=JS",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote: "The mobile app they developed for us has received fantastic user feedback. Highly recommend Apex for their quality and dedication.",
    name: "Alice Brown",
    title: "Product Manager",
    company: "MobileFirst Co.",
    avatarUrl: "https://placehold.co/100x100.png?text=AB",
    rating: 4,
  },
];

const clientLogos = [
  { name: "ClientAlpha", logoUrl: "https://placehold.co/150x60.png?text=ClientAlpha", aiHint: "company logo" },
  { name: "ClientBeta", logoUrl: "https://placehold.co/150x60.png?text=ClientBeta", aiHint: "company logo" },
  { name: "ClientGamma", logoUrl: "https://placehold.co/150x60.png?text=ClientGamma", aiHint: "company logo" },
  { name: "ClientDelta", logoUrl: "https://placehold.co/150x60.png?text=ClientDelta", aiHint: "company logo" },
  { name: "ClientEpsilon", logoUrl: "https://placehold.co/150x60.png?text=ClientEpsilon", aiHint: "company logo" },
  { name: "ClientZeta", logoUrl: "https://placehold.co/150x60.png?text=ClientZeta", aiHint: "company logo" },
];

const successMetrics = [
  { value: 500, label: "Happy Clients", icon: Users, suffix: "+" },
  { value: 99, label: "Project Success Rate", icon: CheckCircle, suffix: "%" },
  { value: 30, label: "Avg. ROI Increase", icon: TrendingUp, suffix: "%" },
];

const CountUpNumber = ({ endValue, duration = 1500, suffix = "" }: { endValue: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const incrementTime = (duration / endValue);
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === endValue) {
              clearInterval(timer);
            }
          }, incrementTime);
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
        observer.unobserve(ref.current);
      }
    };
  }, [endValue, duration]);

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

        {/* Testimonial Carousel (Simplified) */}
        <div className="relative max-w-3xl mx-auto mb-16 h-80 md:h-72"> {/* Fixed height for smoother transitions */}
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentTestimonial ? "opacity-100 z-10" : "opacity-0 z-0"
              } bg-card text-card-foreground shadow-xl p-8 flex flex-col items-center text-center`}
            >
                <Avatar className="h-20 w-20 mb-4 border-4 border-primary/20">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint="person portrait" />
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
           {/* Manual navigation dots for carousel */}
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


        {/* Success Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16 mt-24">
          {successMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-muted/30 dark:bg-muted/10 p-6 rounded-xl shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <metric.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">
                <CountUpNumber endValue={metric.value} suffix={metric.suffix} />
              </p>
              <p className="text-sm text-foreground/70">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Trusted by Industry Leaders</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
          {clientLogos.map((client, index) => (
            <div key={client.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Image
                src={client.logoUrl}
                alt={client.name}
                width={120}
                height={50}
                className="object-contain h-10 filter grayscale hover:grayscale-0 transition-all duration-300 ease-in-out opacity-60 hover:opacity-100"
                data-ai-hint={client.aiHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
