// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Home from './components/pages/Home.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import BattleMode from './components/pages/BattleMode.jsx'
import LearnHub from './components/pages/LearnHub.jsx'
import Watchlist from './components/pages/Watchlist.jsx'
import Privacy from './components/pages/Privacy.jsx'      
import Terms from './components/pages/Terms.jsx'  
import Markets from './components/pages/Markets';

import SignInModal from './components/auth/SignInModal.jsx'
import SignUpModal from './components/auth/SignUpModal.jsx'
import ChatDrawer from './components/shared/ChatDrawer.jsx'

import CaseStudyDetailPage from './components/learn/CaseStudyDetail'


export default function App() {


  // ===========================
  // UI STATE
  // ===========================

  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showChat, setShowChat] = useState(false)



  // ===========================
  // AUTH STATE
  // ===========================

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)



  // ===========================
  // THEME STATE
  // ===========================

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })



  // Apply theme globally

  useEffect(() => {

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } 
    else {
      document.documentElement.classList.remove('dark')
    }


    localStorage.setItem('theme', theme)


  }, [theme])




  // ===========================
  // AUTH HANDLERS
  // ===========================

  const handleSignIn = (userData) => {

    setIsAuthenticated(true)
    setUser(userData)
    setShowSignIn(false)

  }



  const handleSignUp = (userData) => {

    setIsAuthenticated(true)
    setUser(userData)
    setShowSignUp(false)

  }



  const handleSignOut = () => {

    setIsAuthenticated(false)
    setUser(null)

  }




  // ===========================
  // SHARED PROPS
  // ===========================

  const authProps = {

    isAuthenticated,

    user,

    theme,


    onThemeToggle: () => {

      setTheme((prev) =>
        prev === 'light'
          ? 'dark'
          : 'light'
      )

    },


    onSignInClick: () => {
      setShowSignIn(true)
    },


    onSignUpClick: () => {
      setShowSignUp(true)
    },


    onSignOut: handleSignOut,


    onChatToggle: () => {
      setShowChat((prev) => !prev)
    },


    showChat

  }




  // ===========================
  // APP RENDER
  // ===========================

  return (

    <BrowserRouter>


      <Routes>

        <Route
          path="/"
          element={
            <Home {...authProps} />
          }
        />
        <Route
          path="/privacy"
          element={<Privacy {...authProps} />}
        />
        <Route
          path="/terms"
          element={<Terms {...authProps} />}
        />
        <Route path="/markets" element={<Markets />} />

        <Route
          path="/learn/case-studies/:caseStudyId"
          element={<CaseStudyDetailPage {...authProps} />}
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard {...authProps} />
          }
        />


        <Route
          path="/battle"
          element={
            <BattleMode {...authProps} />
          }
        />


        <Route
          path="/learn"
          element={
            <LearnHub {...authProps} />
          }
        />


        <Route
          path="/watchlist"
          element={
            <Watchlist {...authProps} />
          }
        />



      </Routes>




      {/* SIGN IN MODAL */}

      {showSignIn && (

        <SignInModal

          onClose={() =>
            setShowSignIn(false)
          }


          onSuccess={handleSignIn}


          onSwitchToSignUp={() => {

            setShowSignIn(false)

            setShowSignUp(true)

          }}

        />

      )}






      {/* SIGN UP MODAL */}

      {showSignUp && (

        <SignUpModal


          onClose={() =>
            setShowSignUp(false)
          }


          onSuccess={handleSignUp}


          onSwitchToSignIn={() => {

            setShowSignUp(false)

            setShowSignIn(true)

          }}


        />

      )}






      {/* AI CHAT DRAWER */}

      {showChat && (

        <ChatDrawer

          onClose={() =>
            setShowChat(false)
          }

        />

      )}



    </BrowserRouter>

  )

}