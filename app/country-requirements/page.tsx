import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Country-Specific Requirements",
  description:
    "Regional addenda and jurisdiction-specific requirements that supplement the 9278.ai Terms, Privacy Policy, DPA, and AUP — EU/EEA, UK, Switzerland, US, Brazil/ LGPD, India/DPDP+TRAI, Canada, Australia, Singapore/PDPA, and LATAM.",
  path: "/country-requirements",
})

export default function CountryRequirementsPage() {
  return (
    <LegalPage title="Country-Specific" accent="Requirements." name="Country-Specific Requirements" path="/country-requirements" eyebrow="Regional">
      <p>
        This page contains jurisdiction-specific addenda and requirements that apply in addition to, and where
        required by local law prevail over, the corresponding sections of the 9278.ai{" "}
        <Link href="/terms">Terms of Service</Link>, <Link href="/privacy">Privacy Policy</Link>,{" "}
        <Link href="/dpa">Data Processing Agreement</Link>, and{" "}
        <Link href="/acceptable-use">Acceptable Use Policy</Link>. This page is non-exhaustive and is updated
        from time to time as we expand coverage and as laws evolve; material updates will be notified in accordance
        with the Terms.
      </p>

      <h2>1. European Economic Area (EEA), European Union (EU), & European Free Trade Association (EFTA)</h2>
      <h3>1.1 GDPR, ePrivacy, and the AI Act</h3>
      <ul>
        <li>
          The <strong>EU General Data Protection Regulation (GDPR)</strong> applies to the processing of personal
          data of individuals located in the EEA. The controller/processor roles, security measures, and
          international-transfer mechanisms are described in the <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/dpa">DPA</Link>.
        </li>
        <li>
          <strong>Lawful bases.</strong> Where 9278.ai acts as a <em>controller</em> for customer account data,
          the main lawful bases are: (a) performance of the contract with you; (b) our legitimate interests (fraud
          prevention, product improvement, network security, direct marketing where permitted); (c) compliance with
          a legal obligation; and (d) your consent where we explicitly ask for it. Where we rely on legitimate
          interests, we conduct a balancing test documented in our ROPA and can summarise it on request.
        </li>
        <li>
          <strong>ePrivacy / PECR-equivalent rules.</strong> Marketing calls, SMS, and prerecorded/artificial
          voice calls to EEA/UK individuals require consent or another applicable ePrivacy lawful basis. Cookie
          and similar-device rules are covered in the <Link href="/cookies">Cookie Policy</Link>.
        </li>
        <li>
          <strong>EU AI Act (Regulation 2024/1689).</strong> Where an AI voice agent built on 9278.ai falls under
          the AI Act (e.g. deployed in a high-risk use case such as creditworthiness assessment, insurance
          underwriting for life/health, employment screening, law-enforcement/justice applications, or border
          control), <em>you</em> as the deployer/provider are generally the &ldquo;provider&rdquo; and/or
          &ldquo;deployer&rdquo; responsible for conformity assessment, technical documentation, user information,
          and record-keeping. 9278.ai provides reasonable self-serve tooling (logging, redaction, disclosure
          prompts) to help you meet these obligations but does not assume them unless agreed separately in writing.
          General-purpose AI voice agents not used in a regulated/high-risk sector are typically outside the scope
          of the AI Act&apos;s high-risk regime, but still must comply with the general-purpose and transparency
          rules set out in the Act and in our <Link href="/ai-disclosure">AI Voice Disclosure &amp; Responsible-AI
          Policy</Link>.
        </li>
      </ul>
      <h3>1.2 EU Representative / Local Contact</h3>
      <p>
        Where required by Article 27 GDPR, 9278.ai maintains an EU-based representative for controller data
        processed in the context of goods/services offered to EEA individuals. The current representative details
        are available on request from <a href="mailto:privacy@9278.ai">privacy@9278.ai</a>.
      </p>
      <h3>1.3 Standard Contractual Clauses (SCCs) & Transfer Mechanisms</h3>
      <p>
        Where personal data is transferred from the EEA/UK to countries without an adequacy decision, 9278.ai
        offers the <strong>EU SCCs (Decision 2021/914), Module Two (Controller-to-Processor)</strong>, completed
        with Annex I details and Annex II technical measures, via the DPA. Additional supplementary measures
        (pseudonymisation in transit, strong encryption at rest, access controls on personnel, and documented
        access and logging) are described in the DPA and{" "}
        <Link href="/trust">Trust &amp; Security Center</Link>.
      </p>

      <h2>2. United Kingdom (UK)</h2>
      <ul>
        <li>
          <strong>UK GDPR &amp; Data Protection Act 2018.</strong> The UK GDPR applies alongside retained EU law
          pursuant to the European Union (Withdrawal) Act 2018. Our roles and obligations mirror the EU GDPR
          treatment above, with UK-specific additions documented below.
        </li>
        <li>
          <strong>UK International Data Transfer Agreement (IDTA) &amp; Addendum.</strong> For transfers from the
          UK to non-adequate countries, we rely on the UK IDTA (2022) and/or the International Data Transfer
          Addendum, as elected by you in the DPA.
        </li>
        <li>
          <strong>PECR (Privacy and Electronic Communications Regulations 2003).</strong> Unsolicited direct
          marketing calls, faxes, SMS, and electronic mail are governed by PECR. The rules differ by channel and by
          type of recipient (corporate vs individual). It is <em>your</em> responsibility as the caller/sender to
          comply with PECR, including the appropriate consent/soft-opt-in regime and the suppression of the TPS /
          CTPS registers where relevant.
        </li>
        <li>
          <strong>ICO contact.</strong> Data subjects in the UK who are not satisfied with our written response
          to a data-protection concern have the right to complain to the Information Commissioner&apos;s Office
          (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
        </li>
      </ul>

      <h2>3. Switzerland</h2>
      <ul>
        <li>
          <strong>Federal Act on Data Protection (FADP, rev. 2023).</strong> For individuals located in Switzerland,
          the revised Swiss FADP and its implementing ordinances apply. We treat Swiss individuals equivalently to
          EEA individuals for most purposes under this policy, including the right to obtain information about
          disclosure to third parties and to challenge automated decision-making where it produces legal or
          similarly significant effects.
        </li>
        <li>
          <strong>Transfers out of Switzerland.</strong> The EU SCCs (Decision 2021/914) adapted for Switzerland
          and/or the Swiss Addendum / Standard Contractual Clauses adopted by the Swiss Federal Council are used
          where personal data is transferred from Switzerland to a country without an adequacy decision by the
          Federal Council. A copy is available in the DPA on request.
        </li>
      </ul>

      <h2>4. United States of America (USA)</h2>
      <h3>4.1 Telecommunications &amp; Robocalling</h3>
      <ul>
        <li>
          <strong>TCPA &amp; FCC rules.</strong> The Telephone Consumer Protection Act (&ldquo;TCPA&rdquo;), the
          FCC&apos;s 2024 Declaratory Ruling on AI-generated and prerecorded voices, and related FCC orders impose
          prior-express-consent, call-abandonment, caller-ID, and do-not-call requirements on many types of
          outbound calls and text messages. These requirements apply to <em>you</em> as the party initiating the
          call through your AI agent.
        </li>
        <li>
          <strong>STIR/SHAKEN &amp; robocall mitigation.</strong> If you are a &ldquo;voice service provider&rdquo;,
          an &ldquo;intermediate provider&rdquo;, or a &ldquo;gateway provider&rdquo; as defined in FCC rules, you
          are responsible for robocall-mitigation registration and STIR/SHAKEN attestation obligations on the
          numbers and routes you control. Where applicable, we require you to represent compliance with 47 CFR
          § 64.6305 and related rules.
        </li>
        <li>
          <strong>A2P 10DLC / Campaign Registry.</strong> US 10-digit long-code (10DLC) messaging is governed by
          The Campaign Registry rules, AT&amp;T/T-Mobile/Verizon/US Cellular codes of conduct, and Section 5 of the
          FTC Act. You are responsible for registering brands and campaigns and obtaining required mobile-network
          approvals before sending A2P SMS/MMS traffic.
        </li>
        <li>
          <strong>CAN-SPAM Act.</strong> Commercial email messages sent or configured via the platform must
          comply with the CAN-SPAM Act (15 U.S.C. § 7701 et seq.): accurate headers, clear identification as
          advertising, a working opt-out mechanism honoured within 10 business days, and a valid physical postal
          address.
        </li>
      </ul>
      <h3>4.2 US State Privacy Laws</h3>
      <ul>
        <li>
          <strong>California (CPRA / CCPA) — CalOPPA — CIDAA.</strong> California consumers have rights to know,
          correct, delete, and (in some cases) limit use of Sensitive Personal Information, and to opt out of the
          &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of Personal Information for cross-context behavioural
          advertising as those terms are broadly defined by the CPRA. We do not &ldquo;sell&rdquo; personal
          information in the traditional sense; where &ldquo;sharing&rdquo; could be deemed to occur through
          third-party cookies or ads, a resident may opt out as described in the{" "}
          <Link href="/privacy">Privacy Policy</Link> (Section 6.7). In-Scope California employees, applicants,
          contractors, and emergency contact persons have additional rights under CCPA as extended to the
          employment context.
        </li>
        <li>
          <strong>Other U.S. state privacy laws.</strong> Where applicable: Virginia VCDPA, Colorado CPA,
          Connecticut CTDPA, Texas TDPSA, Oregon OCPA, Montana MCDPA, and subsequent enactments. We apply the
          same high-level rights (access, correction, deletion, data portability, opt-out of targeted
          advertising/sale and of significant profiling) uniformly across these states via the mechanisms in the
          Privacy Policy, with any state-specific differences documented on request.
        </li>
        <li>
          <strong>Consumer Complaint Body.</strong> California consumers who wish to report complaints about our
          handling of personal information may contact the California Privacy Protection Agency at{" "}
          <a href="https://cppa.ca.gov" target="_blank" rel="noopener noreferrer">cppa.ca.gov</a>.
        </li>
      </ul>
      <h3>4.3 Other US-Specific</h3>
      <ul>
        <li>
          <strong>HIPAA.</strong> Where a customer is a Covered Entity or Business Associate under HIPAA and the
          Services process PHI, the parties will first execute a Business Associate Agreement (&ldquo;BAA&rdquo;).
          Contact <a href="mailto:sales@9278.ai">sales@9278.ai</a> if you require a BAA.
        </li>
        <li>
          <strong>Kari&apos;s Law / RAY BAUM&apos;s Act — MLTS.</strong> Where you deploy 9278.ai behind a
          multi-line telephone system (MLTS), PBX, or hosted-PBX environment at an office or campus, you are
          responsible under Kari&apos;s Law and RAY BAUM&apos;s Act for dispatchable-location (civic address)
          conveyance to the appropriate PSAP for E911 calls, and for notification to on-site personnel. E911
          limitations are further described in the <Link href="/e911">Emergency Calling (E911) Notice</Link>.
        </li>
        <li>
          <strong>DMCA / Copyright.</strong> For claims of copyright infringement on our website or in materials
          we publish, our designated DMCA agent for notices of claimed infringement is{" "}
          <a href="mailto:legal@9278.ai">legal@9278.ai</a>; we will process notices and counter-notices in
          accordance with the DMCA.
        </li>
      </ul>

      <h2>5. Brazil — LGPD (Lei Geral de Proteção de Dados, Lei No. 13.709/2018)</h2>
      <ul>
        <li>
          <strong>Roles.</strong> Where 9278.ai processes personal data of individuals located in Brazil in the
          context of the Services, the customer that operates the AI voice agent is typically the <em>controlador
          (controller)</em> and 9278.ai is the <em>operador (operator)</em>. The LGPD-specific controller/operator
          addendum is incorporated into the DPA.
        </li>
        <li>
          <strong>Bases.</strong> LGPD Articles 7 and 11 set out the lawful bases and the additional rules for
          sensitive personal data (dados pessoais sensíveis). If your agent collects health, racial/ethnic,
          religious, political, biometric, or sexual-orientation information, you must identify the applicable
          LGPD basis and keep the records required by Article 30.
        </li>
        <li>
          <strong>ANPD.</strong> The Autoridade Nacional de Proteção de Dados is the Brazilian supervisory
          authority; data subjects may direct unresolved complaints to{" "}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a>.
        </li>
        <li>
          <strong>Data Protection Officer (Encarregado).</strong> You must, where required by Articles 39 and 41
          LGPD, appoint an Encarregado de Proteção de Dados and communicate their identity and contact details to
          ANPD and to the data subjects. 9278.ai&apos;s own privacy/DPO contact is{" "}
          <a href="mailto:privacy@9278.ai">privacy@9278.ai</a>.
        </li>
        <li>
          <strong>International transfers.</strong> For transfers of Brazilian personal data outside Brazil, we
          apply Article 33–35 LGPD transfer rules: adequacy decisions, standard contractual clauses approved by ANPD
          (which by default incorporate the EU SCCs where legally appropriate), or the other transfer mechanisms in
          the LGPD.
        </li>
      </ul>

      <h2>6. India — Digital Personal Data Protection Act, 2023 (DPDP Act) &amp; Telecom Regulatory Authority of India (TRAI) Rules</h2>
      <h3>6.1 DPDP Act</h3>
      <ul>
        <li>
          <strong>Roles.</strong> For personal data that 9278.ai holds about Indian customers/account holders,
          9278.ai acts as <strong>Data Fiduciary</strong>. For personal data that flows through AI voice agents
          operated by <em>you</em> (i.e. the callers/called parties in India that your agents interact with), you
          are the <strong>Data Fiduciary</strong> and 9278.ai is a <strong>Data Processor</strong> under contract
          and documented instructions.
        </li>
        <li>
          <strong>Rights of Data Principals.</strong> Individuals in India have rights to: (a) access; (b)
          correction and erasure; (c) erase &ldquo;right to be forgotten&rdquo; in defined circumstances; (d)
          grievance redressal; and (e) nominate a consent manager for certain data. Exercising these rights is
          described in the <Link href="/privacy">Privacy Policy</Link>.
        </li>
        <li>
          <strong>Grievance officer / Data Protection Officer of India.</strong> If you are a Data Principal in
          India and wish to raise a DPDP Act grievance or nominate a Data Fiduciary contact, write to{" "}
          <a href="mailto:privacy@9278.ai">privacy@9278.ai</a> (Attn: India Grievance Officer / DPDP). We
          acknowledge within 72 hours and respond substantively within the DPDP Act deadlines. Unresolved
          complaints may be escalated to the Data Protection Board of India (DPBI) as set out in the DPDP Act.
        </li>
      </ul>
      <h3>6.2 TRAI — Commercial Communications (TCCCPR) &amp; AI Calling</h3>
      <ul>
        <li>
          <strong>Commercial &amp; promotional calls / SMS are regulated by the Telecom Commercial Communications
          Customer Preference Regulations, 2018 (&ldquo;TCCCPR&rdquo;) (as amended 2024 and subsequent circulars).</strong>
        </li>
        <li>
          <strong>Registered routes &amp; Headers / SMS Templates.</strong> Promotional SMS must be sent via
          registered headers (160-series header IDs) and approved Content Templates. All promotional calls must
          originate from a registered commercial calling number / series and comply with the NDNC / DND
          scrubbing, time-of-day (8 AM to 9 PM local time unless consent specifies otherwise), and consent
          documentation rules.
        </li>
        <li>
          <strong>AI / synthetic voice disclosure.</strong> When an AI agent you deploy on 9278.ai places or
          answers calls to/from Indian parties, you must, where required by the TCCCPR and any supplementary TRAI
          guidance on AI-generated communications, disclose that the caller/callee is interacting with an AI or
          synthetic-voice system at or near the start of the call.
        </li>
        <li>
          <strong>Do Not Disturb (NDNC Registry).</strong> You are required to scrub all dial lists against the
          current TRAI NDNC (DND) registry, honour customer preference registrations, and maintain a written audit
          trail of consent where required, as you are the sender / originator of the communications.
        </li>
        <li>
          <strong>DLT / principal entity registration.</strong> Where applicable under the current DLT rules for
          SMS and commercial calling in India, you are responsible for registering as a Principal Entity with the
          DLT operator and obtaining the required Entity ID, Header/Sender ID, and Content Template registrations
          before any traffic is sent.
        </li>
      </ul>

      <h2>7. Canada (PIPL, CASL, &amp; CRTC Rules)</h2>
      <ul>
        <li>
          <strong>PIPL / Qu&#233;bec Law 25.</strong> For customers and end users in Canada, the Personal
          Information Protection and Electronic Documents Act (PIPL / SC 2000, c. 5), and, for residents of
          Qu&#233;bec, An Act respecting the protection of personal information in the private sector (Loi sur la
          protection des renseignements personnels dans le secteur priv&#233;, CQLR c. P-39.1, &ldquo;Law 25&rdquo;)
          apply, as supplemented by the GDPR where Canadian individuals are also EEA data subjects.
        </li>
        <li>
          <strong>CASL / CRTC Unsolicited Telecommunications Rules.</strong> The Canadian Anti-Spam Legislation
          (&ldquo;CASL&rdquo;) and the CRTC Unsolicited Telecommunications Rules govern commercial electronic
          messages (CEMs), including SMS/MMS, and telemarketing calls made to Canadians. Express or (where
          permitted) implied consent is required; the CRTC DNCL &amp; internal do-not-call lists must be
          respected.
        </li>
        <li>
          <strong>OPC &amp; CAI.</strong> Unresolved privacy complaints may be directed to the Office of the
          Privacy Commissioner of Canada (OPC) at{" "}
          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">www.priv.gc.ca</a>.
        </li>
      </ul>

      <h2>8. Australia (Privacy Act 1988 (Cth) — APPs — ACMA / Do Not Call Register)</h2>
      <ul>
        <li>
          <strong>Australian Privacy Principles (APPs).</strong> We comply with the APPs in Schedule 1 of the
          Privacy Act 1988 (Cth) as applicable to our handling of personal information of individuals in Australia.
          You can access, correct, or complain about the handling of Australian personal information as described in
          the Privacy Policy, with a right to escalate unresolved complaints to the OAIC:{" "}
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
        </li>
        <li>
          <strong>DNCR &amp; Telemarketing &amp; SPAM Acts.</strong> Outbound telemarketing calls, marketing fax,
          and marketing SMS to Australian numbers must respect the Do Not Call Register Act 2006 and the Spam Act
          2003 (Cth). You are responsible for compliance as the calling/sending party.
        </li>
      </ul>

      <h2>9. Singapore — Personal Data Protection Act (PDPA, 2012 Rev. Ed.)</h2>
      <ul>
        <li>
          As a Singapore-incorporated company, 9278.ai is subject to the Singapore PDPA as a data controller for
          account and customer data, and as a data processing intermediary for customer content to the extent the
          PDPA applies.
        </li>
        <li>
          <strong>DNC / Personal Data Protection Commission.</strong> Singapore&apos;s Do-Not-Call registry and
          PDPA enforcement fall under the PDPC. For calls/messages to Singapore numbers, you must comply with the
          DNC provisions in the PDPA and the applicable consent/opt-out/clear-and-concise-information requirements.
          Complaints: <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer">www.pdpc.gov.sg</a>.
        </li>
        <li>
          <strong>Cross-border transfers.</strong> Transfers of Singapore personal data outside Singapore must
          comply with Part IX PDPA; we rely on SCCs, binding intra-group rules, or other PDPA-permitted mechanisms
          where applicable.
        </li>
      </ul>

      <h2>10. Latin America (LATAM) — General / Mexico / Argentina / Chile / Colombia / Others</h2>
      <ul>
        <li>
          <strong>Mexico — LFPDPPP (Ley Federal de Protecci&#243;n de Datos Personales en Posesi&#243;n de los
          Particulares).</strong> Privacy notices (Aviso de Privacidad), ARCO rights (Acceso, Rectificaci&#243;n,
          Cancelaci&#243;n, Oposici&#243;n), consent requirements, and international-transfer mechanisms under the
          LFPDPPP are available on request. The INAI is the supervisory authority:{" "}
          <a href="https://inai.org.mx" target="_blank" rel="noopener noreferrer">inai.org.mx</a>.
        </li>
        <li>
          <strong>Argentina — Ley 25.326 &amp; DNPDP.</strong> For individuals in Argentina, Law 25.326 and the
          Direcci&#243;n Nacional de Protecci&#243;n de Datos Personales apply.
        </li>
        <li>
          <strong>Chile — Ley 19.628 (privacy) &amp; LOPD (Ley 21.461).</strong> For residents of Chile, the
          Law on Protection of Privacy (19.628) and the Ley Org&#225;nica de Protecci&#243;n de Datos de Car&#225;cter
          Personal (21.461) grant rights of access, correction, deletion, opposition, and portability.
        </li>
        <li>
          <strong>Colombia — Ley 1581 de 2012 &amp; Decreto 1377 de 2013.</strong> Habeas data, autorizaci&#243;n
          expresa, pol&#237;ticas de tratamiento, and the SIC as the supervisory authority.
        </li>
        <li>
          <strong>Other jurisdictions.</strong> We continually evaluate the applicability of other national data
          protection and consumer-protection / telemarketing statutes (including Peru, Chile, Ecuador, Uruguay,
          Paraguay, and others in LATAM) and will supplement this page with jurisdiction-specific text on request
          or as we expand operations.
        </li>
      </ul>

      <h2>11. Export Controls, Sanctions &amp; Embargoes</h2>
      <p>
        You may not use the Services to export, re-export, disclose, or transfer any regulated technology, software,
        data, encryption, or services in violation of the export-control, sanctions, and embargo laws and
        regulations of the United States (OFAC SDN/SSI/DPL lists, EAR), the European Union (EU Dual-Use
        Regulation, EU Sanctions regimes), the United Kingdom (UK Sanctions Act, Export Control Act), Singapore
        (Strategic Goods (Control) Act), and any other applicable jurisdiction. You represent that neither you nor
        any end user you serve is a person/entity on any applicable sanctioned party list or in a comprehensively
        embargoed jurisdiction, and that you will not use the Services to facilitate any prohibited transfer or
        activity.
      </p>

      <h2>12. Contact &amp; Jurisdiction-Specific Requests</h2>
      <p>
        If you require additional country-specific text, a signed DPA/SCC, or have questions about any of the
        regions listed above, please contact <a href="mailto:legal@9278.ai">legal@9278.ai</a> and specify the
        jurisdiction. Data-protection-specific requests should go to our DPO at{" "}
        <a href="mailto:privacy@9278.ai">privacy@9278.ai</a>.
      </p>

      <h2>Contact</h2>
      <ul>
        <li><strong>Legal / Regional questions:</strong> <a href="mailto:legal@9278.ai">legal@9278.ai</a></li>
        <li><strong>Privacy / DPO:</strong> <a href="mailto:privacy@9278.ai">privacy@9278.ai</a></li>
      </ul>
      <p>Ace Peak Invest Pte Ltd (9278.ai), 1 Scotts Road, #24-10, Shaw Centre, Singapore 228208.</p>
    </LegalPage>
  )
}
