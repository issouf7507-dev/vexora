import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function ConsentNotice() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
        >
          <div className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:flex-row sm:justify-between">
            <p className="text-sm text-ink/70">
              We use cookies for analytics and to improve your experience.{' '}
              <a href="#" className="font-medium text-brand-600 underline">
                Privacy Policy
              </a>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => setVisible(false)}
                className="rounded-full bg-cream px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink/10"
              >
                Reject
              </button>
              <button
                onClick={() => setVisible(false)}
                className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
