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
    <>
      <Navbar {...props} />

      <div
        className="flex min-h-screen w-full"
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        {/* Sidebar */}
        <Sidebar {...props} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 pt-20 sm:pt-24 pb-16">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
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
    </>
  )
}