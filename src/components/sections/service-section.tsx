import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/constants";

export function ServiceSection({ service, reverse }: { service: Service; reverse?: boolean }) {
  const isDark = service.theme === "dark";
  const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <section
      id={slug}
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        isDark ? "bg-green-900 text-neutral-0" : "bg-background-primary text-text-primary"
      )}
    >
      {isDark && (
        <>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-neutral-0/[0.06]"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1282 579"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.25 0.25H1281.25M640.75 0.25V578.25M640.75 0.25H480.625M640.75 0.25H800.875M640.75 578.25H480.625M640.75 578.25H800.875M961 0.25V578.25M961 0.25H800.875M961 0.25H1121.12M961 578.25H800.875M961 578.25H1121.12M320.5 0.25V578.25M320.5 0.25H480.625M320.5 0.25H160.375M320.5 578.25H480.625M320.5 578.25H160.375M0.25 289.25H1281.25M0.25 289.25V144.75M0.25 289.25V433.75M1281.25 289.25V144.75M1281.25 289.25V433.75M1281.25 144.75V0.25H1121.12M1281.25 144.75H0.25M0.25 144.75V0.25H160.375M0.25 433.75V578.25H160.375M0.25 433.75H1281.25M1281.25 433.75V578.25H1121.12M480.625 0.25V578.25M800.875 0.25V578.25M1121.12 0.25V578.25M160.375 0.25V578.25"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
          <PathwayMark
            className={cn(
              "pointer-events-none absolute top-1/2 h-[440px] w-[440px] -translate-y-1/2 text-neutral-0/[0.08]",
              reverse ? "right-0 md:-right-10" : "left-0 md:-left-10"
            )}
          />
        </>
      )}

      <Container className="relative">
        <ScrollReveal
          className={cn(
            "grid items-stretch gap-10 md:grid-cols-2 md:gap-16",
            reverse && "md:[&>*:first-child]:order-2"
          )}
        >
          <div className="flex flex-col justify-between md:h-full">
            <div className="flex items-baseline gap-4">
              <span
                className={cn(
                  "text-sm font-bold tracking-widest",
                  isDark ? "text-green-400" : "text-green-700"
                )}
              >
                {service.number}
              </span>
              <h2 className="text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
                {service.heading}
              </h2>
            </div>

            <div className="mt-10 md:mt-0">
              <p
                className={cn(
                  "max-w-md text-base leading-relaxed",
                  isDark ? "text-neutral-300" : "text-text-secondary"
                )}
              >
                {service.description}
              </p>
              <Button
                href={service.href}
                size="lg"
                variant={isDark ? "primary" : "secondary"}
                className={cn(
                  "mt-8 w-fit",
                  isDark && "bg-neutral-0 text-green-800 hover:bg-green-50"
                )}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="group relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-[2px] border border-border-primary/40">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
