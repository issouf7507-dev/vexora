// Central content for the Loro Labs recreation.

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Portfolio', href: '#industries' },
  { label: 'Case Studies', href: '#difference' },
  { label: 'Demo', href: '#demo' },
  { label: 'Contact', href: '#contact' },
]

export interface Service {
  index: string
  kicker: string
  title: string
  description: string
  image: string
}

export const services: Service[] = [
  {
    index: '01 / 06',
    kicker: 'Defined Website Refresh',
    title: 'Website Development',
    description:
      'A website that does more than exist: fast, sharp, and built to convert visitors into customers.',
    image: '/img/service-1.svg',
  },
  {
    index: '02 / 06',
    kicker: 'Scoped Application Build',
    title: 'App Development',
    description:
      'Mobile apps that feel right and work right for real users on real devices.',
    image: '/img/service-2.svg',
  },
  {
    index: '03 / 06',
    kicker: 'Workflow-Led Systems Build',
    title: 'Systems Development',
    description:
      'Custom portals, dashboards, and workflows built around how your team actually works.',
    image: '/img/service-3.svg',
  },
  {
    index: '04 / 06',
    kicker: 'Advisory Engagement',
    title: 'IT Consulting',
    description:
      'Technology guidance to help you pick the right tools and plan your roadmap without costly mistakes.',
    image: '/img/service-4.svg',
  },
  {
    index: '05 / 06',
    kicker: 'Scoped Creative Production',
    title: 'AI Media',
    description:
      'AI-generated photos, videos, and hero animations that give your brand a look your competitors cannot replicate.',
    image: '/img/service-5.svg',
  },
  {
    index: '06 / 06',
    kicker: 'Scoped Identity Engagement',
    title: 'Brand Identity',
    description:
      'Visual identity systems that feel intentional, from logo design to full brand guidelines.',
    image: '/img/service-6.svg',
  },
]

export const stats = [
  { value: 120, suffix: '+', label: 'projects delivered for ambitious APAC teams' },
  { value: 18, suffix: '+', label: 'industries served across web, app, and AI media' },
  { value: 100, suffix: '%', label: 'projects delivered by our in-house team' },
]

export const techStack = [
  'Astro',
  'React',
  'Next.js',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'shadcn/ui',
  'GSAP',
  'Framer',
  'Supabase',
  'Docker',
  'GitHub',
  'Vercel',
  'Railway',
  'Upstash',
  'Node.js',
  'PostgreSQL',
]

export interface Difference {
  title: string
  body: string
  image: string
  /** Icon key rendered by the Difference bento grid. */
  icon: 'spark' | 'trend' | 'shield' | 'search'
}

export const differences: Difference[] = [
  {
    title: 'We Learn Your Business First',
    body: 'Before we write a line of code, we sit with you. We ask the questions most agencies skip. We figure out what actually matters to your operations, not just what looks good on a homepage.',
    image: '/img/diff-1.svg',
    icon: 'spark',
  },
  {
    title: 'One Team. One Conversation.',
    body: 'No account managers relaying messages. No ticket systems. No waiting three days for a reply. You talk directly to the people building your project. Every time.',
    image: '/img/diff-2.svg',
    icon: 'trend',
  },
  {
    title: 'Honest Scoping. Not Upselling.',
    body: 'Sometimes the answer is a simple website. Sometimes it is a full platform. We will be honest about which one, even when the simple answer means a smaller invoice for us.',
    image: '/img/diff-3.svg',
    icon: 'shield',
  },
  {
    title: 'It Works After We Leave',
    body: 'We do not build things that fall apart when the contract ends. You own everything. You understand everything. And if you need us later, we are here.',
    image: '/img/diff-4.svg',
    icon: 'search',
  },
]

export const industries = [
  { tag: 'Health & Spa', name: 'Wellness & Clinics' },
  { tag: 'Beauty', name: 'Hair Salons & Stylists' },
  { tag: 'Recruitment', name: 'Talent & Staffing' },
  { tag: 'Education', name: 'Schools & Education' },
  { tag: 'E-commerce', name: 'Cosmetics & Beauty' },
  { tag: 'Automotive', name: 'Dealers & Services' },
  { tag: 'Travel & Telecom', name: 'Mobility & Connectivity' },
  { tag: 'Construction', name: 'Build & Trades' },
  { tag: 'Software & Tech', name: 'Products & Platforms' },
]

// Inquiry form options. Project types mirror the services on offer.
export const projectTypes = [
  'Website Development',
  'App Development',
  'Systems Development',
  'IT Consulting',
  'AI Media',
  'Brand Identity',
  'Not sure yet',
]

// Currency follows the contact details below — change both together.
export const budgetCurrency = 'PHP'
export const budgetRanges = [
  'Under 100k',
  '100k – 300k',
  '300k – 600k',
  '600k – 1M',
  '1M+',
  'Not defined yet',
]

// Placeholder hrefs — swap for the real profiles before going live.
export const socials = [
  { label: 'Facebook', icon: 'facebook' as const, href: '#' },
  { label: 'Instagram', icon: 'instagram' as const, href: '#' },
  { label: 'TikTok', icon: 'tiktok' as const, href: '#' },
  { label: 'LinkedIn', icon: 'linkedin' as const, href: '#' },
]

export const contact = {
  email: 'info@lorolabs.ai',
  phone: '+63 960 277 8783',
  site: 'lorolabs.ai',
  address:
    'Unit 111 Spark Place, P. Tuazon Avenue cor. 10th Avenue, Araneta City, Cubao, Quezon City 1109, Philippines',
}
