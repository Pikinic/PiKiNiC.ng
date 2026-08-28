import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Cta } from "@/components/sections/cta";
import { team } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pikinic is a Nigerian travel management company founded in 2023, building trust into every trip, stay, and journey abroad.",
};

const values = [
  {
    name: "Transparency",
    description: "Clear, honest pricing and information, with no hidden charges.",
  },
  {
    name: "Reliability",
    description: "Professional handling and consistent communication, start to finish.",
  },
  {
    name: "Efficiency",
    description: "Streamlined booking and fast turnaround on every request.",
  },
  {
    name: "Customer-Centred",
    description: "Recommendations tailored to each traveller's needs and budget.",
  },
  {
    name: "Integrity",
    description: "Ethical, accountable practice that builds long-term trust.",
  },
];

const squareFramePath =
  "M0.25 0.25H1281.25M640.75 0.25V578.25M640.75 0.25H480.625M640.75 0.25H800.875M640.75 578.25H480.625M640.75 578.25H800.875M961 0.25V578.25M961 0.25H800.875M961 0.25H1121.12M961 578.25H800.875M961 578.25H1121.12M320.5 0.25V578.25M320.5 0.25H480.625M320.5 0.25H160.375M320.5 578.25H480.625M320.5 578.25H160.375M0.25 289.25H1281.25M0.25 289.25V144.75M0.25 289.25V433.75M1281.25 289.25V144.75M1281.25 289.25V433.75M1281.25 144.75V0.25H1121.12M1281.25 144.75H0.25M0.25 144.75V0.25H160.375M0.25 433.75V578.25H160.375M0.25 433.75H1281.25M1281.25 433.75V578.25H1121.12M480.625 0.25V578.25M800.875 0.25V578.25M1121.12 0.25V578.25M160.375 0.25V578.25";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <svg
          className="pointer-events-none absolute left-1/2 top-0 w-[90%] -translate-x-1/2 text-neutral-300/60"
          viewBox="0 0 1282 579"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={squareFramePath} stroke="currentColor" strokeWidth="0.5" />
        </svg>

        <Container className="relative max-w-3xl">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
              About Pikinic
            </span>
            <h1 className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              Built on trust,
              <br />
              not <span className="text-green-700">transactions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              Pikinic is a Nigerian travel management company, founded in
              2023 to solve a persistent industry problem: the lack of
              trustworthy travel agencies. We build long-term relationships
              with our travellers rather than one-off transactions, with
              offices in Lagos and Osun.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-border-primary py-20 md:py-28">
        <Container>
          <ScrollReveal className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="text-sm font-bold tracking-widest text-green-700">01</span>
              <h2 className="mt-3 text-3xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-4xl">
                Mission
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary">
                To simplify travel by delivering seamless, reliable, and
                stress-free travel experiences through transparent pricing,
                personalised support, and exceptional customer service.
              </p>
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest text-green-700">02</span>
              <h2 className="mt-3 text-3xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-4xl">
                Vision
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary">
                To become one of Nigeria&rsquo;s most trusted travel
                management companies, recognised for effortless travel
                experiences, innovative solutions, and exceptional customer
                satisfaction.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-border-primary py-20 md:py-28">
        <Container>
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                What We Stand For
              </span>
              <h2 className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl">
                Values we don&rsquo;t bend on
              </h2>
            </div>

            <dl className="mt-12 grid grid-cols-1 border-l border-t border-border-primary sm:grid-cols-2 lg:grid-cols-5">
              {values.map((value) => (
                <div
                  key={value.name}
                  className="group flex aspect-square flex-col justify-between border-b border-r border-border-primary p-6 transition-colors hover:bg-neutral-900/[0.03]"
                >
                  <dt className="text-lg font-bold uppercase leading-[1.05] tracking-tight text-text-primary transition-colors group-hover:text-green-700">
                    {value.name}
                  </dt>
                  <dd className="text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </Container>
      </section>

      {/* Team */}
      <section
        id="team"
        className="relative overflow-hidden bg-green-900 py-20 text-neutral-0 md:py-28"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-neutral-0/[0.06]"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1282 579"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={squareFramePath} stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <PathwayMark className="pointer-events-none absolute -bottom-24 -right-20 h-[420px] w-[420px] text-neutral-0/[0.08]" />

        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-green-200">
                The People Behind It
              </span>
              <h2 className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">
                Meet the team
              </h2>
              <p className="mt-4 text-base leading-relaxed text-green-100/80 sm:text-lg">
                A small team handling every leg of the journey personally —
                more hands are joining us as Pikinic grows.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group flex aspect-square flex-col justify-between rounded-[2px] border border-neutral-0/15 bg-neutral-0/[0.04] p-6 transition-colors hover:bg-neutral-0/[0.08]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-[2px] border border-neutral-0/20 text-lg font-bold uppercase tracking-tight text-green-300">
                    {initials(member.name)}
                  </span>
                  <div>
                    <div className="text-xl font-bold uppercase leading-[1.05] tracking-tight">
                      {member.name}
                    </div>
                    <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-green-400">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Cta />
    </>
  );
}
