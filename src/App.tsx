import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Testimonial from './components/Testimonial'
import TechStack from './components/TechStack'
import DisplayBanner from './components/DisplayBanner'
import Difference from './components/Difference'
import Industries from './components/Industries'
import Demo from './components/Demo'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ConsentNotice from './components/ConsentNotice'

export default function App() {
  // Recalculate pinned scroll positions once images/fonts settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonial />
        <TechStack />
        <DisplayBanner
          label="AI Studio"
          dark
          text="Every Loro site is documented, audited, and handed off yours to keep."
        />
        <Difference />
        <DisplayBanner text="Your brand deserves to stand out. Not blend in with every other template." />
        <Industries />
        <Demo />
        <Contact />
      </main>
      <Footer />
      <ConsentNotice />
    </>
  )
}
