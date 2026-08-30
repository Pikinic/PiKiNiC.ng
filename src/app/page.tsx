import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { ServiceSection } from "@/components/sections/service-section";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { services } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      {services.map((service, i) => (
        <ServiceSection key={service.name} service={service} reverse={i % 2 === 1} />
      ))}
      <Stats />
      <Testimonials />
      <Cta />
    </>
  );
}
