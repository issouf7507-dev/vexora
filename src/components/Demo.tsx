import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function Demo() {
  return (
    <section id="demo" className="bg-cream pb-28 pt-4">
      <div className="container-loro">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label text-brand-600">Live Demo</span>
          <h2 className="mt-5 title-section text-4xl text-ink md:text-5xl">
            Play with your project before we build it.
          </h2>
          <p className="mt-5 text-lg text-ink/60">
            A fully clickable preview of the dashboard every Loro engagement
            ships with. Poke around. Open a case study. Play a film. No signup,
            no demo call — just the studio, live.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <motion.a
            href="#contact"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative block overflow-hidden rounded-[32px] bg-brand-950 p-10 text-white md:p-16"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(70% 120% at 80% 0%, rgba(255,100,0,0.42), transparent 60%)',
              }}
            />
            {/* faux browser chrome */}
            <div className="relative flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/30" />
              <span className="h-3 w-3 rounded-full bg-white/30" />
              <span className="h-3 w-3 rounded-full bg-white/30" />
              <span className="ml-4 rounded-full bg-white/10 px-4 py-1 text-xs tracking-wide text-white/60">
                lorolabs.ai/demo
              </span>
            </div>

            <div className="relative mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="label text-brand-300">Click to launch →</p>
                <p className="mt-4 title-display text-5xl md:text-7xl">
                  Launch the Demo
                </p>
                <p className="mt-4 text-white/60">
                  ~30 seconds · no signup · nothing mocked
                </p>
              </div>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
            </div>
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}
