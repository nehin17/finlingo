import ResearchWorkspace from '../research/ResearchWorkspace.jsx'

export default function Dashboard({
  isAuthenticated,
  user,
  theme,
  onThemeToggle,
  onSignInClick,
  onSignUpClick,
  onSignOut,
  navbarProps,
  sidebarProps,
}) {
  return (
    <ResearchWorkspace
      isAuthenticated={isAuthenticated}
      user={user}
      theme={theme}
      onThemeToggle={onThemeToggle}
      onSignInClick={onSignInClick}
      onSignUpClick={onSignUpClick}
      onSignOut={onSignOut}
      navbarProps={navbarProps}
      sidebarProps={sidebarProps}
    />
  )
}