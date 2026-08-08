
// src/pages/Privacy.jsx

import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'

export default function Privacy(props) {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Navbar {...props} />

      <main className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20">

          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              Privacy Policy
            </h1>

            <p
              className="text-sm sm:text-base"
              style={{ color: 'var(--text-muted)' }}
            >
              Last updated: August 8, 2026
            </p>
          </div>


          <div
            className="space-y-10 sm:space-y-12 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >

            {/* Introduction */}
            <section>
              <p>
                At PulseBoard, we value your privacy and are committed to
                being transparent about how information is collected, used,
                and protected when you use our platform.
              </p>

              <p className="mt-4">
                This Privacy Policy explains what information we may collect,
                why we collect it, how we use it, and the choices available to
                you when using PulseBoard.
              </p>
            </section>


            {/* 1. Information We Collect */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                1. Information We Collect
              </h2>

              <p>
                Depending on how you use PulseBoard, we may collect the
                following categories of information.
              </p>

              <h3
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Account Information
              </h3>

              <p>
                When you create an account, we may collect information such as:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Name</li>
                <li>Email address</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>Account preferences</li>
              </ul>

              <h3
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Usage and Preference Information
              </h3>

              <p>
                When you interact with PulseBoard, we may store information
                associated with your use of the platform, including:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Companies or securities added to your watchlist</li>
                <li>Research preferences</li>
                <li>Saved information</li>
                <li>Features you interact with</li>
                <li>Communication preferences</li>
                <li>General account activity</li>
              </ul>

              <h3
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Technical Information
              </h3>

              <p>
                We may automatically receive certain technical information
                when you access PulseBoard, such as:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Approximate location derived from technical information</li>
                <li>IP address</li>
                <li>Pages or features accessed</li>
                <li>Basic usage and performance information</li>
              </ul>

              <p className="mt-4">
                This information may be used to maintain the security,
                reliability, and performance of the platform.
              </p>
            </section>


            {/* 2. How We Use Your Information */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                2. How We Use Your Information
              </h2>

              <p>We may use the information we collect to:</p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Create and maintain your PulseBoard account</li>
                <li>Provide access to platform features</li>
                <li>Personalize your research experience</li>
                <li>Maintain your watchlists and preferences</li>
                <li>Provide AI-powered research and insights</li>
                <li>Improve the functionality and usability of PulseBoard</li>
                <li>Understand how users interact with our platform</li>
                <li>Detect, investigate, and prevent fraud, abuse, or security issues</li>
                <li>Communicate with you about your account or the platform</li>
                <li>Send optional product updates or marketing communications where permitted</li>
                <li>Comply with applicable legal obligations</li>
              </ul>

              <p className="mt-4">
                We do not use your personal information for purposes unrelated
                to the operation and improvement of PulseBoard without
                appropriate notice or consent where required.
              </p>
            </section>


            {/* 3. AI Features */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                3. AI-Powered Features
              </h2>

              <p>
                PulseBoard may provide AI-powered features designed to help
                users research companies, understand financial information,
                summarize information, and explore market-related topics.
              </p>

              <p className="mt-4">
                Information provided to AI-powered features may be processed
                to generate responses or insights.
              </p>

              <p className="mt-4">
                AI-generated information may be incomplete, inaccurate, or
                outdated. You should independently verify important information
                before relying on it, particularly when making financial or
                investment decisions.
              </p>

              <p className="mt-4">
                We do not represent AI-generated content as guaranteed
                financial advice.
              </p>
            </section>


            {/* 4. Financial Information */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                4. Financial and Market Information
              </h2>

              <p>
                PulseBoard may display financial information, market data,
                company information, news, research, and other financial
                content obtained from third-party sources or data providers.
              </p>

              <p className="mt-4">
                Such information may change over time and may contain errors
                or delays.
              </p>

              <p className="mt-4">
                PulseBoard is intended as a research and informational
                platform and does not provide personalized investment,
                financial, legal, or tax advice.
              </p>
            </section>


            {/* 5. Sharing */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                5. How We Share Information
              </h2>

              <p>We may share information in limited circumstances, including with:</p>

              <h3
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Service Providers
              </h3>

              <p>
                We may use trusted third-party providers to help operate
                PulseBoard, such as providers for hosting, authentication,
                analytics, communications, data storage, or other
                infrastructure.
              </p>

              <p className="mt-4">
                These providers may process information on our behalf to
                provide their services.
              </p>

              <h3
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Legal and Safety Requirements
              </h3>

              <p>We may disclose information when reasonably necessary to:</p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Comply with applicable law or legal processes</li>
                <li>Respond to lawful requests from authorities</li>
                <li>Protect the rights, safety, and property of PulseBoard, our users, or others</li>
                <li>Investigate fraud, abuse, or security incidents</li>
              </ul>

              <h3
                className="text-lg font-semibold mt-6 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Business Transfers
              </h3>

              <p>
                If PulseBoard is involved in a merger, acquisition, financing,
                restructuring, sale of assets, or similar transaction,
                information associated with the platform may be transferred
                as part of that transaction, subject to applicable law.
              </p>

              <p className="mt-4">
                We do not sell personal information as a business practice.
              </p>
            </section>


            {/* 6. Security */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                6. Data Security
              </h2>

              <p>
                We take reasonable technical and organizational measures
                designed to protect information against unauthorized access,
                loss, misuse, alteration, or disclosure.
              </p>

              <p className="mt-4">
                However, no online service can guarantee absolute security.
                You should use a strong password and avoid sharing your
                account credentials with others.
              </p>
            </section>


            {/* 7. Retention */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                7. Data Retention
              </h2>

              <p>
                We retain information for as long as reasonably necessary to
                provide our services, maintain your account, fulfill
                legitimate business purposes, resolve disputes, enforce
                agreements, and comply with legal obligations.
              </p>

              <p className="mt-4">
                When information is no longer required, we may delete or
                anonymize it in accordance with our applicable policies and
                legal requirements.
              </p>
            </section>


            {/* 8. Your Choices */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                8. Your Choices
              </h2>

              <p>
                Depending on your location and applicable law, you may have
                rights regarding your personal information, which may include
                the ability to:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Access information associated with your account</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of certain information</li>
                <li>Manage communication preferences</li>
                <li>Withdraw certain consents</li>
                <li>Request information about how your data is processed</li>
              </ul>

              <p className="mt-4">
                Some requests may be subject to applicable legal or
                operational limitations.
              </p>

              <p className="mt-4">
                To make a privacy-related request, please contact us using
                the information below.
              </p>
            </section>


            {/* 9. Cookies */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                9. Cookies and Similar Technologies
              </h2>

              <p>
                PulseBoard may use cookies or similar technologies to maintain
                sessions, remember preferences, understand platform usage,
                improve performance, and support security.
              </p>

              <p className="mt-4">
                The technologies we use may change as the platform develops.
              </p>

              <p className="mt-4">
                Where required, we will provide appropriate choices regarding
                non-essential cookies and similar technologies.
              </p>
            </section>


            {/* 10. Third Parties */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                10. Third-Party Services and Links
              </h2>

              <p>
                PulseBoard may integrate with or link to third-party services,
                websites, data providers, or other platforms.
              </p>

              <p className="mt-4">
                Those services operate under their own privacy policies and
                terms. PulseBoard is not responsible for the privacy practices
                of third-party services that it does not control.
              </p>

              <p className="mt-4">
                We encourage you to review the privacy policies of third-party
                services before providing them with personal information.
              </p>
            </section>


            {/* 11. Children */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                11. Children's Privacy
              </h2>

              <p>
                PulseBoard is not intended for children who are not legally
                permitted to use financial or investment-related services in
                their jurisdiction.
              </p>

              <p className="mt-4">
                We do not knowingly collect personal information from children
                in violation of applicable law.
              </p>
            </section>


            {/* 12. Changes */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                12. Changes to This Privacy Policy
              </h2>

              <p>
                We may update this Privacy Policy as PulseBoard evolves or as
                legal and regulatory requirements change.
              </p>

              <p className="mt-4">
                When we make material changes, we may provide additional
                notice where appropriate.
              </p>

              <p className="mt-4">
                The "Last updated" date at the top of this page indicates when
                this policy was most recently revised.
              </p>
            </section>


            {/* 13. Contact */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                13. Contact Us
              </h2>

              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or the way PulseBoard handles information,
                please contact us at:
              </p>

              <p className="mt-4">
                <a
                  href="mailto:privacy@pulseboard.com"
                  className="font-medium transition-colors duration-200"
                  style={{ color: 'var(--primary)' }}
                >
                  privacy@pulseboard.com
                </a>
              </p>
            </section>


            {/* Disclaimer */}
            <section
              className="pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <p>
                PulseBoard is designed to provide financial research and
                intelligence tools. Information available through the
                platform should not be interpreted as personalized financial,
                investment, legal, or tax advice.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer {...props} />
    </div>
  )
}

