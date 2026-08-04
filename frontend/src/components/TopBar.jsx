
function TopBar() {
  const isSignedIn = false

  return (
    <div className="topbar">
      <div className="topbar-left">
        <input type="text" className="search-input" placeholder="Search a company or ticker" />
      </div>

      <div className="topbar-right">
        <button className={isSignedIn ? 'stat-pill' : 'stat-pill locked'}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2c1 4-3 5-3 9a3 3 0 006 0c1-2-1-3-1-5 2 1 3 4 3 6a5 5 0 01-10 0c0-5 3-6 5-10z" />
          </svg>
          {isSignedIn ? '7 day streak' : 'Streak'}
        </button>

        <button className={isSignedIn ? 'stat-pill' : 'stat-pill locked'}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
          </svg>
          {isSignedIn ? '12 terms' : 'Vocab'}
        </button>

        <div className="topbar-divider"></div>

        <button className="btn">Sign in</button>
        <button className="btn btn-primary">Create account</button>
      </div>
    </div>
  )
}

export default TopBar