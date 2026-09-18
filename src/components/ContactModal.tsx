import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { budgetCurrency, budgetRanges, projectTypes } from '../data/content'
import { useScrollLock } from '../hooks/useScrollLock'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

interface Errors {
  name?: string
  email?: string
  consent?: string
}

const field =
  'w-full rounded-xl bg-ink/[0.04] px-4 py-3 text-sm text-ink outline-none ring-1 ring-transparent transition placeholder:text-ink/35 focus:bg-ink/[0.06] focus:ring-brand-500/50'
const label = 'block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/50'

function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/40"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const id = useId()
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Start each visit from a clean slate.
  useEffect(() => {
    if (open) {
      setErrors({})
      setSent(false)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const next: Errors = {}

    if (!name) next.name = 'Please tell us your name.'
    if (!email) next.email = 'Please add an email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'That email looks incomplete.'
    if (!data.get('consent')) next.consent = 'Please accept the terms to continue.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    // NOTE: no endpoint is wired up. Send `data` to your API / form service here;
    // everything above this line is already validated.
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            // The backdrop closes on click; the panel must not bubble into it.
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            className="relative my-auto w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl md:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-ink/40 transition-colors hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4 12.5 5 5L20 6.5" />
                  </svg>
                </div>
                <h2 id={`${id}-title`} className="mt-6 title-section text-2xl text-ink">
                  Inquiry ready to send
                </h2>
                <p className="mx-auto mt-3 max-w-xs text-sm text-ink/60">
                  Your details passed validation. Connect a form endpoint to
                  deliver them.
                </p>
                <button onClick={onClose} className="btn btn-dark mt-7">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 id={`${id}-title`} className="title-section text-2xl text-ink">
                  Talk to the studio
                </h2>
                <p className="mt-2 text-sm text-ink/60">
                  Tell us what you need and we&apos;ll respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-7">
                  <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${id}-name`} className={label}>
                        Name <span className="text-brand-500">*</span>
                      </label>
                      <input
                        ref={firstFieldRef}
                        autoFocus
                        id={`${id}-name`}
                        name="name"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        className={`mt-2 ${field}`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-brand-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`${id}-email`} className={label}>
                        Email <span className="text-brand-500">*</span>
                      </label>
                      <input
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                        className={`mt-2 ${field}`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-brand-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`${id}-company`} className={label}>
                        Company
                      </label>
                      <input
                        id={`${id}-company`}
                        name="company"
                        placeholder="Company name"
                        className={`mt-2 ${field}`}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${id}-phone`} className={label}>
                        Phone
                      </label>
                      <input
                        id={`${id}-phone`}
                        name="phone"
                        type="tel"
                        placeholder="Your phone number"
                        className={`mt-2 ${field}`}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${id}-type`} className={label}>
                        Project type
                      </label>
                      <div className="relative mt-2">
                        <select
                          id={`${id}-type`}
                          name="projectType"
                          defaultValue=""
                          className={`${field} appearance-none pr-10`}
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${id}-budget`} className={label}>
                        Budget range{' '}
                        <span className="font-medium normal-case tracking-normal text-ink/35">
                          ({budgetCurrency})
                        </span>
                      </label>
                      <div className="relative mt-2">
                        <select
                          id={`${id}-budget`}
                          name="budget"
                          defaultValue=""
                          className={`${field} appearance-none pr-10`}
                        >
                          <option value="" disabled>
                            Select range
                          </option>
                          {budgetRanges.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor={`${id}-message`} className={label}>
                        Message
                      </label>
                      <textarea
                        id={`${id}-message`}
                        name="message"
                        rows={3}
                        placeholder="Brief description of your project or goals…"
                        className={`mt-2 resize-none ${field}`}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <input
                      id={`${id}-consent`}
                      name="consent"
                      type="checkbox"
                      aria-invalid={!!errors.consent}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
                    />
                    <label htmlFor={`${id}-consent`} className="text-xs leading-relaxed text-ink/60">
                      I agree to the{' '}
                      <a href="#" className="underline hover:text-brand-600">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="#" className="underline hover:text-brand-600">
                        Terms and Conditions
                      </a>
                      . My data will be used to respond to this inquiry.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs text-brand-600">{errors.consent}</p>
                  )}

                  <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-ink py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black"
                  >
                    Send inquiry
                  </button>

                  <p className="mt-4 text-center text-xs text-ink/40">
                    We respond within 24 hours · No spam, ever
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
