import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "@/components/contact/contact-form";
import { directorContact, siteConfig, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Pikinic team.",
};

const squareFramePath =
  "M0.25 0.25H1281.25M640.75 0.25V578.25M640.75 0.25H480.625M640.75 0.25H800.875M640.75 578.25H480.625M640.75 578.25H800.875M961 0.25V578.25M961 0.25H800.875M961 0.25H1121.12M961 578.25H800.875M961 578.25H1121.12M320.5 0.25V578.25M320.5 0.25H480.625M320.5 0.25H160.375M320.5 578.25H480.625M320.5 578.25H160.375M0.25 289.25H1281.25M0.25 289.25V144.75M0.25 289.25V433.75M1281.25 289.25V144.75M1281.25 289.25V433.75M1281.25 144.75V0.25H1121.12M1281.25 144.75H0.25M0.25 144.75V0.25H160.375M0.25 433.75V578.25H160.375M0.25 433.75H1281.25M1281.25 433.75V578.25H1121.12M480.625 0.25V578.25M800.875 0.25V578.25M1121.12 0.25V578.25M160.375 0.25V578.25";

const instagram = socialLinks.find((s) => s.label === "Instagram");
const whatsappHref = `https://wa.me/${directorContact.whatsapp.replace(/[^0-9]/g, "")}`;

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
            <h1 className="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              We&rsquo;re <span className="text-green-700">ready</span> when
              you are.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              Have a question? Not sure which service you need? Send us a
              message and we&rsquo;ll come back to you with exactly the
              right direction.
            </p>

            <dl className="mt-12 space-y-6 border-t border-border-primary pt-8 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Office
                </dt>
                <dd className="mt-1 text-base text-text-primary">{siteConfig.address}</dd>
              </div>
            </dl>

            <div className="mt-10 border-t border-border-primary pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                Alternative Contact Methods
              </p>
              <div className="mt-4 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-border-primary text-text-secondary transition-colors group-hover:border-green-600 group-hover:text-green-700">
                    <SocialIcon icon="whatsapp" className="h-4 w-4" />
                  </span>
                  <span className="text-base font-semibold text-text-primary transition-colors group-hover:text-green-700">
                    {directorContact.whatsapp}
                  </span>
                </a>
                <a
                  href={`mailto:${directorContact.email}`}
                  className="group flex items-center gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-border-primary text-text-secondary transition-colors group-hover:border-green-600 group-hover:text-green-700">
                    <SocialIcon icon="mail" className="h-4 w-4" />
                  </span>
                  <span className="text-base font-semibold text-text-primary transition-colors group-hover:text-green-700">
                    {directorContact.email}
                  </span>
                </a>
                {instagram && (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-border-primary text-text-secondary transition-colors group-hover:border-green-600 group-hover:text-green-700">
                      <SocialIcon icon="instagram" className="h-4 w-4" />
                    </span>
                    <span className="text-base font-semibold text-text-primary transition-colors group-hover:text-green-700">
                      @pikinic
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <ContactForm />
        </ScrollReveal>
      </Container>
    </section>
  );
}
