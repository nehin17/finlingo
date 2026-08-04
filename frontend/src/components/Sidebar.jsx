import { useState } from 'react'

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { label: 'Home', icon: <path d="M3 11l9-8 9 8M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" /> },
    { label: 'Research', icon: <path d="M3 3v18h18M7 15l4-6 3 3 5-8" /> },
    { label: 'Battle', icon: <path d="M14 17l7-7-3-3-7 7M3 21l6-2 8-8-4-4-8 8-2 6z" /> },
    { label: 'Learn', icon: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" /> },
    { label: 'Watchlist', icon: <path d="M12 17l-6 3.5 1.5-6.6L2 9.5l6.7-.6L12 3l3.3 5.9 6.7.6-5.5 4.4L18 20.5z" /> },
    { label: 'Live news', icon: <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16M6 19a2 2 0 100 4 2 2 0 000-4z" /> },
  ]

  return (
    <div className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
      <button className="sidebar-logo" onClick={() => setCollapsed(!collapsed)} title="Collapse/expand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 17l5-5 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="nav-list">
        {navItems.map((item) => (
          <button className="nav-btn" key={item.label}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {item.icon}
            </svg>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      <button className="nav-btn account-btn">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        {!collapsed && <span>Account</span>}
      </button>
    </div>
  )
}

export default Sidebar