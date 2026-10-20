import ProjectGallery from '@/components/ProjectGallery';
import ThemeControls from '@/components/ThemeControls';
import SocialIcon from '@/components/SocialIcon';
import SplitText from '@/components/SplitText';
import SpotlightCard from '@/components/SpotlightCard';
import ScrollReveal from '@/components/ScrollReveal';
import WarpText from '@/components/WarpText';
import HeroTimecode from '@/components/HeroTimecode';
import FadeContent from '@/components/FadeContent';
import CinematicReel from '@/components/CinematicReel';
import ShowreelRows from '@/components/ShowreelRows';
import ScrollProgress from '@/components/ScrollProgress';
import { projects, socialLinks, heroVideo } from '@/lib/projects';
import HeroVideo from '@/components/HeroVideo';

const INTRO = 1.5;

const icon = (d: string) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;

const toolkit = [
  { title: 'Beat-locked editing', body: 'Every cut, shake and flash is mapped to the track — drops hit, breaths land, silences hold.', tags: ['Beat sync', 'Pacing', 'Scene selection'], icon: icon('M3 12h3l2-6 4 12 3-9 2 3h4') },
  { title: 'Motion & compositing', body: 'Layered After Effects work: tracking, masking, camera moves and type that sits inside the shot.', tags: ['After Effects', 'Tracking', 'Typography'], icon: icon('M4 7l8-4 8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4') },
  { title: 'Transitions & effects', body: 'Custom transitions, shakes and flashes that move the eye from one frame to the next without noise.', tags: ['Transitions', 'Shakes', 'VFX'], icon: icon('M5 19 19 5M9 5h10v10') },
  { title: 'Colour & finishing', body: 'Grades that carry the mood of each scene, finished as sharp 4K masters for every platform.', tags: ['Colour grade', '4K export', 'YouTube · TikTok'], icon: icon('M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.2-1.6-.4-1 .2-2.4 1.6-2.4H17a4 4 0 0 0 4-4c0-5-4-10-9-10Zm-5 9h.01M9 7h.01M15 7h.01') },
];

const workflow = [
  { step: '01', title: 'Listen', meta: 'Map drops & silences' },
  { step: '02', title: 'Select', meta: 'Pull shots for motion' },
  { step: '03', title: 'Cut', meta: 'Lock to the beat' },
  { step: '04', title: 'Finish', meta: 'Effects, colour, 4K' },
]; // seconds — hero type starts as the loading intro clears

export default function HomePage() {
  return (
    <main>
      <ScrollReveal />
      <ScrollProgress />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="SILENCE home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/silence-profile.jpg" alt="" width={36} height={36} />
          <span className="wordmark__text">SILENCE<span>.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#toolkit">Toolkit</a><a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <ThemeControls />
          <a className="header-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero hero--video" id="home">
        <HeroVideo url={heroVideo.url} poster={heroVideo.poster} start={heroVideo.start} end={heroVideo.end} />
        <h1 className="sr-only">Silence is a feeling — anime editor and motion designer</h1>
        <WarpText
          className="hero__warp"
          text="Silence is a feeling."
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
          fontSize="clamp(3rem, 10vw, 9rem)"
          fontWeight={800}
          style={{ height: '320px' }}
          color={null}
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
          <a className="button button--glass" href="#contact">Work with me</a>
        </div>
        <p className="hero__proof" data-reveal><strong>4K edits</strong> across Jujutsu Kaisen, Dandadan, My Dress-Up Darling and more.</p>
      </section>

      <ShowreelRows projects={projects} />

      <CinematicReel projects={projects} introVideo={heroVideo.url} introPoster={heroVideo.poster} />

      {/* ---------- Work ---------- */}
      <section className="work shell" id="work">
        <div className="section-head section-head--center">
          <p className="eyebrow">Selected work</p>
          <SplitText tag="h2" text="Made to move." className="section-title" splitType="chars" delay={30} duration={0.8} ease="power4.out" textAlign="center" from={{ opacity: 0, y: 60 }} to={{ opacity: 1, y: 0 }} />
          <p data-reveal>Every edit opens in a full player. Use ← → to flip between cuts, Esc to close.</p>
        </div>
        <ProjectGallery projects={projects} />
      </section>

      {/* ---------- Toolkit ---------- */}
      <section className="toolkit shell" id="toolkit">
        <div className="toolkit__head">
          <div>
            <p className="eyebrow">The toolkit</p>
            <SplitText tag="h2" text="Every cut, on purpose." className="section-title" splitType="words" delay={80} duration={0.9} ease="power4.out" from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} />
          </div>
          <p className="toolkit__intro" data-reveal>A focused pipeline from first listen to final export — the same process behind every edit on the channel.</p>
        </div>

        <FadeContent className="toolkit__grid" effect="mist" duration={1.4} stagger={0.12} threshold={0.15}>
          {toolkit.map((t, i) => (
            <SpotlightCard className="tool-card" key={t.title}>
              <div className="tool-card__top">
                <span className="tool-card__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="tool-card__icon" aria-hidden="true">{t.icon}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <ul className="tool-card__tags">{t.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </SpotlightCard>
          ))}
        </FadeContent>

        <FadeContent className="toolkit__stack" effect="mist" duration={1.2} stagger={0.08}>
          <div className="stack__label"><span className="eyebrow">Workflow</span></div>
          {workflow.map(w => (
            <div className="stack__item" key={w.step}>
              <span className="stack__step">{w.step}</span>
              <strong>{w.title}</strong>
              <span className="stack__meta">{w.meta}</span>
            </div>
          ))}
          <div className="stack__timeline" aria-hidden="true">
            <div className="bento__tc"><HeroTimecode /></div>
            <span className="viewer__playhead" />
            <span className="track track--v"><i style={{ width: '22%' }} /><i style={{ width: '14%' }} /><i style={{ width: '31%' }} /><i style={{ width: '18%' }} /></span>
            <span className="track track--v track--alt"><i style={{ width: '9%' }} /><i style={{ width: '27%' }} /><i style={{ width: '12%' }} /><i style={{ width: '35%' }} /></span>
            <span className="track track--a"><i style={{ width: '100%' }} /></span>
          </div>
        </FadeContent>
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
