import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Acceptable Use Policy",
  description:
    "The rules for using 9278.ai AI voice agents lawfully — calling and texting compliance (TCPA, CAN-SPAM, 10DLC, STIR/SHAKEN, ePrivacy), AI-voice disclosure, recording consent, and prohibited conduct.",
  path: "/acceptable-use",
})

export default function AcceptableUsePage() {
  return (
    <LegalPage title="Acceptable Use" accent="Policy." name="Acceptable Use Policy" path="/acceptable-use">
      <p>
        This Acceptable Use Policy (&ldquo;AUP&rdquo;) is part of the <Link href="/terms">Master Services Agreement</Link>.
        It applies to you, your users, and any AI agent you configure. Breach can lead to suspension or termination
        without refund and to reporting where the law requires. Examples below are not exhaustive.
      </p>

      <h2>1. Definitions</h2>
      <ul>
        <li>
          <strong>Robocall / robotext</strong> — a call or message made with an automatic dialing system,
          prerecorded/artificial voice, or AI-generated voice/text, without the consent required by law.
        </li>
        <li>
          <strong>Spam</strong> — unsolicited commercial messaging in bulk or without consent, breaching anti-spam or
          telemarketing law.
        </li>
        <li>
          <strong>AI-generated content</strong> — voice, text, or audio produced or materially altered by AI, including
          voice cloning and deepfake audio.
        </li>
      </ul>

      <h2>2. Calling and Texting Rules</h2>
        <p>
          You and your users must follow the laws governing calls and messages in every jurisdiction you contact. You must
          not:
        </p>
        <ul>
          <li>
            make illegal robocalls/robotexts or use autodialing, predictive dialing, or prerecorded/AI voice where
            forbidden or without the consent required (e.g. US TCPA and the FCC&apos;s 2024 ruling that AI-voice calls
            require TCPA consent);
          </li>
          <li>
            conduct telemarketing without required consent, outside permitted calling hours, or to numbers on the US
            National DNC, your internal DNC, or equivalents;
          </li>
          <li>
            breach the US TCPA or CAN-SPAM, mobile-carrier messaging rules, or A2P 10DLC brand/campaign registration;
          </li>
          <li>
            send 10DLC traffic that is designated or could reasonably be expected to be designated as spam, or use the
            Services to transmit unsolicited commercial messaging that could reasonably be expected to provoke
            complaints;
          </li>
          <li>
            in the EU/UK, send marketing calls/messages contrary to the ePrivacy rules (PECR in the UK) without the
            required consent or lawful basis;
          </li>
          <li>
            in Latin America, breach local telemarketing/consumer rules and the LGPD or other privacy laws&apos; consent
            requirements;
          </li>
          <li>
            in India, breach TRAI&apos;s TCCCPR regulations, including failure to use registered commercial numbers
            (160-series), DND/NDNC registry scrubbing, documented consent, or AI-call disclosure requirements;
          </li>
          <li>
            present any voice traffic received from an upstream communications provider or third-party carrier for
            onward transmission (hairpinning, tromboning, or upstream origination) without our explicit prior written
            approval;
          </li>
          <li>spoof or falsify caller ID, or evade caller-ID authentication (STIR/SHAKEN), traceback, or robocall mitigation;</li>
          <li>
            use a 9278.ai-provided numbering resource (numbers in your connected carrier account or numbers provisioned
            by or through us) as the Calling Line Identification (CLI) / ANI in any manner that constitutes fraud,
            deception, or spam — <em>regardless of whether such usage takes place on 9278.ai&apos;s network or on any
            other network</em> (for example, spoofing or fraudulently using a 9278.ai-connected CLI on a third-party
            network);
          </li>
          <li>
            fail to register with the FCC Robocall Mitigation Database or comply with STIR/SHAKEN where you act as a voice
            service provider, gateway provider, or intermediate provider under US law;
          </li>
          <li>
            fail to respond promptly and in good faith to traceback requests from USTelecom&apos;s Industry Traceback Group
            or equivalent authorized administrators;
          </li>
          <li>
            fail to honour opt-out/STOP requests promptly, or keep inaccurate consent/DNC records;
          </li>
          <li>
            make repetitive or continuous calls or messages to the same destination or number when such activity could
            reasonably be expected to provoke complaints;
          </li>
          <li>
            initiate outbound calls that are abandoned — i.e. terminated before being answered by the called party or
            an automated system — in excess of thresholds defined by us from time to time, or in excess of applicable
            regulatory limits (for example, the current FCC 3% abandonment rate for US telemarketing);
          </li>
          <li>
            exceed any calls-per-second (&ldquo;CPS&rdquo;), SMS-per-second, or session throughput threshold set out in
            your documentation or communicated to you. We may enforce rate limits or drop traffic that exceeds defined
            CPS thresholds without prior notice;
          </li>
          <li>
            use call services in a manner that does not consist of uninterrupted live human or AI-voice dialog by and
            between natural persons or an AI agent and a natural person (for example, services consisting primarily of
            music-on-hold, silence, tone generation, or data-in-band signalling are prohibited); or
          </li>
          <li>
            operate long-duration calls, defined for these purposes as calls to the same number in excess of four (4)
            continuous or cumulative hours within any rolling twenty-four (24) hour period, or place calls to specific
            numbers or destinations for the purpose of generating charges, access fees, or revenue shares for or with a
            third party.
          </li>
        </ul>

      <h2>3. AI Voice — Disclosure and Conduct</h2>
      <p>
        Your AI agent must clearly disclose to callers that they are interacting with an automated/AI system, not a
        human, and (where calls are recorded) that the call is recorded. You must not use AI voice to impersonate a
        specific real person or to create deceptive/deepfake audio. See the{" "}
        <Link href="/ai-disclosure">AI Voice Disclosure &amp; Responsible-AI Policy</Link>. The US FCC treats AI-voice
        robocalls as subject to TCPA consent and the FTC prohibits deceptive AI voice; the EU AI Act requires disclosure
        of AI interactions and AI-generated content.
      </p>

      <h2>4. Recording and Monitoring — Your Responsibility</h2>
      <p>
        The platform can record and monitor calls and transcribe interactions. You must obtain every consent and give
        every notice the law requires (US federal one-party consent, but many states require all-party consent; EU/UK
        GDPR; LATAM national laws). See the <Link href="/recording-notice">Recording &amp; Monitoring Notice</Link>.
        Unlawful recording can be a criminal offence.
      </p>

      <h2>5. Prohibited Content and Conduct</h2>
        <p>You must not use the Services to:</p>
        <ul>
          <li>harass, threaten, defraud, deceive, or impersonate any person or organisation;</li>
          <li>
            falsify User, account, or other identifying information provided to 9278.ai or to other users of the
            Services, including but not limited to through the use of synthetic, cloned, simulated, or AI-generated
            voice, identity, persona, or biometric content that misrepresents your true identity or the identity of
            any natural person or entity;
          </li>
          <li>
            use any Services for the purposes of engaging in an activity in connection or conjunction with any
            pornographic and/or adult entertainment industry purpose, regardless of whether such activity is
            lawfully permitted in the relevant jurisdiction;
          </li>
          <li>distribute malware, run phishing/vishing/scams, or attempt unauthorised access to any system;</li>
          <li>
            without the prior written permission of the owner or operator of a system or network, do any of the
            following: (a) access the system or network; (b) monitor data or traffic on the system or network;
            (c) probe, scan, or test firewalls, intrusion-detection systems, or other security controls;
            (d) test the vulnerability of a system or network; or (e) breach, bypass, or circumvent any security
            or authentication routines of a system or network;
          </li>
          <li>
            transmit unlawful content, content that sexually exploits or endangers children, or incitement to violence or
            unlawful discrimination;
          </li>
          <li>misuse personal data obtained through the Services incompatibly with the purpose collected;</li>
          <li>evade lawful interception, sanctions, or export controls, or contact destinations you are barred from contacting.</li>
          <li>
            acquire or retain telephone numbers, DIDs, or other numbering resources (&ldquo;Numbers&rdquo;) with the
            intent or having the effect of hoarding, warehousing, squatting, or parking such Numbers without active,
            legitimate, documented use. 9278.ai, and/or the connected carrier or numbering administrator acting at
            9278.ai&apos;s request, may, in its sole discretion and without further notice, withdraw, revoke, or replace
            any Numbers that have not been utilised in a legitimate manner within a commercially reasonable period of time;
          </li>
          <li>
            initiate outbound calls that are abandoned (terminated before being answered) in excess of reasonable industry
            thresholds or applicable regulatory limits;
          </li>
          <li>
            use AI voice synthesis or voice cloning to clone or generate a synthetic version of any individual&apos;s
            voice without that individual&apos;s prior express authorization; or to impersonate or misrepresent any
            person or entity; or to engage in fraud, deception, phishing, social engineering, voter suppression,
            interference with elections or political processes, or other unlawful or misleading activity; or to
            violate any right of privacy, publicity, biometric information, intellectual property, or other
            proprietary right; or to circumvent any safeguards, security measures, or compliance controls we have
            implemented;
          </li>
          <li>
            conduct or forward contests, pyramid schemes, multi-level selling programmes, charity requests, or chain
            letters;
          </li>
          <li>
            operate a server in connection with the Services in an &ldquo;open relay&rdquo; configuration — i.e. a
            configuration whereby a call, messaging, or mail server processes messages or calls where neither the
            sender nor the recipient is a local user or account;
          </li>
          <li>
            use an open telephone line as a monitoring, intercom, or always-on listening service, or otherwise
            transmit continuous or extensive audio that does not consist of a legitimate two-party dialog;
          </li>
          <li>
            use continuous or extensive chat-line or conference-call participation, free conference-calling or similar
            services that 9278.ai in its sole discretion deems to participate in traffic stimulation practices or
            schemes that result in excessive charges, access fees, or revenue sharing;
          </li>
          <li>
            interfere with, degrade, or adversely affect the quality or experience of any other 9278.ai customer, user,
            or any other person using or benefiting from the Services or the public Internet; or
          </li>
          <li>
            engage in any of the activities prohibited above by using the services of another provider or a third
            party and channeling, relaying, or tunnelling such activities through an account provided by 9278.ai, or
            otherwise involving the Services or any 9278.ai account in any way (with or without a separate third-
            party provider) for the purpose of facilitating any prohibited conduct.
          </li>
        </ul>

        <h2>5a. Export Controls, Sanctions, and Anti-Bribery</h2>
        <p>
          You must comply with all applicable export control, economic sanctions, embargo, anti-bribery, and
          anti-corruption laws of Singapore, the United States, the European Union, the United Kingdom, and any other
          jurisdiction with authority over you or your use of the Services. In particular, and without limitation:
        </p>
        <ul>
          <li>
            You must not use, export, re-export, disclose, transfer, or provide access to the Services, any software,
            APIs, SDKs, technology, encryption, or data made available by or through the Services to or for the benefit
            of any individual or entity that is, or is owned or controlled by an individual or entity that is:
            (a) the target of sanctions administered or enforced by the U.S. Department of the Treasury&apos;s Office
            of Foreign Assets Control (&ldquo;OFAC&rdquo;), including the List of Specially Designated Nationals and
            Blocked Persons (&ldquo;SDN List&rdquo;), Sectoral Sanctions Identifications (&ldquo;SSI&rdquo;) List,
            and the Foreign Sanctions Evaders (&ldquo;FSE&rdquo;) List; (b) identified on the U.S. Department of
            Commerce&apos;s Entity List, Denied Persons List, or Unverified List; (c) the target of EU, UK,
            Singapore, or UN sanction regimes; or (d) located in a jurisdiction subject to comprehensive territorial
            embargoes or sanctions programmes under any of the above.
          </li>
          <li>
            You represent and warrant that neither you nor any end user of your AI agents is on any of the lists
            described above, and that you will not enable or facilitate any prohibited transfer or activity.
          </li>
          <li>
            You must comply with all applicable anti-bribery and anti-corruption laws, including the United States
            Foreign Corrupt Practices Act (&ldquo;FCPA&rdquo;), the UK Bribery Act 2010, the Singapore Prevention of
            Corruption Act, and the national implementing legislation of the UN Convention Against Corruption
            (UNCAC) in any applicable jurisdiction. In particular, you must not offer, give, promise, authorize,
            request, or accept any bribe, unlawful inducement, kickback, improper payment, or advantage, directly
            or indirectly, for the purpose of influencing any act or decision of a government official or private
            counterparty in order to obtain or retain business or an improper advantage.
          </li>
        </ul>

      <h2>6. Service Integrity and Fraud</h2>
        <p>
          Do not resell except as your plan permits; place artificial, fraudulent, or traffic-pumping traffic (including
          routing calls to premium-rate or high-risk international destinations for toll fraud); share one
          account to evade limits; or degrade the Services for others. 9278.ai runs fraud and toll-fraud monitoring and may
          block suspicious traffic or specific international destinations.
        </p>
        <p>Additionally, you must not:</p>
        <ul>
          <li>
            cause injury to person or property through your use of the Services;
          </li>
          <li>
            violate industry standards or any third-party policies, including the published guidelines of the CTIA
            (Cellular Telecommunications Industry Association), the Mobile Marketing Association, NENA (National
            Emergency Number Association), or any other applicable accepted industry association, carrier guidelines,
            or similar or analogous industry standards or codes of practice in any jurisdiction;
          </li>
          <li>
            post or transmit any information or software that contains a virus, worm, trojan, cancelbot, logic bomb,
            ransomware, backdoor, or other harmful or malicious component;
          </li>
          <li>
            reverse-engineer any of the Services or any material portion thereof except and solely to the extent
            permitted by applicable law notwithstanding this restriction;
          </li>
          <li>
            launch, facilitate, or allow — whether intentionally or unintentionally — a denial-of-service (&ldquo;DoS&rdquo;),
            distributed denial-of-service (&ldquo;DDoS&rdquo;), DNS-spoofing, cache-poisoning, or other hacking,
            hijacking, or availability attack on or against the Services, any other customer, or any third-party
            infrastructure;
          </li>
          <li>
            relay email in an anonymous fashion, forge any TCP/IP packet header, or forge any header information in
            any call, SMS, or email;
          </li>
          <li>
            mailbomb, flood, overload, attack, or otherwise interfere with a system or network;
          </li>
          <li>
            exhibit a persistently low Answer Seizure Ratio (&ldquo;ASR&rdquo;) or Average Call Duration (&ldquo;ACD&rdquo;)
            for your outbound traffic as determined by us in our sole discretion, which may be indicative of
            unsolicited, spam, or fraudulent calling patterns;
          </li>
          <li>
            with respect to any &ldquo;unlimited&rdquo; calling package, credit bundle, or flat-rate plan, engage in
            auto-dialing, continuous or extensive call forwarding, continuous connectivity, fax broadcasting or blasting,
            telemarketing, predictive dialing, or any other use or activity that is inconsistent with normal small- to
            medium-sized business outbound calling usage as reasonably determined by 9278.ai; or
          </li>
          <li>
            restrict or inhibit any other user or any other person from using and enjoying the Services and/or the
            Internet, including by intentional consumption of disproportionate platform or carrier resources.
          </li>
        </ul>

        <h2>6a. Enforcement, Surcharges, and Remedies</h2>
        <p>
          9278.ai reserves the right to enforce, waive, or remedy any actual or suspected violation of this AUP in its
          sole discretion. Remedies may include, without limitation, warning, suspension of all or any portion of the
          Services, filtering or rate-limiting traffic, cancellation of one or more Numbers, immediate termination of
          access, and reporting to carriers, regulators, traceback administrators, or law enforcement.
        </p>
        <p>
          In any instance where 9278.ai permits or waives a violation, 9278.ai may, in its sole discretion, assess
          additional charges or surcharges on your account to offset increased costs, carrier penalties, fines,
          network impact, or administrative burden associated with such violation or waiver. You agree that any such
          surcharges, if imposed, are due and payable immediately upon invoice.
        </p>
        <p>
          IN NO EVENT WILL 9278.ai, ITS AFFILIATES, SUBCONTRACTORS, OR AGENTS BE LIABLE TO CUSTOMER OR ANY THIRD PARTY
          FOR ANY DIRECT, INDIRECT, PUNITIVE, SPECIAL, CONSEQUENTIAL, OR OTHER DAMAGES FOR ACTIONS TAKEN OR NOT TAKEN
          PURSUANT TO THIS AUP, INCLUDING WITHOUT LIMITATION ANY LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF PROGRAMS
          OR DATA, OR OTHERWISE, EVEN IF 9278.ai HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THIS LIMITATION
          IS IN ADDITION TO, AND DOES NOT LIMIT, ANY LIMITATION OF LIABILITY SET FORTH IN THE MASTER SERVICES
          AGREEMENT, THE DPA, OR ANY OTHER APPLICABLE AGREEMENT.
        </p>

      <h2>7. Enforcement</h2>
      <p>
        Report abuse to <a href="mailto:abuse@9278.ai">abuse@9278.ai</a>. 9278.ai may investigate, suspend or terminate
        accounts, block traffic, remove content, and cooperate with carriers, regulators, and law enforcement; for fraud,
        illegal traffic, or safety risks it may act immediately. To appeal, email{" "}
        <a href="mailto:legal@9278.ai">legal@9278.ai</a> with &ldquo;Account Appeal&rdquo;. We may update this AUP on at
        least 30 days&apos; notice for material changes.
      </p>

      <h2>Contact</h2>
      <ul>
        <li><strong>Legal:</strong> <a href="mailto:legal@9278.ai">legal@9278.ai</a></li>
        <li><strong>Privacy:</strong> <a href="mailto:privacy@9278.ai">privacy@9278.ai</a></li>
        <li><strong>Abuse:</strong> <a href="mailto:abuse@9278.ai">abuse@9278.ai</a></li>
        <li><strong>Support:</strong> <a href="mailto:support@9278.ai">support@9278.ai</a></li>
      </ul>
      <p>Ace Peak Invest Pte Ltd (9278.ai), 1 Scotts Road, #24-10, Shaw Centre, Singapore 228208.</p>
    </LegalPage>
  )
}
