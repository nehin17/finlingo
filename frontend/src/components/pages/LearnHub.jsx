
// src/components/pages/LearnHub.jsx
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

export default function LearnHub({
  isAuthenticated = false,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,

  // Backend/API-provided learning progress
  progress = null,
}) {
  // MOBILE SIDEBAR STATE
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  // Only expose progress when authenticated.
  // The actual progress should come from the backend.
  const userProgress = isAuthenticated
    ? progress
    : null

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >

      {/* ================= NAVBAR ================= */}

      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        theme={theme}
        onThemeToggle={onThemeToggle}
        onSignInClick={onSignInClick}
        onSignUpClick={onSignUpClick}
        onSignOut={onSignOut}

        onSidebarToggle={() =>
          setMobileSidebarOpen(true)
        }
      />


      {/* ============== SIDEBAR + CONTENT ============== */}

      <div className="flex w-full">

        {/* ================= SIDEBAR ================= */}

        <Sidebar
          user={user}
          isAuthenticated={isAuthenticated}

          onSignInClick={onSignInClick}
          onSignOut={onSignOut}

          mobileOpen={mobileSidebarOpen}
          onMobileClose={() =>
            setMobileSidebarOpen(false)
          }

          onAccountNavigate={(id) => {
            console.log('Sidebar action:', id)
            setMobileSidebarOpen(false)
          }}
        />


        {/* ================= MAIN CONTENT ================= */}

        <main
          className="
            flex-1
            min-w-0
            min-h-screen
            pt-20
            sm:pt-24
            transition-all
            duration-300
          "
        >

          <div
            className="
              w-full
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-8
            "
          >

            <LearnHero
              progress={userProgress}
              user={user}
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
            />

            <ProgressDashboard
              progress={userProgress}
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
            />

            <section id="learning-paths">
              <LearningPaths
                progress={userProgress}
              />
            </section>

            <FeaturedCaseStudies />

            <MiniAnalystChallenge />

            <InteractiveTools />

            <ConceptLibrary
              completedConcepts={
                userProgress?.completedConcepts ?? []
              }
            />

          </div>
        </main>
      </div>
    </div>
  )
}

