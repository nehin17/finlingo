import { useState } from 'react'
import Sidebar from '../layout/Sidebar.jsx'
import Navbar from '../layout/Navbar.jsx'
import LearnHero from '../learn/LearnHero'
import ProgressDashboard from '../learn/ProgressDashboard'
import LearningPaths from '../learn/LearningPaths'
import FeaturedCaseStudies from '../learn/FeaturedCaseStudies'
import MiniAnalystChallenge from '../learn/MiniAnalystChallenge'
import InteractiveTools from '../learn/InteractiveTools'
import ConceptLibrary from '../learn/ConceptLibrary'

export default function LearnHub(props) {
  return (
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Sidebar {...props} />
      <div className="flex-1 ml-20">
        <Navbar {...props} />

        <main className="pt-24 sm:pt-28 p-8">
          <div className="max-w-[1400px] mx-auto">
            <LearnHero />
            <ProgressDashboard />
            <LearningPaths />
            <FeaturedCaseStudies />
            <MiniAnalystChallenge />
            <InteractiveTools />
            <ConceptLibrary />
          </div>
        </main>
      </div>
    </div>
  )
}