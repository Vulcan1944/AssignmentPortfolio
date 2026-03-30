/* ============================================================
   HOME PAGE
   Sections:
     1. Hero       — Synthwave sun, name, typing animation, CTA buttons
     2. Featured   — Single featured project card (Friction-Less)
     3. Stats      — Quick stats row
   ============================================================ */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ProjectCard    from '../components/ProjectCard';

/* ================================================================
   FEATURED PROJECT DATA
   Edit this object to update the featured project on the home page.
   Add an "image" field with a path to show a real image/gif.
   ================================================================ */
const FEATURED_PROJECT = {
  title:       'Friction-Less',
  description: 'My current game project — an evolution of Friction-Less Arena. A fast-paced physics-based game built in Unity. Still in active development with new mechanics and levels being added regularly.',
  tags:        ['Unity', 'C#', 'Game Design', '3D Modelling'],
  github:      '#',   // ← Replace with real GitHub URL
  demo:        null,  // ← Replace with itch.io or demo link when ready
  status:      'In Progress',
  image:       null,  // ← Replace with: '/images/friction-less.gif'
  imageAlt:    'Friction-Less game preview',
};

/* ================================================================
   TYPING ANIMATION HOOK
   Cycles through an array of words with a typing + deleting effect.
   Edit the WORDS array in the Home component to change the phrases.
   ================================================================ */
function useTypingEffect(words, typeSpeed = 90, deleteSpeed = 50, pauseDuration = 2000) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex,     setWordIndex]     = useState(0);
  const [charIndex,     setCharIndex]     = useState(0);
  const [isDeleting,    setIsDeleting]    = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      // Still typing forward
      timeout = setTimeout(() => setCharIndex(c => c + 1), typeSpeed);

    } else if (!isDeleting && charIndex === currentWord.length) {
      // Finished typing — pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);

    } else if (isDeleting && charIndex > 0) {
      // Deleting backwards
      timeout = setTimeout(() => setCharIndex(c => c - 1), deleteSpeed);

    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next word
      setIsDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    }

    setDisplayedText(currentWord.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration]);

  return displayedText;
}

/* ================================================================
   SYNTHWAVE SUN COMPONENT
   The decorative retro sunset graphic in the hero.
   Edit colours and sizes directly inside this component.
   ================================================================ */
function SynthwaveSun() {
  return (
    <div
      className="relative mx-auto animate-sun-rise"
      style={{ width: '280px', height: '180px' }}
      aria-hidden="true"
    >
      {/* ── Sun circle with horizontal stripe cutouts ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
        style={{
          width:      '280px',
          height:     '280px',
          background: 'linear-gradient(to bottom, #ffe600 0%, #ff8800 30%, #ff2d78 60%, #bf00ff 100%)',
          boxShadow:  '0 0 40px #ff2d7888, 0 0 80px #ff2d7844, 0 0 120px #bf00ff44',
        }}
      >
        {/* Dark horizontal bars across the sun for the classic 80s look */}
        {[38, 48, 57, 65, 72, 78, 84].map((topPercent, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top:             `${topPercent}%`,
              height:          `${3 + i * 0.5}px`,
              backgroundColor: 'var(--bg-base)',
            }}
          />
        ))}
      </div>

      {/* ── Glow halo behind the sun ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-40"
        style={{
          width:            '320px',
          height:           '160px',
          backgroundColor: '#ff2d78',
          zIndex:           -1,
        }}
      />
    </div>
  );
}

/* ================================================================
   GRID FLOOR COMPONENT
   The perspective grid that sits below the sun in the hero.
   ================================================================ */
function GridFloor() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{ height: '200px' }}
      aria-hidden="true"
    >
      {/* Perspective-transformed grid */}
      <div
        style={{
          position:        'absolute',
          bottom:          0,
          left:            '-50%',
          right:           '-50%',
          height:          '400px',
          backgroundImage: `
            linear-gradient(rgba(255,45,120,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,45,120,0.4) 1px, transparent 1px)
          `,
          backgroundSize:  '60px 60px',
          transform:       'perspective(300px) rotateX(70deg)',
          transformOrigin: 'top center',
        }}
      />
      {/* Fade-out gradient at top of grid */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height:     '60%',
          background: 'linear-gradient(to bottom, var(--bg-base), transparent)',
        }}
      />
    </div>
  );
}

/* ================================================================
   HOME PAGE — Main Component
   ================================================================ */
export default function Home() {
  const heroRef       = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

  /* ── Typing animation words — edit this array to change phrases ── */
  const TYPING_WORDS = [
    'IT Student',
    'Web Developer',
    'Game Developer',
    '3D Artist',
    'Music Producer',
  ];

  const typedText = useTypingEffect(TYPING_WORDS, 85, 45, 1800);

  /* ── IntersectionObserver: trigger hero animations on mount ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Full-height opening with sun graphic and intro text.
          ════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
        aria-label="Hero introduction"
      >
        {/* ── Background ambient glow orbs ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: 'var(--purple)' }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: 'var(--pink)' }}
          />
        </div>

        {/* ── Synthwave Sun ── */}
        <div className="mb-6 relative z-10">
          <SynthwaveSun />
        </div>

        {/* ── Hero text content ── */}
        <div
          className={`relative z-10 text-center max-w-3xl transition-all duration-1000
            ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Name */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-wider mb-2">
            <span className="text-neon animate-flicker">Keegan</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Huxford</span>
          </h1>

          {/* Typing subtitle */}
          <div
            className="h-8 flex items-center justify-center mb-6"
            aria-live="polite"
            aria-label={`Currently: ${typedText}`}
          >
            <span className="font-mono text-lg" style={{ color: 'var(--cyan)' }}>
              {typedText}
              {/* Blinking cursor */}
              <span
                className="inline-block w-0.5 h-5 ml-1 align-middle animate-pulse"
                style={{ backgroundColor: 'var(--cyan)' }}
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Short bio blurb */}
          <p
            className="font-body text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Third-year IT student at SIT, Invercargill. Building games, websites,
            3D models, and music — one project at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/projects" className="btn-neon-solid">
              View Projects
            </Link>
            <Link to="/about" className="btn-neon">
              About Me
            </Link>
          </div>
        </div>

        {/* ── Perspective grid floor ── */}
        <GridFloor />

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          aria-hidden="true"
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--text-dim)' }}>
            scroll
          </span>
          <div
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, var(--pink), transparent)' }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — FEATURED PROJECT
          Shows one highlighted project card.
          ════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ borderTop: '1px solid var(--pink-glow)' }}
        aria-label="Featured project"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="// Featured"
            title="Latest Project"
            subtitle="What I'm actively working on right now."
          />

          {/* Reusing ProjectCard component here */}
          <ProjectCard project={FEATURED_PROJECT} index={0} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — STATS ROW
          Quick numbers about Keegan.
          Edit the STATS array to change the numbers/labels.
          ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6"
        style={{ borderTop: '1px solid var(--pink-glow)' }}
        aria-label="Quick stats"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* ── Edit these stats ── */}
          {[
            { value: '3rd',  label: 'Year of Study' },
            { value: '3+',   label: 'Projects Built' },
            { value: '4',    label: 'Creative Fields' },
            { value: '∞',    label: 'Things to Learn' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center group">
              <div
                className="font-display font-black text-3xl md:text-5xl text-neon mb-1
                  group-hover:scale-110 transition-transform duration-200"
              >
                {value}
              </div>
              <div
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'var(--text-dim)' }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
