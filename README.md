
# Smart Tech Solution Portfolio - Next.js Starter in Firebase Studio

This project is a modern portfolio website for "Smart Tech Solution," a software development company. It's built using Next.js, React, ShadCN UI components, Tailwind CSS, and Genkit for AI-powered features. This starter was initialized in Firebase Studio.

## Core Features

The portfolio showcases the company's services, projects, and expertise with a focus on a professional and engaging user experience.

*   **Dynamic Hero Section**: Features a typewriter effect for services offered and key business metrics.
*   **Interactive Service Cards**: Displays services with animated icons and descriptions.
*   **Filterable Portfolio Grid**:
    *   A masonry-style grid for showcasing projects.
    *   Filterable by project type (Web App, Data Platform, Mobile App, Other) using icon-based filter buttons.
    *   **Customizable Display**: Users can adjust the number of portfolio items displayed per page via a dedicated **Settings Page** (options include 3, 6, 9, or All).
*   **Technology Expertise Charts**: Uses responsive bar charts (via Recharts) to display proficiency in various technologies (Frontend, Backend, Cloud, DevOps), complete with tooltips for detailed experience.
*   **Client Testimonials**:
    *   Includes an automated testimonial carousel.
    *   A grid of client logos showcasing partnerships.
    *   Animated success metrics (Happy Clients, Project Success Rate, Avg. ROI Increase).
*   **Interactive Contact Form**:
    *   Features real-time validation using `react-hook-form`.
    *   Submits inquiries via a `mailto:` link to `bereketbeki64@gmail.com`.
    *   Includes an embedded Google Maps iframe for the office location and working hours.
*   **AI-Powered FAQ Chatbot**: Provides instant answers to common questions about Smart Tech Solution.
*   **Settings Page**: Allows users to customize display preferences, starting with the number of portfolio items shown.
*   **Responsive Design**: Ensures optimal viewing across various devices.
*   **Theme Toggle**: Allows users to switch between light and dark modes.
*   **Smooth Scrolling & Animations**: Subtle transitions and effects (like fade-ins, slide-ups, hover effects) to enhance user engagement.
*   **Scroll-to-Top Button & Progress Bar**: For improved navigation on longer pages.

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
    *   The main entry point for the pages is `src/app/page.tsx`, which aggregates the different sections of the portfolio.
    *   The new settings page can be found at `src/app/settings/page.tsx`.
    *   Individual sections (Hero, Services, Portfolio, etc.) can be found in `src/components/sections/`.
    *   UI components are primarily from ShadCN (located in `src/components/ui/`) and custom elements are in `src/components/elements/`.
    *   State management for settings is handled via React Context in `src/contexts/SettingsContext.tsx`.

## AI FAQ Chatbot

The application includes an AI-powered Frequently Asked Questions (FAQ) Chatbot to provide visitors with quick and accurate answers about Smart Tech Solution.

### 1. Purpose

The primary purpose of this chatbot is to provide visitors with quick and accurate answers to common questions about Smart Tech Solution, its services, contact information, and other relevant topics. This enhances user experience by offering instant support and information.

### 2. Technology Used

*   **Genkit**: The chatbot leverages Genkit, a framework for building AI-powered applications.
*   **Google Gemini Model**: The underlying AI model used for understanding questions and generating answers is Google's Gemini (specifically, the one configured in `src/ai/genkit.ts`, likely `gemini-2.0-flash`).
*   **Next.js & React**: The chatbot UI is built as a React component within the Next.js application, using ShadCN's `Sheet` component.

### 3. Functionality

*   **FAQ Answering**: The chatbot is primed with a set of predefined FAQs and their answers. When a user asks a question, the AI attempts to match it to one of the known FAQs or synthesize an answer based on the provided information.
*   **Natural Language Understanding**: Users can ask questions in natural language.
*   **Predefined Questions**: The chat interface suggests some common questions to help users get started.
*   **Fallback**: If a question is outside the scope of the pre-loaded FAQs or is unrelated to Smart Tech Solution, the chatbot will politely state that it cannot answer and suggest contacting the company directly with the provided contact information (`bereketbeki64@gmail.com` or `+251 931 555 192`).
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
  prompt: \`You are a helpful AI assistant for Smart Tech Solution...

Available FAQs:
- Q: What services does Smart Tech Solution offer?
  A: Smart Tech Solution offers a comprehensive suite of services including Custom Software Development, Web Application Development, Mobile App Development, Cloud Solutions, UI/UX Design, and DevOps & Automation.

// Add more Q&A pairs here following the same format.
// Example of a new FAQ:
// - Q: What industries do you serve?
//   A: We serve a diverse range of industries including retail, healthcare, logistics, entertainment, finance, and the public sector.

User's question: {{{question}}}
...
\`,
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

## Deployment

This Next.js application is well-suited for deployment on platforms like Vercel or Firebase Hosting. Ensure that any necessary environment variables (e.g., API keys for Genkit/Google AI) are configured in your deployment environment.

## Further Development

This project serves as a robust starting point. Potential areas for expansion could include:

*   More detailed case study pages for portfolio items.
*   Advanced AI features using Genkit tools for dynamic data retrieval.
*   Integration with a CMS for content management.
*   Blog functionality.

Feel free to explore and modify the codebase to suit your needs!
Developed by Bereket Afework.
```