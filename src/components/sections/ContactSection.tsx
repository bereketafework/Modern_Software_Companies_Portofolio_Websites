"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Send, MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form data extraction
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // In a real app, you'd send this data to a backend API
    console.log("Form submitted:", { name, email, message });

    // Show a success toast
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll be in touch soon.",
      variant: "default",
    });

    // Reset the form (optional)
    event.currentTarget.reset();
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="mt-1 bg-background"
                  aria-label="Full Name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1 bg-background"
                  aria-label="Email Address"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  required
                  className="mt-1 bg-background"
                  aria-label="Your Message"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-cta-accent text-cta-accent-foreground hover:bg-cta-accent/90 transition-colors duration-300 text-base py-3"
                  aria-label="Send message"
                >
                  Send Message <Send className="ml-2 h-4 w-4" />
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
                    <p>123 Tech Avenue, Silicon Valley, CA 94000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Email Us</h4>
                    <Link href="mailto:info@apexsolutions.dev" className="hover:text-primary transition-colors">
                      info@apexsolutions.dev
                    </Link>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Call Us</h4>
                    <Link href="tel:+1234567890" className="hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-lg bg-card overflow-hidden">
               <h3 className="text-xl font-semibold text-card-foreground p-6 pb-0">Our Location</h3>
               {/* Interactive Office Location Map Placeholder */}
              <div className="aspect-w-16 aspect-h-9 bg-muted">
                  <Image
                    src="https://placehold.co/600x400.png?text=Office+Location+Map"
                    alt="Office Location Map"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint="office map"
                  />
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Floating Chat Widget Placeholder */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full shadow-lg p-3 h-14 w-14 bg-cta-accent text-cta-accent-foreground hover:bg-cta-accent/90"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </section>
  );
}

// Need to define Card component if not already globally available from ShadCN
// Assuming Card, CardHeader, CardTitle, CardContent are from "@/components/ui/card"
import { Card as ShadCard, CardContent as ShadCardContent, CardHeader as ShadCardHeader, CardTitle as ShadCardTitle } from "@/components/ui/card";

// Re-exporting with simpler names for this file, or ensure imports are correct
const Card = ShadCard;
// const CardContent = ShadCardContent; // Not needed if CardContent is used from import
// const CardHeader = ShadCardHeader; // Not needed if CardHeader is used from import
// const CardTitle = ShadCardTitle; // Not needed if CardTitle is used from import

