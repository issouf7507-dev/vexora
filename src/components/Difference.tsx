import Reveal from './Reveal'
import { differences } from '../data/content'
import type { Difference as DifferenceItem } from '../data/content'

const icons: Record<DifferenceItem['icon'], JSX.Element> = {
  spark: (
    <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m14.5-5.5-2.8 2.8m-5.4 5.4-2.8 2.8m11 0-2.8-2.8M9.3 9.3 6.5 6.5" />
  ),
  trend: (
    <>
      <path d="M3 17 9.5 10.5l4 4L21 7" />
      <path d="M15 7h6v6" />
    </>
  ),
  shield: <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.1 7.5 9.5 4.4-1.4 7.5-5.1 7.5-9.5V6L12 3Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
}

function Icon({ name }: { name: DifferenceItem['icon'] }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-brand-500"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

function Copy({ item }: { item: DifferenceItem }) {
  return (
    <div className="p-6 md:p-7">
      <div className="flex items-center gap-3">
        <Icon name={item.icon} />
        <h3 className="title-section text-lg text-white md:text-xl">{item.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{item.body}</p>
    </div>
  )
}

/** Shared card chrome: near-black tile that lifts on hover. */
const card =
  'group flex h-full flex-col overflow-hidden rounded-[22px] bg-brand-950 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:ring-brand-500/40 hover:shadow-2xl hover:shadow-black/20'

export default function Difference() {
  const [first, second, third, fourth] = differences

  return (
    <section id="difference" className="bg-cream py-28">
      <div className="container-loro">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label text-brand-600">The Loro Difference</span>
          <h2 className="mt-5 title-section text-4xl text-ink md:text-5xl">
            Why It Matters for Your Business
          </h2>
          <p className="mt-5 text-lg text-ink/60">
            The technology behind your product isn&apos;t just a detail. It&apos;s
            the difference between a site that works and one that wins.
          </p>
        </Reveal>

        {/* Bento: one tall tile, two stacked, one full-width band. */}
        <div className="mt-16 grid auto-rows-min gap-5 lg:grid-cols-2">
          {/* Tall tile — copy on top, artwork filling the rest. */}
          <Reveal className="lg:row-span-2">
            <article className={card}>
              <Copy item={first} />
              <div className="mt-auto min-h-[200px] max-h-[420px] flex-1 overflow-hidden md:min-h-[240px]">
                <img
                  src={first.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </article>
          </Reveal>

          {/* Two stacked tiles — artwork on top, copy below. */}
          {[second, third].map((item, i) => (
            <Reveal key={item.title} delay={0.1 + i * 0.1}>
              <article className={card}>
                <div className="h-32 overflow-hidden md:h-36">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Copy item={item} />
              </article>
            </Reveal>
          ))}

          {/* Full-width band — artwork left, copy right. */}
          <Reveal delay={0.3} className="lg:col-span-2">
            <article className={`${card} sm:flex-row`}>
              <div className="h-40 shrink-0 overflow-hidden sm:h-auto sm:w-1/3 sm:max-w-[260px]">
                <img
                  src={fourth.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center">
                <Copy item={fourth} />
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
