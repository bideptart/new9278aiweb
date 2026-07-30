import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Trust & Security Center",
  description:
    "9278.ai's security and compliance program — certifications, architecture, data residency, encryption, incident response, business continuity, and vendor management.",
  path: "/trust",
})

export default function TrustCenterPage() {
  return (
    <LegalPage title="Trust &" accent="Security." name="Trust & Security Center" path="/trust" eyebrow="Trust">
      <p>
        9278.ai is designed, built, and operated with security, privacy, and resilience at every layer of the stack.
        This page gives you a clear, current picture of the security program, compliance posture, and operational
        controls that protect the platform and your data.
      </p>

      <h2>1. Our Approach</h2>
      <ul>
        <li>
          <strong>Security by design.</strong> Threat modelling, least-privilege access, and secure-by-default
          configurations are applied from architecture through deployment.
        </li>
        <li>
          <strong>Defense in depth.</strong> Multiple, overlapping controls across the network, identity, application,
          data, and personnel layers so a failure in any one control does not become a breach.
        </li>
        <li>
          <strong>Continuous improvement.</strong> We continuously review logs, monitor signals, run tests, and
          iterate on controls based on internal findings, customer feedback, and the evolving threat landscape.
        </li>
      </ul>

      <h2>2. Certifications & Attestations</h2>
      <p>
        We work with independent auditors to obtain and maintain industry-recognised certifications and attestations
        that evidence the design and operating effectiveness of our controls. Current status and evidence is available
        under NDA for business customers on request to <a href="mailto:security@9278.ai">security@9278.ai</a>.
      </p>
      <ul>
        <li>
          <strong>ISO/IEC 27001 (roadmap).</strong> Information security management system (ISMS) scoped to the
          9278.ai platform. Audit target: end of 2026.
        </li>
        <li>
          <strong>SOC 2 Type II (roadmap).</strong> Trust Services Criteria — Security, Availability, and
          Confidentiality — covering the period of operation.
        </li>
        <li>
          <strong>GDPR / UK GDPR alignment.</strong> Controller/processor roles documented in the{" "}
          <Link href="/privacy">Privacy Policy</Link> and <Link href="/dpa">DPA</Link>; EU SCCs and UK IDTA/Addendum
          offered for international transfers.
        </li>
        <li>
          <strong>LGPD alignment (Brazil).</strong> Operador obligations and data-subject rights addressed in the
          Privacy Policy, DPA, and Country-Specific Requirements.
        </li>
        <li>
          <strong>DPDP Act alignment (India).</strong> Data fiduciary vs processor roles and data-principal rights; see
          the Privacy Policy and Country-Specific Requirements.
        </li>
        <li>
          <strong>HIPAA.</strong> Where a signed BAA is in place for healthcare customers, administrative, physical,
          and technical safeguards are implemented per the HIPAA Security Rule (available on request).
        </li>
        <li>
          <strong>PCI DSS.</strong> Cardholder data processing is delegated to Stripe (PCI-DSS Level 1). 9278.ai
          itself does not store full PAN/CVV.
        </li>
      </ul>

      <h2>3. Data Residency & Hosting</h2>
      <ul>
        <li>
          <strong>Platform hosting.</strong> The web application, edge runtime, and control plane are hosted on Vercel
          with edge regions in North America, Europe, and APAC; underlying data-plane storage is in Supabase with
          primary region US-East (Virginia), with EU-region replication available on enterprise plans.
        </li>
        <li>
          <strong>Call media & recordings.</strong> Media (call audio, recordings, transcripts) is stored encrypted at
          rest with AES-256 in Supabase and/or the connected storage buckets you configure. Enterprise customers can
          specify a storage region and retention window.
        </li>
        <li>
          <strong>Carrier interconnection.</strong> Calling origination/termination runs through your connected
          carrier account and remains subject to that carrier's data residency and routing terms.
        </li>
      </ul>

      <h2>4. Encryption & Key Management</h2>
      <ul>
        <li>
          <strong>In transit.</strong> TLS 1.2+ for all customer-facing endpoints (website, dashboard, APIs), SRTP for
          media where negotiated, and mTLS where applicable between internal services.
        </li>
        <li>
          <strong>At rest.</strong> AES-256 encryption for databases, object storage, and backups; encryption keys are
          managed by the cloud provider using envelope encryption (KMS) with separate keys per data class.
        </li>
        <li>
          <strong>Secrets & credentials.</strong> API keys, database passwords, and third-party tokens are stored
          encrypted, never logged, and rotated on a schedule or immediately on suspicion of compromise.
        </li>
      </ul>

      <h2>5. Access Control & Identity</h2>
      <ul>
        <li>
          <strong>SSO & MFA.</strong> All internal production accounts require multi-factor authentication; SSO (SAML
          / OIDC) is enforced company-wide where the upstream provider supports it. Enterprise customer SSO for the
          dashboard is available on higher plans.
        </li>
        <li>
          <strong>Least privilege & role-based access (RBAC).</strong> Internal roles are scoped to the minimum set
          of permissions needed to perform a function; privileged access is time-boxed and reviewed quarterly.
        </li>
        <li>
          <strong>Separation of duties.</strong> Deployment, data access, and security monitoring roles are
          functionally separated so no single user can silently both introduce a change and suppress its detection.
        </li>
      </ul>

      <h2>6. Network & Infrastructure Security</h2>
      <ul>
        <li>
          <strong>Zero-trust segmentation.</strong> Internal services are firewalled and authenticated to each
          other; the network perimeter is not the only trust boundary.
        </li>
        <li>
          <strong>DDoS & WAF.</strong> Edge DDoS mitigation and a managed web-application firewall (WAF) are in
          place, with rate limiting and bot detection on all public endpoints.
        </li>
        <li>
          <strong>Secure SDLC.</strong> Infrastructure-as-code, peer review on every change, automated dependency
          scanning (SCA), static analysis (SAST), periodic container/host hardening reviews, and signed releases.
        </li>
        <li>
          <strong>Penetration testing.</strong> Annual third-party penetration test covering web, API, and
          infrastructure layers, plus continuous internal red-team and vulnerability scanning. Findings are
          triaged by severity and remediated against SLAs.
        </li>
      </ul>

      <h2>7. Incident Response</h2>
      <p>
        We maintain a documented, practiced Incident Response Plan that covers triage, containment, eradication,
        recovery, customer notification, and regulator notification timelines where required by applicable law
        (including, where applicable, the 72-hour GDPR breach notification window, India DPDP, and California/US
        state privacy laws).
      </p>
      <ul>
        <li>
          <strong>Reporting a concern.</strong> Customers and security researchers can reach the 9278.ai security
          team at any time at <a href="mailto:security@9278.ai">security@9278.ai</a>. PGP key available on request.
        </li>
        <li>
          <strong>Bug bounty &amp; coordinated disclosure.</strong> We operate a responsible-disclosure program. If
          you find a vulnerability, please do not publish it publicly; instead, email security@9278.ai with a
          reproducible PoC. We will acknowledge within 1 business day, triage, and keep you informed of remediation
          progress; with your agreement, we can credit you publicly after the fix ships.
        </li>
      </ul>

      <h2>8. Business Continuity & Disaster Recovery</h2>
      <ul>
        <li>
          <strong>Backup strategy.</strong> Databases are backed up with point-in-time recovery (PITR) and retained
          for a defined rolling window; backups are encrypted and replicated to an off-line / cross-region vault.
        </li>
        <li>
          <strong>Recovery objectives.</strong> Defined RTO and RPO targets for each service tier, with annual
          tabletop and failover exercises.
        </li>
        <li>
          <strong>Resilience.</strong> Stateless application tiers deployed across multiple AZs/edge regions;
          upstream carrier redundancy is your responsibility through the carrier you connect.
        </li>
      </ul>

      <h2>9. Vendor & Sub-Processor Management</h2>
      <ul>
        <li>
          Every significant third-party vendor and sub-processor is assessed for security, privacy, resilience, and
          geographic jurisdiction prior to onboarding, and reviewed at least annually thereafter.
        </li>
        <li>
          The current list of sub-processors is published and maintained at the{" "}
          <Link href="/subprocessors">Sub-Processor List</Link>, with at least 14 days&apos; prior notice of
          material changes.
        </li>
      </ul>

      <h2>10. People & Physical Security</h2>
      <ul>
        <li>
          <strong>Background checks.</strong> All employees and contractors with access to production or customer
          data undergo background screening to the extent permitted by local law prior to onboarding.
        </li>
        <li>
          <strong>Security &amp; privacy training.</strong> Mandatory security awareness and data-protection training
          on hire and at least annually; role-specific training for engineering, support, and legal teams.
        </li>
        <li>
          <strong>Confidentiality.</strong> All personnel are bound by written confidentiality obligations; access
          to facilities (where applicable) uses badge-based access with audit trails and visitor registration.
        </li>
      </ul>

      <h2>11. AI-Specific Safeguards</h2>
      <p>
        Because the platform runs AI voice agents, we also maintain controls specific to AI systems and model
        providers, documented in the <Link href="/ai-disclosure">AI Voice Disclosure &amp; Responsible-AI Policy</Link>.
        Highlights:
      </p>
      <ul>
        <li>Model providers bound by data-protection terms; customer prompts and call content not used to train base models without documented consent.</li>
        <li>Output filtering and safety guardrails configurable by you, with guardrail defaults applied by the platform in sensitive areas (health/financial/legal decisions, harassment, deception).</li>
        <li>Prompt and logging redaction controls (where supported) for sensitive data classes such as payment card numbers and government identifiers within transcripts.</li>
      </ul>

      <h2>12. Audit Requests & Evidence</h2>
      <p>
        Enterprise customers under a signed DPA / BAA and in good standing can request audit evidence such as
        penetration-test reports (redacted), SOC 2 / ISO certification evidence, security questionnaires, and data
        flow diagrams. Please contact <a href="mailto:legal@9278.ai">legal@9278.ai</a> with your request; we
        typically respond within 10 business days under NDA.
      </p>

      <h2>Contact</h2>
      <ul>
        <li><strong>Security:</strong> <a href="mailto:security@9278.ai">security@9278.ai</a> (incidents, vulnerabilities, security research)</li>
        <li><strong>Privacy / DPO:</strong> <a href="mailto:privacy@9278.ai">privacy@9278.ai</a></li>
        <li><strong>Legal / Audit:</strong> <a href="mailto:legal@9278.ai">legal@9278.ai</a></li>
      </ul>
      <p>Ace Peak Invest Pte Ltd (9278.ai), 1 Scotts Road, #24-10, Shaw Centre, Singapore 228208.</p>
    </LegalPage>
  )
}
