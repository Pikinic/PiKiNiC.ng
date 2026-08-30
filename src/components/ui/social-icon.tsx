import type { ReactNode } from "react";

type IconKey = "instagram" | "x" | "tiktok" | "linkedin" | "facebook" | "whatsapp" | "mail";

const paths: Record<IconKey, ReactNode> = {
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9 9.3c0 3.1 2.6 5.7 5.7 5.7.3 0 .5-.2.6-.4l.4-1c.1-.3 0-.6-.3-.8l-1.1-.7c-.3-.2-.6-.1-.8.1l-.3.4a5.3 5.3 0 0 1-2-2l.4-.3c.2-.2.3-.5.1-.8L11 8.3c-.2-.3-.5-.4-.8-.3l-1 .4c-.2.1-.4.3-.4.6Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  facebook: (
    <>
      <path d="M15 4h-2a3 3 0 0 0-3 3v3H8" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="11.5" y1="10" x2="11.5" y2="20" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </>
  ),
  tiktok: (
    <path d="M14 3v10.5a3.5 3.5 0 1 1-3-3.46M14 3a5 5 0 0 0 5 5" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r="0.2" fill="currentColor" stroke="currentColor" />
      <path d="M11.5 16.5V12a2.5 2.5 0 0 1 5 0v4.5" />
      <line x1="11.5" y1="10" x2="11.5" y2="16.5" />
    </>
  ),
};

export function SocialIcon({ icon, className }: { icon: IconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[icon]}
    </svg>
  );
}
