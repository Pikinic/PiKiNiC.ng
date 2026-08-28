import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Intro() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full text-neutral-300/50"
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

      <Container className="relative">
        {/* waypoint — the path from the hero continues down into the page */}
        <div className="mx-auto mb-10 flex w-px flex-col items-center gap-0">
          <span className="h-16 w-px bg-gradient-to-b from-transparent to-border-primary" />
          <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-green-600" />
        </div>

        <ScrollReveal className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
         
            <h2 className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              Everything you
              <br />
              need for the
              <br />
              <span className="text-green-700">journey.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-8">
            <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
              We plan every leg of the trip so you can focus on the moment.
              From bookings to logistics, our team handles the details before
              you arrive.
            </p>
            <Link
              href="#study-abroad"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-primary"
            >
              See how it works
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
