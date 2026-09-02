import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { AdminShell } from "@/components/admin/admin-shell";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s — Pikinic Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-background-primary text-text-primary">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
