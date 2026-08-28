import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-green-900 py-28 text-neutral-0 md:py-40">
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
      <PathwayMark className="float-slow pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 text-neutral-0/[0.06]" />

      <Container className="relative flex flex-col items-center text-center">
        <ScrollReveal className="flex flex-col items-center">
          <h2 className="max-w-3xl text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Let&rsquo;s get you
            <br />
            <span className="text-green-400">started.</span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-green-100/80 sm:text-lg">
            Tell us where you&rsquo;re headed — school, holiday, or a new
            place to call home — and we&rsquo;ll handle the rest of the
            journey with you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              className="bg-neutral-0 text-green-800 hover:bg-green-50"
            >
              Contact Us
            </Button>
            <Button
              href="https://travelsandtours.pikinic.ng"
              size="lg"
              variant="secondary"
              className="border-neutral-0/40 text-neutral-0 hover:bg-neutral-0/10"
            >
              Book a Flight
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
