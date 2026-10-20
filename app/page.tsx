import ProjectGallery from '@/components/ProjectGallery';
import ThemeControls from '@/components/ThemeControls';
import SocialIcon from '@/components/SocialIcon';
import SplitText from '@/components/SplitText';
import VariableProximity from '@/components/VariableProximity';
import ElasticMesh from '@/components/ElasticMesh';
import SpotlightCard from '@/components/SpotlightCard';
import ScrollReveal from '@/components/ScrollReveal';
import WarpText from '@/components/WarpText';
import HeroTimecode from '@/components/HeroTimecode';
import { projects, socialLinks } from '@/lib/projects';

// The loading intro finishes ~1.7s after load; hero type starts as it clears.
const INTRO = 1.5;

const disciplines = ['Anime music videos', 'Beat sync', 'After Effects', 'Compositing', 'Motion design', 'Colour'];

export default function HomePage() {
  return (
    <main>
      <ScrollReveal />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="SILENCE home">S<span>.</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#approach">Approach</a><a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <ThemeControls />
          <a className="header-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="hero shell" id="home">
        <div className="hero__copy">
          <p className="eyebrow"><span className="status-dot" /> Anime editor · Motion designer</p>
          <h1 className="hero__title">
            <SplitText tag="span" text="Silence" className="hero__line" trigger="load" startDelay={INTRO} delay={60} duration={1} ease="expo.out" from={{ opacity: 0, yPercent: 110 }} to={{ opacity: 1, yPercent: 0 }} />
            <SplitText tag="span" text="is a feeling." className="hero__line hero__line--accent" trigger="load" startDelay={INTRO + 0.35} delay={35} duration={0.9} ease="expo.out" from={{ opacity: 0, yPercent: 110 }} to={{ opacity: 1, yPercent: 0 }} />
          </h1>
          <p className="hero__lede" data-reveal>Anime edits cut to the beat — rhythm, atmosphere and impact in every frame. Independent work by SILENCE.</p>
          <div className="hero__actions" data-reveal>
            <a className="button button--primary magnet-button" href="#work">Watch the work <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="https://youtube.com/@silenceamvs" target="_blank" rel="noopener noreferrer">YouTube channel ↗</a>
          </div>
        </div>

        <figure className="viewer" data-reveal>
          <div className="viewer__bar"><span>SILENCE_MASTER.aep</span><HeroTimecode /></div>
          <div className="viewer__frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/silence-profile.jpg" alt="SILENCE profile artwork: an anime girl with windswept hair" />
            <span className="viewer__safe" aria-hidden="true" />
          </div>
          <div className="viewer__timeline" aria-hidden="true">
            <span className="viewer__playhead" />
            <span className="track track--v"><i style={{ width: '22%' }} /><i style={{ width: '14%' }} /><i style={{ width: '31%' }} /><i style={{ width: '18%' }} /></span>
            <span className="track track--a"><i style={{ width: '100%' }} /></span>
          </div>
        </figure>
      </section>

      <div className="marquee" aria-label="Disciplines">
        <div className="marquee__track">
          {[...disciplines, ...disciplines].map((d, i) => <span key={i} aria-hidden={i >= disciplines.length}>{d}<i>✦</i></span>)}
        </div>
      </div>

      <section className="work shell" id="work">
        <div className="section-head">
          <div>
            <p className="eyebrow">01 — Selected work</p>
            <SplitText tag="h2" text="Made to move." className="section-title" splitType="words" delay={90} duration={0.9} ease="power4.out" from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} />
          </div>
          <p data-reveal>Every edit opens in a full player. Use ← → to flip between cuts, Esc to close.</p>
        </div>
        <ProjectGallery projects={projects} />
      </section>

      <section className="motion shell" id="approach">
        <div className="motion__copy" data-reveal>
          <p className="eyebrow">02 — Approach</p>
          <h2 className="section-title">Make the<br /><VariableProximity label="frame breathe." className="motion__vp" radius={170} fontSize={64} fromWeight={400} toWeight={800} /></h2>
          <p className="motion__sig"><WarpText text="Bend the moment." /></p>
          <ol className="process">
            <li><b>01</b><span><strong>Listen</strong>Map the song’s drops, breaths and silences before a single cut.</span></li>
            <li><b>02</b><span><strong>Cut</strong>Pick shots for motion and emotion, then lock them to the beat.</span></li>
            <li><b>03</b><span><strong>Finish</strong>Shakes, transitions, colour and 4K export — impact without noise.</span></li>
          </ol>
        </div>
        <SpotlightCard className="motion__card"><ElasticMesh /><div className="motion__card-foot"><span>ELASTIC FORM / 004</span><span>MOVE YOUR CURSOR</span></div></SpotlightCard>
      </section>

      <section className="contact shell" id="contact">
        <p className="eyebrow">03 — Have a project in mind?</p>
        <SplitText tag="h2" text="Make it mean something." className="contact__title" splitType="words" delay={80} duration={1} ease="power4.out" from={{ opacity: 0, y: 70 }} to={{ opacity: 1, y: 0 }} />
        <div className="contact__grid">
          <p data-reveal>For edits, collaborations and creative enquiries, reach out on any channel below — Discord is fastest.</p>
          <ul className="contact__links" data-reveal>
            {socialLinks.map(item => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label} (opens in new tab)`}>
                  <SocialIcon name={item.label} /><span>{item.label}</span><b aria-hidden="true">↗</b>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#home" aria-label="Back to top">S<span>.</span></a>
        <span>© {new Date().getFullYear()} SILENCE</span>
        <a className="built-by" href="https://humblepf.vercel.app/" target="_blank" rel="noopener noreferrer">Built with intention by <strong>Humble</strong> ↗</a>
      </footer>
    </main>
  );
}
