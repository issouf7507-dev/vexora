import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, contact, socials } from '../data/content'
import { useLenis } from '../providers/LenisProvider'
import { useScrollLock } from '../hooks/useScrollLock'
import ContactModal from './ContactModal'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

type SocialIconName = (typeof socials)[number]['icon']

const socialPaths: Record<SocialIconName, string> = {
  facebook:
    'M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.4C11.9 3 11 4.3 11 6.6v1.9H9V11h2v10h3V11h2.2l.3-2.5H14Z',
  instagram:
    'M12 7.6A4.4 4.4 0 1 0 12 16.4 4.4 4.4 0 0 0 12 7.6Zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6ZM17 5.9a1 1 0 1 0 0 2.1 1 1 0 0 0 0-2.1ZM16.2 3H7.8A4.8 4.8 0 0 0 3 7.8v8.4A4.8 4.8 0 0 0 7.8 21h8.4a4.8 4.8 0 0 0 4.8-4.8V7.8A4.8 4.8 0 0 0 16.2 3Zm3.2 13.2a3.2 3.2 0 0 1-3.2 3.2H7.8a3.2 3.2 0 0 1-3.2-3.2V7.8a3.2 3.2 0 0 1 3.2-3.2h8.4a3.2 3.2 0 0 1 3.2 3.2Z',
  tiktok:
    'M16.5 3h-2.6v12.1a2.4 2.4 0 1 1-2-2.4V10a5.3 5.3 0 1 0 4.6 5.2V9a6.3 6.3 0 0 0 3.5 1.1V7.5a3.7 3.7 0 0 1-3.5-3.6V3Z',
  linkedin:
    'M6.9 8.6H4.2V21h2.7V8.6ZM5.5 3.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20 13.8c0-3.3-1.8-4.8-4.1-4.8-1.9 0-2.7 1-3.2 1.8V8.6H10V21h2.7v-6.7c0-1.6.9-2.3 1.9-2.3 1 0 1.7.6 1.7 2.2V21H20v-7.2Z',
}

function SocialIcon({ name }: { name: SocialIconName }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={socialPaths[name]} />
    </svg>
  )
}

const telHref = `tel:${contact.phone.replace(/\s/g, '')}`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const lenis = useLenis()

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape dismisses the menu overlay; scroll locking is handled by useScrollLock.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Closing the overlay and jumping to an anchor happen on the same click, and
  // Lenis is still stopped at that point — it would swallow its own anchor
  // handling. Drive the scroll explicitly with `force` so it runs regardless.
  const closeAndScroll = (href: string) => (e: React.MouseEvent) => {
    setOpen(false)
    if (!lenis) return // reduced motion: let the browser do a native jump
    e.preventDefault()
    lenis.scrollTo(href, { offset: -90, duration: 1.2, force: true })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 md:top-8"
      >
        <nav
          className={`flex w-full max-w-4xl items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 backdrop-blur-xl transition-colors duration-500 ${
            scrolled
              ? 'bg-white/90 shadow-lg shadow-black/5 ring-1 ring-black/5'
              : 'bg-white/70 ring-1 ring-white/40'
          }`}
        >
          <a
            href="#home"
            aria-label="VECXORA — accueil"
            className="flex h-11 items-center justify-center rounded-full pl-2 pr-4"
          >
            <img
              src="/brand/vecxora-lockup-light.png"
              alt="VECXORA"
              className="h-7 w-auto select-none"
              draggable={false}
            />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInquiryOpen(true)}
              className="icon-btn hidden sm:flex"
              aria-label="Talk to the studio"
              aria-haspopup="dialog"
            >
              <ArrowIcon />
            </button>
            <a href={telHref} className="icon-btn hidden sm:flex" aria-label="Call us">
              <PhoneIcon />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="icon-btn"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <span className="block h-[2px] w-4 bg-white" />
                <span className="block h-[2px] w-4 bg-white" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-cream"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex justify-end p-4 md:p-6">
              <button
                onClick={() => setOpen(false)}
                autoFocus
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="container-loro flex flex-1 items-center py-8">
              <ul className="w-full md:pl-[26%]">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={closeAndScroll(item.href)}
                      className="group flex items-baseline gap-4 py-1 md:gap-6"
                    >
                      <span className="w-5 shrink-0 text-[0.62rem] font-medium tabular-nums text-ink/30 transition-colors group-hover:text-brand-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="title-display text-4xl text-ink transition-colors group-hover:text-brand-500 md:text-5xl lg:text-6xl">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="container-loro pb-10"
            >
              <div className="flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-sm text-ink/70 transition-colors hover:text-brand-600"
                  >
                    {contact.email}
                  </a>
                  <a
                    href={telHref}
                    className="mt-1 block text-sm text-ink/70 transition-colors hover:text-brand-600"
                  >
                    {contact.phone}
                  </a>
                  <div className="mt-4 flex items-center gap-4">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="text-ink/35 transition-colors hover:text-brand-500"
                      >
                        <SocialIcon name={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={closeAndScroll('#contact')}
                  className="btn btn-dark self-start md:self-auto"
                >
                  Talk to the studio
                  <ArrowIcon />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  )
}
