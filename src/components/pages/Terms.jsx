
// src/pages/Terms.jsx

import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'

export default function Terms(props) {
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
              Terms of Service
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
                Welcome to PulseBoard. These Terms of Service govern your
                access to and use of the PulseBoard platform, including our
                website, applications, features, content, and services.
              </p>

              <p className="mt-4">
                By accessing or using PulseBoard, you acknowledge that you
                have read, understood, and agree to be bound by these Terms.
                If you do not agree with these Terms, you should not access
                or use the platform.
              </p>
            </section>


            {/* 1. Eligibility */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                1. Eligibility
              </h2>

              <p>
                You must be legally permitted to use PulseBoard under the laws
                applicable to you. By using the platform, you represent that
                you meet any applicable age, contractual, and legal
                requirements.
              </p>

              <p className="mt-4">
                If you are using PulseBoard on behalf of an organization, you
                represent that you have the authority to bind that
                organization to these Terms.
              </p>
            </section>


            {/* 2. Your Account */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                2. Your Account
              </h2>

              <p>
                Certain PulseBoard features may require you to create an
                account. You are responsible for providing accurate
                information and keeping your account information up to date.
              </p>

              <p className="mt-4">
                You are responsible for maintaining the confidentiality of
                your account credentials and for activity that occurs through
                your account.
              </p>

              <p className="mt-4">
                If you believe your account has been accessed without your
                authorization, you should notify PulseBoard as soon as
                reasonably possible.
              </p>
            </section>


            {/* 3. Permitted Use */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                3. Permitted Use
              </h2>

              <p>
                PulseBoard provides financial research and intelligence tools
                for informational and research purposes.
              </p>

              <p className="mt-4">
                You agree to use the platform only for lawful purposes and in
                accordance with these Terms.
              </p>

              <p className="mt-4">
                You may not:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Use the platform for unlawful or fraudulent activities</li>
                <li>Attempt to gain unauthorized access to the platform or its systems</li>
                <li>Interfere with or disrupt the operation of the service</li>
                <li>Copy, reproduce, distribute, or commercially exploit platform content without permission</li>
                <li>Reverse engineer, decompile, or attempt to extract source code from the platform where prohibited by law</li>
                <li>Remove copyright, trademark, or other proprietary notices</li>
                <li>Use automated systems to scrape or collect platform data without authorization</li>
                <li>Attempt to circumvent security features or access restrictions</li>
                <li>Upload malicious code, malware, or other harmful material</li>
              </ul>
            </section>


            {/* 4. Intellectual Property */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                4. Intellectual Property
              </h2>

              <p>
                PulseBoard and its associated software, design, branding,
                interfaces, graphics, text, features, and other original
                materials are owned by or licensed to PulseBoard and are
                protected by applicable intellectual property laws.
              </p>

              <p className="mt-4">
                These Terms do not transfer ownership of PulseBoard or its
                intellectual property to you.
              </p>

              <p className="mt-4">
                You retain ownership of content or information that you
                independently provide to PulseBoard, subject to the rights
                necessary for us to operate the platform and provide the
                requested services.
              </p>
            </section>


            {/* 5. Financial Information */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                5. Financial and Market Information
              </h2>

              <p>
                PulseBoard may provide access to financial data, market data,
                company information, news, research, summaries, analytics,
                charts, and other financial content.
              </p>

              <p className="mt-4">
                Such information may originate from PulseBoard, third-party
                data providers, public sources, or other external sources.
              </p>

              <p className="mt-4">
                Financial and market information may be delayed, incomplete,
                inaccurate, or subject to change without notice. PulseBoard
                does not guarantee the accuracy, completeness, reliability,
                timeliness, or availability of such information.
              </p>

              <p className="mt-4 font-medium" style={{ color: 'var(--text)' }}>
                PulseBoard is a financial research and information platform.
                It does not provide personalized investment, financial, legal,
                accounting, or tax advice.
              </p>
            </section>


            {/* 6. AI Features */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                6. AI-Powered Features
              </h2>

              <p>
                PulseBoard may provide AI-powered tools that help users
                research companies, summarize information, analyze financial
                content, and explore market-related topics.
              </p>

              <p className="mt-4">
                AI-generated responses may contain errors, omissions,
                inaccuracies, outdated information, or incorrect conclusions.
                AI-generated content should therefore be treated as a
                research aid rather than a definitive source of information.
              </p>

              <p className="mt-4">
                You are responsible for independently verifying important
                information before relying on it, particularly when making
                financial or investment decisions.
              </p>

              <p className="mt-4">
                PulseBoard does not guarantee that AI-generated information
                will be accurate, complete, current, or suitable for your
                individual circumstances.
              </p>
            </section>


            {/* 7. Third-Party Services */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                7. Third-Party Services and Content
              </h2>

              <p>
                PulseBoard may integrate with or provide links to third-party
                services, websites, data providers, APIs, or other platforms.
              </p>

              <p className="mt-4">
                Third-party services may operate under their own terms,
                policies, and privacy practices. PulseBoard does not control
                and is not responsible for third-party services or content
                that it does not own or operate.
              </p>

              <p className="mt-4">
                Your use of third-party services may be subject to additional
                terms imposed by those providers.
              </p>
            </section>


            {/* 8. Availability */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                8. Platform Availability
              </h2>

              <p>
                We aim to keep PulseBoard available and reliable, but we do
                not guarantee that the platform will always be available,
                uninterrupted, secure, or error-free.
              </p>

              <p className="mt-4">
                We may temporarily suspend, modify, restrict, or discontinue
                portions of the platform for maintenance, upgrades,
                security, technical reasons, or other operational purposes.
              </p>
            </section>


            {/* 9. User Content */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                9. User Content and Feedback
              </h2>

              <p>
                If PulseBoard allows you to submit feedback, suggestions,
                comments, or other content, you agree that the material will
                not violate applicable laws or the rights of others.
              </p>

              <p className="mt-4">
                By submitting feedback or suggestions about PulseBoard, you
                grant us permission to use that feedback to improve or develop
                our products and services without an obligation to compensate
                you, unless otherwise agreed in writing.
              </p>
            </section>


            {/* 10. Suspension */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                10. Account Suspension or Termination
              </h2>

              <p>
                We may suspend or terminate access to your account or portions
                of the platform if we reasonably believe that you have
                violated these Terms, created a security risk, engaged in
                fraudulent or abusive behavior, or otherwise used the platform
                in a manner that could harm PulseBoard or others.
              </p>

              <p className="mt-4">
                You may stop using PulseBoard at any time. Certain provisions
                of these Terms may continue to apply after termination where
                their nature requires continued application.
              </p>
            </section>


            {/* 11. Disclaimer */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                11. Disclaimer of Warranties
              </h2>

              <p>
                PulseBoard is provided on an "as is" and "as available" basis
                to the extent permitted by applicable law.
              </p>

              <p className="mt-4">
                To the extent permitted by law, PulseBoard disclaims
                warranties, express or implied, relating to the platform,
                including warranties of accuracy, reliability,
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>

              <p className="mt-4">
                Nothing in these Terms excludes or limits any rights or
                protections that cannot legally be excluded or limited under
                applicable law.
              </p>
            </section>


            {/* 12. Limitation of Liability */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                12. Limitation of Liability
              </h2>

              <p>
                To the maximum extent permitted by applicable law, PulseBoard
                and its affiliates, service providers, and partners will not
                be responsible for indirect, incidental, special,
                consequential, or punitive damages arising from or related to
                your use of, or inability to use, the platform.
              </p>

              <p className="mt-4">
                This includes, where permitted by law, losses relating to
                data, profits, business interruption, investment decisions,
                financial losses, or reliance on information made available
                through PulseBoard.
              </p>
            </section>


            {/* 13. Indemnification */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                13. Indemnification
              </h2>

              <p>
                To the extent permitted by applicable law, you agree to
                indemnify and hold harmless PulseBoard and its affiliates,
                officers, employees, and service providers from claims,
                liabilities, damages, losses, and expenses arising from your
                violation of these Terms, misuse of the platform, or
                violation of another person's rights.
              </p>
            </section>


            {/* 14. Privacy */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                14. Privacy
              </h2>

              <p>
                Your use of PulseBoard is also governed by our Privacy Policy,
                which explains how we collect, use, store, and protect
                information associated with your use of the platform.
              </p>
            </section>


            {/* 15. Changes */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                15. Changes to These Terms
              </h2>

              <p>
                We may update these Terms from time to time as PulseBoard
                develops or as legal, regulatory, or operational requirements
                change.
              </p>

              <p className="mt-4">
                When material changes are made, we may provide additional
                notice where appropriate.
              </p>

              <p className="mt-4">
                Your continued use of PulseBoard after updated Terms become
                effective constitutes acceptance of the revised Terms, to the
                extent permitted by applicable law.
              </p>
            </section>


            {/* 16. Governing Law */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                16. Governing Law
              </h2>

              <p>
                These Terms will be governed by and interpreted in accordance
                with the applicable laws governing PulseBoard, without regard
                to conflict-of-law principles, except where applicable law
                requires otherwise.
              </p>

              <p className="mt-4">
                Any dispute arising from these Terms or your use of PulseBoard
                will be handled in accordance with applicable law and any
                applicable dispute-resolution requirements.
              </p>
            </section>


            {/* 17. Contact */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                17. Contact Us
              </h2>

              <p>
                If you have questions or concerns about these Terms of Service,
                please contact us at:
              </p>

              <p className="mt-4">
                <a
                  href="mailto:legal@pulseboard.com"
                  className="font-medium transition-colors duration-200"
                  style={{ color: 'var(--primary)' }}
                >
                  legal@pulseboard.com
                </a>
              </p>
            </section>


            {/* Final Notice */}
            <section
              className="pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <p>
                PulseBoard provides financial research and intelligence tools
                for informational purposes. Information available through the
                platform should not be interpreted as personalized financial,
                investment, legal, accounting, or tax advice.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer {...props} />
    </div>
  )
}

