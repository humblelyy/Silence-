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
import ShowreelRows from '@/components/ShowreelRows';
import CinematicReel from '@/components/CinematicReel';
import ScrollProgress from '@/components/ScrollProgress';
import { projects, socialLinks } from '@/lib/projects';

const INTRO = 1.5; // seconds — hero type starts as the loading intro clears

export default function HomePage() {
  return (
    <main>
      <ScrollReveal />
      <ScrollProgress />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="SILENCE home">S<span>.</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#toolkit">Toolkit</a><a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <ThemeControls />
          <a className="header-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero" id="home">
        <a className="hero__badge" href="https://youtube.com/@silenceamvs" target="_blank" rel="noopener noreferrer">
          <span className="hero__badge-tag">New</span> Fresh 4K edits on YouTube <span aria-hidden="true">→</span>
        </a>
        <h1 className="sr-only">Silence is a feeling — anime editor and motion designer</h1>
        <WarpText
          className="hero__warp"
          text={'Silence is\na feeling.'}
          warpStrength={0.08}
          warpScale={1.7}
          speed={0.55}
          lens="bulge"
          pointerInfluence={0.42}
          pointerStrength={0.38}
          refraction={0.018}
          chromatic={0.35}
          idleDrift={0.2}
          ripple
          clickRipple
          intro
          fontSize="clamp(4rem, 11vw, 10rem)"
          fontWeight={800}
          letterSpacing="-0.06em"
        />
        <SplitText
          tag="p"
          className="hero__lede"
          text="Anime edits cut to the beat — rhythm, atmosphere and impact in every frame."
          splitType="words"
          trigger="load"
          startDelay={INTRO}
          delay={35}
          duration={0.7}
          textAlign="center"
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
        />
        <div className="hero__actions" data-reveal>
          <a className="button button--primary magnet-button" href="#work">Watch the work</a>
          <a className="button button--ghost" href="#contact">Work with me</a>
        </div>
        <p className="hero__proof" data-reveal><strong>4K edits</strong> across Jujutsu Kaisen, Dandadan, My Dress-Up Darling and more.</p>
      </section>

      <ShowreelRows projects={projects} />

      <CinematicReel projects={projects} />

      {/* ---------- Work ---------- */}
      <section className="work shell" id="work">
        <div className="section-head section-head--center">
          <p className="eyebrow">Selected work</p>
          <SplitText tag="h2" text="Made to move." className="section-title" splitType="chars" delay={30} duration={0.8} ease="power4.out" textAlign="center" from={{ opacity: 0, y: 60 }} to={{ opacity: 1, y: 0 }} />
          <p data-reveal>Every edit opens in a full player. Use ← → to flip between cuts, Esc to close.</p>
        </div>
        <ProjectGallery projects={projects} />
      </section>

      {/* ---------- Toolkit bento ---------- */}
      <section className="toolkit shell" id="toolkit">
        <div className="section-head section-head--center">
          <p className="eyebrow">The toolkit</p>
          <SplitText tag="h2" text="Every cut, on purpose." className="section-title" splitType="words" delay={80} duration={0.9} ease="power4.out" textAlign="center" from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} />
        </div>
        <div className="bento">
          <SpotlightCard className="bento__card bento__card--wide">
            <div className="bento__copy"><h3>Beat-locked timing</h3><p>Shots, shakes and flashes are mapped to the song’s drops, breaths and silences before a single cut.</p></div>
            <div className="bento__timeline" aria-hidden="true">
              <div className="bento__tc"><HeroTimecode /></div>
              <span className="viewer__playhead" />
              <span className="track track--v"><i style={{ width: '22%' }} /><i style={{ width: '14%' }} /><i style={{ width: '31%' }} /><i style={{ width: '18%' }} /></span>
              <span className="track track--v track--alt"><i style={{ width: '9%' }} /><i style={{ width: '27%' }} /><i style={{ width: '12%' }} /><i style={{ width: '35%' }} /></span>
              <span className="track track--a"><i style={{ width: '100%' }} /></span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="bento__card bento__card--mesh">
            <ElasticMesh />
            <div className="bento__copy bento__copy--overlay"><h3>Motion &amp; 3D</h3></div>
          </SpotlightCard>
          <SpotlightCard className="bento__card">
            <div className="bento__swatches" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="bento__copy"><h3>Colour</h3><p>Grades that carry the mood of each scene.</p></div>
          </SpotlightCard>
          <SpotlightCard className="bento__card">
            <div className="bento__big" aria-hidden="true">4K</div>
            <div className="bento__copy"><h3>Clean exports</h3><p>Sharp 4K masters, ready for YouTube, TikTok and Reels.</p></div>
          </SpotlightCard>
          <SpotlightCard className="bento__card">
            <div className="bento__vp"><VariableProximity label="breathe." radius={140} fontSize={58} fromWeight={300} toWeight={800} /></div>
            <div className="bento__copy"><h3>Transitions</h3><p>Hover the word — every frame should flow into the next.</p></div>
          </SpotlightCard>
        </div>
      </section>

      {/* ---------- Quote with sticker ---------- */}
      <section className="quote shell" data-reveal>
        <p className="quote__text">
          “Less noise.{' '}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="quote__sticker" src="/images/silence-profile.jpg" alt="" />{' '}
          More impact. The edit is the message.”
        </p>
        <p className="quote__by"><strong>SILENCE</strong> Independent anime editor</p>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="contact shell" id="contact">
        <SpotlightCard className="contact__panel">
          <p className="eyebrow">Have a project in mind?</p>
          <SplitText tag="h2" text="Make it mean something." className="contact__title" splitType="words" delay={80} duration={1} ease="power4.out" textAlign="center" from={{ opacity: 0, y: 70 }} to={{ opacity: 1, y: 0 }} />
          <p className="contact__lede">For edits, collaborations and creative enquiries — Discord is fastest.</p>
          <ul className="contact__links">
            {socialLinks.map(item => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label} (opens in new tab)`}>
                  <SocialIcon name={item.label} /><span>{item.label}</span><b aria-hidden="true">↗</b>
                </a>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#home" aria-label="Back to top">S<span>.</span></a>
        <span>© {new Date().getFullYear()} SILENCE</span>
        <a className="built-by" href="https://humblepf.vercel.app/" target="_blank" rel="noopener noreferrer">Built with intention by <strong>Humble</strong> ↗</a>
      </footer>
    </main>
  );
}
