import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Terms of Service",
  description:
    "The Terms of Service governing your use of the 9278.ai AI voice agent platform, operated by Ace Peak Invest Pte Ltd.",
  path: "/terms",
})

export default function TermsOfServicePage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
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
              Terms of <span className="text-primary">Service.</span>
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">Last updated on 30 July 2026</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <article className="legal mx-auto w-full max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <p>
          These Terms of Service (&ldquo;Agreement&rdquo;) govern your access to and use of the 9278.ai platform
          operated by Ace Peak Invest Pte Ltd. Please read them carefully before using the Services.
        </p>
        <p>
          This Agreement, together with our{" "}
          <Link href="/acceptable-use">Acceptable Use Policy</Link>,{" "}
          <Link href="/privacy">Privacy Policy</Link>, <Link href="/cookies">Cookie Policy</Link>,{" "}
          <Link href="/dpa">Data Processing Agreement</Link>,{" "}
          <Link href="/ai-disclosure">AI Voice Disclosure &amp; Responsible-AI Policy</Link>,{" "}
          <Link href="/recording-notice">Recording &amp; Monitoring Notice</Link>,{" "}
          <Link href="/refund-policy">Billing, Refund &amp; Cancellation Policy</Link>,{" "}
          <Link href="/sla">Service Level Agreement</Link>, and{" "}
          <Link href="/e911">Emergency Calling (E911) Notice</Link> (each as updated from time to time), forms the
          complete agreement between you and us regarding the Services.
        </p>

        <h2 id="acceptance">1. Acceptance and Modification of Terms</h2>
        <h3>1.1 Acceptance</h3>
        <p>
          By using the services of Ace Peak Invest Pte Ltd (&ldquo;Services&rdquo;), accessing our customer dashboard
          and self-hosted control panel (voice.9278.ai), using our APIs, browsing our website (www.9278.ai), or clicking
          &ldquo;agree,&rdquo; &ldquo;get started,&rdquo; or a similar button during signup, you acknowledge that you
          have read, understood, and agree to be bound by these Terms of Service (&ldquo;Agreement&rdquo;). Your use of
          the Services is expressly conditioned upon your acceptance of all terms and conditions contained herein.
        </p>
        <h3>1.2 Modification</h3>
        <p>
          Ace Peak Invest Pte Ltd (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;9278.ai&rdquo;)
          reserves the right to modify this Agreement at any time, at our sole discretion.
        </p>
        <h3>1.3 Notification of Changes</h3>
        <p>
          We will make reasonable efforts to notify you of any material changes to this Agreement. Such notification may
          include publishing the updated terms on our website or within the dashboard, or, if you have an account,
          sending an email or in-app notification.
        </p>
        <h3>1.4 Effective Date</h3>
        <p>Changes become effective immediately upon posting on our Services, unless otherwise stated.</p>
        <h3>1.5 Consent to Updated Terms</h3>
        <p>Where required, new processing or materially new terms will only apply after we obtain your consent.</p>
        <h3>1.6 Continued Use Constitutes Acceptance</h3>
        <p>
          Your continued use of the Services after changes are posted constitutes your acceptance of the revised
          Agreement.
        </p>
        <h3>1.7 Review Terms Regularly</h3>
        <p>You are responsible for reviewing this Agreement periodically to stay informed of any updates.</p>
        <h3>1.8 Automated and AI-Assisted Acceptance</h3>
        <p>
          To the extent you use or permit any software, automated system, or other agent (including bots or AI tools)
          to access or use the Services on your behalf — including to create accounts, register for Services, or accept
          this Agreement — you agree that any such action constitutes your authorized act and binding acceptance. You
          remain fully responsible for all activity conducted through your account, credentials, API keys, or other
          authorized access methods.
        </p>

        <h2 id="description">2. Description of Services</h2>
        <h3>2.1 General</h3>
        <p>
          9278.ai provides software that lets businesses build, launch, and scale AI voice agents capable of handling
          inbound and outbound phone calls. The platform runs an audio-native conversational engine, supports real
          interruptions and multilingual conversations, and can answer from a knowledge base you connect.
        </p>
        <h3>2.2 Service Provision</h3>
        <p>
          The Services are provided through a self-hosted control panel, web dashboard, and APIs. You are responsible
          for configuring your agents, prompts, guardrails, knowledge sources, and integrations.
        </p>
        <h3>2.3 Service Nature</h3>
        <p>
          9278.ai is a software and connectivity platform. We do not sell phone numbers. Phone numbers, SIP trunks, and
          call termination are provided by the carrier account you connect to the Services, and remain billed by, and
          subject to the terms of, that carrier.
        </p>
        <h3>2.4 Features and Limitations</h3>
        <p>
          Features, capacity (including the number of concurrent agents available on your plan), latency, and language
          coverage may vary and may change over time. We may add, modify, or remove features at our discretion.
        </p>
        <h3>2.5 &ldquo;As Is&rdquo; Provision</h3>
        <p>
          Except as expressly stated in this Agreement, the Services are provided on an &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; basis. See Section 16.
        </p>
        <h3>2.6 Geographic Availability</h3>
        <p>
          The Services may not be available in all jurisdictions, and availability may depend on your carrier and on
          applicable law. You are responsible for ensuring your use is lawful in your jurisdiction and in any
          jurisdiction you place or receive calls.
        </p>
        <h3>2.7 Service Availability Disclaimer</h3>
        <p>
          We strive for high availability but do not guarantee uninterrupted or error-free operation. Service may be
          affected by maintenance, third-party providers, carriers, or events beyond our control.
        </p>
        <h3>2.8 Service Testing</h3>
        <p>
          We may test, monitor, and diagnose the Services, including by temporarily processing or recording call audio
          for troubleshooting, which is deleted after the troubleshooting period.
        </p>
        <h3>2.9 Third-Party Carriers and Providers</h3>
        <p>
          The Services depend on third-party carriers, telephony, cloud, and AI/model providers. We are not responsible
          for the acts, omissions, outages, or charges of those providers, and your use of them is subject to their
          terms.
        </p>
        <h3>2.10 Data Storage and Backup</h3>
        <p>
          We store account data, agent configurations, logs, and — where you enable them — call recordings and
          transcripts, subject to our Privacy Policy and retention timelines. You are responsible for maintaining your
          own backups of content you consider critical.
        </p>
        <h3>2.11 Call Recording and Transcription</h3>
        <p>
          Where you enable call recording, transcription, or conversation logging, you are solely responsible for
          providing any legally required notices to, and obtaining any required consent from, the individuals your
          agents interact with, in every applicable jurisdiction.
        </p>

        <h2 id="account">3. Account Registration and Management</h2>
        <h3>3.1 Eligibility</h3>
        <p>
          You must be at least 18 years old (or the age of majority in your jurisdiction) and capable of forming a
          binding contract to use the Services. If you use the Services on behalf of an organization, you represent that
          you are authorized to bind that organization.
        </p>
        <h3>3.2 Account Creation</h3>
        <p>
          You must create an account to access most Services. You agree to provide accurate, current, and complete
          information.
        </p>
        <h3>3.3 Information Required</h3>
        <p>
          We may require additional information or identity/business verification (KYC) to comply with
          telecommunications, anti-fraud, or other regulatory requirements. The Services, or specific features, may be
          withheld until verification is complete.
        </p>
        <h3>3.4 Account Security and Responsibility</h3>
        <p>
          You are responsible for safeguarding your credentials, API keys, and self-hosted environment, and for all
          activity that occurs under your account. You must take reasonable steps to protect passwords and API keys from
          disclosure to or access by unauthorized parties, and notify us promptly if you become aware of any possible or
          actual unauthorized use, misuse, or access. You are responsible for any charges arising from unauthorized
          access not caused by us, and will assist us in preventing and remedying any breach, including filing or
          assisting with law-enforcement reports where appropriate.
        </p>
        <h3>3.5 Account Ownership</h3>
        <p>
          The account belongs to the legal person who registered it or on whose behalf it was registered. You may not
          transfer your account without our consent.
        </p>
        <h3>3.6 Third-Party Logins and Integrations</h3>
        <p>
          If you connect third-party services (such as a carrier, CRM, calendar, or knowledge source), you authorize us
          to access and exchange data with those services as needed to provide the Services, subject to their terms.
        </p>
        <h3>3.7 Activation</h3>
        <p>
          Account and agent activation is typically immediate, but may be delayed where verification or carrier
          documentation is required.
        </p>

        <h2 id="duration">4. Service Duration and Renewal</h2>
        <h3>4.1 Term</h3>
        <p>This Agreement applies for as long as you use the Services or maintain an account.</p>
        <h3>4.2 Voice Credit and Top-Ups</h3>
        <p>
          The Services operate on a prepaid voice-credit model. There are no long-term contracts or minimum commitments
          beyond your chosen top-up. Voice credit is valid for the period stated at purchase (currently 60 days from
          purchase) and expires thereafter.
        </p>
        <h3>4.3 No Automatic Renewal of Credit</h3>
        <p>
          Voice credit does not automatically renew. You choose when to top up. Where you opt in to any auto-recharge
          feature, you authorize us to charge your payment method to maintain a credit balance, and you may disable it
          at any time.
        </p>
        <h3>4.4 Promotional, Usage, and Trial Credits</h3>
        <p>
          From time to time, 9278.ai may, at its sole discretion, grant you promotional, beta, referral, or signup
          credits (&ldquo;Promotional Credits&rdquo;). Promotional Credits are not payment, have no cash or monetary
          value, are non-transferable, and are non-refundable. Unless otherwise stated at the time of grant,
          Promotional Credits expire six (6) months from the date they are awarded and will be automatically removed
          from your account after expiry. Promotional Credits will be applied before paid voice credit. We reserve the
          right to revoke, adjust, or refuse Promotional Credits in cases of suspected fraud, abuse, or gaming of any
          promotion, in our sole discretion.
        </p>
        <h3>4.5 Plan Tier Recurring Charges (Where Applicable)</h3>
        <p>
          Where you subscribe to a plan with monthly recurring charges (&ldquo;MRCs&rdquo;) such as seat, agent,
          workspace, or feature licenses, such MRCs are invoiced monthly in advance on the invoice anniversary date
          and are non-refundable. Non-recurring charges (&ldquo;NRCs&rdquo;) such as setup, onboarding, dedicated
          support, or migration fees are invoiced in advance and are due prior to the Service Commencement Date for
          that feature.
        </p>

        <h2 id="fees">5. Fees, Payments, and Billing</h2>
        <h3>5.1 General Fees</h3>
        <p>
          Use of the Services requires purchasing voice credit. Voice usage is charged on a per-minute basis according
          to your plan tier (currently from $0.15/min on Starter, $0.12/min on Growth, and $0.10/min on Scale). Top-up
          amounts (currently $20, $50, or $100) determine your tier and the number of concurrent AI agents available
          (currently up to 1, 2, or 3 respectively). Current pricing is published at{" "}
          <Link href="/pricing">www.9278.ai/pricing</Link> and forms part of this Agreement.
        </p>
        <h3>5.2 Payment Methods</h3>
        <p>
          You agree to provide a valid payment method and authorize us to charge all applicable fees. By providing a
          payment method, you authorize us to invoice your account for amounts due.
        </p>
        <h3>5.3 Payment Information Storage</h3>
        <p>
          We use third-party payment processors to process and securely store payment information. For your security, we
          do not directly store full payment card details. By using the Services, you consent to the processing of your
          payment information by these processors under their privacy and security practices (typically PCI DSS
          certified).
        </p>
        <h3>5.4 Pricing Changes</h3>
        <p>
          We may change pricing, tiers, or credit terms at our discretion. Changes apply to future purchases and will be
          reflected at <Link href="/pricing">www.9278.ai/pricing</Link>. Credit already purchased is governed by the
          terms in effect at the time of purchase.
        </p>
        <h3>5.5 Usage Billing</h3>
        <p>
          Voice usage is deducted from your credit balance in real time or shortly after each call, based on connected
          call duration and your applicable per-minute rate. Carrier and phone-number charges are billed separately by
          your carrier.
        </p>
        <h3>5.6 No Hidden Fees</h3>
        <p>
          There are no setup fees, contracts, or minimums beyond your top-up. Any taxes are additional as described
          below.
        </p>
        <h3>5.7 Currency</h3>
        <p>Unless otherwise stated, fees are quoted and charged in US dollars.</p>
        <h3>5.8 Insufficient Balance and Non-Payment</h3>
        <p>
          If your credit balance is exhausted or a charge fails, affected Services (including active agents and calls)
          may be suspended or limited until sufficient credit is available.
        </p>
        <h3>5.9 Billing Disputes</h3>
        <p>
          Any billing dispute or request for a billing adjustment must be made in good faith and in writing within
          fifteen (15) days of the invoice or charge date, with sufficient detail and documentation to establish the
          basis for the adjustment. We will work with you in good faith to resolve disputes. You agree to pay the
          undisputed portion of any invoice within the applicable payment period.
        </p>
        <h3>5.10 Chargebacks</h3>
        <p>
          You agree to contact us to resolve billing concerns before initiating a chargeback. Chargebacks made in bad
          faith may result in suspension or termination.
        </p>
        <h3>5.11 Credit Expiration</h3>
        <p>
          Unused voice credit expires at the end of its validity period (currently 60 days from purchase) and is not
          recoverable or refundable after expiry.
        </p>
        <h3>5.12 Taxes / VAT</h3>
        <p>
          Fees are exclusive of taxes. You are responsible for any applicable VAT, GST, sales, or similar taxes, which
          may be added to your charges.
        </p>
        <h3>5.13 Refund Policy</h3>
        <p>
          Except where required by applicable law, voice credit and fees are non-refundable. Specific refund
          eligibility, if any, is described at <Link href="/pricing">www.9278.ai/pricing</Link> or our{" "}
          <Link href="/faq">FAQ</Link>.
        </p>
        <h3>5.14 Pass-Through Charges</h3>
        <p>
          In addition to the fees above, you are responsible for any pass-through charges levied by underlying
          carriers, providers, regulators, or numbering administrators. These include, without limitation:
          payphone and inmate-calling origination surcharges; toll-free origination and access charges; carrier,
          CLEC, or CNAM-database fees; SMS/MMS termination, campaign-registry, and short-code or 10DLC-related
          carrier fees; number porting and port-out fees; number-inventory or monthly number maintenance fees
          imposed by your carrier; regulatory, universal-service, USF-type, or similar surcharges; and taxes, duties,
          or assessments passed through by any provider. Such pass-through charges are separate from, and are not
          credited against, any minimum revenue commitment or spend commitment you may have.
        </p>
        <h3>5.15 Late Payment, Collection Costs, and Suspension</h3>
        <p>
          Any amount not paid by the due date or any negative prepaid balance that is not promptly topped up may
          bear a late-payment charge equal to the lesser of one point five percent (1.5%) per month (simple interest)
          or the maximum rate permitted by applicable law, calculated from the due date to the date of actual payment.
          If charges are not paid in full within ten (10) days of the due date (or if your prepaid balance is
          negative and not restored), we reserve the right to suspend all or any portion of the Services immediately,
          without notice, until all past-due amounts, including late charges, are paid in full. You agree to pay on
          demand all reasonable out-of-pocket costs of collection, including reasonable attorneys&apos; fees and court
          costs, whether or not any action or suit is instituted by us.
        </p>
        <h3>5.16 Billing Corrections and Supplemental Invoicing</h3>
        <p>
          We reserve the right to correct any invoice or rating errors and to issue corrected or supplemental
          invoices for previously unbilled or underbilled amounts related to the Services, including usage charges,
          pass-throughs, taxes, fees, surcharges, regulatory assessments, and third-party data delays, where such
          amounts were omitted, delayed, or misstated due to late or missing records, rating or metering errors,
          third-party data delays, fraud investigations, or other billing or processing errors. Each corrected or
          supplemental invoice will itemise the applicable adjustments. Corrections may be issued for any period
          within the applicable statutory limitation period.
        </p>
        <h3>5.17 Credit Limits, Cash Deposits, and Security</h3>
        <p>
          We may, upon written notice, impose a monthly credit limit, require a cash deposit, or require a letter of
          credit or other form of security, in each case in an amount determined by us in our reasonable business
          judgment based on creditworthiness, payment history, spend volumes, fraud risk, or overall changes in your
          financial condition. If you are delinquent in the payment of fees, or if your financial condition materially
          and adversely changes, we may require you to provide such security within ten (10) days following our
          written request. Failure to provide requested security is a material breach and may result in suspension or
          termination.
        </p>
        <h3>5.18 Right of Offset</h3>
        <p>
          To the fullest extent permitted by applicable law, 9278.ai shall have the right to deduct, set off, or
          recoup against any and all obligations we may owe to you (whether under this Agreement, any credit balance,
          any other current or future agreement, or otherwise) any and all amounts you owe to us (whether under this
          Agreement, any other current or future agreement, past-due or disputed invoices, chargebacks, or otherwise),
          without prior notice and regardless of whether the obligations arose under the same or different agreements,
          services, or invoices.
        </p>
        <h3>5.19 Taxes, Surcharges, and Exemption Certificates</h3>
        <p>
          &ldquo;Taxes&rdquo; means any and all applicable national, federal, provincial, state, and local taxes,
          duties, tariffs, levies, fees, surcharges, and assessments, including without limitation sales, use, value-
          added (VAT), goods-and-services (GST), excise, franchise, property, commercial gross-receipts, licence,
          privilege, stamp, withholding, USF, universal-service, and other similar charges imposed by any government
          authority, whether charged to or against you, us, or the end-user. You are solely responsible for, and
          shall pay, all applicable Taxes with respect to your purchase, use, or provision of the Services. If you
          assert an exemption from any Taxes, you shall provide us with valid, current tax-exemption certificates,
          resale certificates, VAT/GST registration numbers, or equivalent documentation acceptable to the relevant
          taxing authority, and you shall maintain and update such certificates as required. The submission of an
          exemption certificate does not relieve you of Taxes unless and until we confirm in writing that the
          exemption has been accepted and applied to your account. You agree to indemnify and hold us harmless from
          and against any Taxes (including associated interest, penalties, and reasonable professional fees) imposed
          on us by any taxing authority relating to or arising out of your asserted exemption or your failure to
          provide accurate, timely documentation.
        </p>

        <h2 id="conduct">6. User Conduct and Restrictions on Use</h2>
        <h3>6.1 Lawful and Ethical Use</h3>
        <p>
          You agree to use the Services only for lawful purposes and in compliance with all applicable laws and
          regulations, including telecommunications, telemarketing, robocall, anti-spam, data protection, and
          consumer-protection laws (for example, where applicable, the TCPA, TSR, GDPR, and analogous laws in the
          jurisdictions where you operate and call).
        </p>
        <h3>6.1a India — TRAI and DPDP</h3>
        <p>
          If you place or receive calls to or from India, you must comply with TRAI&apos;s Telecom Commercial
          Communications Customer Preference Regulations (TCCCPR), including use of registered commercial numbers
          (such as 160-series), DND/NDNC registry scrubbing, documented consent requirements, and disclosure that calls
          are AI-generated where required. You are the data fiduciary under India&apos;s Digital Personal Data Protection
          Act (DPDP Act) for personal data of individuals you call; 9278.ai acts as your data processor for that data.
        </p>
        <h3>6.2 AI Disclosure and Consent</h3>
        <p>
          Where required by applicable law, you must disclose to call participants that they are interacting with an
          automated/AI voice agent, and you must obtain any consent required for automated calling, recording, or
          messaging. You are solely responsible for these disclosures and consents.
        </p>
        <h3>6.3 Prohibited Content and Activities</h3>
        <p>
          You may not use the Services to: make fraudulent, deceptive, harassing, or unsolicited (spam) calls;
          impersonate any person or organization in an unlawful or deceptive manner; transmit unlawful, defamatory,
          abusive, or infringing content; violate the privacy or rights of others; distribute malware; or engage in any
          activity that is illegal or that violates a third party&apos;s rights.
        </p>
        <h3>6.4 Specific Use Restrictions</h3>
        <p>
          You may not resell, sublicense, or commercially exploit the Services except as expressly authorized;
          circumvent usage limits or security measures; or use the Services to build a competing product.
        </p>
        <h3>6.5 Investigation and Enforcement</h3>
        <p>
          We may investigate suspected violations and may suspend, limit, or terminate accounts engaged in prohibited
          conduct. We may cooperate with law enforcement as described in Section 8 and our Privacy Policy.
        </p>
        <h3>6.6 Reporting Violations</h3>
        <p>
          You may report suspected misuse or abuse of the Services to <a href="mailto:support@9278.ai">support@9278.ai</a>.
        </p>
        <h3>6.7 Acceptable Use Policy</h3>
        <p>We may publish and update an Acceptable Use Policy, which forms part of this Agreement when published.</p>

        <h2 id="service-specific">7. Service-Specific Terms</h2>
        <h3>7.1 Bring Your Own Carrier and Numbers</h3>
        <p>
          We do not sell or assign phone numbers. You connect your own carrier account; your numbers, SIP trunks,
          billing, and porting rights remain with your carrier. You are responsible for your carrier relationship,
          compliance, and charges.
        </p>
        <h3>7.2 Number and Routing Responsibility</h3>
        <p>
          You are responsible for configuring inbound and outbound routing and for ensuring you have the right to use
          the numbers you connect to the Services.
        </p>
        <h3>7.3 AI Agent Content and Knowledge Base</h3>
        <p>
          You are responsible for the prompts, personas, guardrails, and knowledge sources you supply, and for ensuring
          your agents&apos; behavior and outputs comply with applicable law. AI-generated responses may be inaccurate;
          you are responsible for reviewing and supervising your agents&apos; performance.
        </p>
        <h3>7.4 Third-Party Platforms and Integrations</h3>
        <p>
          Use of integrations and third-party platforms (carriers, CRMs, calendars, model providers, app stores, etc.)
          is subject to their respective terms, which you are responsible for complying with.
        </p>
        <h3>7.5 API Usage and Rate Limiting</h3>
        <p>
          You may access the Services via our provided APIs. You agree to use the APIs in accordance with our
          documentation and not to circumvent any programmatic limits. We may enforce rate limits, suspend API access,
          or block requests that we determine to be abusive, disproportionately large, or in violation of this Agreement.
        </p>
        <h3>7.6 Conduit Role and Customer Content</h3>
        <p>
          9278.ai is a software and connectivity platform that enables your AI voice agents. We do not initiate calls,
          select call recipients, or determine the content of communications transmitted through the Services. You are
          solely responsible for the content of information and communications transmitted using the Services and for
          ensuring that your agents&apos; behavior complies with applicable law.
        </p>
        <h3>7.7 STIR/SHAKEN and Robocall Mitigation</h3>
        <p>
          If you are a voice service provider, gateway provider, or intermediate provider under applicable US law, you
          represent that you are registered with the FCC Robocall Mitigation Database and comply with STIR/SHAKEN and
          related robocall-mitigation requirements (47 CFR § 64.6305). We may suspend traffic if you breach these
          obligations.
        </p>
        <h3>7.8 Traceback Cooperation</h3>
        <p>
          If you receive a traceback request from an administrator authorized by USTelecom&apos;s Industry Traceback
          Group regarding suspicious robocalls, you agree to respond promptly in good faith, identify whether you are
          the originating or transit provider, and identify the source of the calls without requiring a subpoena where
          permitted by law.
        </p>
        <h3>7.9 Campaign and Contact-List Data</h3>
        <p>
          You are solely responsible for the accuracy, lawfulness, and consent status of any contact lists, CSV files,
          or lead data you upload or use with the Services. You represent that you have obtained all required consents
          before contacting individuals through your AI agents.
        </p>

        <h2 id="privacy-data">8. Privacy, Data Protection, and Content</h2>
        <h3>8.1 Privacy Policy</h3>
        <p>
          Our collection and use of personal information is described in our <Link href="/privacy">Privacy Policy</Link>
          , which is incorporated into this Agreement.
        </p>
        <h3>8.2 Roles</h3>
        <p>
          For data you process about call participants through your agents, you generally act as the controller and we
          act as a processor/service provider acting on your instructions. Where you process personal data of
          individuals in the EU/UK, a Data Processing Addendum (DPA) is available.
        </p>
        <h3>8.3 Data Security</h3>
        <p>
          We implement appropriate technical and organizational measures to protect data. Because the control panel is
          self-hosted, you are responsible for securing your own environment, credentials, and integrations.
        </p>
        <h3>8.4 User Rights</h3>
        <p>Data-subject rights and your choices are described in our Privacy Policy.</p>
        <h3>8.5 Your Content</h3>
        <p>
          You retain ownership of the content you provide (prompts, knowledge bases, recordings, transcripts, and other
          materials). You grant us a limited license to host, process, and use that content as necessary to provide,
          secure, and improve the Services.
        </p>
        <h3>8.6 Disclosure of Personal Information</h3>
        <p>
          We may disclose information as described in our Privacy Policy, including to comply with legal obligations or
          lawful requests.
        </p>
        <h3>8.7 Cooperation with Investigations and Fraud Prevention</h3>
        <p>
          We may share information as needed to prevent fraud and abuse, and to cooperate with lawful investigations.
        </p>
        <h3>8.8 Monitoring</h3>
        <p>
          We may monitor use of the Services to maintain security, prevent abuse, and ensure compliance with this
          Agreement.
        </p>
        <h3>8.8a Fraud and Abuse Prevention</h3>
        <p>
          You acknowledge that 9278.ai may lawfully and automatically sample, record, analyze, and process call audio
          solely to detect, prevent, and investigate fraud, abuse, toll fraud, or unlawful use of the Services, and to
          protect our rights, users, and network. Such processing is limited to security and service-quality purposes
          and does not constitute marketing or unrelated analytics. You are solely responsible for providing all
          required disclosures and obtaining all consents from call participants, including any all-party consent
          required under applicable state or national law, and for configuring any consent prompts or gating features
          accordingly. Raw audio used for fraud prevention is deleted after processing into derived security data.
        </p>
        <h3>8.9 Promotional Use of Customer Name/Logo</h3>
        <p>
          With your consent where required, we may identify you as a customer and use your name and logo in marketing
          materials. You may opt out by contacting us.
        </p>
        <h3>8.10 Recording and Messaging Consent</h3>
        <p>
          You are solely responsible for obtaining all consents required for call recording, automated calling, and
          SMS/messaging conducted through your agents.
        </p>

        <h2 id="ip">9. Intellectual Property Rights</h2>
        <h3>9.1 Ownership</h3>
        <p>
          We and our licensors own all rights, title, and interest in the Services, software, platform, and related
          intellectual property (&ldquo;9278.ai Properties&rdquo;), excluding your content.
        </p>
        <h3>9.2 License to You</h3>
        <p>
          Subject to this Agreement, we grant you a limited, non-exclusive, non-transferable, revocable license to
          access and use the Services for your internal business purposes.
        </p>
        <h3>9.3 Restrictions</h3>
        <p>
          You will not: resell, rent, lease, sublicense, distribute, or commercially exploit the Services except as
          expressly permitted; modify, translate, adapt, reverse engineer, decompile, or disassemble any part of the
          Services except as permitted by law; use scrapers, bots, or similar tools to extract data; or remove or
          obscure proprietary notices.
        </p>
        <h3>9.4 No Implied Rights</h3>
        <p>No rights are granted other than those expressly set out in this Agreement.</p>
        <h3>9.5 Future Releases</h3>
        <p>
          We are not obligated to provide updates or new features, and this Agreement applies to any updates we do
          provide.
        </p>
        <h3>9.6 Reservation of Rights</h3>
        <p>All rights not expressly granted are reserved.</p>
        <h3>9.7 Feedback</h3>
        <p>
          If you provide feedback or suggestions, you grant us a perpetual, royalty-free right to use them without
          restriction or obligation to you.
        </p>

        <h2 id="emergency">10. Emergency Services</h2>
        <h3>10.1 No Emergency Calling</h3>
        <p>
          The Services are not intended or designed to support emergency calls (such as 911, 112, 999, or equivalent)
          and must not be relied upon for emergency communications.
        </p>
        <h3>10.2 Recommendation for Alternatives</h3>
        <p>
          You must maintain an alternative means of contacting emergency services (such as a traditional or mobile phone
          line).
        </p>
        <h3>10.3 Disclaimer of Liability</h3>
        <p>
          To the fullest extent permitted by law, we disclaim all liability for any inability to reach emergency
          services through the Services.
        </p>
        <h3>10.4 Notice to Users</h3>
        <p>
          You are responsible for informing your own users and call participants of these limitations where relevant.
        </p>

        <h2 id="termination">11. Termination and Suspension</h2>
        <h3>11.1 Termination by You</h3>
        <p>
          You may stop using the Services and close your account at any time. Unused, expired, or forfeited credit is
          non-refundable except where required by law.
        </p>
        <h3>11.2 Termination or Suspension by Us</h3>
        <p>
          We may suspend or terminate your access, with or without notice, for violation of this Agreement, suspected
          fraud or abuse, non-payment, legal/regulatory reasons, or risk to the Services or others.
        </p>
        <h3>11.2a Material Breach &amp; Cure Periods</h3>
        <p>
          Either party may terminate this Agreement, any Service Order, or any feature tier, for material breach, as
          follows:
        </p>
        <ul>
          <li>
            If you (as Customer) commit a material breach that is capable of remedy, we will provide written notice
            describing the breach, and you will have ten (10) days from the date of such notice (&ldquo;Customer
            Remedy Period&rdquo;) to cure the breach. If you fail to cure within the Customer Remedy Period, we may
            terminate on the expiry of that period. Breaches of payment obligations, fraud, deception, violations of
            the <Link href="/acceptable-use">Acceptable Use Policy</Link>, or breaches that put the safety of persons
            or the security or integrity of the Services at risk, are each deemed incapable of remedy for purposes
            of this Section, and we may terminate or suspend immediately without a cure period.
          </li>
          <li>
            If 9278.ai commits a material breach that is capable of remedy, you will provide written notice
            describing the breach, and we will have ninety (90) days from the date of such notice (&ldquo;Company
            Remedy Period&rdquo;) to cure the breach. You may terminate on the expiry of the Company Remedy Period
            only if the breach remains uncured.
          </li>
        </ul>
        <h3>11.2b Orderly Transition, Number Return, and Wind-Down</h3>
        <p>
          On any expiration or termination of this Agreement or of the Services to you, you acknowledge that 9278.ai
          has no obligation to continue to provide any Services after the effective date of termination. You agree
          that you will, within thirty (30) days after termination, effect an orderly and timely transition of your
          agents, configurations, integrations, phone numbers, dial lists, recordings, transcripts, and data to
          another provider or environment. You are solely responsible for exporting your data prior to the end of the
          thirty-day window; after that window, we may delete data in accordance with our retention policies and
          Section 11.3. You further agree that you will return, release, or cease using any numbers, credentials, API
          keys, or carrier assignments that were provisioned through or on behalf of 9278.ai, and that you will not
          use any 9278.ai-issued CLI, caller-ID, numbering, or network identity after termination. Where termination
          occurs due to your breach or non-payment, we have no obligation to provide a transition window and may
          suspend immediately.
        </p>
        <h3>11.3 Effects of Termination</h3>
        <p>
          Upon termination, your right to use the Services ends and associated data — including agents, logs,
          recordings, transcripts, and any remaining credit — may be deleted in accordance with our retention
          timelines, generally with no recovery option.
        </p>
        <h3>11.4 Survival</h3>
        <p>
          Provisions that by their nature should survive termination (including Sections 5, 8, 9, 12, 13, 14, and 15)
          will survive.
        </p>
        <h3>11.5 Data Portability</h3>
        <p>
          Prior to termination of your account, you are responsible for exporting your configuration, logs, and
          recording data. We are not obligated to provide data export assistance after termination, and data will be
          permanently deleted according to our standard retention policies.
        </p>

        <h2 id="liability">12. Limitation of Liability</h2>
        <h3>12.1 General Limitation</h3>
        <p>
          To the fullest extent permitted by law, we and our affiliates, suppliers, and licensors will not be liable for
          any indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits,
          revenues, data, goodwill, or business interruption, arising out of or relating to the Services or this
          Agreement.
        </p>
        <h3>12.2 Aggregate Liability</h3>
        <p>
          To the fullest extent permitted by law, our total aggregate liability arising out of or relating to the
          Services or this Agreement will not exceed the amount you paid to us in the three (3) months immediately
          preceding the event giving rise to the claim.
        </p>
        <h3>12.3 No Liability for Certain Matters</h3>
        <p>
          We are not liable for losses arising from third-party carriers or providers, your configuration of agents, AI
          output accuracy, your or your users&apos; content or conduct, unauthorized account access not caused by us, or
          events beyond our reasonable control.
        </p>
        <h3>12.4 Basis of the Bargain</h3>
        <p>
          The limitations in this Section reflect the allocation of risk between the parties and form an essential basis
          of the bargain.
        </p>

        <h2 id="indemnification">13. Indemnification</h2>
        <h3>13.1 Indemnity Obligation</h3>
        <p>
          You agree to indemnify, defend, and hold harmless 9278.ai (Ace Peak Invest Pte Ltd), its affiliates, and their
          officers, directors, employees, and agents from and against any claims, damages, liabilities, losses, fines,
          penalties, and expenses (including reasonable legal fees) arising out of or related to: your use of the
          Services; your content, agents, prompts, or knowledge sources; your calls, recordings, or messaging; your
          violation of this Agreement or applicable law (including telemarketing, recording-consent, STIR/SHAKEN,
          TRAI/TCCCPR, data-protection, and robocall-mitigation laws); regulatory actions brought by authorities such
          as the FCC, FTC, TRAI, or equivalent bodies; or your infringement of any third-party rights.
        </p>

        <h2 id="disputes">14. Dispute Resolution and Arbitration</h2>
        <h3>14.1 Informal Resolution</h3>
        <p>
          Before initiating formal proceedings, you agree to first contact us at{" "}
          <a href="mailto:support@9278.ai">support@9278.ai</a> and attempt to resolve the dispute informally.
        </p>
        <h3>14.2 Binding Arbitration</h3>
        <p>
          To the extent permitted by applicable law, disputes that cannot be resolved informally will be resolved by
          binding arbitration administered in Singapore in accordance with the rules of the Singapore International
          Arbitration Centre (SIAC), except where prohibited by law.
        </p>
        <h3>14.3 Class Action Waiver</h3>
        <p>
          To the extent permitted by law, disputes will be resolved on an individual basis, and you waive any right to
          participate in a class or representative action.
        </p>
        <h3>14.4 Exceptions</h3>
        <p>
          Either party may seek injunctive or equitable relief in a court of competent jurisdiction to protect its
          intellectual property or confidential information.
        </p>

        <h2 id="miscellaneous">15. Miscellaneous</h2>
        <h3>15.1 Entire Agreement</h3>
        <p>
          This Agreement, together with the Privacy Policy and any pricing or policies referenced herein, constitutes
          the entire agreement between you and us regarding the Services.
        </p>
        <h3>15.2 Governing Law</h3>
        <p>
          This Agreement is governed by the laws of Singapore, without regard to conflict-of-laws principles, except
          where mandatory local law applies.
        </p>
        <h3>15.3 Language</h3>
        <p>
          This Agreement is drafted in English, which controls in the event of any conflict with a translation.
        </p>
        <h3>15.4 Severability</h3>
        <p>
          If any provision is held invalid or unenforceable, the remaining provisions will remain in full force and
          effect.
        </p>
        <h3>15.5 Headings</h3>
        <p>Headings are for convenience only and do not affect interpretation.</p>
        <h3>15.6 Relationship</h3>
        <p>
          Nothing in this Agreement creates a partnership, agency, or employment relationship between the parties.
        </p>
        <h3>15.7 Waiver</h3>
        <p>Our failure to enforce any provision is not a waiver of our right to do so later.</p>
        <h3>15.8 Electronic Communications</h3>
        <p>
          You consent to receive communications from us electronically, and agree that electronic communications satisfy
          any legal requirement that communications be in writing.
        </p>
        <h3>15.9 Force Majeure</h3>
        <p>
          We are not liable for delays or failures caused by events beyond our reasonable control, including carrier or
          provider outages, natural disasters, or government actions.
        </p>
        <h3>15.10 Notice</h3>
        <p>
          We may provide notices via the dashboard, website, or email. You may contact us at the details in Section 16.
        </p>
        <h3>15.11 Export Control</h3>
        <p>
          You agree to comply with all applicable export-control and sanctions laws and not to use the Services in
          violation of them.
        </p>
        <h3>15.12 Assignment</h3>
        <p>
          You may not assign this Agreement without our consent. We may assign it in connection with a merger,
          acquisition, or sale of assets.
        </p>
        <h3>15.13 Survival</h3>
        <p>Sections that by their nature should survive termination will survive.</p>
        <h3>15.14 Anti-Bribery</h3>
        <p>
          You agree not to offer, give, or accept any bribe, kickback, or other improper payment or advantage in
          connection with this Agreement, and you will comply with all applicable anti-corruption and anti-bribery laws.
        </p>
        <h3>15.15 Confidentiality</h3>
        <p>
          Each party agrees to hold the other&apos;s non-public business, technical, and pricing information in
          confidence and use it only to perform under this Agreement, except as required by law or with the other
          party&apos;s consent. This obligation survives for five (5) years after disclosure. We treat client data and
          business information as confidential and do not disclose it to third parties without consent, except as
          described in our Privacy Policy or as required by law.
        </p>

        <h2 id="warranties">16. Warranties, Disclaimers, and Contact</h2>
        <h3>16.1 &ldquo;As Is&rdquo;</h3>
        <p>
          The Services are provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE,&rdquo; without warranties of any kind,
          whether express, implied, or statutory, including implied warranties of merchantability, fitness for a
          particular purpose, title, and non-infringement, to the fullest extent permitted by law.
        </p>
        <h3>16.2 No Guarantee of Results</h3>
        <p>
          We do not warrant that the Services will be uninterrupted, error-free, secure, or that AI-generated outputs
          will be accurate, complete, or fit for your intended purpose.
        </p>
        <h3>16.3 Contact Us</h3>
        <p>For questions about this Agreement, contact:</p>
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
        </ul>
      </article>

      <SiteFooter />
    </main>
  )
}
