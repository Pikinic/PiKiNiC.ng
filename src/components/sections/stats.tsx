import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StatCounter } from "@/components/sections/stat-counter";
import { stats } from "@/lib/constants";

export function Stats() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <div className="max-w-xl">
            <h2 className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl">
              Performance you can measure
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              These numbers come from real bookings and real travelers,
              tracked closely so every trip we plan is measured against
              outcomes, not promises.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 border-l border-t border-border-primary md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex aspect-square flex-col items-center justify-center gap-2 border-b border-r border-border-primary p-6 text-center transition-colors hover:bg-neutral-900/[0.03]"
              >
                <dd className="text-4xl font-bold tracking-tight text-text-primary transition-colors group-hover:text-green-700 sm:text-5xl">
                  <StatCounter value={stat.value} />
                </dd>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-tertiary sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </Container>
    </section>
  );
}
