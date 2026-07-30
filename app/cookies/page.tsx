import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Cookie Policy",
  description:
    "How 9278.ai uses cookies and similar technologies (localStorage/sessionStorage) across its website and dashboard, the categories used, and how to manage your choices — including GPC and US opt-out.",
  path: "/cookies",
})

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie" accent="Policy." name="Cookie Policy" path="/cookies">
      <p>
        This Cookie Policy explains how 9278.ai uses cookies and similar technologies (including localStorage and
        sessionStorage) on its websites and dashboard. It supports our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>1. What These Technologies Are</h2>
      <p>
        Cookies are small files a website stores in your browser; localStorage/sessionStorage hold small pieces of data.
        They can be first-party or third-party, and session or persistent. Session cookies link your actions in one
        browser session and expire when you close the browser. Persistent cookies remain on your device for a set period
        or until you delete them, and are used to remember preferences across visits.
      </p>

      <h2>2. Categories We Use</h2>
      <ul>
        <li>
          <strong>Strictly necessary</strong> — sign-in/session, security, load balancing, and remembering your cookie
          choice. Consent not required.
        </li>
        <li>
          <strong>Functional</strong> — remember preferences such as language or region. Consent where required.
        </li>
        <li>
          <strong>Analytics</strong> — understand usage (e.g. privacy-friendly product analytics), only where enabled.
          Consent in the EU/UK/Brazil.
        </li>
        <li>
          <strong>Marketing</strong> — advertising/retargeting pixels, only if and where enabled. Consent / US opt-out.
        </li>
      </ul>

      <h2>3. Managing Cookies</h2>
      <p>
        Where non-essential cookies are used, you can accept or refuse them via our consent banner and change your choice
        anytime; US users can opt out of sale/share and we honour Global Privacy Control (GPC). You can also delete or
        block cookies in your browser settings — most browsers include a private browsing mode that does not retain
        cookies, and you can manage cookie preferences in your browser&apos;s user settings. Under EU/UK ePrivacy and
        Brazil&apos;s LGPD, non-essential cookies load only after consent. Jurisdiction-specific consent rules (UK PECR
        / TPS/CTPS, Australia Spam Act, Singapore PDPA DNC, Canada CASL, India DPDP, and others) are further detailed in
        the <Link href="/country-requirements">Country-Specific Requirements</Link> page.
      </p>
      <p>
        When you opt in to our service or marketing programs, personal data you provide may be associated with
        previously anonymized tracking data to help us understand how users interact with our site and improve the
        Services. We do not share personal information with outside parties for commercial purposes unrelated to our
        business without your express permission.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        Third-party cookies may be placed by advertising platforms or analytics providers to deliver and measure ads,
        or to understand site usage. These are loaded only where you have consented (or where permitted without consent
        in your jurisdiction). For details on how we handle personal data collected via cookies, see our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Contact</h2>
      <ul>
        <li><strong>Privacy:</strong> <a href="mailto:privacy@9278.ai">privacy@9278.ai</a></li>
      </ul>
      <p>Ace Peak Invest Pte Ltd (9278.ai), 1 Scotts Road, #24-10, Shaw Centre, Singapore 228208.</p>
    </LegalPage>
  )
}
