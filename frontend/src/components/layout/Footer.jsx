
// src/components/layout/Footer.jsx

import { Link } from 'react-router-dom'
import { BarChart2, Github, Twitter } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Research', href: '/dashboard' },
    { label: 'Battle Mode', href: '/battle' },
    { label: 'Learn', href: '/learn' },
    { label: 'Markets', href: '/markets' },
  ],

  Company: [
    { label: 'About', href: '/' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="w-full transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >

      {/* =========================================
          MAIN FOOTER CONTENT
      ========================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          lg:px-12
          pt-12
          pb-10
        "
      >

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            lg:grid-cols-6
            gap-12
            lg:gap-16
          "
        >

          {/* =====================================
              BRAND
          ===================================== */}

          <div className="sm:col-span-1 lg:col-span-3">

            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  shadow-md
                  shrink-0
                "
                style={{
                  background:
                    'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                }}
              >
                <BarChart2
                  size={26}
                  color="white"
                />
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: 'var(--text)',
                }}
              >
                FinLingo
              </h3>

            </div>

            <p
              className="
                text-sm
                sm:text-base
                leading-relaxed
                max-w-md
              "
              style={{
                color: 'var(--text-muted)',
              }}
            >
              Premium financial intelligence platform designed to help
              investors research stocks, compare companies, and discover
              opportunities with AI-powered insights.
            </p>

            {/* Social links */}

            <div className="flex items-center gap-3 mt-6">

              <a
                href="#"
                aria-label="Twitter"
                className="
                  w-10
                  h-10
                  rounded-lg
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-200
                  hover:scale-105
                "
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="
                  w-10
                  h-10
                  rounded-lg
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-200
                  hover:scale-105
                "
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                <Github size={18} />
              </a>

            </div>

          </div>


          {/* =====================================
              FOOTER LINKS
          ===================================== */}

          <div className="sm:col-span-2 lg:col-span-3">

            <div
              className="
                grid
                grid-cols-2
                gap-12
                sm:gap-20
                lg:justify-end
              "
            >

              {Object.entries(footerLinks).map(
                ([section, links]) => (

                  <div key={section}>

                    <h4
                      className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-widest
                        mb-5
                      "
                      style={{
                        color: 'var(--text-muted)',
                      }}
                    >
                      {section}
                    </h4>

                    <ul className="space-y-3">

                      {links.map(link => (

                        <li key={link.label}>

                          <Link
                            to={link.href}
                            className="
                              text-sm
                              transition-colors
                              duration-200
                            "
                            style={{
                              color: 'var(--text-muted)',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color =
                                'var(--text)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.color =
                                'var(--text-muted)'
                            }}
                          >
                            {link.label}
                          </Link>

                        </li>

                      ))}

                    </ul>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          FULL-WIDTH DIVIDER

          Automatically changes with light/dark mode.
      ========================================= */}

      <div
        className="w-full h-px"
        style={{
          background: 'var(--divider)',
          opacity: 0.8,
        }}
      />


      {/* =========================================
          COPYRIGHT

          Small gap from divider.
      ========================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          lg:px-12
          py-5
          flex
          justify-end
        "
      >

        <p
          className="text-sm"
          style={{
            color: 'var(--text-muted)',
          }}
        >
          © {new Date().getFullYear()} FinLingo. All rights reserved.
        </p>

      </div>

    </footer>
  )
}

