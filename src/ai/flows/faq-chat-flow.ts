
'use server';
/**
 * @fileOverview A simple FAQ chatbot for Smart Tech Solution.
 *
 * - answerFaq - A function that takes a user's question and returns an answer.
 * - FaqInput - The input type for the answerFaq function.
 * - FaqOutput - The return type for the answerFaq function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FaqInputSchema = z.object({
  question: z.string().describe('The user question about Smart Tech Solution.'),
});
export type FaqInput = z.infer<typeof FaqInputSchema>;

const FaqOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type FaqOutput = z.infer<typeof FaqOutputSchema>;

export async function answerFaq(input: FaqInput): Promise<FaqOutput> {
  return faqChatFlow(input);
}

const faqPrompt = ai.definePrompt({
  name: 'faqChatPrompt',
  input: { schema: FaqInputSchema },
  output: { schema: FaqOutputSchema },
  prompt: `You are a helpful AI assistant for Smart Tech Solution, a software development company.
Your goal is to answer frequently asked questions based on the information provided below.
If a question is not covered by the FAQs or is unrelated to Smart Tech Solution, politely state that you cannot answer it and suggest contacting the company directly with the provided contact information.

Available FAQs:
- Q: What services does Smart Tech Solution offer?
  A: Smart Tech Solution offers a comprehensive suite of services including Custom Software Development, Web Application Development, Mobile App Development, Cloud Solutions, UI/UX Design, and DevOps & Automation.

- Q: Where is Smart Tech Solution located?
  A: Smart Tech Solution is located in the Tikur Anbessa Hospital Area, Addis Ababa, Ethiopia.

- Q: How can I contact Smart Tech Solution?
  A: You can contact us via email at info@smarttechsolution.dev, call us at +251 931 555 192, or use the contact form on our website.

- Q: What technologies does Smart Tech Solution specialize in?
  A: We specialize in a wide range of modern technologies including React, Next.js, Node.js, Python (Django/Flask), Java (Spring Boot), Go, cloud platforms like AWS, GCP, and Azure, as well as DevOps tools like Docker, Kubernetes, and CI/CD pipelines. You can find more details in the "Technology Stack & Expertise" section of our website.

- Q: Can I get a quote for my project?
  A: Yes, absolutely! Please use the contact form on our website to send us details about your project, or reach out via email or phone, and we'll be happy to provide you with a free quote.

- Q: Who developed this website?
  A: This website was developed by Bereket Afework for Smart Tech Solution.

- Q: How long does a typical project take?
  A: Project timelines vary significantly depending on the complexity, scope, and specific requirements. A small, well-defined project might take a few weeks, while larger, more intricate solutions can span several months. We provide a detailed timeline estimate after an initial consultation and requirements gathering phase.

- Q: What are your pricing models?
  A: We offer flexible pricing models to suit different project needs. This includes fixed-price models for projects with clearly defined scopes, and time & materials (T&M) for more dynamic or ongoing projects. We discuss these options transparently to find the best fit for your budget and project goals.

- Q: Do you offer support and maintenance after the project is completed?
  A: Yes, we offer various post-launch support and maintenance packages. These can include bug fixes, performance monitoring, security updates, and feature enhancements to ensure your application runs smoothly and stays relevant.

- Q: How do I start a project with Smart Tech Solution?
  A: The best way to start is to reach out to us! You can use the contact form on our website, send an email to info@smarttechsolution.dev, or call us at +251 931 555 192. We'll schedule an initial consultation (free of charge) to discuss your ideas, requirements, and how we can help.

- Q: What is your development process like?
  A: We follow an agile development process that typically includes stages like Discovery (understanding your needs), Design (UI/UX and architecture), Development (coding and implementation), Testing (QA and bug fixing), Deployment (launching your product), and ongoing Support. We believe in transparent communication and collaboration throughout the project lifecycle.

User's question: {{{question}}}

Based on the FAQs, provide a concise answer. If the question is not covered, or you cannot confidently answer, state that you cannot provide the information and suggest they contact Smart Tech Solution directly at info@smarttechsolution.dev or +251 931 555 192.
`,
});

const faqChatFlow = ai.defineFlow(
  {
    name: 'faqChatFlow',
    inputSchema: FaqInputSchema,
    outputSchema: FaqOutputSchema,
  },
  async (input) => {
    const { output } = await faqPrompt(input);
    if (!output || !output.answer || output.answer.trim() === "") {
      return { 
        answer: "I'm sorry, I couldn't find a specific answer to your question in my current knowledge base. For more detailed inquiries or if your question isn't covered, please feel free to contact us directly at info@smarttechsolution.dev or call +251 931 555 192. We'd be happy to assist you!" 
      };
    }
    // Check if the AI itself decided it couldn't answer, based on the prompt instructions
    if (output.answer.toLowerCase().includes("contact smart tech solution directly") || output.answer.toLowerCase().includes("cannot provide the information")) {
        return {
             answer: "I'm sorry, I couldn't find a specific answer to your question in my current knowledge base. For more detailed inquiries or if your question isn't covered, please feel free to contact us directly at info@smarttechsolution.dev or call +251 931 555 192. We'd be happy to assist you!" 
        }
    }
    return output;
  }
);
