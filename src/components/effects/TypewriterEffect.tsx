"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export default function TypewriterEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
}: TypewriterEffectProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const handleTyping = () => {
      const fullText = texts[textIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex -1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className="relative">
      {currentText}
      <span className="absolute -right-1 bottom-0 top-0 inline-block w-0.5 bg-primary animate-[blink_0.7s_infinite]" aria-hidden="true"></span>
    </span>
  );
}
