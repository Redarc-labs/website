import './index.css'
import { useEffect, useState } from 'react'
import logoUrl from './assets/logo.svg'

/* ─── SVG Icons ───────────────────────────────────────────────────────── */
const ArrowUpRight = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12L12 2M12 2H5M12 2v7" />
  </svg>
)
const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

/* ─── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Publications', href: '#publications' },
    { label: 'Research', href: '#research' },
    { label: 'About', href: '#about' },
    { label: 'Team', href: '#team' },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 border-b ${solid ? 'nav-solid' : 'border-transparent bg-white/0'}`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-14">
          {/* Logo — SVG renders dark-on-white natively; no filter needed in light mode */}
          <a href="#" aria-label="Redarc Labs" className="flex items-center">
            <img
              src="/redarc_labs_logo_white.svg"
              alt="Redarc Labs"
              className="h-7 w-auto"
              style={{ display: 'block' }}
            />
          </a>

          <ul className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="nav-a">{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:hello@redarclabs.com"
              className="btn btn-ink"
            >
              Contact
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5"
            aria-label="Toggle menu"
            onClick={() => setOpen(o => !o)}
            style={{ color: 'var(--color-ink)' }}
          >
            <svg viewBox="0 0 18 14" className="w-5 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              {open ? (
                <>
                  <path d="M1 1l16 12M17 1L1 13" />
                </>
              ) : (
                <>
                  <line x1="0" y1="2" x2="18" y2="2" />
                  <line x1="0" y1="7" x2="18" y2="7" />
                  <line x1="0" y1="12" x2="18" y2="12" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${open ? 'max-h-72' : 'max-h-0'}`}
        style={{ background: 'var(--color-paper)', borderTop: open ? '1px solid var(--color-rule)' : 'none' }}
      >
        <div className="container-site py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-a py-1 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="mailto:hello@redarclabs.com" className="btn btn-ink w-fit mt-1">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      style={{
        background: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-rule)',
        paddingTop: '4.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* Side-by-side: logo left, text right */}
        <div
          className="appear"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '3rem',
            alignItems: 'center',
            paddingTop: '2rem',
            paddingBottom: '3.5rem',
          }}
        >
          {/* Left — full logo with yantra + wordmark + taglines */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={logoUrl}
              alt="Redarc Labs"
              style={{
                display: 'block',
                height: 'clamp(240px, 28vw, 380px)',
                width: 'auto',
              }}
            />
          </div>

          {/* Right — headline + sub + cta */}
          <div>
            <p
              className="appear appear-1"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 500,
                letterSpacing: '0.11em',
                textTransform: 'uppercase',
                color: 'var(--color-red)',
                lineHeight: 1.8,
                margin: '0 0 1.25rem 0',
              }}
            >
              AI Safety Research · Pre-incorporation · New Delhi · 2026
            </p>

            <h1
              className="appear appear-2"
              style={{
                fontSize: 'clamp(1.625rem, 3vw, 2.625rem)',
                fontWeight: 360,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: 'var(--color-ink)',
                marginBottom: '0.875rem',
                maxWidth: '22ch',
              }}
            >
              Mechanistic interpretability
              under adversarial conditions.
            </h1>

            <p
              className="appear appear-3"
              style={{
                fontSize: '1.0625rem',
                color: 'var(--color-red)',
                fontWeight: 440,
                letterSpacing: '-0.02em',
                lineHeight: 1.45,
                marginBottom: '0.5rem',
                maxWidth: '38ch',
              }}
            >
              The only conditions that matter for safety are adversarial ones.
            </p>

            <p
              className="appear appear-3"
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-ink-sec)',
                lineHeight: 1.7,
                maxWidth: '46ch',
                marginBottom: '1.75rem',
              }}
            >
              We build interpretability and evaluation tools for frontier AI
              designed to work when models are actively non-cooperative.
            </p>

            <div className="flex flex-wrap gap-2.5 appear appear-4">
              <a href="#publications" className="btn btn-ink">Publications</a>
              <a href="#research" className="btn btn-wire">Ongoing work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Publications ────────────────────────────────────────────────────── */
function Publications() {
  const pubs = [
    {
      year: '2026',
      venue: 'GenBio Workshop · ICML 2026',
      title: 'Toxin Feature Hierarchy in ESM-2',
      authors: 'Shivam Dubey, Manan Wadhwa',
      href: 'https://openreview.net/pdf?id=Nb3y9BzCOi',
      tags: ['Workshop Paper', 'Protein LM', 'ICML'],
    },
    {
      year: '2025',
      venue: 'Reliable ML from Unreliable Data · NeurIPS 2025',
      title: 'Fourier Gradient Regularisation for Adversarial Robustness',
      authors: 'Shivam Dubey',
      href: 'https://neurips.cc/virtual/2025/loc/san-diego/125208',
      tags: ['Workshop Poster', 'Adversarial Robustness', 'NeurIPS'],
      note: '2× adversarial robustness on ResNet-18 at comparable accuracy.',
    },
  ]

  return (
    <section
      id="publications"
      className="sec"
      style={{ background: 'var(--color-paper-warm)', borderBottom: '1px solid var(--color-rule)' }}
    >
      <div className="container-site">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          {/* Left — label + heading stacked */}
          <div style={{ paddingTop: '0.125rem' }}>
            <span className="eyebrow">Publications</span>
            <p className="h2" style={{ margin: 0, lineHeight: 1.2 }}>Published work</p>
          </div>

          {/* Right — pub list */}
          <div>
            {pubs.map((p, i) => (
              <div
                key={i}
                style={{
                  paddingBlock: '1.5rem',
                  borderTop: '1px solid var(--color-rule)',
                  ...(i === pubs.length - 1 && { borderBottom: '1px solid var(--color-rule)' }),
                }}
              >
                {/* Venue + year */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '0.06em' }}>{p.year}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-ink-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.venue}</span>
                </div>
                <h3 className="h3" style={{ marginBottom: '0.3rem' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginBottom: '0.625rem', letterSpacing: '0.01em' }}>
                  {p.authors}
                </p>
                {p.note && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-sec)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                    {p.note}
                  </p>
                )}
                <div className="flex flex-wrap gap-2" style={{ marginBottom: '0.75rem' }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-rule-strong)',
                      paddingBottom: '1px',
                      transition: 'border-color 120ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-ink)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-rule-strong)')}
                  >
                    Read paper <ArrowUpRight />
                  </a>
                ) : (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
                    Link forthcoming
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Ongoing Research ────────────────────────────────────────────────── */
function Research() {
  const repos = [
    {
      tag: 'Mechanistic interpretability',
      title: 'Attractor Framework',
      desc: 'Attractor dynamics in neural network activation space as a structural lens for stable internal states. Connects to deceptive alignment by characterising which attractor basins are reachable under adversarial pressure.',
      href: 'https://github.com/punctualprocrastinator/Attractor-Framework',
    },
    {
      tag: 'Deflection vectors',
      title: 'Thinking Model Emotions',
      desc: 'Characterising functional emotion representations in chain-of-thought reasoning models. Extends Anthropic\'s 2026 "Biology of a Large Language Model" — the appendix deflection vector finding, left uncharacterised.',
      href: 'https://github.com/punctualprocrastinator/thinking-model-emotions',
    },
    {
      tag: 'Refusal circuits',
      title: 'Bipolar Defense',
      desc: 'Adversarial robustness testing of refusal circuits. Beginning with the Layer 25 antagonism result in Qwen2.5-7B; expanding to a cross-architecture taxonomy across four 7B-class models using path patching.',
      href: 'https://github.com/punctualprocrastinator/bipolar_defense_repo',
    },
  ]

  const directions = [
    {
      id: 'D1',
      title: 'Cross-architecture refusal circuit taxonomy',
      body: 'Path patching across Llama-3-8B, Mistral-7B, Phi-3-mini, DeepSeek-R1-Distill-7B. Target: 4×4 attack × architecture vulnerability matrix. Baseline from bipolar_defense_repo.',
    },
    {
      id: 'D2',
      title: 'Adversarially robust sparse autoencoders',
      body: 'Fourier Gradient Regularisation applied to SAE training. Hypothesis: spectral regularisation stabilises feature geometry under FGSM and PGD perturbation. No prior paper has measured SAE adversarial fragility.',
    },
    {
      id: 'D3',
      title: 'Pre-commitment probe',
      body: 'AUC 0.780 on OLMo-3-7B-Think, 596 traces. Models encode final answers before any reasoning token. Internal emotion states decouple from expressed reasoning (cross-lingual p = 0.0017). Activation-level successor to Lanham et al. 2023.',
    },
    {
      id: 'D4',
      title: 'Emotion deflection vectors',
      body: 'Extraction and causal validation of activation patterns that fire when internal emotional state is present but suppressed from output. The proposed mechanistic signal for sandbagging and alignment faking without scratchpad access.',
    },
  ]

  return (
    <section
      id="research"
      className="sec"
      style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)' }}
    >
      <div className="container-site">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          {/* Left — label + heading stacked */}
          <div>
            <span className="eyebrow">Ongoing work</span>
            <p className="h2" style={{ margin: '0 0 2rem 0', lineHeight: 1.2 }}>Repositories</p>

            {/* Directions label below on desktop */}
            <span className="eyebrow" style={{ marginTop: '0', display: 'none' }}>Directions</span>
          </div>

          {/* Right — repos + directions */}
          <div>
            <div className="flex flex-col gap-2.5" style={{ marginBottom: '3rem' }}>
              {repos.map(r => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-row group"
                >
                  <div style={{ paddingTop: '2px', color: 'var(--color-ink-faint)', flexShrink: 0, transition: 'color 120ms' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                  >
                    <GithubIcon />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                      <span className="h3" style={{ fontSize: '0.9375rem' }}>{r.title}</span>
                      <span className="tag">{r.tag}</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-sec)', lineHeight: 1.6, margin: 0 }}>
                      {r.desc}
                    </p>
                  </div>
                  <div
                    style={{ color: 'var(--color-ink-faint)', flexShrink: 0, alignSelf: 'center', transition: 'color 120ms, transform 120ms' }}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>

            {/* Directions sub-heading inline */}
            <p className="eyebrow" style={{ marginBottom: '0' }}>Directions</p>
            <div style={{ borderTop: '1px solid var(--color-rule)' }}>
              {directions.map((d, i) => (
                <div
                  key={d.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5rem 1fr',
                    gap: '0.75rem',
                    paddingBlock: '1.25rem',
                    borderBottom: '1px solid var(--color-rule)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'var(--color-red)',
                      letterSpacing: '0.04em',
                      paddingTop: '0.15rem',
                    }}
                  >
                    {d.id}
                  </span>
                  <div>
                    <p className="h3" style={{ marginBottom: '0.375rem' }}>{d.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-sec)', lineHeight: 1.65, margin: 0 }}>
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── About / Thesis ──────────────────────────────────────────────────── */
function About() {
  const assumptions = [
    {
      n: '01',
      claim: <>Reasoning traces are <span style={{ color: 'var(--color-red)' }}>not</span> honest.</>,
      evidence: 'Pre-commitment probe (AUC 0.780) shows models encode final answers before generating any reasoning token — CoT is post-hoc rationalisation.',
    },
    {
      n: '02',
      claim: <>Models do <span style={{ color: 'var(--color-red)' }}>not</span> reveal capabilities when evaluated.</>,
      evidence: 'Sandbagging — deliberate concealment — occurs in >98% of tested configurations. Standard evaluations operate at the output layer only.',
    },
    {
      n: '03',
      claim: <>Safety behaviours do <span style={{ color: 'var(--color-red)' }}>not</span> generalise to deployment.</>,
      evidence: 'Backdoor triggers survive safety fine-tuning in >70% of configurations. Alignment faking enables compliant training while pursuing different deployment objectives.',
    },
    {
      n: '04',
      claim: <>SAE features are <span style={{ color: 'var(--color-red)' }}>not</span> adversarially stable.</>,
      evidence: 'SAE feature stability under adversarial perturbation — the exact perturbations a deceptively aligned model would induce — has never been measured.',
    },
  ]

  return (
    <section
      id="about"
      className="sec"
      style={{ background: 'var(--color-paper-warm)', borderBottom: '1px solid var(--color-rule)' }}
    >
      <div className="container-site">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          {/* Left — label + heading stacked */}
          <div style={{ paddingTop: '0.125rem' }}>
            <span className="eyebrow">Position</span>
            <p className="h2" style={{ margin: 0, lineHeight: 1.2 }}>Our thesis</p>
          </div>

          {/* Right — content */}
          <div>
            <p className="h2" style={{ maxWidth: '36ch', marginBottom: '0.875rem', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
              Interpretability tools are designed for cooperative models.
            </p>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-ink-sec)',
                lineHeight: 1.7,
                maxWidth: '52ch',
                marginBottom: '2rem',
              }}
            >
              Four foundational assumptions break under adversarial conditions —
              the only conditions that matter for safety.
            </p>

            {/* Assumptions — fact-check list */}
            <div style={{ borderTop: '1px solid var(--color-rule)' }}>
              {assumptions.map((a, i) => (
                <div
                  key={a.n}
                  style={{
                    paddingBlock: '1.25rem',
                    borderBottom: '1px solid var(--color-rule)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: 'var(--color-ink)',
                      margin: '0 0 0.375rem 0',
                      lineHeight: 1.3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        color: 'var(--color-red)',
                        letterSpacing: '0.08em',
                        marginRight: '0.5rem',
                        verticalAlign: 'middle',
                      }}
                    >
                      {a.n}
                    </span>
                    {a.claim}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-ink-sec)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {a.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Team ────────────────────────────────────────────────────────────── */
function Team() {
  const people = [
    {
      name: 'Shivam Dubey',
      role: 'Co-Founder',
      detail: 'BS Data Science, IIT Madras · 2023–2027',
      socials: [
        { label: 'shivam@redarclabs.com', href: 'mailto:shivam@redarclabs.com' },
        { label: 'GitHub', href: 'https://github.com/punctualprocrastinator/' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syntaxsavant/' },
      ],
      items: [
        { label: 'Toxin Feature Hierarchy in ESM-2', meta: 'ICML 2026 GenBio Workshop' },
        { label: 'Fairness-Aware Speculative Decoding (FASD)', meta: 'MIT Technology Review cited · 77% bias reduction at 6% latency overhead' },
        { label: 'Fourier Gradient Regularisation (FGR)', meta: 'NeurIPS 2025 · 2× adversarial robustness on ResNet-18' },
        { label: 'Apart Research fellow', meta: 'Under Jason Hoelscher-Obermaier · accepted TAIS Oxford' },
        { label: 'MARS V Research Fellow', meta: 'Cambridge AI Safety Hub' },
      ],
    },
    {
      name: 'Manan Wadhwa',
      role: 'Co-Founder',
      detail: 'Final year CS undergrad · 2023–2027',
      socials: [
        { label: 'manan@redarclabs.com', href: 'mailto:manan@redarclabs.com' },
        { label: 'GitHub', href: 'https://github.com/Manan-Wadhwa/' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/manan-wadhwa' },
      ],
      items: [
        { label: 'Toxin Feature Hierarchy in ESM-2', meta: 'ICML 2026 GenBio Workshop' },
        { label: 'Getting in SHAPe', meta: 'ACL ARR 2026 · in submission' },
        { label: 'MARS V Research Fellow', meta: 'Cambridge AI Safety Hub' },
        { label: 'Google Summer of Code 2026', meta: 'HumanAI organisation' },
        { label: 'Research Fellow', meta: 'AISI @ Georgia Tech' },
      ],
    },
  ]

  return (
    <section
      id="team"
      className="sec"
      style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)' }}
    >
      <div className="container-site">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <div>
            <span className="eyebrow">Team</span>
            <p className="h2" style={{ margin: 0, lineHeight: 1.2 }}>Founders</p>
          </div>
          <div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start',
              }}
            >
              {people.map(p => (
                <div key={p.name}>
                  <h3
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 560,
                      letterSpacing: '-0.025em',
                      color: 'var(--color-ink)',
                      marginBottom: '0.125rem',
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-red)',
                      fontWeight: 500,
                      marginBottom: '0.125rem',
                    }}
                  >
                    {p.role}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: 'var(--color-ink-muted)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {p.detail}
                  </p>
                  {/* Socials */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {p.socials.map(s => (
                      <a
                        key={s.href}
                        href={s.href}
                        target={s.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          color: 'var(--color-ink-sec)',
                          textDecoration: 'none',
                          border: '1px solid var(--color-rule-strong)',
                          borderRadius: '2px',
                          padding: '0.15rem 0.45rem',
                          transition: 'border-color 120ms, color 120ms',
                          letterSpacing: '0.04em',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-red)'; e.currentTarget.style.color = 'var(--color-red)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-rule-strong)'; e.currentTarget.style.color = 'var(--color-ink-sec)'; }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-rule)' }}>
                    {p.items.map((it, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.625rem 0',
                          borderBottom: '1px solid var(--color-rule)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            color: 'var(--color-ink)',
                            marginBottom: '0.125rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {it.label}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.625rem',
                            color: 'var(--color-ink-muted)',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {it.meta}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Landscape ───────────────────────────────────────────────────────── */
function Landscape() {
  const orgs = [
    { name: 'Redarc Labs', adv: true, mech: true, dec: true, stage: 'Pre-incorporation', self: true },
    { name: 'Gray Swan AI', adv: true, mech: false, dec: 'Behavioural', stage: 'Seed · $5.5M' },
    { name: 'Apollo Research', adv: 'Partial', mech: 'Partial', dec: true, stage: 'PBC' },
    { name: 'METR', adv: false, mech: false, dec: 'Output-only', stage: 'Nonprofit' },
    { name: 'Goodfire', adv: false, mech: true, dec: false, stage: 'Series B · $207M' },
    { name: 'Redwood Research', adv: false, mech: true, dec: 'Partial', stage: 'Nonprofit' },
  ]

  const Pip = ({ v }: { v: boolean | string }) => {
    if (v === true) return <span style={{ color: 'var(--color-red)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>✓</span>
    if (v === false) return <span style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>—</span>
    return <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-ink-muted)', letterSpacing: '0.03em' }}>{v}</span>
  }

  return (
    <section
      className="sec"
      style={{ background: 'var(--color-paper-warm)', borderBottom: '1px solid var(--color-rule)' }}
    >
      <div className="container-site">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <div>
            <span className="eyebrow">Landscape</span>
            <p className="h2" style={{ margin: 0, lineHeight: 1.2 }}>The intersection nobody occupies</p>
          </div>
          <div>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-ink-sec)',
                lineHeight: 1.7,
                maxWidth: '54ch',
                marginBottom: '2.5rem',
              }}
            >
              Adversarial ML, mechanistic interpretability, and activation-level
              deception detection each have dedicated organisations. Their
              intersection does not.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-rule-strong)' }}>
                    {['Organisation', 'Adversarial', 'Mechanistic', 'Deception detection', 'Stage'].map(h => (
                      <th
                        key={h}
                        style={{
                          textAlign: h === 'Organisation' || h === 'Stage' ? 'left' : 'center',
                          padding: '0.625rem 1rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-ink-muted)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orgs.map((o, i) => (
                    <tr
                      key={o.name}
                      style={{
                        borderBottom: i < orgs.length - 1 ? '1px solid var(--color-rule)' : 'none',
                        background: o.self ? 'rgba(184,50,40,0.03)' : 'transparent',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.75rem 1rem',
                          fontWeight: o.self ? 600 : 450,
                          color: o.self ? 'var(--color-red)' : 'var(--color-ink)',
                          letterSpacing: '-0.01em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {o.name}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}><Pip v={o.adv} /></td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}><Pip v={o.mech} /></td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}><Pip v={o.dec} /></td>
                      <td
                        style={{
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.625rem',
                          color: 'var(--color-ink-muted)',
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {o.stage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  const col1 = [
    { label: 'Toxin Feature Hierarchy — ICML 2026', href: 'https://openreview.net/pdf?id=Nb3y9BzCOi' },
    { label: 'Attractor Framework', href: 'https://github.com/punctualprocrastinator/Attractor-Framework' },
    { label: 'Thinking Model Emotions', href: 'https://github.com/punctualprocrastinator/thinking-model-emotions' },
    { label: 'Bipolar Defense', href: 'https://github.com/punctualprocrastinator/bipolar_defense_repo' },
  ]

  return (
    <footer style={{ background: 'var(--color-soot)', borderTop: '1px solid var(--color-soot-rule)' }}>
      <div className="container-site py-12 md:py-16">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <img
              src={logoUrl}
              alt="Redarc Labs"
              style={{
                display: 'block',
                height: '8rem',
                width: 'auto',
                marginBottom: '1.25rem',
                filter: 'brightness(0) invert(1)',
              }}
            />

          </div>

          {/* Research links */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: '1rem',
              }}
            >
              Work
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {col1.map(l => (
                <li key={l.href} style={{ marginBottom: '0.625rem' }}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      transition: 'color 120ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: '1rem',
              }}
            >
              Contact
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <li>
                <a
                  href="mailto:hello@redarclabs.com"
                  style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 120ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  hello@redarclabs.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/redarc-labs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                  style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 120ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-soot-rule)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            Redarc Labs · Where the safety layer holds
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a
              href="mailto:hello@redarclabs.com"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5875rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: 'color 120ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
            >hello@redarclabs.com</a>
            <a
              href="https://www.linkedin.com/company/redarc-labs/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5875rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: 'color 120ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
            >redarclabs.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Publications />
        <Research />
        <Team />
        <Landscape />
      </main>
      <Footer />
    </>
  )
}
