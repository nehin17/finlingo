
// src/App.jsx

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext.jsx'

import Home from './components/pages/Home.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import BattleMode from './components/pages/BattleMode.jsx'
import LearnHub from './components/pages/LearnHub.jsx'
import Watchlist from './components/pages/Watchlist.jsx'
import Privacy from './components/pages/Privacy.jsx'
import Terms from './components/pages/Terms.jsx'
import Markets from './components/pages/Markets.jsx'
import Profile from './components/pages/Profile.jsx'

import SignInModal from './components/auth/SignInModal.jsx'
import SignUpModal from './components/auth/SignUpModal.jsx'

import CaseStudyDetailPage from './components/learn/CaseStudyDetail.jsx'
import FloatingAIAssistant from './components/ai/FloatingAIAssistant.jsx'

// ============================================================
// APP ROUTES
// ============================================================
//
// This component lives inside:
// BrowserRouter → AuthProvider → AppRoutes
//
// AuthContext is the SINGLE source of truth for authentication.
// ============================================================

function AppRoutes() {
  const navigate = useNavigate()

  // ==========================================================
  // AUTHENTICATION
  // ==========================================================

  const {
    user,
    loading: authLoading,
    isAuthenticated,
    logout,
  } = useAuth()

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // ==========================================================
  // THEME
  // ==========================================================

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    )

    localStorage.setItem('theme', theme)
  }, [theme])

  // ==========================================================
  // AUTH SUCCESS HANDLERS
  // ==========================================================
  //
  // SignInModal and SignUpModal already communicate with
  // AuthContext.
  //
  // These callbacks ONLY handle UI after authentication
  // succeeds.
  // ==========================================================

  const handleSignInSuccess = () => {
    setShowSignIn(false)
  }

  const handleSignUpSuccess = () => {
    setShowSignUp(false)
  }

  // ==========================================================
  // SIGN OUT
  // ==========================================================

  const handleSignOut = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // ==========================================================
  // ACCOUNT MENU NAVIGATION
  // ==========================================================

  const handleAccountNavigate = (id) => {
    const routes = {
      profile: '/profile',
      watchlist: '/watchlist',
      progress: '/learn',
      settings: '/profile',
    }

    const path = routes[id]

    if (path) {
      navigate(path)
    }
  }

  // ==========================================================
  // SHARED AUTH PROPS
  // ==========================================================

  const authProps = {
    isAuthenticated,
    user,
    theme,

    onThemeToggle: () => {
      setTheme((prev) =>
        prev === 'light' ? 'dark' : 'light'
      )
    },

    onSignInClick: () => setShowSignIn(true),

    onSignUpClick: () => setShowSignUp(true),

    onSignOut: handleSignOut,
  }

  // ==========================================================
  // SIDEBAR PROPS
  // ==========================================================

  const sidebarProps = {
    user,
    isAuthenticated,

    onSignInClick: () => setShowSignIn(true),

    onSignOut: handleSignOut,

    onAccountNavigate: handleAccountNavigate,

    mobileOpen: mobileNavOpen,

    onMobileClose: () => setMobileNavOpen(false),
  }

  // ==========================================================
  // NAVBAR PROPS
  // ==========================================================

  const navbarProps = {
    ...authProps,

    onSidebarToggle: () => {
      setMobileNavOpen((prev) => !prev)
    },
  }

  // ==========================================================
  // WAIT FOR AUTH INITIALIZATION
  // ==========================================================

  if (authLoading) {
    return null
  }

  // ==========================================================
  // APP
  // ==========================================================

  return (
    <>
      <Routes>

        {/* ==================================================
            HOME
        ================================================== */}

        <Route
          path="/"
          element={
            <Home
              {...authProps}
              onSidebarToggle={() =>
                setMobileNavOpen((prev) => !prev)
              }
            />
          }
        />

        {/* ==================================================
            LEGAL
        ================================================== */}

        <Route
          path="/privacy"
          element={<Privacy {...authProps} />}
        />

        <Route
          path="/terms"
          element={<Terms {...authProps} />}
        />

        {/* ==================================================
            MARKETS
        ================================================== */}

        <Route
          path="/markets"
          element={
            <Markets
              {...authProps}
              navbarProps={navbarProps}
              sidebarProps={sidebarProps}
            />
          }
        />

        {/* ==================================================
            CASE STUDY
        ================================================== */}

        <Route
          path="/learn/case-studies/:caseStudyId"
          element={
            <CaseStudyDetailPage {...authProps} />
          }
        />

        {/* ==================================================
            DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={
            <Dashboard
              {...authProps}
              navbarProps={navbarProps}
              sidebarProps={sidebarProps}
            />
          }
        />

        {/* ==================================================
            BATTLE MODE
        ================================================== */}

        <Route
          path="/battle"
          element={
            <BattleMode
              {...authProps}
              navbarProps={navbarProps}
              sidebarProps={sidebarProps}
            />
          }
        />

        {/* ==================================================
            LEARN
        ================================================== */}

        <Route
          path="/learn"
          element={
            <LearnHub
              {...authProps}
              sidebarProps={sidebarProps}
              onSidebarToggle={() =>
                setMobileNavOpen((prev) => !prev)
              }
            />
          }
        />

        {/* ==================================================
            WATCHLIST
        ================================================== */}

        <Route
          path="/watchlist"
          element={
            <Watchlist
              {...authProps}
              navbarProps={navbarProps}
              sidebarProps={sidebarProps}
            />
          }
        />

        {/* ==================================================
            PROFILE
        ================================================== */}

        <Route
          path="/profile"
          element={
            <Profile
              {...authProps}
              navbarProps={navbarProps}
              sidebarProps={sidebarProps}
            />
          }
        />

      </Routes>

      {/* ====================================================
          AI ASSISTANT
      ==================================================== */}

      <FloatingAIAssistant />

      {/* ====================================================
          SIGN IN MODAL
      ==================================================== */}

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSuccess={handleSignInSuccess}
          onSwitchToSignUp={() => {
            setShowSignIn(false)
            setShowSignUp(true)
          }}
        />
      )}

      {/* ====================================================
          SIGN UP MODAL
      ==================================================== */}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSuccess={handleSignUpSuccess}
          onSwitchToSignIn={() => {
            setShowSignUp(false)
            setShowSignIn(true)
          }}
        />
      )}
    </>
  )
}

// ============================================================
// ROOT APP
// ============================================================
//
// Provider hierarchy:
//
// BrowserRouter
//      ↓
// AuthProvider       ← provided by main.jsx
//      ↓
// AppRoutes
//
// IMPORTANT:
// AuthProvider is NOT placed here because main.jsx already
// wraps <App /> with AuthProvider.
// ============================================================

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

