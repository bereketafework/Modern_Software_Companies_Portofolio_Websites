"use client";

import { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  skill: string;
  level: number; // 0-100
  experienceDetails: string;
  animationDelay?: string;
}

export default function SkillBar({ skill, level, experienceDetails, animationDelay = "0s" }: SkillBarProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay the start of the animation
          setTimeout(() => {
            setAnimatedLevel(level);
          }, parseFloat(animationDelay) * 1000);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [level, animationDelay]);

  return (
    <div ref={ref} className="mb-4 group">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{skill}</span>
                <span className="text-sm font-medium text-primary">{animatedLevel}%</span>
              </div>
              <Progress
                value={animatedLevel}
                className={cn("h-3 transition-all duration-1000 ease-out", animatedLevel > 0 ? "opacity-100" : "opacity-0")}
                aria-label={`${skill} proficiency: ${level}%`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-card text-card-foreground border-border shadow-lg rounded-md p-3 max-w-xs">
            <p className="text-sm">{experienceDetails}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
