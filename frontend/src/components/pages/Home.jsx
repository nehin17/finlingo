// src/components/pages/Home.jsx
import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'

import HeroSection from '../home/HeroSection.jsx'
import MarketTicker from '../home/MarketTicker.jsx'
import FeatureCarousel from '../home/FeatureCarousel.jsx'
import ProductShowcase from '../home/ScrollShowcase.jsx'
import FinalCTA from '../home/FinalCTA.jsx'

export default function Home({
  onSignUpClick,
  ...props
}) {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Navbar
        {...props}
        onSignUpClick={onSignUpClick}
      />

      <main className="pt-16">
        <HeroSection
          onSignUpClick={onSignUpClick}
        />

        <MarketTicker />

        {/* Product Tour Section */}
        <div
          id="product-tour"
          className="scroll-mt-24"
        >
          <FeatureCarousel />
        </div>

        {/* Premium horizontal showcase section */}
        <div className="py-12 sm:py-20 lg:py-24">
          <ProductShowcase />
        </div>

        <FinalCTA
          onSignUpClick={onSignUpClick}
        />
      </main>

      <Footer />
    </div>
  )
}