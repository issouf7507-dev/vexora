import { useEffect } from 'react'
import { useLenis } from '../providers/LenisProvider'

/**
 * Freeze page scrolling while an overlay is open.
 *
 * Lenis owns the scroll, so it has to be stopped explicitly; the `overflow`
 * lock stays as a fallback for when Lenis is disabled (reduced motion).
 */
export function useScrollLock(active: boolean) {
  const lenis = useLenis()

  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = previous
      lenis?.start()
    }
  }, [active, lenis])
}
