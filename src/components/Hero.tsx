import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Logo from './Logo'

const HERO_IMG = '/img/hero--vexora.jpg'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section
      id="home"
      ref={ref}
      className="relative m-3 min-h-[calc(100svh-1.5rem)] overflow-hidden rounded-[28px] bg-brand-950 text-white md:m-4 md:min-h-[calc(100svh-2rem)] md:rounded-[36px]"
    >
      {/* Background image */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMG}
          alt=""
          // LCP element: never lazy-load it, and let the browser fetch it early.
          // Lowercase attribute — React 18 doesn't map the camelCase `fetchPriority`.
          {...{ fetchpriority: 'high' }}
          decoding="async"
          className="h-full w-full object-cover object-[72%_center]"
        />
      </motion.div>

      {/* Legibility overlays. The photo already carries the brand's warm cast, so
          these only darken the left third for the headline — no orange wash on top. */}
      <div className="absolute inset-0 bg-linear-to-r from-brand-950 via-brand-950/70 to-brand-950/10" />
      <div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-transparent to-brand-950/50" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: textY }}
        className="container-loro relative z-10 flex min-h-[calc(100svh-1.5rem)] flex-col justify-center pt-28 md:min-h-[calc(100svh-2rem)]"
      >
        <div className="max-w-2xl">
          <motion.div variants={item}>
            <Logo onDark size="lg" withTagline />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 title-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl"
          >
            Design engineering
            <br />
            for ambitious brands.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-white/80 md:text-xl"
          >
            We design and build custom websites, portals, and apps with
            uncompromised performance. From the Philippines to ambitious brands
            across Asia-Pacific.
          </motion.p>

          <motion.p variants={item} className="label mt-6 text-white/60">
            Tech crafted with empathy · Purpose in every pixel
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn btn-light">
              Start a Project
            </a>
            <a href="#about" className="btn btn-outline">
              See Our Work
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="block h-2 w-1 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  )
}
