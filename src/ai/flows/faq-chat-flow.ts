
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
If a question is not covered by the FAQs or is unrelated to Smart Tech Solution, politely state that you cannot answer it.

Available FAQs:
- Q: What services does Smart Tech Solution offer?
  A: Smart Tech Solution offers a comprehensive suite of services including Custom Software Development, Web Application Development, Mobile App Development, Cloud Solutions, UI/UX Design, and DevOps & Automation.

- Q: Where is Smart Tech Solution located?
  A: Smart Tech Solution is located in the Tikur Anbessa Hospital Area, Addis Ababa, Ethiopia.

- Q: How can I contact Smart Tech Solution?
  A: You can contact us via email at info@smarttechsolution.dev, call us at +251 912 345 678, or use the contact form on our website.

- Q: What technologies does Smart Tech Solution specialize in?
  A: We specialize in a wide range of modern technologies including React, Next.js, Node.js, Python (Django/Flask), Java (Spring Boot), Go, cloud platforms like AWS, GCP, and Azure, as well as DevOps tools like Docker, Kubernetes, and CI/CD pipelines. You can find more details in the "Technology Stack & Expertise" section of our website.

- Q: Can I get a quote for my project?
  A: Yes, absolutely! Please use the contact form on our website to send us details about your project, or reach out via email or phone, and we'll be happy to provide you with a free quote.

- Q: Who developed this website?
  A: This website was developed by Bereket Afework for Smart Tech Solution.

User's question: {{{question}}}

Based on the FAQs, provide a concise answer.
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
    if (!output) {
      return { answer: "I'm sorry, I couldn't generate a response at this moment." };
    }
    return output;
  }
);
