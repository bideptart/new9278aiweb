import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Privacy Policy",
  description:
    "How Ace Peak Invest Pte Ltd (9278.ai) collects, uses, safeguards, and discloses information arising from your use of the 9278.ai AI voice agent platform.",
  path: "/privacy",
})

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 py-12 text-center md:px-6 md:py-16">
          <ScrollReveal>
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Legal
            </span>
            <h1 className="mt-6 text-balance text-4xl font-serif font-normal tracking-tight md:text-6xl">
              Privacy <span className="text-primary">Policy.</span>
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">Last updated on 30 July 2026</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <article className="legal mx-auto w-full max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <p>
          Welcome to 9278.ai. This Privacy Policy explains how Ace Peak Invest Pte Ltd (&ldquo;us,&rdquo;
          &ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;9278.ai&rdquo;), a company registered in Singapore that operates
          the 9278.ai platform, collects, uses, safeguards, and discloses information arising from your use of our
          services. This includes our website (www.9278.ai), our customer dashboard and self-hosted control panel
          (voice.9278.ai), our APIs, and our AI voice agent, telephony, and related products and services
          (collectively, the &ldquo;Services&rdquo;).
        </p>

        <h2 id="introduction">1. Introduction and Scope</h2>
        <p>
          9278.ai provides software that lets businesses build, launch, and scale AI voice agents that handle inbound
          and outbound phone calls. Our platform connects to the carrier account you already use, runs an audio-native
          conversational engine, and can answer questions from your own knowledge base.
        </p>
        <p>
          Our commitment is to protect your privacy and ensure the security of your personal information. This Privacy
          Policy applies to all users of our Services worldwide and governs your visit to our website and use of our
          Services. By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not
          agree with this Privacy Policy, you should not use our Services or engage with our website.
        </p>
        <p>
          If you have additional questions or require more information about this Privacy Policy, please contact us at{" "}
          <a href="mailto:support@9278.ai">support@9278.ai</a>.
        </p>

        <h2 id="information-we-collect">2. Information We Collect</h2>
        <p>
          We collect several types of information for various purposes, to provide and improve our Services. We obtain
          information when you visit our website, contact us, create an account, build or operate an AI voice agent,
          place or receive calls through the Services, or download data about your account.
        </p>

        <h3>2.1 Personal Information You Provide to Us</h3>
        <p>We collect personal information that you voluntarily provide when you:</p>
        <ul>
          <li>Register for an account on our website, dashboard, or app.</li>
          <li>Express interest in obtaining information about us or our Services.</li>
          <li>Purchase voice credit, top-ups, or other services.</li>
          <li>Build, configure, or operate an AI voice agent.</li>
          <li>
            Submit content to be used by your agent (for example, prompts, knowledge bases, FAQs, or product
            documentation).
          </li>
          <li>Participate in activities on the Services (e.g., demos, contests, newsletters).</li>
          <li>Contact us for support, sales, or other inquiries.</li>
        </ul>
        <p>The personal information we collect may include:</p>
        <ul>
          <li>
            <strong>Contact and Account Information:</strong> Name, email address, phone number, mobile number, billing
            details, company name, and account credentials.
          </li>
          <li>
            <strong>Payment Information:</strong> Credit/debit card or other payment details necessary to process your
            voice-credit top-ups and purchases, handled securely by our third-party payment processing partners. We do
            not store full payment card numbers on our own servers.
          </li>
          <li>
            <strong>Know Your Customer (KYC) and Verification Information:</strong> In certain situations, due to service
            or regulatory requirements (for example, telecommunications and anti-fraud compliance), we may require
            identity verification. This may involve submitting supporting documentation, such as government-issued
            identification, business registration, or proof of address. Some verification processes may be handled by
            third-party service providers, whose privacy policies also apply.
          </li>
          <li>
            <strong>Agent Configuration and Content:</strong> System prompts, personas, guardrails, conversation flows,
            and the documents, FAQs, or knowledge-base content you connect to your agent. This content may contain
            personal information that you choose to include.
          </li>
          <li>
            <strong>Campaign and Contact-List Data:</strong> Phone numbers, names, and other contact details you upload
            via CSV files, CRM integrations, or other lead sources for outbound calling campaigns.
          </li>
          <li>
            <strong>Communications:</strong> Information you provide when contacting our sales, support, or other teams,
            including records and copies of your correspondence.
          </li>
          <li>
            <strong>Feedback and Testimonials:</strong> If you provide feedback or submit reviews/testimonials, we may
            collect and use this information, including your name, photo (if provided), and position, for marketing
            purposes, with your consent where required.
          </li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>
        <p>
          When you visit, use, or navigate our Services, we may automatically collect certain information that does not
          typically reveal your specific identity but may include:
        </p>
        <ul>
          <li>
            <strong>Device Information:</strong> IP address, device type, browser type and characteristics, operating
            system, language preferences, device settings, unique device identifiers, and device name.
          </li>
          <li>
            <strong>Usage Information:</strong> Details of your interactions with our Services, such as access times,
            pages viewed, links clicked, features used, referring URLs, country, and approximate location. This
            information is primarily used to maintain the security and operation of our Services and for internal
            analytics and reporting.
          </li>
          <li>
            <strong>Call Detail Records (CDRs):</strong> For calls placed or received through the Services, we and/or
            your carrier collect records that may include the calling number, the number dialed, time of day, call
            duration, and routing and quality metadata.
          </li>
          <li>
            <strong>Call Audio and Transcripts:</strong> Because our platform runs an audio-native voice engine, calls
            handled by your AI voice agent may be processed as audio and/or transcribed in real time so the agent can
            understand and respond. Where you enable call recording, transcription, or conversation logging, we store
            the resulting audio, transcripts, and derived data (such as sentiment and intent signals) and make them
            available to you and to authorized 9278.ai support personnel through a secured portion of the platform. For
            diagnosing call-quality issues, we may temporarily process or record call audio for troubleshooting, which
            is deleted after the troubleshooting period.
          </li>
          <li>
            <strong>Conversation Analytics:</strong> Derived signals such as detected language, sentiment, intent, and
            outcome that help operate, measure, and improve your agents.
          </li>
          <li>
            <strong>Cookies and Similar Tracking Technologies:</strong> We use cookies, web beacons, and pixels to
            collect and store information to tailor website experiences, improve our Services, and provide customized
            information. You can configure your browser to remove or reject cookies, though this may affect certain
            features. See Section 9 for details.
          </li>
        </ul>

        <h3>2.3 Information from Third-Party Sources</h3>
        <p>We may collect personal information from third parties and other sources, such as:</p>
        <ul>
          <li>
            <strong>Carrier and Telephony Partners:</strong> Information necessary to route, connect, and bill calls
            through the carrier account you connect to the Services.
          </li>
          <li>
            <strong>Affiliate Partners and Integrated Services:</strong> Information from partners, resellers, or
            services (such as CRMs, calendars, or knowledge sources) that you integrate with our platform.
          </li>
          <li>
            <strong>Advertisers and Analytics Providers:</strong> Data from advertising and analytics networks to
            support and measure our marketing efforts.
          </li>
          <li>
            <strong>Publicly Available Sources:</strong> Information from public sources that we believe is relevant
            to evaluating, onboarding, and supporting your use of the Services, including — where permitted by
            applicable law — professional-networking and social-media profiles (such as LinkedIn, Facebook,
            X/Twitter, and comparable services), business registries, press articles, and company websites.
          </li>
          <li>
            <strong>Identity, Fraud, and Credit Providers:</strong> Information from identity-verification, KYC,
            anti-fraud, and business-information providers to comply with regulatory requirements and mitigate risk
            where permitted by law.
          </li>
          <li>
            <strong>Visitors to Our Offices &amp; NDA Counterparties:</strong> If you visit one of our facilities
            (where applicable) or sign a non-disclosure agreement or similar confidentiality undertaking with us,
            we may process your name, company, title, contact details, government-issued ID (where necessary for
            building or data-centre access), signature, and NDA terms for the legitimate interests of physical
            security, visitor management, and the protection of our confidential information and trade secrets.
          </li>
        </ul>
        <p>
          Information collected from third parties is combined with data collected through our Services and treated as
          personal information per this Privacy Policy.
        </p>

        <h3>2.4 Information Collected on Behalf of Our Customers (Caller Data)</h3>
        <p>
          If you are an individual who calls, or is called by, an AI voice agent that one of our customers operates
          using the Services, that customer is responsible for the information collected from you during the call. Our
          customers act as the controller of that information and must provide appropriate notice to, and obtain any
          required consent from, the individuals their agents interact with — including notice about call recording
          where applicable.
        </p>
        <p>
          In these cases, 9278.ai generally acts as a processor or service provider, processing call audio,
          transcripts, and related data on the customer&apos;s behalf and under their instructions. We do not use this
          caller data for our own independent purposes except as necessary to provide, secure, and maintain the
          Services, or as required by law.
        </p>

        <h3>2.5 Free Tools and Live Demos</h3>
        <p>
          When you use our live demo or any free tools we offer, the information you provide may be processed during
          your active session to demonstrate the Services. Demo call audio and related data are used to operate the
          demo and may be retained only as needed for security, abuse prevention, and improving the Services, after
          which it is deleted or anonymized.
        </p>

        <h3>2.6 AI and Machine Learning Data</h3>
        <p>
          Because 9278.ai is an AI voice agent platform, certain data is processed specifically in connection with
          artificial intelligence and machine learning functionality:
        </p>
        <ul>
          <li>
            <strong>AI Inputs:</strong> Prompts, system instructions, voice audio, documents, and knowledge-base
            content you provide to configure or interact with AI-powered features of the Services.
          </li>
          <li>
            <strong>AI Outputs:</strong> Generated speech, text responses, conversation summaries, and derived
            analytics produced by the AI engine during calls or other interactions.
          </li>
          <li>
            <strong>AI Metadata:</strong> Model selection, token usage, latency metrics, request timestamps, and
            error codes logged for operations, billing, and service improvement.
          </li>
          <li>
            <strong>Third-Party AI Providers:</strong> Certain AI capabilities (such as large language models,
            speech-to-text, or text-to-speech) may be delivered via third-party providers. When this occurs, your
            AI Inputs and related data are transmitted to those providers under their respective terms and privacy
            policies, as identified on our{" "}
            <Link href="/subprocessors">Sub-Processor List</Link>.
          </li>
          <li>
            <strong>Voice Biometric Data:</strong> Processing of voice recordings and voice characteristics through
            our AI engine may constitute biometric data under certain laws (e.g., the Illinois Biometric Information
            Privacy Act). You, as the customer deploying the AI voice agent, are responsible for obtaining all
            legally required consents before processing voice biometric data through the Services.
          </li>
          <li>
            <strong>Automated Decision-Making:</strong> If you use our AI Services to make automated decisions that
            produce legal or similarly significant effects on individuals, you are responsible for ensuring compliance
            with applicable laws (including GDPR Article 22), providing appropriate notice, and offering individuals
            the right to contest such decisions or request human review.
          </li>
        </ul>
        <p>
          We do not use your AI Inputs or Outputs to train general-purpose AI models. Customer AI data is processed
          solely to deliver and improve the Services for you.
        </p>

        <h3>2.7 Sensitive Personal Information</h3>
        <p>
          We may collect certain categories of sensitive personal information where necessary to provide the Services,
          including account login credentials, financial/payment information (processed by our payment partners), voice
          recordings and voice characteristics (which may constitute biometric data under certain laws), and precise
          geolocation data where emergency-calling or location features are enabled. We use sensitive personal
          information only as permitted by applicable law and do not use it for purposes incompatible with the reason
          it was collected.
        </p>

        <h3>2.8 Sensory, Device, and IoT Data (Where Collected)</h3>
        <p>
          Depending on the Services and features you use, we may also process:
        </p>
        <ul>
          <li>
            <strong>Sensory and QA/Training Data:</strong> Recordings of calls or screen shares you have with our
            sales, customer-success, or support teams, for quality assurance, onboarding, training, and internal
            coaching purposes. Where required by applicable law, we will capture consent (for example, via an
            automated prompt or party acknowledgement) before recording such interactions. Recordings are retained
            for a rolling defined period and then deleted unless longer retention is required by law.
          </li>
          <li>
            <strong>Device and Telecommunications Identifiers:</strong> Where the platform handles SIM, eSIM, or
            mobile/IoT connectivity (e.g. in future or custom deployments), unique device and subscriber identifiers
            such as IMSI, ICCID, and IMEI, together with network connectivity data (signal strength, data usage,
            session duration, roaming status, and cell-level location), for the purposes of network routing,
            billing, compliance with telecommunications regulations, and emergency services.
          </li>
          <li>
            <strong>Geolocation Information:</strong> Approximate and, where you enable it, precise geolocation
            information derived from IP address, caller-ID registration address, calling party number, device GPS,
            or cell-tower/mobile-network triangulation, for purposes including call routing, emergency services,
            account and billing regionality, and compliance with geographic restrictions where required.
          </li>
        </ul>

        <h3>2.9 Purpose Limitation</h3>
        <p>
          For the avoidance of doubt, we will not use personal data we collected for a materially different,
          unrelated, or incompatible purpose without first providing you (or, where appropriate, the applicable
          controller) with notice of the new purpose and, where required by applicable law, obtaining your explicit
          consent. Where processing is to be carried out for a purpose other than that for which the personal data
          was collected, we will record the new purpose and ensure that it is compatible with the original purpose
          or supported by a valid legal basis.
        </p>

        <h2 id="how-we-use">3. How We Use Your Personal Information</h2>
        <p>
          We use your personal information for purposes based on legitimate business interests, the performance of our
          contract with you, compliance with legal obligations, and/or your consent. We indicate the specific
          processing grounds where appropriate. The ways we use your personal information include:
        </p>

        <h3>3.1 To Provide and Manage Our Services</h3>
        <ul>
          <li>To set up and manage your account and self-hosted control panel.</li>
          <li>To build, configure, run, and scale your AI voice agents.</li>
          <li>
            To process voice-credit top-ups and deliver requested services, including routing inbound and outbound
            calls through your connected carrier.
          </li>
          <li>To enable agents to answer from your connected knowledge base and integrations.</li>
          <li>To provide customer support and respond to inquiries and requests.</li>
          <li>For billing, credit management, and collection purposes.</li>
        </ul>

        <h3>3.2 To Improve and Enhance Our Services</h3>
        <ul>
          <li>
            To understand how users and callers interact with our Services in order to enhance functionality, voice
            quality, latency, and user experience.
          </li>
          <li>To analyze preferences, usage trends, and conversation outcomes, and to improve features.</li>
          <li>To personalize the Services according to user preferences.</li>
          <li>For internal analytics and reporting.</li>
        </ul>

        <h3>3.3 To Communicate with You</h3>
        <ul>
          <li>
            To send announcements, updates, service-related communications, and administrative messages (e.g., account
            management, billing, security alerts, legal compliance).
          </li>
          <li>
            To send marketing and promotional materials if you have shown interest or agreed to receive such
            communications. You can opt out at any time.
          </li>
          <li>To request feedback on our Services.</li>
          <li>
            To contact you by phone, email, or message for support, sales, or other business purposes if you provide
            your details for these reasons.
          </li>
        </ul>

        <h3>3.4 For Security and Fraud Prevention</h3>
        <ul>
          <li>To maintain the security and operation of our Services.</li>
          <li>
            To protect your account, your agents, and our Services from unauthorized access, abuse, and fraudulent
            activities, including telecommunications fraud.
          </li>
          <li>To detect and prevent violations of our Terms of Service.</li>
        </ul>

        <h3>3.5 For Legal and Compliance Purposes</h3>
        <ul>
          <li>
            To comply with legal obligations, court orders, judicial proceedings, or other legal processes, including
            telecommunications regulations.
          </li>
          <li>
            To respond to lawful requests from public authorities, including to meet national security or law
            enforcement requirements.
          </li>
          <li>To exercise, establish, or defend our legal rights.</li>
          <li>To protect your vital interests or those of another person.</li>
        </ul>
        <p>
          Even after account cancellation or expiration, you may receive certain communications from our sales and
          marketing teams, which you can opt out of.
        </p>

        <h3>3.6 Legal Basis for Processing (EU/UK)</h3>
        <p>
          If you are located in the European Economic Area (EEA) or the United Kingdom (UK), our lawful basis for
          collecting and using your personal information depends on the data concerned and the context in which we
          collect it. We generally rely on the following bases:
        </p>
        <ul>
          <li>
            <strong>Performance of a Contract:</strong> Processing necessary to provide the Services you have
            requested, manage your account, process payments, and fulfill our contractual obligations to you.
          </li>
          <li>
            <strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests (or those of a
            third party) where such interests are not overridden by your rights &mdash; for example, improving our
            Services, ensuring security, preventing fraud, conducting internal analytics, running and measuring the
            effectiveness of direct marketing within applicable rules, and protecting our legal rights and interests
            and those of our customers. Where we process on the basis of legitimate interests and the interest is
            not already apparent from the description above, we document the balancing test in our Record of
            Processing Activities and can summarise it on request.
          </li>
          <li>
            <strong>Legal Obligation:</strong> Processing necessary to comply with applicable laws, regulations,
            court orders, or other legal processes, including telecommunications regulations, tax, accounting, and
            sanctions/export-control compliance.
          </li>
          <li>
            <strong>Consent:</strong> Where we rely on your consent to process personal information (for example,
            for marketing communications, optional cookies, or other optional features), you may withdraw your
            consent at any time without affecting the lawfulness of processing carried out before withdrawal.
          </li>
        </ul>
        <p>
          Where we process personal information based on legitimate interests, we balance those interests against
          your data protection rights and will not process your data where your rights override our interests.
        </p>

        <h3>3.7 Controller vs. Processor / Service-Provider Roles</h3>
        <p>
          Because the Services both enable our business relationship with <em>you</em> (the customer) and help you
          serve the individuals who call or are called by your AI agents, we can operate in different legal roles
          under data-protection legislation depending on the data and processing activity:
        </p>
        <ul>
          <li>
            <strong>9278.ai as Controller:</strong> We act as a controller in respect of personal data we collect and
            use for our own business purposes, including: customer and billing account information; website visitor,
            marketing, and lead information; sales, support, and onboarding correspondence; security and fraud
            investigations; visitor and NDA records; and records of complaints, disputes, and legal claims. In
            these roles, 9278.ai (Ace Peak Invest Pte Ltd) determines why and how the data is processed, and is
            responsible for compliance with applicable controller obligations.
          </li>
          <li>
            <strong>9278.ai as Processor / Service Provider:</strong> We act as a processor (or, under US state
            privacy laws, a &ldquo;service provider&rdquo;) in respect of call audio, call recordings, transcripts,
            conversation logs, agent prompts, contact/lead lists, CRM data, and other personal data that flows
            through your AI voice agents at your direction and under your configuration. In these roles we process
            personal data only on your documented instructions (as reflected in the Terms of Service, your account
            and agent configuration, the DPA, and any applicable service order), and we do not use such data for
            our own independent purposes (other than as necessary to provide, secure, maintain, and improve the
            Services and to comply with law). Further details, including Standard Contractual Clauses for
            international transfers, are in our <Link href="/dpa">Data Processing Agreement</Link>.
          </li>
          <li>
            <strong>Controller vs Processor for communications metadata:</strong> For certain types of metadata about
            calls (for example, CDR-level timestamps, calling/called numbers, and session identifiers) we may act
            partly as a processor (performing billing, routing, and quality functions as your service provider) and
            partly as a controller (for fraud, abuse, security, and lawful-compliance functions). We document and
            handle each processing role separately, and further details are available on request.
          </li>
        </ul>

        <h2 id="how-we-share">4. How We Share Your Information</h2>
        <p>
          We do not sell, trade, or distribute your personal information to third parties for their own use without your
          consent, except as described in this Privacy Policy or as permitted by law. We may share your personal
          information in the following circumstances:
        </p>

        <h3>4.1 With Service Providers and Partners</h3>
        <p>
          We share information with third-party service providers who perform services on our behalf, such as payment
          processors, cloud hosting and infrastructure providers, AI and speech-processing providers, data analysis
          providers, analytics services, and customer support tools. We limit access to your information, providing only
          what is necessary for them to perform their services, and they are obligated to maintain confidentiality.
        </p>
        <ul>
          <li>
            <strong>Carrier and Telephony Providers:</strong> To connect, route, and bill calls, we exchange the
            information required with the carrier and telephony providers you connect to the Services. Phone numbers and
            call charges generally remain billed directly by your existing carrier.
          </li>
          <li>
            <strong>Payment Details:</strong> Our payment processing partners securely store and process payment
            details, which are not shared externally for other purposes.
          </li>
        </ul>

        <h3>4.2 With Group Companies</h3>
        <p>
          We may share your information with our affiliated or group companies for operational purposes, where
          applicable, subject to this Privacy Policy.
        </p>

        <h3>4.3 For Business Transfers</h3>
        <p>
          We may share or transfer your information in connection with, or during negotiations of, any merger, sale of
          company assets, financing, or acquisition of all or a portion of our business to another company. If we are
          involved in a bankruptcy proceeding, your information may be transferred to the acquirer.
        </p>

        <h3>4.4 For Legal Requirements and Protection</h3>
        <p>
          We may disclose your information if required by law, subpoena, search warrant, court order, or other valid
          legal process, or to:
        </p>
        <ul>
          <li>
            Comply with requests from government agencies, public authorities, or law enforcement, including to meet
            national security or law enforcement requirements.
          </li>
          <li>
            Exercise, establish, or defend our legal rights, or protect against fraud, misuse, and unlawful acts.
          </li>
          <li>
            Protect your vital interests, or the vital interests, rights, property, or safety of 9278.ai, our users,
            callers, or the general public.
          </li>
        </ul>

        <h3>4.5 With Your Consent</h3>
        <p>We may disclose your personal information for any other purpose with your consent.</p>

        <h3>4.6 Aggregated or Anonymized Data</h3>
        <p>
          We may create and share aggregated or anonymized data that does not directly identify you with third parties
          for research, benchmarking, marketing, or other purposes.
        </p>

        <h3>4.7 At Your Direction</h3>
        <p>
          When you connect integrations (such as a CRM, calendar, or knowledge source) to your agent, information flows
          to and from those services at your direction and is subject to their privacy policies.
        </p>
        <p>
          We aim to minimize sharing your personal information, disclosing it only as needed for legitimate business
          purposes or as legally required, and we require service providers to protect your data.
        </p>

        <h2 id="security-retention">5. Data Security and Retention</h2>
        <h3>5.1 Data Security</h3>
        <p>
          We implement appropriate technical and organizational security measures, including encryption in transit
          (such as Secure Socket Layer (SSL)/TLS) and access controls, to protect your personal information from
          unauthorized access, use, disclosure, alteration, or destruction. Because the 9278.ai control panel is
          self-hosted, you also play an important role in securing the environment, credentials, and integrations under
          your control.
        </p>
        <p>
          No method of transmission over the Internet or electronic storage is 100% secure. While we strive to use
          commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
        </p>
        <h3>5.2 Data Retention</h3>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes for which it was
          collected, including providing the Services, complying with legal obligations, resolving disputes, and
          enforcing agreements.
        </p>
        <ul>
          <li>
            <strong>Account Data:</strong> Retained as long as there is a legitimate business reason, such as providing
            services or meeting legal obligations.
          </li>
          <li>
            <strong>Voice Credit and Account Expiration/Cancellation:</strong> Voice credit is valid for a limited
            period from purchase (as stated at checkout and in our pricing terms). If your account or subscription
            expires or is cancelled, associated data — including remaining credit, agents, logs, recordings, and
            transcripts — may be deleted on or after the expiry or next billing date, in line with our defined
            data-deletion timeline, generally with no recovery option once deleted.
          </li>
          <li>
            <strong>Fraudulent Activities:</strong> Accounts involved in fraudulent or abusive activities may face
            permanent suspension, and we are not liable for resulting data loss.
          </li>
          <li>
            <strong>Call Recordings and Transcripts:</strong> Retained for the period you configure (where you opt in).
            Diagnostic recordings are deleted after the troubleshooting period.
          </li>
          <li>
            <strong>Call Detail Records (CDRs):</strong> Retained for the duration of the account or as required by law
            or for legitimate business purposes.
          </li>
          <li>
            <strong>Demo and Free Tools Data:</strong> Retained only as needed for security and improvement, then
            deleted or anonymized.
          </li>
        </ul>
        <p>When data is no longer needed, we delete or anonymize it where possible and appropriate.</p>

        <h3>5.3 Personal Data Breach &amp; Incident Notification</h3>
        <p>
          We maintain an incident-response plan (documented in the{" "}
          <Link href="/trust">Trust &amp; Security Center</Link>) that addresses detection, assessment, containment,
          eradication, recovery, and notification of personal-data breaches and other security incidents. In the
          event of a breach of security leading to the accidental or unlawful destruction, loss, alteration,
          unauthorised disclosure of, or access to, personal data transmitted, stored, or otherwise processed on or
          through the Services:
        </p>
        <ul>
          <li>
            We will, where required by the GDPR, UK GDPR, DPDP Act, CCPA/CPRA, and comparable applicable laws,
            notify the competent supervisory authority(ies) within the applicable statutory timelines (for example,
            within 72 hours of becoming aware of a GDPR-qualifying breach, where feasible), and where the breach
            is likely to result in a high risk to the rights and freedoms of individuals, we will also notify the
            affected data subjects without undue delay, to the extent and in the manner required by law.
          </li>
          <li>
            Where we act as a processor and a breach affects customer-controlled personal data, we will notify you,
            as the controller, without undue delay after becoming aware of the breach and will provide reasonable
            cooperation in meeting any controller notification or data-subject communication obligations that apply
            to you, as further detailed in the <Link href="/dpa">DPA</Link>.
          </li>
          <li>
            All notifications are subject to the legitimate interests of security, prevention of further
            compromise, and requirements of law enforcement. We may delay or redact a notification where law
            enforcement advises that public disclosure would impede a criminal investigation or threaten safety.
          </li>
        </ul>

        <h2 id="your-rights">6. Your Rights and Choices</h2>
        <p>
          Depending on your location and applicable law (e.g., the EU/UK GDPR, the CCPA/CPRA, and other applicable data
          protection laws), you may have the following rights regarding your personal information:
        </p>
        <h3>6.1 Right to Access and Correction</h3>
        <p>
          You may access and request correction of inaccurate or incomplete personal information. You can often review
          and edit account information in your account settings or by contacting us.
        </p>
        <h3>6.2 Right to Deletion (Right to be Forgotten)</h3>
        <p>
          You may request deletion of your personal information, subject to legal or business retention requirements
          (e.g., for compliance, accounting, or fraud prevention). Contact us to request deletion.
        </p>
        <h3>6.3 Right to Restrict or Object to Processing</h3>
        <p>You may limit or object to the processing of your personal data in certain circumstances.</p>
        <h3>6.4 Right to Data Portability</h3>
        <p>
          You may request the transfer of your personal data to another organization or to you in a structured,
          commonly used, and machine-readable format.
        </p>
        <h3>6.5 Right to Withdraw Consent</h3>
        <p>
          If we process your data based on consent, you may withdraw it at any time. Withdrawal does not affect prior
          processing or processing based on other lawful grounds.
        </p>
        <h3>6.6 Right to Opt-Out of Marketing Communications</h3>
        <p>
          You can opt out of promotional communications by following the unsubscribe instructions, adjusting
          preferences in your account, or contacting us. You cannot unsubscribe from essential service-related or
          administrative messages.
        </p>
        <h3>6.7 CCPA/CPRA Rights (for California Consumers)</h3>
        <p>
          Where applicable, California consumers have rights including the right to know the categories and specific
          pieces of personal data collected, the right to deletion, the right to correction, and the right to opt out of
          the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. We do not sell your personal
          information. Only you, or someone legally authorized to act on your behalf (including an authorized agent
          with written authorization signed by you), may submit a verifiable consumer request. We may request additional
          information to verify your identity before processing a request. We will respond within forty-five (45) days of
          receipt, or notify you if a reasonable extension is needed. We will not discriminate against you for exercising
          your CCPA/CPRA rights. If you have concerns, you may contact the California Privacy Protection Agency at{" "}
          <a href="https://cppa.ca.gov" target="_blank" rel="noopener noreferrer">cppa.ca.gov</a>.
        </p>
        <h3>6.8 GDPR Rights (for EU/UK Individuals)</h3>
        <p>
          Where applicable, the GDPR provides rights to access, rectify, erase, restrict processing, data portability,
          and object to processing. For customers who use the Services to process personal data of individuals in the
          EU/UK, we can make available a Data Processing Addendum (DPA).
        </p>
        <p>
          To exercise these rights, contact us using the details in Section 13. Requests typically receive a response
          within one month, or as otherwise required by law.
        </p>
        <h3>6.9 Additional U.S. State Privacy Rights</h3>
        <p>
          Residents of states with comprehensive privacy laws &mdash; including Virginia (VCDPA), Colorado (CPA),
          Connecticut (CTDPA), Texas (TDPSA), Oregon (OCPA), Montana (MCDPA), and other states that have enacted
          similar legislation &mdash; may have rights to:
        </p>
        <ul>
          <li>Confirm whether we are processing your personal data.</li>
          <li>Access, correct, or delete your personal data.</li>
          <li>Obtain a portable copy of your personal data.</li>
          <li>
            Opt out of targeted advertising, the sale of personal data, or profiling that produces legal or similarly
            significant effects.
          </li>
        </ul>
        <p>
          We do not sell your personal information or use it for targeted advertising based on cross-context
          behavioral profiles. To exercise any of these rights, contact us using the details in Section 13. If we
          deny your request, you may appeal the decision by contacting us, and if you are not satisfied with our
          response, you may contact your state&apos;s Attorney General.
        </p>
        <h3>6.10 Right to Lodge a Complaint</h3>
        <p>
          If you are located in the EU, UK, or another jurisdiction with a data protection authority, you have the
          right to lodge a complaint with your local supervisory authority if you believe our processing of your
          personal information infringes applicable data protection law. We encourage you to contact us first so we
          can try to resolve your concern, but you are entitled to lodge a complaint at any time.
        </p>
        <h3>6.11 India — DPDP Act Rights</h3>
        <p>
          If you are located in India or your personal data is processed under India&apos;s Digital Personal Data
          Protection Act (DPDP Act), you may have rights as a data principal, including the right to access, correct,
          erase, and withdraw consent for personal data we process as a data fiduciary (for example, your account
          data). For caller data processed on behalf of our business customers, the customer is generally the data
          fiduciary and you should contact them first; we assist our customers in fulfilling data-principal requests
          as their processor. To exercise rights against 9278.ai directly, contact{" "}
          <a href="mailto:privacy@9278.ai">privacy@9278.ai</a>.
        </p>

        <h2 id="international-transfers">7. International Data Transfers</h2>
        <p>
          As a global service operated from Singapore, your information may be transferred to, stored, and processed
          in countries other than your own, including Singapore, the United States, and other locations where we, our
          affiliates, or our service providers operate. These countries may have data protection laws that differ from
          those of your jurisdiction.
        </p>
        <p>
          Where we transfer personal data from the European Economic Area (EEA), United Kingdom (UK), or Switzerland
          to countries not deemed to provide an adequate level of protection, we rely on appropriate safeguards,
          including:
        </p>
        <ul>
          <li>
            <strong>Standard Contractual Clauses (SCCs):</strong> EU Commission-approved contractual clauses that
            provide adequate protection for personal data transferred outside the EEA.
          </li>
          <li>
            <strong>UK International Data Transfer Agreement (IDTA) or Addendum:</strong> Where applicable for
            transfers from the United Kingdom.
          </li>
          <li>
            <strong>Adequacy Decisions:</strong> Reliance on adequacy decisions issued by the European Commission or
            UK Secretary of State, where applicable.
          </li>
        </ul>
        <p>
          For detailed information on our international transfer mechanisms, including the specific safeguards
          applied, please refer to our{" "}
          <Link href="/dpa">Data Processing Agreement</Link>. By using the Services and submitting information,
          you acknowledge and consent to such transfers.
        </p>

        <h2 id="childrens-privacy">8. Children&apos;s Privacy</h2>
        <p>
          Our Services are not intended for individuals under 18 (or the age of majority in their jurisdiction). We do
          not knowingly collect personal information from children under this age. If you believe a child has provided
          personal information without appropriate consent, contact us immediately and we will promptly remove such
          information.
        </p>

        <h2 id="cookies">9. Cookies and Tracking Technologies; Do-Not-Track</h2>
        <h3>9.1 Cookies and Similar Technologies</h3>
        <p>
          We use cookies, web beacons, and pixels to track activity and store information to enhance the user experience
          and tailor the Services. Cookies are small data files that may include an anonymous unique identifier. You can
          configure your browser to reject cookies, but this may affect certain features.
        </p>
        <h3>9.2 Do-Not-Track (DNT)</h3>
        <p>
          We do not currently respond to DNT browser signals, as no uniform standard exists. If a standard is adopted,
          we will update this Privacy Policy accordingly.
        </p>

        <h2 id="third-party-links">10. Third-Party Links and Services</h2>
        <p>
          Our Services may contain links to, or integrations with, third-party websites or services not owned or
          controlled by 9278.ai. These third parties have their own privacy policies, and we are not responsible for
          their practices or content. Review their privacy policies before sharing personal information. Interactions
          through integrated third-party platforms (e.g., carriers, CRMs, calendars, or support tools) are subject to
          their privacy policies.
        </p>

        <h2 id="google-api">10a. Google User Data (Limited Use)</h2>
        <p>
          If you connect Google Calendar or other Google services to your agent, we request only the minimum access
          needed to check availability and create or update calendar events on your behalf during calls. Google account
          tokens are stored encrypted and used solely to perform those actions. We do not use Google user data for
          advertising, do not sell or share it, and do not use it to train general-purpose AI or machine-learning models.
          9278.ai&apos;s use and transfer of information received from Google APIs adheres to the Google API Services
          User Data Policy, including the Limited Use requirements. You can disconnect Google access at any time from
          your account settings or from your Google Account permissions page; we delete stored tokens upon
          disconnection.
        </p>

        <h2 id="cpni">10b. Customer Proprietary Network Information (CPNI)</h2>
        <p>
          If you are a US telecommunications customer, certain information about your use of voice services — such as
          the numbers you call, when you call, and call duration — may constitute Customer Proprietary Network
          Information (CPNI) protected under 47 U.S.C. § 222. Without your consent, we will not use or disclose your
          CPNI except as permitted by law, including to provide and bill for the Services, to protect against fraud or
          unauthorized use, or as otherwise required by applicable regulations.
        </p>

        <h2 id="lgpd-pdpa">10c. Brazil (LGPD) &amp; Singapore (PDPA) — Additional Information</h2>
        <h3>10c.1 Brazil — Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018)</h3>
        <p>
          If your personal data is processed in or from Brazil and the LGPD applies, you may have additional rights
          as a titular de dados pessoais, including the right to: confirm the existence of processing; access your
          data; correct incomplete, inaccurate, or out-of-date data; anonymize, block, or delete unnecessary or
          excessive data or data not processed in compliance with the LGPD; request portability of your personal data
          to another service or product provider (where technically and legally feasible); delete your personal data
          where processing was based on consent; be informed about the sharing of your personal data and the entities
          with whom we share it; be informed about the possibility of denying consent and the consequences of such
          denial; and revoke your consent to processing at any time. Complaints about our handling of personal data
          may be directed to the Autoridade Nacional de Proteção de Dados (ANPD) at{" "}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a>. For more
          detail on controller/processor roles, transfer mechanisms, and other LGPD requirements, see{" "}
          <Link href="/country-requirements">Country-Specific Requirements</Link> (Section 5).
        </p>
        <h3>10c.2 Singapore — Personal Data Protection Act 2012 (PDPA)</h3>
        <p>
          As a Singapore-incorporated company, 9278.ai complies with the Singapore PDPA as applicable to our
          collection, use, disclosure, transfer, and retention of personal data. In particular: we provide the
          information in this Privacy Policy as our &ldquo;privacy policy&rdquo; for the purposes of the PDPA; we
          collect, use, or disclose personal data only for purposes that are reasonable in the circumstances and
          disclosed to you (or, where required by the PDPA, for which we have obtained your consent); and we have
          processes in place to ensure the accuracy, protection, and (when required) destruction or anonymisation
          of personal data, and to respond to access and correction requests and Do-Not-Call (DNC) obligations.
          Singapore residents may also wish to refer to the{" "}
          <Link href="/country-requirements">Country-Specific Requirements</Link> page (Section 9) for additional
          DNC and cross-border transfer information. Complaints about our PDPA handling may be directed to the
          Personal Data Protection Commission (PDPC) at{" "}
          <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer">www.pdpc.gov.sg</a>.
        </p>

        <h2 id="changes">11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes in our practices or for legal, operational, or regulatory
          reasons. Updates are effective immediately upon posting on our Services (e.g., www.9278.ai). We will notify
          you of significant changes via the Service, website, or email (if available). Continued use after changes
          implies acceptance, except for new processing that requires consent.
        </p>

        <h2 id="communication-channels">12. Communication Channels</h2>
        <p>Our official communication channels include:</p>
        <ul>
          <li>
            <strong>Email:</strong> Using official 9278.ai domains (e.g., support@9278.ai and sales@9278.ai).
          </li>
          <li>
            <strong>Website:</strong> www.9278.ai.
          </li>
          <li>
            <strong>Customer Dashboard:</strong> voice.9278.ai.
          </li>
        </ul>
        <p>
          Data shared through these channels is processed per this Privacy Policy. Be cautious of communications from
          unofficial sources, and contact our support team via our website if you are unsure about authenticity. We may
          update these channels and will notify users through existing official channels.
        </p>

        <h2 id="contact">13. Contact Us</h2>
        <p>For questions, concerns, or to exercise your rights, contact us at:</p>
        <ul>
          <li>
            <strong>Company Name:</strong> Ace Peak Invest Pte Ltd
          </li>
          <li>
            <strong>Address:</strong> 1 Scotts Road #24-10 Shaw Centre, Singapore 228208, Singapore
          </li>
          <li>
            <strong>Support Email:</strong> <a href="mailto:support@9278.ai">support@9278.ai</a>
          </li>
          <li>
            <strong>Sales &amp; Partnerships:</strong> <a href="mailto:sales@9278.ai">sales@9278.ai</a>
          </li>
          <li>
            <strong>Voice:</strong> <a href="tel:+13474744009">+1 347-474-4009</a>
          </li>
          <li>
            <strong>Data Protection / Privacy (DPO):</strong>{" "}
            <a href="mailto:privacy@9278.ai">privacy@9278.ai</a>
          </li>
        </ul>

        <h2 id="consent">14. Consent</h2>
        <p>
          By using our website (www.9278.ai) and Services, you consent to this Privacy Policy and agree to its terms. If
          you do not agree, please <Link href="/contact">contact us</Link> or discontinue use of the 9278.ai platform.
        </p>
      </article>

      <SiteFooter />
    </main>
  )
}
