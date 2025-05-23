
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, MapPin, Phone, Mail, ExternalLink, Clock } from "lucide-react";
import Link from "next/link";
import { Card as ShadCard } from "@/components/ui/card"; 

const Card = ShadCard;

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit: handleFormSubmit, 
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form submitted:", data);

    const mailtoLink = `mailto:bereketbeki64@gmail.com?subject=Contact from ${encodeURIComponent(data.name)} - Smart Tech Solution Inquiry&body=${encodeURIComponent(data.message)}%0A%0AReply to: ${data.email}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Message Prepared!",
      description: "Your email client should open with the message details. If not, please copy the details manually.",
      variant: "default",
    });

    reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="p-6 sm:p-8 shadow-lg bg-card animate-slide-up">
            <h3 className="text-2xl font-semibold text-card-foreground mb-6">Send us a message</h3>
            <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 bg-background"
                  aria-label="Full Name"
                  {...register("name", { required: "Full name is required." })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 bg-background"
                  aria-label="Email Address"
                  {...register("email", { 
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address."
                    } 
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  className="mt-1 bg-background"
                  aria-label="Your Message"
                  {...register("message", { required: "Message is required." })}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-cta-accent text-cta-accent-foreground hover:bg-cta-accent/90 transition-colors duration-300 text-base py-3 group"
                  aria-label="Send message"
                >
                  Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </Card>

          <div className="space-y-8 animate-slide-up" style={{animationDelay: "200ms"}}>
            <Card className="p-6 sm:p-8 shadow-lg bg-card">
              <h3 className="text-2xl font-semibold text-card-foreground mb-6">Contact Information</h3>
              <div className="space-y-4 text-card-foreground/80">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Our Office</h4>
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Email Us</h4>
                    <Link href="mailto:bereketbeki64@gmail.com" className="hover:text-primary transition-colors">
                      bereketbeki64@gmail.com
                    </Link>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Call Us</h4>
                    <Link href="tel:+251931555192" className="hover:text-primary transition-colors">
                      +251 931 555 192
                    </Link>
                  </div>
                </div>
                 <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Working Hours</h4>
                    <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-lg bg-card group hover:bg-muted/20 transition-colors duration-200 p-6">
              <Link 
                href="https://maps.app.goo.gl/76aZzzWTotYGKVEq7" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View location on Google Maps"
                className="block"
              >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-card-foreground">Our Location</h3>
                    <ExternalLink className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                </div>
              </Link>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://maps.google.com/maps?q=Tikur%20Anbessa%20Specialized%20Hospital%2C%20Addis%20Ababa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border:0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map Preview"
                  className="w-full h-64 rounded-md shadow-md"
                  data-ai-hint="embedded map addis ababa hospital"
                ></iframe>
              </div>
              <p className="mt-3 text-sm text-center text-muted-foreground">
                <Link 
                  href="https://maps.app.goo.gl/76aZzzWTotYGKVEq7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-primary"
                >
                  Click to view full map
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
