import Reveal from './Reveal'
import { techStack } from '../data/content'

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...techStack, ...techStack]
  return (
    <div className="flex overflow-hidden py-2">
      <div
        className={`flex shrink-0 items-center gap-4 pr-4 ${
          reverse ? 'animate-marquee [animation-direction:reverse]' : 'animate-marquee'
        }`}
      >
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-ink/10 bg-white px-6 py-3 text-lg font-semibold text-ink/80 shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="pricing" className="bg-cream py-28">
      <div className="container-loro">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label text-brand-600">Built With</span>
          <h2 className="mt-5 title-section text-4xl text-ink md:text-5xl">
            A Modern, Production-Grade Stack
          </h2>
          <p className="mt-5 text-lg text-ink/60">
            The same frameworks and infrastructure trusted by the best teams in
            tech, so your product launches fast, scales effortlessly, and never
            feels outdated.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-cream to-transparent" />
        <div className="flex flex-col gap-4">
          <Row />
          <Row reverse />
        </div>
      </div>
    </section>
  )
}
