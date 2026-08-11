// src/pages/Privacy.jsx

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
              className="text-base font-semibold mb-4"
              style={{ color: 'var(--text)' }}
            >
              Table of Contents
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {[
                ['1', 'Information We Collect'],
                ['2', 'How We Use Your Information'],
                ['3', 'AI-Powered Features'],
                ['4', 'Financial and Market Information'],
                ['5', 'Cookies and Similar Technologies'],
                ['6', 'How We Share Information'],
                ['7', 'Data Security'],
                ['8', 'Data Retention'],
                ['9', 'Your Privacy Rights and Choices'],
                ['10', 'International Data Transfers'],
                ['11', "Children's Privacy"],
                ['12', 'Third-Party Services and Links'],
                ['13', 'Changes to This Privacy Policy'],
                ['14', 'Contact Us'],
              ].map(([number, title]) => (
                <a
                  key={number}
                  href={`#section-${number}`}
                  className="hover:underline transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  {number}. {title}
                </a>
              ))}
            </div>
          </div>

          <div
            className="space-y-12 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >

            {/* Introduction */}
            <section>
              <p>
                FinLingo respects your privacy and is committed to being
                transparent about the information we collect and how we use it.
                This Privacy Policy explains what information may be collected
                when you use FinLingo, why that information is collected, how
                it may be used or shared, and the choices available to you.
              </p>

              <p className="mt-4">
                This Privacy Policy applies to the FinLingo website,
                applications, features, and services that link to or reference
                this policy. In this policy, these are collectively referred to
                as the "Services."
              </p>

              <p className="mt-4">
                By using the Services, you acknowledge that you have read and
                understood this Privacy Policy. Where applicable law requires
                your consent for a particular use of your information, we will
                request that consent separately.
              </p>
            </section>


            {/* 1. Information We Collect */}
            <section id="section-1">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                1. Information We Collect
              </h2>

              <p>
                The information we collect depends on how you use FinLingo.
                Some information is provided directly by you, while other
                information is generated or collected automatically when you
                use the Services.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Account Information
              </h3>

              <p>
                When you create or maintain a FinLingo account, we may collect
                information such as:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Your name or display name</li>
                <li>Email address</li>
                <li>Authentication and account identifiers</li>
                <li>Profile picture or other profile information you choose to provide</li>
                <li>Account preferences</li>
                <li>Authentication-related information</li>
              </ul>

              <p className="mt-4">
                Passwords and other authentication credentials are handled using
                appropriate security practices. We do not display your password
                to other users.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Research and Platform Activity
              </h3>

              <p>
                When you use FinLingo's research and market features, we may
                store information associated with your use of those features.
                This may include:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Companies or securities you search for</li>
                <li>Companies added to your watchlist</li>
                <li>Saved research or preferences</li>
                <li>Filters and other research preferences</li>
                <li>Features you access or interact with</li>
                <li>Learning progress and completed lessons</li>
                <li>Learning paths, concepts, or challenges you complete</li>
                <li>General account activity</li>
              </ul>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Information You Provide to AI Features
              </h3>

              <p>
                Some FinLingo features may allow you to ask questions, request
                explanations, summarize financial information, or otherwise
                interact with AI-powered tools.
              </p>

              <p className="mt-4">
                Depending on the feature you use, information submitted to an
                AI feature may include your question, the financial topic or
                company you are researching, and other information necessary
                to generate a response.
              </p>

              <p className="mt-4">
                You should avoid submitting passwords, payment card details,
                government identification numbers, or other highly sensitive
                personal information into AI prompts unless the feature
                specifically requests such information.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Technical and Device Information
              </h3>

              <p>
                We may automatically collect certain technical information when
                you access or use the Services, including:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Language and general regional settings</li>
                <li>Pages and features accessed</li>
                <li>Approximate usage and performance information</li>
                <li>Date and time of activity</li>
                <li>Information about errors or technical problems</li>
              </ul>

              <p className="mt-4">
                This information helps us operate the Services, understand
                technical problems, maintain security, and improve performance.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Information We Do Not Intentionally Collect
              </h3>

              <p>
                FinLingo does not intentionally request sensitive personal
                information unless it is necessary for a particular feature
                and appropriately disclosed to you. You should not submit
                sensitive information that is not required to use the Services.
              </p>
            </section>


            {/* 2. How We Use Your Information */}
            <section id="section-2">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                2. How We Use Your Information
              </h2>

              <p>
                We use information collected through the Services for purposes
                that include:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Creating and maintaining your account</li>
                <li>Authenticating users and protecting accounts</li>
                <li>Providing the features and services you request</li>
                <li>Saving your watchlists, preferences, and research activity</li>
                <li>Providing learning progress and personalized educational features</li>
                <li>Providing AI-powered research and educational features</li>
                <li>Displaying financial and market information</li>
                <li>Improving the functionality and reliability of the Services</li>
                <li>Understanding how users interact with FinLingo</li>
                <li>Detecting and preventing fraud, abuse, or security incidents</li>
                <li>Diagnosing and fixing technical problems</li>
                <li>Communicating with you about your account or the Services</li>
                <li>Responding to questions, requests, or support inquiries</li>
                <li>Complying with applicable legal obligations</li>
                <li>Enforcing our terms, policies, and other agreements</li>
              </ul>

              <p className="mt-5">
                We may also use information in aggregated or otherwise
                de-identified form for analytics, research, and improving the
                Services. Information used in this manner is intended not to
                identify individual users.
              </p>
            </section>


            {/* 3. AI */}
            <section id="section-3">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                3. AI-Powered Features
              </h2>

              <p>
                FinLingo may offer AI-powered features that help users research
                companies, understand financial concepts, summarize information,
                compare financial data, and explore market-related topics.
              </p>

              <p className="mt-4">
                To provide these features, information submitted through an AI
                interaction may be processed by FinLingo and, where necessary,
                by third-party AI or technology providers that help us operate
                the feature.
              </p>

              <p className="mt-4">
                The information processed may include your prompts, questions,
                relevant research context, and information required to generate
                the requested response.
              </p>

              <p className="mt-4">
                We aim to use only the information reasonably necessary for the
                relevant AI feature.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                AI-Generated Information
              </h3>

              <p>
                AI-generated responses are provided for informational and
                educational purposes. AI systems can produce incomplete,
                inaccurate, outdated, or misleading information.
              </p>

              <p className="mt-4">
                You should independently verify important information before
                relying on it, particularly when making financial, investment,
                tax, legal, or other significant decisions.
              </p>

              <p className="mt-4">
                FinLingo does not represent AI-generated content as personalized
                financial or investment advice.
              </p>
            </section>


            {/* 4. Financial Data */}
            <section id="section-4">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                4. Financial and Market Information
              </h2>

              <p>
                FinLingo may provide financial information, company information,
                market data, news, research material, financial ratios, and
                other information obtained from third-party sources or data
                providers.
              </p>

              <p className="mt-4">
                Information displayed through the Services may be delayed,
                incomplete, unavailable, or contain errors. Market prices and
                other financial information can also change rapidly.
              </p>

              <p className="mt-4">
                FinLingo does not guarantee the accuracy, completeness,
                timeliness, or reliability of information obtained from
                third-party sources.
              </p>

              <p className="mt-4">
                FinLingo is intended to provide research, educational, and
                informational tools. Nothing available through the Services
                should be interpreted as personalized investment, financial,
                legal, accounting, or tax advice.
              </p>
            </section>


            {/* 5. Cookies */}
            <section id="section-5">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                5. Cookies and Similar Technologies
              </h2>

              <p>
                FinLingo may use cookies, local storage, session technologies,
                and similar technologies to operate and improve the Services.
              </p>

              <p className="mt-4">
                These technologies may be used for purposes such as:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Keeping users signed in</li>
                <li>Maintaining secure sessions</li>
                <li>Remembering preferences</li>
                <li>Supporting security features</li>
                <li>Understanding general usage of the Services</li>
                <li>Improving website performance</li>
              </ul>

              <p className="mt-4">
                Some technologies may be provided by third-party service
                providers that assist us with analytics, authentication,
                hosting, security, or other functionality.
              </p>

              <p className="mt-4">
                Most browsers allow you to control or disable cookies through
                browser settings. Some parts of FinLingo may not function
                properly if essential cookies or storage technologies are
                disabled.
              </p>
            </section>


            {/* 6. Sharing */}
            <section id="section-6">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                6. How We Share Information
              </h2>

              <p>
                We do not sell your personal information as a business practice.
                We may share information in limited circumstances when it is
                necessary to operate FinLingo, provide requested features, or
                comply with legal obligations.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Service Providers
              </h3>

              <p>
                We may use third-party companies to provide services such as
                hosting, cloud infrastructure, authentication, databases,
                analytics, communications, security, AI processing, and other
                technical services.
              </p>

              <p className="mt-4">
                These providers may process information on our behalf and are
                expected to handle that information in accordance with their
                contractual obligations and applicable law.
              </p>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Legal and Safety Requirements
              </h3>

              <p>
                We may disclose information when reasonably necessary to:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Comply with applicable laws or legal processes</li>
                <li>Respond to valid requests from authorities</li>
                <li>Protect the rights, safety, and property of FinLingo or others</li>
                <li>Investigate fraud, abuse, or security incidents</li>
                <li>Enforce our agreements and policies</li>
              </ul>

              <h3
                className="text-lg font-semibold mt-7 mb-3"
                style={{ color: 'var(--text)' }}
              >
                Business Transfers
              </h3>

              <p>
                If FinLingo is involved in a merger, acquisition, financing,
                restructuring, sale of assets, or similar transaction,
                information associated with the Services may be transferred as
                part of that transaction, subject to applicable law.
              </p>
            </section>


            {/* 7. Security */}
            <section id="section-7">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                7. Data Security
              </h2>

              <p>
                We take reasonable technical and organizational measures
                designed to protect personal information against unauthorized
                access, loss, misuse, alteration, or disclosure.
              </p>

              <p className="mt-4">
                Depending on the nature of the information and the Services,
                these measures may include access controls, authentication
                protections, encryption where appropriate, secure development
                practices, monitoring, and other security measures.
              </p>

              <p className="mt-4">
                However, no internet transmission, storage system, or online
                service can be guaranteed to be completely secure.
              </p>

              <p className="mt-4">
                You are responsible for maintaining the confidentiality of your
                account credentials and should notify us if you believe your
                account has been accessed without authorization.
              </p>
            </section>


            {/* 8. Retention */}
            <section id="section-8">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                8. Data Retention
              </h2>

              <p>
                We retain personal information for as long as reasonably
                necessary to provide the Services, maintain your account,
                provide requested features, meet legitimate business needs,
                resolve disputes, enforce agreements, and comply with legal
                obligations.
              </p>

              <p className="mt-4">
                The amount of time information is retained may depend on the
                type of information and why it was collected.
              </p>

              <p className="mt-4">
                When information is no longer reasonably required, we may delete,
                anonymize, or otherwise dispose of it in accordance with our
                policies and applicable legal requirements.
              </p>
            </section>


            {/* 9. Rights */}
            <section id="section-9">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                9. Your Privacy Rights and Choices
              </h2>

              <p>
                Depending on where you live and the laws that apply to you, you
                may have certain rights regarding your personal information.
                These rights may include:
              </p>

              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Requesting access to personal information we hold about you</li>
                <li>Requesting correction of inaccurate information</li>
                <li>Requesting deletion of certain personal information</li>
                <li>Requesting a copy of certain information in a portable format</li>
                <li>Objecting to or requesting restrictions on certain processing</li>
                <li>Withdrawing consent where processing is based on consent</li>
                <li>Managing certain communications or marketing preferences</li>
                <li>Submitting a complaint to an applicable privacy authority</li>
              </ul>

              <p className="mt-5">
                These rights are not absolute and may be subject to legal
                exceptions or limitations.
              </p>

              <p className="mt-4">
                To protect user accounts and personal information, we may need
                to verify your identity before completing certain requests.
              </p>

              <p className="mt-4">
                If you request deletion of your account, some information may
                need to be retained where required by law, necessary to resolve
                disputes, prevent fraud, or otherwise permitted by applicable
                law.
              </p>
            </section>


            {/* 10. International Transfers */}
            <section id="section-10">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                10. International Data Transfers
              </h2>

              <p>
                FinLingo and the service providers we use may operate in
                different countries. As a result, your information may be
                processed or stored in a country other than the country in
                which you live.
              </p>

              <p className="mt-4">
                Privacy and data protection laws may differ between countries.
                Where required by applicable law, we will take appropriate
                measures designed to provide an appropriate level of protection
                for personal information transferred across borders.
              </p>
            </section>


            {/* 11. Children */}
            <section id="section-11">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                11. Children's Privacy
              </h2>

              <p>
                FinLingo is not intended for children who are not legally
                permitted to use the Services under the laws applicable to them.
              </p>

              <p className="mt-4">
                We do not knowingly collect personal information from children
                in violation of applicable law.
              </p>

              <p className="mt-4">
                If you believe that a child has provided personal information
                to FinLingo in violation of applicable requirements, please
                contact us so that we can review the situation and take
                appropriate action.
              </p>
            </section>


            {/* 12. Third Parties */}
            <section id="section-12">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                12. Third-Party Services and Links
              </h2>

              <p>
                FinLingo may contain links to third-party websites, services,
                financial data providers, or other platforms.
              </p>

              <p className="mt-4">
                Third-party services operate independently from FinLingo and may
                have their own privacy policies and terms. We are not responsible
                for the privacy practices of third-party services that we do not
                control.
              </p>

              <p className="mt-4">
                We encourage you to review the privacy policies of third-party
                services before providing them with personal information.
              </p>
            </section>


            {/* 13. Changes */}
            <section id="section-13">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                13. Changes to This Privacy Policy
              </h2>

              <p>
                FinLingo may update this Privacy Policy from time to time as
                the Services develop, our practices change, or legal and
                regulatory requirements change.
              </p>

              <p className="mt-4">
                When we make changes, we will update the "Last updated" date
                displayed at the beginning of this policy.
              </p>

              <p className="mt-4">
                If we make a material change that requires additional notice
                under applicable law, we may provide notice through the Services
                or by other appropriate means.
              </p>

              <p className="mt-4">
                We encourage you to review this Privacy Policy periodically so
                that you remain informed about how FinLingo handles information.
              </p>
            </section>


            {/* 14. Contact */}
            <section id="section-14">
              <h2
                className="text-xl sm:text-2xl font-bold mb-5"
                style={{ color: 'var(--text)' }}
              >
                14. Contact Us
              </h2>

              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or the way FinLingo handles personal information,
                you can contact us at:
              </p>

              <p className="mt-4">
                <a
                  href="mailto:privacy@finlingo.com"
                  className="font-medium transition-colors duration-200 hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  privacy@finlingo.com
                </a>
              </p>

              <p className="mt-4">
                When contacting us about a privacy request, please provide
                enough information for us to understand and verify your request.
                We will handle requests in accordance with applicable law.
              </p>
            </section>


            {/* Financial Disclaimer */}
            <section
              className="pt-8 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2
                className="text-lg sm:text-xl font-bold mb-4"
                style={{ color: 'var(--text)' }}
              >
                Financial Information Disclaimer
              </h2>

              <p>
                FinLingo provides financial research, educational content,
                market information, and technology tools. Information provided
                through the Services is for general informational and educational
                purposes and should not be considered personalized financial,
                investment, legal, accounting, or tax advice.
              </p>

              <p className="mt-4">
                You are responsible for conducting your own research and
                considering your individual circumstances before making financial
                or investment decisions.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer {...props} />
    </div>
  )
}