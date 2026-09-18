import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import { services } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (!isDesktop) return
    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const getScrollDistance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section id="about" ref={sectionRef} className="relative bg-cream">
      {isDesktop ? (
        <div className="flex h-screen items-center overflow-hidden">
          <div ref={trackRef} className="flex flex-nowrap items-stretch gap-6 pl-6 md:pl-10 will-change-transform">
            <IntroPanel />
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
            <div className="w-6 shrink-0" />
          </div>
        </div>
      ) : (
        <div className="container-loro py-20">
          <IntroPanel mobile />
          <div className="mt-10 flex flex-col gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} mobile />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function IntroPanel({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={
        mobile
          ? ''
          : 'flex h-[70vh] w-[46vw] max-w-[560px] shrink-0 flex-col justify-center pr-10'
      }
    >
      <Reveal>
        <span className="label text-brand-600">About Us</span>
        <h2 className="mt-5 title-section text-4xl leading-tight text-ink md:text-5xl">
          Inspired by Flight &amp; Fueled by Imagination
        </h2>
        <p className="mt-5 max-w-md text-lg text-ink/60">
          As a design engineering studio, we bridge the gap between premium
          visual design and technical excellence, ensuring your project looks
          stunning and performs flawlessly.
        </p>
        {!mobile && (
          <p className="label mt-8 flex items-center gap-3 text-ink/40">
            Scroll to explore
            <span className="inline-block h-px w-16 bg-ink/20" />→
          </p>
        )}
      </Reveal>
    </div>
  )
}

interface CardProps {
  index: string
  kicker: string
  title: string
  description: string
  image: string
  mobile?: boolean
}

function ServiceCard({ index, kicker, title, description, image, mobile = false }: CardProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  return (
    // Framer Motion drives the card; GSAP only ever touches the track that holds
    // it, so the two never write to the same element's inline styles.
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, filter: 'blur(18px)', scale: 0.94 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      // A lingering `filter: blur(0px)` keeps each card on its own GPU layer for
      // nothing — drop it once the reveal has played.
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.filter = ''
      }}
      className={`group relative flex shrink-0 flex-col justify-end overflow-hidden rounded-[28px] bg-brand-900 text-white shadow-xl ${
        mobile ? 'h-[440px] w-full' : 'h-[70vh] w-[70vw] max-w-[540px]'
      }`}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute left-7 top-7 text-sm font-semibold tracking-wide text-white/80">
        {index}
      </div>
      <div className="relative z-10 p-7 md:p-9">
        <span className="label text-white/60">{kicker}</span>
        <h3 className="mt-3 title-section text-3xl md:text-4xl">{title}</h3>
        <p className="mt-3 max-w-sm text-white/70 opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
          {description}
        </p>
        <p className="mt-3 max-w-sm text-white/70 md:hidden">{description}</p>
      </div>
    </motion.article>
  )
}
