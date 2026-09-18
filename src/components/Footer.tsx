import Logo from './Logo'
import { nav, contact } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-950 pb-10 pt-16 text-white">
      <div className="container-loro">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo onDark withTagline />
            <p className="mt-4 text-white/60">
              Design engineering for ambitious brands. Tech crafted with empathy,
              purpose in every pixel.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Loro Labs. Recreation for study purposes.</p>
          <p>{contact.site} · Last updated: May 2026</p>
        </div>
      </div>
    </footer>
  )
}
