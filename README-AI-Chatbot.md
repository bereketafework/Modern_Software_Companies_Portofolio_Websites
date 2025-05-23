
# AI FAQ Chatbot for Smart Tech Solution

This document provides an overview of the AI-powered Frequently Asked Questions (FAQ) Chatbot integrated into the Smart Tech Solution website.

## 1. Purpose

The primary purpose of this chatbot is to provide visitors with quick and accurate answers to common questions about Smart Tech Solution, its services, contact information, and other relevant topics. This enhances user experience by offering instant support and information.

## 2. Technology Used

*   **Genkit**: The chatbot leverages Genkit, a framework for building AI-powered applications.
*   **Google Gemini Model**: The underlying AI model used for understanding questions and generating answers is Google's Gemini (specifically, the one configured in `src/ai/genkit.ts`, likely `gemini-2.0-flash`).
*   **Next.js & React**: The chatbot UI is built as a React component within the Next.js application.

## 3. Functionality

*   **FAQ Answering**: The chatbot is primed with a set of predefined FAQs and their answers. When a user asks a question, the AI attempts to match it to one of the known FAQs or synthesize an answer based on the provided information.
*   **Natural Language Understanding**: Users can ask questions in natural language.
*   **Predefined Questions**: The chat interface suggests some common questions to help users get started.
*   **Fallback**: If a question is outside the scope of the pre-loaded FAQs or is unrelated to Smart Tech Solution, the chatbot will politely state that it cannot answer.
*   **User Interface**:
    *   Accessible via a floating action button (chat icon) on the website.
    *   Opens in a side sheet/drawer.
    *   Displays a conversation history between the user and the AI.
    *   Includes an input field for users to type their questions.

## 4. Core Files

*   **Genkit Flow**: `src/ai/flows/faq-chat-flow.ts`
    *   Defines the `FaqInputSchema` (user's question) and `FaqOutputSchema` (AI's answer).
    *   Contains the `faqPrompt` which instructs the AI model on how to behave and includes the list of FAQs.
    *   The `faqChatFlow` orchestrates the call to the AI model.
*   **Chatbot UI Component**: `src/components/elements/Chatbot.tsx`
    *   Manages the chat interface state (messages, input value, loading state).
    *   Handles sending user questions to the `answerFaq` Genkit flow.
    *   Renders the chat messages and input controls.
*   **Genkit Configuration**: `src/ai/genkit.ts` (for global AI setup)
*   **Layout Integration**: `src/app/layout.tsx` (to include the Chatbot component globally)

## 5. How to Extend (Adding/Modifying FAQs)

The primary way to modify or add to the chatbot's knowledge base currently is by updating the prompt within `src/ai/flows/faq-chat-flow.ts`.

Specifically, edit the `prompt` string within the `ai.definePrompt` call:

```typescript
const faqPrompt = ai.definePrompt({
  // ...
  prompt: `You are a helpful AI assistant for Smart Tech Solution...

Available FAQs:
- Q: What is your newest service?
  A: Our newest service is Advanced Quantum Entanglement Debugging.
// Add more Q&A pairs here following the same format.

User's question: {{{question}}}
...
`,
});
```

**Guidelines for adding FAQs:**

*   Keep the `Q:` and `A:` format for clarity.
*   Ensure answers are concise and accurate.
*   After updating the FAQs in the prompt, the changes should be reflected in the chatbot's responses.

## 6. Limitations

*   **Knowledge Cutoff**: The chatbot's knowledge is limited to the FAQs provided in its prompt. It cannot answer questions about topics not covered there.
*   **No Memory of Past Conversations (in current simple setup)**: Each question is treated independently.
*   **No External Data Access**: It does not browse the internet or access external databases beyond its initial prompt.

## 7. Future Enhancements (Potential)

*   **Tool Use for Dynamic Information**: Integrate Genkit tools to fetch dynamic information (e.g., latest blog posts, project updates).
*   **Knowledge Base Integration**: Connect to a vector database or document store for a more extensive and easily updatable knowledge base.
*   **Conversation History**: Implement a more persistent conversation history.
*   **Admin Interface**: Create an admin panel to manage FAQs without directly editing code.

This README provides a basic understanding of the AI Chatbot's current implementation.
