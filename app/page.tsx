import ProjectGallery from '@/components/ProjectGallery';
import ThemeControls from '@/components/ThemeControls';
import { projects } from '@/lib/projects';
import SocialIcon from '@/components/SocialIcon';
import SplitText from '@/components/SplitText';
import VariableProximity from '@/components/VariableProximity';
import ElasticMesh from '@/components/ElasticMesh';
import SpotlightCard from '@/components/SpotlightCard';
import ScrollReveal from '@/components/ScrollReveal';
import WarpText from '@/components/WarpText';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/silence.aee' },
  { label: 'YouTube', href: 'https://youtube.com/@silenceamvs' },
  { label: 'Discord', href: 'https://discord.gg/TV2fryB8TY' },
  { label: 'TikTok', href: 'https://tiktok.com/@silencee_amv' },
  { label: 'Kick', href: 'https://kick.com/silenceamv' },
  { label: 'Payhip', href: 'https://payhip.com/Silenceamvs' },
];

export default function HomePage() {
  return <main>
    <ScrollReveal />
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="SILENCE home">S<span>.</span></a>
      <nav className="main-nav" aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <div className="header-actions"><ThemeControls /><a className="header-cta" href="#contact">Let’s talk <span>↗</span></a></div>
    </header>

    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="status-dot" /> INDEPENDENT AMV EDITOR <span className="eyebrow-divider">/</span> MOTION DESIGN</p>
        <h1 className="hero-title"><SplitText text="Silence" effect="rise" delay={55} duration={1.05} trigger="load" mask /><span className="hero-title-second"><SplitText text="is a feeling." effect="rise" delay={36} duration={.9} trigger="load" mask /></span></h1>
        <p className="hero-description" data-reveal>Anime edits, motion graphics and visual experiments shaped by rhythm, atmosphere and impact.</p>
        <div className="hero-actions" data-reveal><a className="button button-primary magnet-button" href="#work">Explore the work <span>↘</span></a><a className="text-link" href="https://payhip.com/Silenceamvs" target="_blank" rel="noopener noreferrer">Project resources <span>↗</span></a></div>
        <div className="hero-footnote" data-reveal><span>AMV / AFTER EFFECTS / 3D</span><span>INDEPENDENT CREATOR</span></div>
      </div>
      <div className="hero-art" data-reveal>
        <div className="art-topline"><span>VISUAL IDENTITY — 001</span><span>EST. IN MOTION</span></div>
        <div className="art-grid"/><div className="art-glow"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
        <div className="hero-profile-wrap"><img src="/images/silence-profile.jpg" alt="SILENCE profile artwork" className="hero-profile"/><span className="profile-index">S / 01</span></div>
        <div className="art-label label-bottom">LESS NOISE. MORE IMPACT.</div><span className="art-cross">+</span>
        <div className="hero-art-side">AMV / VISUAL STUDIES / CREATIVE CUTS</div>
      </div>
      <a className="scroll-cue" href="#work"><span/>SCROLL TO EXPLORE <span className="scroll-cue-arrow">↓</span></a>
    </section>

    <div className="marquee-band" aria-label="Creative disciplines"><div className="marquee-track"><span>ANIME MUSIC VIDEOS</span><i>✳</i><span>MOTION DESIGN</span><i>✳</i><span>AFTER EFFECTS</span><i>✳</i><span>VISUAL STORYTELLING</span><i>✳</i><span>ANIME MUSIC VIDEOS</span><i>✳</i><span>MOTION DESIGN</span><i>✳</i><span>AFTER EFFECTS</span><i>✳</i></div></div>

    <section className="work-section section-shell" id="work" data-reveal>
      <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Made to <span>move.</span></h2></div><p>Edits are meant to be felt, not just watched. Select a project to open the full viewing experience.</p></div>
      <ProjectGallery projects={projects}/>
      <div className="gallery-note"><span className="status-dot"/> THUMBNAILS FIRST · PREVIEWS ON INTERACTION · FULL EDIT ON OPEN</div>
    </section>

    <section className="motion-section section-shell" data-reveal>
      <div className="motion-copy"><p className="eyebrow">02 / MOTION STUDY</p><h2>Make the<br/><VariableProximity label="frame breathe." className="variable-headline" radius={170} fontSize={64} fromWeight={400} toWeight={850}/></h2><div className="warp-signature"><WarpText text="Bend the moment."/></div><p>Small movements. Deliberate timing. A visual language built around the feeling behind every cut.</p><a className="text-link" href="#contact">Create something together <span>↗</span></a></div>
      <SpotlightCard className="motion-card"><ElasticMesh/><div className="motion-card-footer"><span>ELASTIC FORM / 004</span><span>INTERACTIVE STUDY ↗</span></div></SpotlightCard>
    </section>

    <section className="about-section section-shell" id="about" data-reveal><div className="about-mark"><div className="about-image-frame"><img src="/images/silence-profile.jpg" alt="SILENCE profile artwork"/><span className="about-image-ring"/></div><span>CREATIVE IDENTITY / S</span><div className="about-mark-bottom"><span>AMV</span><span>3D</span><span>AE</span></div></div><div className="about-copy"><p className="eyebrow">03 / THE APPROACH</p><h2>Quiet name.<br/><span>Loud visuals.</span></h2><p>SILENCE is an independent anime editor exploring rhythm, motion and atmosphere through AMVs and visual effects. The work leads; project notes and verified credits can be added as each edit is documented.</p><div className="skill-list"><span>AMV EDITING</span><span>AFTER EFFECTS</span><span>3D / COMPOSITING</span><span>MOTION DESIGN</span></div><div className="about-signoff"><span>THE EDIT IS THE MESSAGE.</span><span>— SILENCE</span></div></div></section>

    <section className="contact-section section-shell" id="contact" data-reveal><div className="contact-topline"><p className="eyebrow">04 / HAVE A PROJECT IN MIND?</p><span className="contact-index">LET’S CONNECT ↘</span></div><h2>Make it<br/><span>mean something.</span></h2><div className="contact-bottom"><p>For editing, collaborations and creative enquiries, reach out through the channels below.</p><div className="contact-links">{socials.map(item => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label} (opens in new tab)`}><SocialIcon name={item.label}/><span>{item.label}</span><b>↗</b></a>)}</div></div></section>
    <footer className="site-footer"><a className="wordmark" href="#home">S<span>.</span></a><span>© {new Date().getFullYear()} SILENCE / INDEPENDENT CREATIVE</span><a className="built-by" href="https://humblepf.vercel.app/" target="_blank" rel="noopener noreferrer">BUILT WITH INTENTION BY <strong>HUMBLE</strong> ↗</a></footer>
  </main>;
}
