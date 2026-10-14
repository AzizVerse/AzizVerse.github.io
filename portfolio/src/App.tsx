import { useEffect, useRef, useState, type ReactNode } from 'react';
import { profile, projects, experience, earlyWork, education, type Project } from './content';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function SectionHeading({ number, label, title, children }: { number: string; label: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number}</span> {label}</p><h2>{title}</h2></div>{children && <p className="section-intro">{children}</p>}</div>;
}
function Modal({ title, onClose, children, className = '' }: { title: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`modal ${className}`} aria-labelledby="modal-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose(); } }}>
    <div className="modal-top"><span className="eyebrow">{profile.brand} / Introduction</span><button className="icon-button" onClick={onClose} aria-label="Close dialog">×</button></div>
    <h2 id="modal-title">{title}</h2>{children}
  </dialog>;
}
function ProjectArt({ id }: { id: string }) {
  if (id === 'spendyway') return <div className="project-art spendyway-art discreet-art">
    <span className="art-label">FINANCIAL TECHNOLOGY</span>
    <span className="venture-monogram">Sw<span>.</span></span>
    <div className="venture-orbit" aria-hidden="true"/>
    <span className="art-footnote">SpendyWay / In development</span>
  </div>;
  if (id === 'barmarket') return <div className="project-art market-art">
    <span className="art-label">BUSINESS TECHNOLOGY</span>
    <span className="venture-monogram">Mb<span>.</span></span><div className="venture-orbit" aria-hidden="true"/>
    <span className="art-footnote">MarketBeat / In development</span>
  </div>;
  return <div className="project-art vestia-art"><span className="art-label">CREATIVE TECHNOLOGY</span>
    <svg viewBox="0 0 400 300" role="img" aria-label="Abstract sculptural ribbon representing fashion and creativity">
      <defs><linearGradient id="fabric" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#fff0df"/><stop offset=".45" stopColor="#ce8c73"/><stop offset=".8" stopColor="#f1c3a2"/><stop offset="1" stopColor="#7f493c"/></linearGradient></defs>
      <path d="M260 12 C90 42 330 128 140 166 C50 184 85 268 200 292 C112 199 370 214 288 136 C205 58 331 46 260 12Z" fill="url(#fabric)"/>
      <path d="M260 12 C208 57 293 126 193 164 C129 186 156 248 200 292" fill="none" stroke="#fff3df" strokeOpacity=".5"/>
    </svg><span className="vestia-word">vestia</span><span className="art-footnote">Vestia / Exploratory</span></div>;
}
function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return <Modal title={project.name} onClose={onClose}>
    <p className="case-category">{project.category} <span>· {project.stage}</span></p>
    <p className="case-lead">{project.description}</p><ProjectArt id={project.id}/>
    <div className="case-grid"><div><h3>My involvement</h3><p>{project.role}</p></div><div><h3>Continue the conversation</h3><p>Interested in the work or a potential collaboration? I’d be happy to talk directly.</p></div></div>
    <a className="button primary" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's discuss ${project.name}`)}`}>Let’s discuss <Arrow/></a>
  </Modal>;
}
function SharePanel({ onClose }: { onClose: () => void }) {
  const [qr, setQr] = useState('');
  const [status, setStatus] = useState('');
  const [qrError, setQrError] = useState(false);
  const url = profile.siteUrl || `${window.location.origin}${window.location.pathname}`;
  const local = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) && !profile.siteUrl;
  useEffect(() => {
    let active = true;
    import('qrcode').then(module => module.toDataURL(url, { width: 600, margin: 3, errorCorrectionLevel: 'M', color: { dark: '#101211', light: '#ffffff' } })).then(data => { if (active) setQr(data); }).catch(() => { if (active) setQrError(true); });
    return () => { active = false; };
  }, [url]);
  async function copy() {
    try { await navigator.clipboard.writeText(url); setStatus('Portfolio link copied.'); } catch { setStatus('Select and copy the address below.'); }
  }
  async function share() {
    if (!navigator.share) return copy();
    setStatus('Choose an app to share, or use Copy link.');
    try {
      await navigator.share({ title: `${profile.brand} — ${profile.name}`, text: profile.role, url });
      setStatus('Portfolio shared.');
    } catch (error) {
      setStatus(error instanceof DOMException && error.name === 'AbortError' ? 'Sharing cancelled. You can still copy the link.' : 'Sharing is unavailable. Use Copy link instead.');
    }
  }
  function saveContact() {
    const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
    const card = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Ben Mahmoud;Aziz;;;', `FN:${escape(profile.name)}`, `TITLE:${escape(profile.role)}`, `EMAIL:${escape(profile.email)}`, `URL:${escape(url)}`, 'END:VCARD'].join('\r\n');
    const href = URL.createObjectURL(new Blob([card], { type: 'text/vcard;charset=utf-8' }));
    const link = document.createElement('a'); link.href = href; link.download = 'Aziz-Ben-Mahmoud.vcf'; link.click(); setTimeout(() => URL.revokeObjectURL(href), 1000); setStatus('Contact card downloaded.');
  }
  return <Modal title="Good conversations start here." onClose={onClose} className="share-modal">
    <p>Scan to explore my work. Keep in touch to continue the conversation.</p>
    <div className="qr-frame">{qr ? <img src={qr} width="240" height="240" alt={`QR code linking to this ${profile.brand} portfolio`}/> : <p>{qrError ? 'QR unavailable. Use the link below.' : 'Preparing QR code…'}</p>}</div>
    {local && <p className="preview-note">Local preview: this QR opens on this computer only. A shareable event QR becomes available after deployment.</p>}
    <label className="url-label" htmlFor="share-url">Portfolio address</label><input id="share-url" className="share-url" value={url} readOnly onFocus={e => e.target.select()}/>
    <div className="share-actions"><button className="button primary" onClick={copy}>Copy link <span aria-hidden="true">⧉</span></button><button className="button secondary" onClick={share}>Share portfolio <Arrow/></button></div>
    <button className="button contact-card" onClick={saveContact}>Save contact card <span aria-hidden="true">↓</span></button>
    <p className="status" role="status">{status}</p><a className="text-link" href={`mailto:${profile.email}`}>Send me an email <Arrow/></a>
  </Modal>;
}
export default function App() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [sharing, setSharing] = useState(false);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap"><a className="brand" href="#home" aria-label={`${profile.brand} home`}><img className="brand-logo" src="./assets/abm-logo.svg" alt="" width="60" height="30"/>{profile.brand}<span className="brand-dot">.</span></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Connect <Arrow/></a></nav>
      <button className="header-share" onClick={() => setSharing(true)}>Share profile <Arrow/></button>
    </header>
    <main id="main">
      <section id="home" className="hero wrap">
        <div className="hero-copy"><p className="eyebrow location"><span className="location-dot"/> Based in {profile.location} <span className="hero-year">/ 2026</span></p>
          <p className="hero-name">{profile.name}</p><p className="hero-role">{profile.role}</p>
          <h1>Turning <em>imagination</em> into technology that solves real problems<span className="accent">.</span></h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a><a className="button secondary" href="#contact">Let’s connect <Arrow/></a></div>
        </div>
        <div className="hero-identity" aria-label="Aziz Ben Mahmoud personal identity"><span className="identity-top">AZIZ / BEN MAHMOUD</span>
          {profile.portrait ? <img src={profile.portrait} alt="Aziz Ben Mahmoud"/> : <><div className="identity-orbit orbit-one"/><div className="identity-orbit orbit-two"/><img className="identity-logo" src="./assets/abm-logo.svg" alt="Refined ABM monogram" width="920" height="450"/><span className="identity-caption">An idea is only the beginning.</span></>}
          <div className="identity-bottom"><span>ENGINEER.<br/>FOUNDER. EXPLORER.</span><span className="portrait-note">{profile.portrait ? 'Aziz Ben Mahmoud' : 'ABM / Personal mark'}</span></div>
        </div>
        <div className="hero-strip"><span>Built on curiosity. Grounded in engineering.</span><span>FinTech <span aria-hidden="true">/</span> AI <span aria-hidden="true">/</span> Product</span></div>
      </section>
      <section id="work" className="work-section wrap">
        <SectionHeading number="01" label="Selected ventures" title="A glimpse of my work.">A few things I’m building. The fuller story starts with a conversation.</SectionHeading>
        <div className="project-grid">{projects.map((project, index) => <article className={`project-card ${project.id} ${index === 0 ? 'featured' : ''}`} key={project.id}>
          <ProjectArt id={project.id}/><div className="project-copy"><div className="project-meta"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><span className="stage">{project.stage}</span></div>
            <h3>{project.name}<span className="project-punctuation">{index === 0 ? '↗' : '.'}</span></h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p>
            <button className="project-link" onClick={() => setSelected(project)} aria-label={`About ${project.name}`}>A brief introduction <Arrow/></button>
          </div></article>)}</div>
        <p className="work-note">Open to thoughtful conversations with investors, partners, and collaborators.</p>
      </section>
      <section id="experience" className="experience-section wrap">
        <SectionHeading number="02" label="Experience" title="Where the work gets real.">Financial systems, intelligent workflows, and helping others grow.</SectionHeading>
        <div className="experience-list">{experience.map((item, index) => <article className="experience-row" key={item.company}><div className="experience-company"><span className="row-number">0{index + 1}</span><h3>{item.company}</h3><p>{item.context}</p></div><div className="experience-copy"><h4>{item.role}</h4><p>{item.description}</p><ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}</div>
      </section>
      <section id="about" className="about-section wrap"><SectionHeading number="03" label="The person behind the work" title="Curiosity is the through-line."/>
        <div className="philosophy"><span className="quote-mark" aria-hidden="true">“</span><blockquote>{profile.philosophy}</blockquote><p>I’m interested in the places where disciplines meet — finance and software, intelligence and creativity, a difficult question and a practical answer.</p><span className="signature">Aziz Ben Mahmoud <span aria-hidden="true">↗</span></span></div>
        <div className="education"><h3>An engineering foundation.</h3>{education.map(item => <article key={item.school}><span className="timeline-dot"/><div><h4>{item.school}</h4><p className="degree">{item.degree}</p><p>{item.focus}</p></div></article>)}</div>
      </section>
      <section className="early-section wrap"><SectionHeading number="04" label="Earlier explorations" title="Every build taught me something.">Academic and exploratory projects that shaped the way I approach problems.</SectionHeading>
        <div className="early-list">{earlyWork.map((item, index) => <article key={item.name}><span className="row-number">0{index + 1}</span><h3>{item.name}</h3><p>{item.text}</p><span className="early-category">{item.category}</span></article>)}</div>
      </section>
      <section id="contact" className="contact-section wrap"><div className="contact-panel"><p className="eyebrow">05 / Let’s connect</p><h2>Have an idea<br/>worth <em>exploring?</em></h2><p>I’m always interested in meaningful conversations, ambitious ideas, and opportunities to build something useful.</p><div className="contact-audience"><span>Founders</span><span>Investors</span><span>Collaborators</span><span>Curious minds</span></div><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>Start a conversation <Arrow/></a><button className="button secondary" onClick={() => setSharing(true)}>Share / save contact <Arrow/></button></div><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <div className="social-row"><span>Find me elsewhere</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow/></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow/></a><a href="#home">Back to top ↑</a></div>
      </section>
    </main><footer className="wrap site-footer"><span>© 2026 {profile.brand}</span><span>Made with intention, in Tunisia.</span></footer>
    <nav className="mobile-nav" aria-label="Quick navigation"><a href="#home">Intro</a><a href="#work">Work</a><a href="#contact">Connect</a><button onClick={() => setSharing(true)}>Share <Arrow/></button></nav>
    {selected && <CaseStudy project={selected} onClose={() => setSelected(null)}/>}{sharing && <SharePanel onClose={() => setSharing(false)}/>}
  </>;
}
