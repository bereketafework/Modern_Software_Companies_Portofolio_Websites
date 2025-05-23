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
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Abstract Technological Network Illustration"
      role="img"
      data-ai-hint="digital network abstract"
      {...props}
    >
      {/* Central Orb */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" />

      {/* Outer Nodes and Connections */}
      <circle cx="6" cy="6" r="1.5" />
      <line x1="11.5" y1="11.5" x2="6.5" y2="6.5" /> {/* Adjusted to avoid overlap with central orb stroke */}

      <circle cx="18" cy="6" r="1.5" />
      <line x1="12.5" y1="11.5" x2="17.5" y2="6.5" />

      <circle cx="6" cy="18" r="1.5" />
      <line x1="11.5" y1="12.5" x2="6.5" y2="17.5" />

      <circle cx="18" cy="18" r="1.5" />
      <line x1="12.5" y1="12.5" x2="17.5" y2="17.5" />

      <circle cx="4" cy="12" r="1" />
      <line x1="10" y1="12" x2="5" y2="12" />
      
      <circle cx="20" cy="12" r="1" />
      <line x1="14" y1="12" x2="19" y2="12" />

      <circle cx="12" cy="4" r="1" />
      <line x1="12" y1="10" x2="12" y2="5" />

      <circle cx="12" cy="20" r="1" />
      <line x1="12" y1="14" x2="12" y2="19" />

      {/* Subtle background curves suggesting global connection */}
      <path d="M6 6C8 10, 10 11.5, 12 12" strokeDasharray="2 2" opacity="0.4"/>
      <path d="M18 6C16 10, 14 11.5, 12 12" strokeDasharray="2 2" opacity="0.4"/>
      <path d="M6 18C8 14, 10 12.5, 12 12" strokeDasharray="2 2" opacity="0.4"/>
      <path d="M18 18C16 14, 14 12.5, 12 12" strokeDasharray="2 2" opacity="0.4"/>
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
