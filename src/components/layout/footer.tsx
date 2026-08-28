import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { SocialIcon } from "@/components/ui/social-icon";
import { footerColumns, siteConfig, socialLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background-inverse text-text-inverse">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <p className="max-w-sm text-sm uppercase text-neutral-400">
              Trip planning, study abroad, and stays — handled end to end for you.
            </p>

            <div className="space-y-1 text-sm text-neutral-300">
              <p>{siteConfig.address}</p>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-text-inverse"
              >
                {siteConfig.email}
              </Link>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-neutral-700 text-neutral-300 transition-colors hover:border-green-600 hover:text-green-400"
                >
                  <SocialIcon icon={social.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Stay In The Loop
            </h3>
            <p className="mt-3 max-w-sm text-sm text-neutral-300">
              New routes, scholarships, and travel tips — straight to your
              inbox, no spam.
            </p>
            <NewsletterForm className="mt-5" />
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-neutral-800 pt-12 sm:grid-cols-3">
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-200 uppercase transition-colors hover:text-text-inverse"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-neutral-800">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-neutral-500 md:flex-row">
          <p>
            {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </Container>
      </div>

      <p
        aria-hidden
        className="select-none overflow-hidden px-6 pb-4 text-center text-[18vw] font-bold leading-none tracking-tight text-neutral-800/60 md:px-16"
      >
        PIKINIC
      </p>
    </footer>
  );
}
