import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Law Enforcement & Government Request Guidelines",
  description:
    "How law enforcement, regulators, and government authorities can request information from 9278.ai — required legal process, contact details, our review principles, and data-retention overview.",
  path: "/law-enforcement",
})

export default function LawEnforcementPage() {
  return (
    <LegalPage title="Law Enforcement &" accent="Government Requests." name="Law Enforcement & Government Request Guidelines" path="/law-enforcement" eyebrow="Legal Process">
      <p>
        Ace Peak Invest Pte Ltd (operating as 9278.ai) respects the rule of law and the important work of law
        enforcement agencies, regulators, and other government authorities around the world. We also have a
        responsibility to protect the privacy, civil liberties, and legal rights of our customers, their end users
        (callers and called parties who interact with AI voice agents built on 9278.ai), and website visitors.
      </p>
      <p>
        This page sets out the information and procedures government authorities should follow when seeking
        information from 9278.ai, and the principles we apply when we review and respond to such requests.
      </p>

      <h2>1. Scope & Roles</h2>
      <ul>
        <li>
          <strong>Controller data (9278.ai as controller).</strong> Information about customers, account holders,
          billing contacts, website visitors, and user accounts that 9278.ai maintains for its own business
          purposes (account management, billing, fraud/abuse prevention, compliance, security, marketing opt-ins,
          support, and in-dashboard analytics).
        </li>
        <li>
          <strong>Processor data (9278.ai as processor).</strong> Call content, recordings, transcripts,
          conversation logs, agent configurations, and related data processed by 9278.ai purely on behalf of the
          business customer that operates the AI voice agent. For this category of data, the business customer is
          the controller and 9278.ai is a service provider / processor acting on its documented instructions. If you
          are seeking this kind of data, we will generally require valid legal process directed at the customer
          first, or we will, where required by law, notify the customer of your request so that they can seek to
          quash or narrow it before we produce anything.
        </li>
      </ul>

      <h2>2. Legal Process Requirements</h2>
      <p>
        To the extent permitted by applicable law, we will only disclose information in response to government
        requests that meet all of the following requirements:
      </p>
      <ul>
        <li>
          <strong>Issued under competent authority.</strong> The request must be issued by a court, regulator, or
          other authority with competent jurisdiction over 9278.ai and over the subject matter of the request, in
          accordance with the applicable laws of that jurisdiction. 9278.ai is headquartered in Singapore;
          requests from authorities outside Singapore are typically enforced through mutual legal assistance
          (MLAT/letters rogatory) unless otherwise authorised by Singapore law or another binding treaty.
        </li>
        <li>
          <strong>Sufficient specificity.</strong> The request must identify with particularity: (a) the specific
          account, phone number, subscriber, caller/called party, or other identifier; (b) the specific categories
          of records sought; and (c) the relevant time period. Broad, open-ended, or &ldquo;fishing expedition&rdquo;
          requests will be narrowed or rejected.
        </li>
        <li>
          <strong>Properly signed &amp; authorised.</strong> Requests must bear the signature, title, and contact
          information of a duly authorised official, and (where applicable) a seal, case number, or other docket
          reference.
        </li>
        <li>
          <strong>In the correct language &amp; format.</strong> Requests in a language other than English must be
          accompanied by a certified English translation.
        </li>
      </ul>

      <h2>3. Types of Requests & Minimum Legal Basis</h2>
      <p>The following is a non-exhaustive summary of the typical legal thresholds we apply:</p>
      <ul>
        <li>
          <strong>Subscriber / basic customer records.</strong> Account name, email, billing contact, account
          creation date, and plan tier. Minimum basis: valid subpoena, administrative summons, or equivalent
          compulsory process with lawful authority.
        </li>
        <li>
          <strong>Call detail records (CDRs) &amp; session metadata.</strong> Calling/called numbers, call start/end
          timestamps, duration, disconnect cause, route, and quality/error metadata. Minimum basis: court order or
          equivalent compulsory process issued by a tribunal with jurisdiction.
        </li>
        <li>
          <strong>Call recordings, transcripts, conversation content &amp; AI-agent configuration.</strong> Content
          of calls handled by a customer&apos;s AI agent. 9278.ai is generally a processor of this data and the
          customer is controller. Minimum basis: valid warrant, court order, wiretap order, or equivalent process
          compelling disclosure of content, directed at the controller (the customer) or at 9278.ai with clear
          statutory authority. If the customer has disabled recording entirely, there is no recorded content to
          produce.
        </li>
        <li>
          <strong>Real-time / prospective interception.</strong> We do not support &ldquo;wiretap on demand&rdquo;
          for arbitrary numbers on our platform. Prospective real-time interception of call content or signalling
          requires, at a minimum, a lawful interception warrant or equivalent order directed to the applicable
          communications provider. Please direct such requests to the connected carrier / SIP provider rather than
          9278.ai alone.
        </li>
        <li>
          <strong>Emergency / exigent circumstances.</strong> Where we receive a request under circumstances
          indicating an immediate danger of death or serious physical injury to any person, we may, at our sole
          discretion consistent with applicable law, disclose limited information reasonably necessary to prevent
          that harm, independently of compulsory process. We will seek to confirm that the requesting official is
          indeed acting in an official emergency-response capacity before disclosing.
        </li>
      </ul>

      <h2>4. How to Submit a Request</h2>
      <p>
        Send government requests, with all required enclosures, to our dedicated legal-process address. All
        submissions must come from an official government/agency email address, include valid contact details for the
        authorised officer, and (where applicable) reference a case or docket number.
      </p>
      <ul>
        <li>
          <strong>Email (preferred).</strong> <a href="mailto:legal@9278.ai">legal@9278.ai</a> with the subject
          line: <em>[Jurisdiction] [Agency] [Case Ref] Request for Information</em>.
        </li>
        <li>
          <strong>Post.</strong> Legal Department, Ace Peak Invest Pte Ltd (9278.ai), 1 Scotts Road, #24-10, Shaw
          Centre, Singapore 228208. Registered in Singapore.
        </li>
      </ul>
      <p>
        For urgent emergency-disclosure requests, send to <a href="mailto:legal@9278.ai">legal@9278.ai</a> with the
        subject line <em>EMERGENCY EXIGENT REQUEST</em> and include a live callback number.
      </p>

      <h2>5. Our Review Principles</h2>
      <ul>
        <li>
          <strong>Presumption of validity, but independent review.</strong> While we presume that requests received
          from appropriately identified government agencies are issued in good faith, we conduct an independent
          legal review of every request for (a) jurisdiction, (b) specificity, (c) sufficiency of legal basis, and
          (d) proportionality.
        </li>
        <li>
          <strong>Narrowing &amp; partial compliance.</strong> Where a request is overbroad, we will, where
          appropriate, seek clarification and then comply only with the lawful, narrowed portion. Where the
          customer/controller has a legal right to quash or modify the request, we will notify them to the extent
          permitted by law.
        </li>
        <li>
          <strong>Notice to customer / affected user.</strong> It is our policy to notify the account holder and,
          where appropriate, any identifiable affected user of a request for their data prior to disclosure, unless
          we are legally prohibited from doing so (e.g. a statutory non-disclosure requirement, or a court-ordered
          gag) or exigent circumstances make notice impractical or unsafe. Where a gag or non-disclosure order
          applies, we will consider whether to challenge it where permitted by law.
        </li>
        <li>
          <strong>No voluntary disclosure.</strong> We do not voluntarily hand over information in response to
          informal requests, media inquiries, or political pressure. We disclose only when compelled by valid legal
          process or when a good-faith belief of imminent harm permits disclosure under applicable law.
        </li>
        <li>
          <strong>Transparency reporting.</strong> To the extent permitted by applicable law and non-disclosure
          orders, we intend to publish an annual or bi-annual transparency report that aggregates, in ranges or
          buckets consistent with law, the number and type of government requests received, the jurisdictions of
          origin, and our compliance/narrowing rates.
        </li>
      </ul>

      <h2>6. Cost Recovery</h2>
      <p>
        9278.ai reserves the right to charge a reasonable, documented fee to recover the direct costs of search,
        duplication, review, and production of records, consistent with applicable law. Where a request requires
        extensive engineering effort (e.g. custom export of a specific dataset), we will notify the requesting
        authority of the estimated cost before beginning work.
      </p>

      <h2>7. Data Retention Overview</h2>
      <p>
        We only retain records for as long as necessary for the purposes for which they were collected, and for
        legal, tax, accounting, and security retention periods. A high-level summary:
      </p>
      <ul>
        <li>Customer/subscriber records: retained for the life of the account plus the duration of applicable statutory limitation periods.</li>
        <li>Call detail records and platform logs: retained per the defined retention policy (generally rolling 12 months for CDRs; longer where required by law).</li>
        <li>Call recordings and transcripts: retained only if and for as long as the customer has enabled recording, per the customer&apos;s configured retention window. The customer can configure recording to be off entirely.</li>
        <li>Support communications: retained for account-management, compliance, and quality purposes for a rolling 3–7 years depending on content.</li>
      </ul>
      <p>
        If a request seeks records that have already been purged from live systems and backups, we will notify the
        requesting authority that the records are no longer available; we do not &ldquo;undelete&rdquo; purged data
        or reverse crypto-shredded keys absent a court order or exigent safety reason and only where technically
        feasible.
      </p>

      <h2>8. Prosecution Preservation Requests</h2>
      <p>
        If you have a valid basis under applicable law to request that specific records be preserved pending receipt
        of full legal process, you may send a preservation request to <a href="mailto:legal@9278.ai">legal@9278.ai</a>.
        We will preserve the identified categories of records for up to 90 days (extendable on request with a
        valid basis) but will not disclose any content until the full compulsory process is received.
      </p>

      <h2>9. Requests to Individuals &amp; Civil Litigants</h2>
      <p>
        These guidelines are for government / law enforcement / regulator requests only. Private parties (civil
        litigants, individuals, attorneys in civil matters) seeking customer records must serve valid compulsory
        process (e.g. subpoena) in accordance with applicable procedural rules, and we will apply the same
        specificity and proportionality review. Private requests are typically subject to customer notice and
        applicable data-protection rights before production, and we will charge a reasonable cost-recovery fee.
      </p>

      <h2>10. Questions</h2>
      <p>
        Government authorities with questions about these guidelines or a pending submission can contact the Legal
        Department at <a href="mailto:legal@9278.ai">legal@9278.ai</a>. We aim to acknowledge legitimate requests
        within 2 business days.
      </p>

      <h2>Contact</h2>
      <ul>
        <li><strong>Legal process / Law enforcement:</strong> <a href="mailto:legal@9278.ai">legal@9278.ai</a></li>
        <li><strong>Privacy / DPO:</strong> <a href="mailto:privacy@9278.ai">privacy@9278.ai</a></li>
        <li><strong>Emergency / exigent:</strong> <a href="mailto:legal@9278.ai">legal@9278.ai</a> (subject line: EMERGENCY EXIGENT REQUEST)</li>
      </ul>
      <p>Ace Peak Invest Pte Ltd (9278.ai), 1 Scotts Road, #24-10, Shaw Centre, Singapore 228208.</p>
    </LegalPage>
  )
}
