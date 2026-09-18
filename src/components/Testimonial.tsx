import Reveal from './Reveal'
import Counter from './Counter'
import { stats } from '../data/content'

export default function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-28 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 60% at 50% 0%, rgba(255,100,0,0.28), transparent 70%)',
        }}
      />
      <div className="container-loro relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="font-sans text-6xl font-bold leading-none text-brand-400">“</div>
          <blockquote className="mt-2 font-sans text-3xl font-medium leading-snug md:text-4xl lg:text-5xl">
            They didn&apos;t just build a website. They created an online
            presence that truly represents my brand. Every detail matched my
            vision.
          </blockquote>
          <p className="label mt-8 text-white/50">Client Testimonial</p>
        </Reveal>

        <div className="mt-24 grid gap-12 border-t border-white/10 pt-16 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} className="text-center md:text-left">
              <div className="title-display text-7xl text-white md:text-8xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
