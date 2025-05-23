
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Send, MessageSquare, Loader2, User, Bot } from "lucide-react";
import type { FaqInput, FaqOutput } from "@/ai/flows/faq-chat-flow"; // Ensure correct path
import { answerFaq } from "@/ai/flows/faq-chat-flow"; // Ensure correct path
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commonQuestions = [
    "What services do you offer?",
    "Where are you located?",
    "How can I contact you?",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Slight delay to ensure sheet is fully open and input is visible
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);


  const handleSendMessage = async (questionText?: string) => {
    const textToProcess = questionText || inputValue;
    if (!textToProcess.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToProcess,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const input: FaqInput = { question: textToProcess };
      const result: FaqOutput = await answerFaq(input);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: result.answer,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling FAQ flow:", error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      // Refocus input after AI responds
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessages([]); // Clear previous messages for a fresh start with a quick question
    handleSendMessage(question);
  };

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full shadow-lg p-3 h-14 w-14 bg-cta-accent text-cta-accent-foreground hover:bg-cta-accent/90 hover:scale-110 transition-all"
        aria-label="Open AI Chat Assistant"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full max-w-md flex flex-col p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-lg font-semibold text-foreground">AI Assistant</SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Ask me anything about Smart Tech Solution!
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg max-w-[85%]",
                    msg.sender === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "mr-auto bg-muted text-muted-foreground"
                  )}
                >
                  {msg.sender === 'ai' && <Bot className="h-5 w-5 shrink-0 mt-0.5 text-accent" />}
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'user' && <User className="h-5 w-5 shrink-0 mt-0.5" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-start gap-3 p-3 rounded-lg bg-muted text-muted-foreground max-w-[85%] mr-auto">
                  <Bot className="h-5 w-5 shrink-0 mt-0.5 text-accent" />
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
            </div>
             {messages.length === 0 && !isLoading && (
              <div className="text-center text-muted-foreground p-4 space-y-3">
                <p>Ask a question or try one of these common topics:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {commonQuestions.map(q => (
                    <Button key={q} variant="outline" size="sm" onClick={() => handleQuickQuestion(q)} className="text-xs">
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
          <div className="border-t p-4 bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow bg-muted focus-visible:ring-primary"
                disabled={isLoading}
                aria-label="Your question for the AI assistant"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
