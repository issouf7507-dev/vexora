import { motion } from 'framer-motion'

interface DisplayBannerProps {
  label?: string
  text: string
  id?: string
  dark?: boolean
  className?: string
}

/**
 * Large statement text that reveals word-by-word as it enters view.
 */
export default function DisplayBanner({
  label,
  text,
  id,
  dark = false,
  className = '',
}: DisplayBannerProps) {
  const words = text.split(' ')
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-28 md:py-36 ${
        dark ? 'bg-brand-950 text-white' : 'bg-cream text-ink'
      } ${className}`}
    >
      {dark && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 60% at 50% 50%, rgba(255,100,0,0.22), transparent 70%)',
          }}
        />
      )}
      <div className="container-loro relative">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`label mb-10 ${dark ? 'text-brand-300' : 'text-brand-600'}`}
          >
            {label}
          </motion.p>
        )}
        <h2 className="flex flex-wrap gap-x-[0.24em] gap-y-2 title-display text-[10.5vw] leading-[0.96] md:text-[6.5rem] lg:text-[7rem]">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0.12, y: '0.2em' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  )
}
