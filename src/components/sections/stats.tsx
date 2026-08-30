import { Container } from "@/components/ui/container";
import { PathwayMark } from "@/components/ui/pathway-mark";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StatCounter } from "@/components/sections/stat-counter";
import { stats } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-2 overflow-hidden border-b border-r border-border-primary px-6 py-10 text-center transition-colors sm:py-12",
                  stat.accent
                    ? "bg-green-800"
                    : "hover:bg-neutral-900/[0.03]"
                )}
              >
                {stat.accent && (
                  <PathwayMark className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-neutral-0/10" />
                )}
                <dd
                  className={cn(
                    "relative text-4xl font-bold tracking-tight transition-colors sm:text-5xl",
                    stat.accent
                      ? "text-neutral-0"
                      : "text-text-primary group-hover:text-green-700"
                  )}
                >
                  <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
                <dt
                  className={cn(
                    "relative text-xs font-semibold uppercase tracking-widest sm:text-sm",
                    stat.accent ? "text-neutral-0/70" : "text-text-tertiary"
                  )}
                >
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
