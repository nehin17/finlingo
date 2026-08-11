
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
              Last updated: August 11, 2026
            </p>
          </div>

          {/* Table of Contents */}
          <div
            className="rounded-2xl border p-5 sm:p-6 mb-12"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              Contents
            </h2>

            <ol
              className="list-decimal list-inside space-y-2 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <li>Acceptance of These Terms</li>
              <li>About FinLingo</li>
              <li>Eligibility and Accounts</li>
              <li>Use of the Platform</li>
              <li>Acceptable Use</li>
              <li>Financial Information and Market Data</li>
              <li>AI-Generated Content and Insights</li>
              <li>Educational Content</li>
              <li>User Content and Submissions</li>
              <li>Intellectual Property</li>
              <li>Third-Party Services and Data Providers</li>
              <li>Availability and Platform Changes</li>
              <li>Fees, Subscriptions, and Payments</li>
              <li>Account Suspension and Termination</li>
              <li>Disclaimers</li>
              <li>Limitation of Liability</li>
              <li>Indemnification</li>
              <li>Privacy</li>
              <li>Changes to These Terms</li>
              <li>Governing Law and Disputes</li>
              <li>Contact Us</li>
            </ol>
          </div>

          <div
            className="space-y-10 sm:space-y-12 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >

            {/* Introduction */}
            <section>
              <p>
                These Terms of Service ("Terms") govern your access to and use
                of FinLingo, including our website, applications, features,
                financial research tools, educational resources, AI-powered
                features, and other services that link to or reference these
                Terms (collectively, the "Platform").
              </p>

              <p className="mt-4">
                By accessing or using FinLingo, you agree to be bound by these
                Terms. If you do not agree with these Terms, you should not
                access or use the Platform.
              </p>

              <p className="mt-4">
                If you are using FinLingo on behalf of an organization, you
                represent that you have the authority to accept these Terms on
                that organization's behalf.
              </p>
            </section>


            {/* 1. Acceptance */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                1. Acceptance of These Terms
              </h2>

              <p>
                By creating an account, accessing the Platform, or using any
                FinLingo feature, you acknowledge that you have read,
                understood, and agree to these Terms and our Privacy Policy.
              </p>

              <p className="mt-4">
                These Terms apply to all visitors, registered users, and other
                individuals who access or use the Platform.
              </p>

              <p className="mt-4">
                We may provide additional terms for particular features,
                services, promotions, subscriptions, or products. Where those
                additional terms apply, they will form part of your agreement
                with FinLingo.
              </p>
            </section>


            {/* 2. About FinLingo */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                2. About FinLingo
              </h2>

              <p>
                FinLingo is a financial research and learning platform designed
                to help users explore publicly available company information,
                market data, financial concepts, research tools, and
                AI-assisted insights.
              </p>

              <p className="mt-4">
                FinLingo may provide features including company research,
                market discovery, watchlists, financial metrics, educational
                content, learning paths, challenges, analytical tools,
                summaries, and AI-powered explanations.
              </p>

              <p className="mt-4">
                Features may change over time as FinLingo develops. We may add,
                modify, suspend, or remove features at any time.
              </p>
            </section>


            {/* 3. Eligibility */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                3. Eligibility and Accounts
              </h2>

              <p>
                You must be legally permitted to use the Platform in your
                jurisdiction. If applicable law requires you to be a certain
                age to create an account or use financial information services,
                you must meet that requirement.
              </p>

              <p className="mt-4">
                When creating an account, you agree to provide information
                that is accurate, current, and complete.
              </p>

              <p className="mt-4">
                You are responsible for maintaining the confidentiality of
                your login credentials and for activities performed through
                your account.
              </p>

              <p className="mt-4">
                You should notify FinLingo promptly if you believe your account
                has been accessed without authorization or if your credentials
                have been compromised.
              </p>

              <p className="mt-4">
                You may not create an account using another person's identity,
                impersonate another person, or provide misleading information
                about yourself.
              </p>
            </section>


            {/* 4. Use */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                4. Use of the Platform
              </h2>

              <p>
                Subject to these Terms, FinLingo grants you a limited,
                non-exclusive, non-transferable, revocable right to access and
                use the Platform for its intended purposes.
              </p>

              <p className="mt-4">
                You may use FinLingo to research companies, explore financial
                information, learn financial concepts, organize your research,
                and use other features made available to you.
              </p>

              <p className="mt-4">
                You may not use the Platform in a manner that interferes with
                its operation, compromises its security, violates applicable
                law, or infringes the rights of FinLingo or others.
              </p>
            </section>


            {/* 5. Acceptable Use */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                5. Acceptable Use
              </h2>

              <p>
                You agree not to misuse the Platform. This includes, without
                limitation, the following activities:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>
                  Attempting to gain unauthorized access to the Platform,
                  accounts, systems, or networks
                </li>
                <li>
                  Circumventing security features, access controls, or usage
                  limits
                </li>
                <li>
                  Using bots, scrapers, spiders, crawlers, or automated systems
                  to collect Platform content without authorization
                </li>
                <li>
                  Reverse engineering, decompiling, or attempting to discover
                  source code or underlying systems except where permitted by
                  applicable law
                </li>
                <li>
                  Uploading malware, viruses, malicious code, or other harmful
                  material
                </li>
                <li>
                  Using the Platform to commit fraud or facilitate illegal
                  activity
                </li>
                <li>
                  Attempting to disrupt or overload the Platform or its
                  infrastructure
                </li>
                <li>
                  Impersonating FinLingo, another user, or another individual
                  or organization
                </li>
                <li>
                  Using Platform content to create or operate a competing
                  service without permission
                </li>
                <li>
                  Uploading content that infringes another person's
                  intellectual property, privacy, or other rights
                </li>
              </ul>
            </section>


            {/* 6. Financial Information */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                6. Financial Information and Market Data
              </h2>

              <p>
                FinLingo may display financial information, market data,
                company information, financial metrics, news, research,
                historical information, and other data obtained from public
                sources, third-party providers, exchanges, or other data
                sources.
              </p>

              <p className="mt-4">
                Financial and market information may be delayed, incomplete,
                inaccurate, unavailable, or subject to correction.
              </p>

              <p className="mt-4">
                Market prices and financial information can change rapidly.
                Information displayed on FinLingo should not be assumed to be
                real-time unless FinLingo expressly states otherwise.
              </p>

              <p className="mt-4">
                You are responsible for independently verifying information
                before relying on it.
              </p>

              <p className="mt-4">
                FinLingo does not guarantee the accuracy, completeness,
                reliability, timeliness, or suitability of financial or market
                information displayed through the Platform.
              </p>
            </section>


            {/* 7. AI */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                7. AI-Generated Content and Insights
              </h2>

              <p>
                FinLingo may use artificial intelligence and machine learning
                technologies to provide summaries, explanations, research
                assistance, financial insights, educational material, or other
                generated content.
              </p>

              <p className="mt-4">
                AI-generated content is provided for informational and
                research purposes only.
              </p>

              <p className="mt-4">
                AI systems can produce information that is inaccurate,
                incomplete, outdated, misleading, or inappropriate for a
                particular situation. FinLingo does not guarantee that
                AI-generated content will be accurate or error-free.
              </p>

              <p className="mt-4">
                You should independently verify important information,
                particularly information relating to investments, securities,
                financial decisions, taxes, legal matters, or other situations
                where inaccurate information could result in financial loss.
              </p>

              <p className="mt-4">
                AI-generated content does not constitute personalized
                investment advice, financial advice, legal advice, tax advice,
                accounting advice, or a recommendation to buy, sell, or hold
                any security.
              </p>

              <p className="mt-4">
                You remain solely responsible for decisions you make based on
                information obtained through FinLingo.
              </p>
            </section>


            {/* 8. Education */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                8. Educational Content
              </h2>

              <p>
                FinLingo may provide educational articles, lessons, learning
                paths, challenges, examples, explanations, quizzes, and other
                educational materials.
              </p>

              <p className="mt-4">
                Educational content is intended to help users understand
                financial and business concepts. It should not be treated as
                personalized financial, investment, tax, accounting, or legal
                advice.
              </p>

              <p className="mt-4">
                Examples, simulations, calculations, and hypothetical
                scenarios are provided for educational purposes and may not
                reflect actual market conditions or future outcomes.
              </p>
            </section>


            {/* 9. User Content */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                9. User Content and Submissions
              </h2>

              <p>
                Certain features may allow you to submit, upload, save, or
                otherwise provide content through FinLingo, including profile
                information, images, notes, feedback, research information, or
                other materials ("User Content").
              </p>

              <p className="mt-4">
                You retain ownership of User Content that you own. However, by
                submitting User Content, you grant FinLingo the limited rights
                necessary to host, store, process, display, and otherwise use
                that content to operate and provide the Platform.
              </p>

              <p className="mt-4">
                You represent that you have the necessary rights and
                permissions to submit User Content and that your User Content
                does not violate applicable law or the rights of another
                person.
              </p>

              <p className="mt-4">
                You should not upload confidential information, passwords,
                private financial credentials, or other sensitive information
                that you do not want processed through the Platform.
              </p>
            </section>


            {/* 10. IP */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                10. Intellectual Property
              </h2>

              <p>
                The Platform and its contents, including its software, design,
                layout, branding, logos, graphics, interfaces, original text,
                educational materials, and other FinLingo-created content,
                are owned by or licensed to FinLingo and are protected by
                applicable intellectual property laws.
              </p>

              <p className="mt-4">
                Except as expressly permitted by these Terms, you may not copy,
                reproduce, distribute, modify, publicly display, publish,
                license, sell, create derivative works from, or otherwise
                exploit FinLingo's intellectual property without prior written
                permission.
              </p>

              <p className="mt-4">
                Nothing in these Terms transfers ownership of FinLingo's
                intellectual property to you.
              </p>
            </section>


            {/* 11. Third Parties */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                11. Third-Party Services and Data Providers
              </h2>

              <p>
                FinLingo may rely on third-party services, APIs, hosting
                providers, authentication providers, analytics services,
                financial data providers, AI providers, payment processors,
                news providers, and other third-party technologies.
              </p>

              <p className="mt-4">
                Third-party services may have their own terms and privacy
                policies. Your use of those services may be subject to those
                additional terms.
              </p>

              <p className="mt-4">
                FinLingo does not control all third-party services and cannot
                guarantee their availability, accuracy, security, or continued
                operation.
              </p>
            </section>


            {/* 12. Availability */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                12. Availability and Platform Changes
              </h2>

              <p>
                We aim to keep FinLingo available and reliable, but we do not
                guarantee that the Platform will always be available,
                uninterrupted, secure, or error-free.
              </p>

              <p className="mt-4">
                The Platform may occasionally be unavailable because of
                maintenance, updates, technical problems, third-party
                failures, security incidents, or circumstances outside our
                control.
              </p>

              <p className="mt-4">
                We may modify, update, suspend, or discontinue any feature or
                part of the Platform at any time.
              </p>
            </section>


            {/* 13. Payments */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                13. Fees, Subscriptions, and Payments
              </h2>

              <p>
                Certain FinLingo features may be offered for free while other
                features may require payment or a subscription.
              </p>

              <p className="mt-4">
                If we introduce paid services, the applicable price,
                subscription period, billing terms, renewal terms, and
                cancellation information will be presented before you make a
                purchase.
              </p>

              <p className="mt-4">
                You are responsible for providing accurate billing information
                and paying applicable charges associated with your account.
              </p>

              <p className="mt-4">
                Subscription terms may include additional conditions that will
                apply to the relevant paid service.
              </p>
            </section>


            {/* 14. Termination */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                14. Account Suspension and Termination
              </h2>

              <p>
                You may stop using FinLingo at any time. Depending on the
                features available to you, you may also be able to delete your
                account through your account settings.
              </p>

              <p className="mt-4">
                FinLingo may suspend or terminate an account if we reasonably
                believe that the account has violated these Terms, applicable
                law, or created a security or operational risk.
              </p>

              <p className="mt-4">
                We may also suspend access where necessary to protect the
                Platform, other users, or our systems.
              </p>

              <p className="mt-4">
                Provisions of these Terms that by their nature should survive
                termination will continue to apply after your access to the
                Platform ends.
              </p>
            </section>


            {/* 15. Disclaimer */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                15. Disclaimers
              </h2>

              <p>
                FinLingo is provided on an "as is" and "as available" basis to
                the extent permitted by applicable law.
              </p>

              <p className="mt-4">
                We do not guarantee that the Platform or information provided
                through it will be uninterrupted, accurate, complete, reliable,
                current, secure, or suitable for your particular needs.
              </p>

              <p className="mt-4">
                Nothing on FinLingo should be interpreted as an offer,
                solicitation, recommendation, or personalized advice regarding
                any security or investment strategy.
              </p>

              <p className="mt-4">
                Financial markets involve substantial risk. Past performance
                does not guarantee future results.
              </p>

              <p className="mt-4">
                You should consult a qualified financial, legal, tax, or other
                professional before making decisions that require professional
                advice.
              </p>
            </section>


            {/* 16. Liability */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                16. Limitation of Liability
              </h2>

              <p>
                To the maximum extent permitted by applicable law, FinLingo
                and its owners, operators, employees, affiliates, service
                providers, and partners will not be responsible for indirect,
                incidental, special, consequential, exemplary, or punitive
                damages arising from or related to your use of, or inability
                to use, the Platform.
              </p>

              <p className="mt-4">
                This includes, where permitted by law, losses resulting from
                reliance on financial information, market data, AI-generated
                content, educational content, technical interruptions, data
                inaccuracies, unauthorized access, or third-party services.
              </p>

              <p className="mt-4">
                Nothing in these Terms excludes or limits liability that
                cannot legally be excluded or limited under applicable law.
              </p>
            </section>


            {/* 17. Indemnification */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                17. Indemnification
              </h2>

              <p>
                To the extent permitted by applicable law, you agree to
                indemnify and hold harmless FinLingo and its owners, operators,
                employees, affiliates, service providers, and partners from
                claims, damages, liabilities, losses, and expenses arising from
                your violation of these Terms, misuse of the Platform, or
                infringement of another person's rights.
              </p>
            </section>


            {/* 18. Privacy */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                18. Privacy
              </h2>

              <p>
                Your use of FinLingo is also governed by our Privacy Policy,
                which explains how we collect, use, store, and protect
                information associated with your use of the Platform.
              </p>

              <p className="mt-4">
                Our Privacy Policy forms part of these Terms and should be
                read together with them.
              </p>
            </section>


            {/* 19. Changes */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                19. Changes to These Terms
              </h2>

              <p>
                We may update these Terms from time to time as FinLingo
                develops, new features are introduced, or legal and regulatory
                requirements change.
              </p>

              <p className="mt-4">
                When we make changes, we will update the "Last updated" date
                displayed at the top of this page.
              </p>

              <p className="mt-4">
                Where appropriate, we may provide additional notice of
                significant changes.
              </p>

              <p className="mt-4">
                Your continued use of FinLingo after updated Terms become
                effective means that you accept the revised Terms.
              </p>
            </section>


            {/* 20. Governing Law */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                20. Governing Law and Disputes
              </h2>

              <p>
                These Terms will be governed by the laws applicable to FinLingo
                and its operations, except to the extent that applicable law
                requires otherwise.
              </p>

              <p className="mt-4">
                Any dispute arising from or relating to these Terms or your use
                of the Platform will be handled in accordance with applicable
                law and the jurisdiction of the appropriate courts or dispute
                resolution authorities.
              </p>
            </section>


            {/* 21. Contact */}
            <section>
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                21. Contact Us
              </h2>

              <p>
                If you have questions about these Terms or the operation of
                FinLingo, you can contact us at:
              </p>

              <p className="mt-4">
                <a
                  href="mailto:legal@finlingo.com"
                  className="font-medium transition-colors duration-200"
                  style={{ color: 'var(--primary)' }}
                >
                  legal@finlingo.com
                </a>
              </p>
            </section>


            {/* Final Disclaimer */}
            <section
              className="pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <p>
                FinLingo is a financial research and learning platform.
                Information provided through the Platform is intended for
                informational and educational purposes and should not be
                treated as personalized financial, investment, legal, tax, or
                accounting advice.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer {...props} />
    </div>
  )
}

