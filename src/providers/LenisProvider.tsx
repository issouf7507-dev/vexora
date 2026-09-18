import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

/** Access the shared Lenis instance. Null when smooth scroll is disabled. */
export const useLenis = () => useContext(LenisContext)

export default function LenisProvider({ children }: { children: ReactNode }) {
  // State, not a ref: consumers must re-render once the instance exists.
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Smooth scroll is exactly the effect that triggers motion sickness —
    // leave the native scroll alone when the user asked for reduced motion.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Lenis handles in-page anchors itself; the offset clears the fixed navbar.
      anchors: { offset: -90, duration: 1.2 },
    })

    // ScrollTrigger must read Lenis' position, not the browser's, or the pinned
    // Services track fires at the wrong scroll offsets.
    instance.on('scroll', ScrollTrigger.update)

    // One RAF loop only — gsap.ticker drives Lenis, never a second requestAnimationFrame.
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    // GSAP's lag compensation would desync Lenis after a dropped frame.
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33) // restore GSAP's default
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
