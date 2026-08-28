import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Pikinic team.",
};

const squareFramePath =
  "M0.25 0.25H1281.25M640.75 0.25V578.25M640.75 0.25H480.625M640.75 0.25H800.875M640.75 578.25H480.625M640.75 578.25H800.875M961 0.25V578.25M961 0.25H800.875M961 0.25H1121.12M961 578.25H800.875M961 578.25H1121.12M320.5 0.25V578.25M320.5 0.25H480.625M320.5 0.25H160.375M320.5 578.25H480.625M320.5 578.25H160.375M0.25 289.25H1281.25M0.25 289.25V144.75M0.25 289.25V433.75M1281.25 289.25V144.75M1281.25 289.25V433.75M1281.25 144.75V0.25H1121.12M1281.25 144.75H0.25M0.25 144.75V0.25H160.375M0.25 433.75V578.25H160.375M0.25 433.75H1281.25M1281.25 433.75V578.25H1121.12M480.625 0.25V578.25M800.875 0.25V578.25M1121.12 0.25V578.25M160.375 0.25V578.25";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <svg
        className="pointer-events-none absolute left-1/2 top-0 w-[90%] -translate-x-1/2 text-neutral-300/60"
        viewBox="0 0 1282 579"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={squareFramePath} stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <PathwayMark className="pointer-events-none absolute -right-24 -top-16 hidden h-[380px] w-[380px] text-green-600/[0.1] lg:block" />

      <Container className="relative">
        <ScrollReveal className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
              Contact
            </span>
            <h1 className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              Let&rsquo;s <span className="text-green-700">talk.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              Questions about a trip, a stay, or studying abroad? Reach out
              and our team will get back to you.
            </p>

            <dl className="mt-12 space-y-6 border-t border-border-primary pt-8 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Offices
                </dt>
                <dd className="mt-1 text-base text-text-primary">{siteConfig.offices}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base font-semibold text-text-primary underline underline-offset-4 transition-colors hover:text-green-700"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form
            className="space-y-5"
            action={`mailto:${siteConfig.email}`}
            method="post"
          >
            <div>
              <label htmlFor="name" className="text-sm font-medium text-text-primary">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 h-11 w-full rounded-[2px] border border-border-primary bg-surface-primary px-4 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-text-primary">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 h-11 w-full rounded-[2px] border border-border-primary bg-surface-primary px-4 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-2 w-full rounded-[2px] border border-border-primary bg-surface-primary px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </ScrollReveal>
      </Container>
    </section>
  );
}
