// src/components/pages/Home.jsx
import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'

import HeroSection from '../home/HeroSection.jsx'
import MarketTicker from '../home/MarketTicker.jsx'
import FeatureCarousel from '../home/FeatureCarousel.jsx'
import AIResearchPreview from '../home/AIResearchPreview.jsx'
import MarketPulseGrid from '../home/MarketPulseGrid.jsx'
import ProductShowcase from '../home/ScrollShowcase.jsx'
import FinalCTA from '../home/FinalCTA.jsx'

export default function Home(props) {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Navbar {...props} />

      <main className="pt-16">
        <HeroSection 
          onSignUpClick={props.onSignUpClick}
        />

        <MarketTicker />

        <FeatureCarousel />

        {/* ✅ REMOVED: AIResearchPreview & MarketPulseGrid */}
        {/* <AIResearchPreview /> */}
        {/* <MarketPulseGrid /> */}

        {/* Premium horizontal showcase section with proper spacing */}
        <div className="py-12 sm:py-20 lg:py-24">
          <ProductShowcase />
        </div>

        <FinalCTA 
          onSignUpClick={props.onSignUpClick}
        />
      </main>

      <Footer />
    </div>
  )
}