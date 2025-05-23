import type { SVGProps } from "react";

interface LottiePlaceholderProps extends SVGProps<SVGSVGElement> {
  // You can add specific props if needed for different placeholders
}

// Example: Software Development Process Icon
export function SoftwareDevelopmentProcessIcon(props: LottiePlaceholderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Software Development Process Illustration"
      role="img"
      data-ai-hint="coding process"
      {...props}
    >
      <path d="M16 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M8 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M10 8v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8" />
      <path d="M14 14v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2" />
      <path d="M2 22V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v18" />
      <path d="M12 18h-1a2 2 0 0 1-2-2V8" />
    </svg>
  );
}

// Example: Animated Icon for a service card
export function ServiceAnimatedIcon(props: LottiePlaceholderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Service Icon"
      role="img"
      data-ai-hint="technology service"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  );
}
