import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AmaForm } from "@/components/ask-me-anything/ama-form";

export const metadata: Metadata = {
  title: "Ask Me Anything: Study Abroad Live",
  description:
    "Submit your Study Abroad question and get it answered live by Mr Adeniyi in a 90-minute Ask Me Anything session.",
};

const squareFramePath =
  "M0.25 0.25H1281.25M640.75 0.25V578.25M640.75 0.25H480.625M640.75 0.25H800.875M640.75 578.25H480.625M640.75 578.25H800.875M961 0.25V578.25M961 0.25H800.875M961 0.25H1121.12M961 578.25H800.875M961 578.25H1121.12M320.5 0.25V578.25M320.5 0.25H480.625M320.5 0.25H160.375M320.5 578.25H480.625M320.5 578.25H160.375M0.25 289.25H1281.25M0.25 289.25V144.75M0.25 289.25V433.75M1281.25 289.25V144.75M1281.25 289.25V433.75M1281.25 144.75V0.25H1121.12M1281.25 144.75H0.25M0.25 144.75V0.25H160.375M0.25 433.75V578.25H160.375M0.25 433.75H1281.25M1281.25 433.75V578.25H1121.12M480.625 0.25V578.25M800.875 0.25V578.25M1121.12 0.25V578.25M160.375 0.25V578.25";

export default function AskMeAnythingPage() {
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

      <Container className="relative max-w-xl">
        <ScrollReveal>
          <AmaForm />
        </ScrollReveal>
      </Container>
    </section>
  );
}
