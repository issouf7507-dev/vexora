interface LogoProps {
  className?: string
  /** Light-on-dark declension: orange mark + white wordmark. */
  onDark?: boolean
  /** Symbol only — the VX monogram, without the wordmark. */
  markOnly?: boolean
  /** Show the "L'art du prestige" signature under the lockup. */
  withTagline?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const heights: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'h-6',
  md: 'h-9',
  lg: 'h-12 md:h-16',
}

/**
 * VECXORA lockup — assets extracted from the official charte graphique.
 * Déclinaison 03 : always pick the version that reads best on its background.
 */
export default function Logo({
  className = '',
  onDark = false,
  markOnly = false,
  withTagline = false,
  size = 'md',
}: LogoProps) {
  if (markOnly) {
    return (
      <img
        src={onDark ? '/brand/vecxora-mark-white.png' : '/brand/vecxora-mark.png'}
        alt="VECXORA"
        className={`${heights[size]} w-auto select-none ${className}`}
        draggable={false}
      />
    )
  }

  return (
    <span className={`inline-flex select-none flex-col items-start ${className}`}>
      <img
        src={onDark ? '/brand/vecxora-lockup-dark.png' : '/brand/vecxora-lockup-light.png'}
        alt="VECXORA"
        className={`${heights[size]} w-auto`}
        draggable={false}
      />
      {withTagline && (
        <span
          className={`mt-2 self-stretch text-[0.62rem] font-medium uppercase tracking-[0.42em] ${
            onDark ? 'text-white/60' : 'text-ink/50'
          }`}
        >
          L&rsquo;art du prestige
        </span>
      )}
    </span>
  )
}
