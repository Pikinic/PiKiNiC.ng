import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { testimonials } from "@/lib/constants";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 7h4v4c0 2.75-2 4.5-4.5 4.5" />
      <path d="M15 7h4v4c0 2.75-2 4.5-4.5 4.5" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-border-primary py-20 md:py-28">
      <svg
        className="pointer-events-none absolute left-1/2 top-0 w-[90%] -translate-x-1/2 text-neutral-300/60"
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
        <ScrollReveal>
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl">
              Real People. Real Journeys.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              Trust, in their own words.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0 md:border-l md:border-t md:border-border-primary">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative flex flex-col justify-between gap-8 rounded-[2px] border border-border-primary p-8 transition-colors hover:bg-neutral-900/[0.03] md:rounded-none md:border-b md:border-r md:border-l-0 md:border-t-0"
              >
                <QuoteMark className="h-9 w-9 text-green-700/25 transition-colors group-hover:text-green-700/40" />

                <p className="text-base leading-relaxed text-text-primary">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-border-primary pt-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-green-200 bg-green-50 text-xs font-bold uppercase tracking-tight text-green-700">
                    {initials(t.name)}
                  </span>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-tight text-text-primary">
                      {t.name}
                    </div>
                    <div className="mt-0.5 text-xs uppercase tracking-widest text-text-tertiary">
                      {t.context}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
