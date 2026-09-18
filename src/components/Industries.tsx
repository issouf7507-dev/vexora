import Reveal from './Reveal'
import { industries } from '../data/content'

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export default function Industries() {
  return (
    <section id="industries" className="bg-cream py-28">
      <div className="container-loro">
        <Reveal className="max-w-2xl">
          <span className="label text-brand-600">Industries</span>
          <h2 className="mt-5 title-section text-4xl text-ink md:text-5xl">
            Built for every business
          </h2>
          <p className="mt-5 text-lg text-ink/60">
            Real projects for real businesses, from healthcare to e-commerce and
            everything in between.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.tag} delay={(i % 3) * 0.08}>
              <div className="group flex h-full items-center justify-between rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-950 hover:shadow-xl">
                <div>
                  <span className="label text-brand-600 transition-colors group-hover:text-brand-300">
                    {ind.tag}
                  </span>
                  <p className="mt-2 title-section text-xl text-ink transition-colors group-hover:text-white">
                    {ind.name}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-all duration-300 group-hover:bg-white group-hover:text-brand-600">
                  <ArrowUpRight />
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-semibold text-ink/70 transition-colors hover:text-brand-600"
          >
            View full portfolio <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
