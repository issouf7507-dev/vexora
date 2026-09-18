import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { contact } from '../data/content'

const headlineWords = ['Ready', 'to', 'start', 'building?']

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-950 py-28 text-white md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 100%, rgba(255,100,0,0.32), transparent 65%)',
        }}
      />
      <div className="container-loro relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="title-display text-[17vw] leading-[0.88] sm:text-8xl md:text-9xl">
              {headlineWords.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {w}
                </motion.span>
              ))}
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg text-white/70">
                Let&apos;s talk about your project. No pressure, just a
                conversation about what&apos;s possible.
              </p>
              <a href={`mailto:${contact.email}`} className="btn btn-light mt-8">
                Talk to the Studio
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:pb-4">
            <div className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <ContactRow label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <ContactRow label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, '')}`} />
              <ContactRow label="Website" value={contact.site} href={`https://${contact.site}`} />
              <div>
                <p className="label text-white/40">Studio</p>
                <p className="mt-2 leading-relaxed text-white/75">{contact.address}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="label text-white/40">{label}</p>
      <a
        href={href}
        className="mt-2 block text-xl font-semibold text-white transition-colors hover:text-brand-300"
      >
        {value}
      </a>
    </div>
  )
}
