
# Smart Tech Solution Portfolio - Next.js Starter in Firebase Studio

This project is a modern portfolio website for "Smart Tech Solution," a software development company. It's built using Next.js, React, ShadCN UI components, Tailwind CSS, and Genkit for AI-powered features. This starter was initialized in Firebase Studio.

## Core Features

The portfolio showcases the company's services, projects, and expertise with a focus on a professional and engaging user experience.

*   **Dynamic Hero Section**: Features a typewriter effect for services offered.
*   **Interactive Service Cards**: Displays services with animated icons and descriptions.
*   **Filterable Portfolio Grid**: A masonry-style grid for showcasing projects, filterable by project type.
*   **Technology Expertise Charts**: Uses bar charts to display proficiency in various technologies (Frontend, Backend, Cloud, DevOps).
*   **Client Testimonials**: Includes a testimonial carousel and a grid of client logos.
*   **Interactive Contact Form**: Features real-time validation and an embedded map for the office location.
*   **AI-Powered FAQ Chatbot**: Provides instant answers to common questions about Smart Tech Solution.
*   **Responsive Design**: Ensures optimal viewing across various devices.
*   **Theme Toggle**: Allows users to switch between light and dark modes.
*   **Smooth Scrolling & Animations**: Subtle transitions and effects to enhance user engagement.

## Getting Started

To get started with developing or exploring the application:

1.  **Install Dependencies**:
    If you haven't already, install the project dependencies:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

3.  **Explore the Code**:
    The main entry point for the pages is `src/app/page.tsx`, which aggregates the different sections of the portfolio.
    Individual sections (Hero, Services, Portfolio, etc.) can be found in `src/components/sections/`.
    UI components are primarily from ShadCN (located in `src/components/ui/`) and custom elements are in `src/components/elements/`.

## AI FAQ Chatbot

The application includes an AI-powered Frequently Asked Questions (FAQ) Chatbot to provide visitors with quick and accurate answers about Smart Tech Solution.

### 1. Purpose

The primary purpose of this chatbot is to provide visitors with quick and accurate answers to common questions about Smart Tech Solution, its services, contact information, and other relevant topics. This enhances user experience by offering instant support and information.

### 2. Technology Used

*   **Genkit**: The chatbot leverages Genkit, a framework for building AI-powered applications.
*   **Google Gemini Model**: The underlying AI model used for understanding questions and generating answers is Google's Gemini (specifically, the one configured in `src/ai/genkit.ts`, likely `gemini-2.0-flash`).
*   **Next.js & React**: The chatbot UI is built as a React component within the Next.js application.

### 3. Functionality

*   **FAQ Answering**: The chatbot is primed with a set of predefined FAQs and their answers. When a user asks a question, the AI attempts to match it to one of the known FAQs or synthesize an answer based on the provided information.
*   **Natural Language Understanding**: Users can ask questions in natural language.
*   **Predefined Questions**: The chat interface suggests some common questions to help users get started.
*   **Fallback**: If a question is outside the scope of the pre-loaded FAQs or is unrelated to Smart Tech Solution, the chatbot will politely state that it cannot answer and suggest contacting the company directly with the provided contact information.
*   **User Interface**:
    *   Accessible via a floating action button (chat icon) on the website (bottom-left).
    *   Opens in a side sheet/drawer.
    *   Displays a conversation history between the user and the AI.
    *   Includes an input field for users to type their questions.

### 4. Core Files for Chatbot

*   **Genkit Flow**: `src/ai/flows/faq-chat-flow.ts`
    *   Defines the `FaqInputSchema` (user's question) and `FaqOutputSchema` (AI's answer).
    *   Contains the `faqPrompt` which instructs the AI model on how to behave and includes the list of FAQs.
    *   The `faqChatFlow` orchestrates the call to the AI model and handles fallback responses.
*   **Chatbot UI Component**: `src/components/elements/Chatbot.tsx`
    *   Manages the chat interface state (messages, input value, loading state).
    *   Handles sending user questions to the `answerFaq` Genkit flow.
    *   Renders the chat messages and input controls.
*   **Genkit Configuration**: `src/ai/genkit.ts` (for global AI setup)
*   **Layout Integration**: `src/app/layout.tsx` (to include the Chatbot component globally)

### 5. How to Extend (Adding/Modifying FAQs)

The primary way to modify or add to the chatbot's knowledge base is by updating the prompt within `src/ai/flows/faq-chat-flow.ts`.

Specifically, edit the `prompt` string within the `ai.definePrompt` call:

```typescript
const faqPrompt = ai.definePrompt({
  // ...
  prompt: `You are a helpful AI assistant for Smart Tech Solution...

Available FAQs:
- Q: What is your newest service?
  A: Our newest service is Advanced Quantum Entanglement Debugging. // Example
// Add more Q&A pairs here following the same format.
// Example of a new FAQ:
// - Q: What industries do you serve?
//   A: We serve a diverse range of industries including retail, healthcare, logistics, entertainment, finance, and the public sector.

User's question: {{{question}}}
...
`,
});
```

**Guidelines for adding FAQs:**

*   Keep the `Q:` and `A:` format for clarity.
*   Ensure answers are concise and accurate.
*   After updating the FAQs in the prompt, the changes should be reflected in the chatbot's responses.

### 6. Limitations

*   **Knowledge Cutoff**: The chatbot's knowledge is limited to the FAQs provided in its prompt. It cannot answer questions about topics not covered there.
*   **No Memory of Past Conversations (in current setup)**: Each question is treated independently.
*   **No External Data Access**: It does not browse the internet or access external databases beyond its initial prompt.

## Styling

*   **ShadCN UI**: Leverages pre-built components from [ShadCN UI](https://ui.shadcn.com/).
*   **Tailwind CSS**: Used for utility-first styling. The theme (colors, fonts) is configured in `src/app/globals.css` and `tailwind.config.ts`.

## Further Development

This project serves as a robust starting point. Potential areas for expansion could include:

*   More detailed case study pages for portfolio items.
*   Advanced AI features using Genkit tools for dynamic data retrieval.
*   Integration with a CMS for content management.
*   Blog functionality.

Feel free to explore and modify the codebase to suit your needs!
```