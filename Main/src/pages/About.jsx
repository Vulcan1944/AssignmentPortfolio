/* ============================================================
   ABOUT PAGE
   Sections:
     1. Bio          — Avatar card + personal intro text
     2. Skills       — Four categories: Web, Game Dev, 3D, Music
     3. Timeline     — Education and experience history
   ============================================================ */

import { useState, useEffect, useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import SkillBadge     from '../components/SkillBadge';

/* ================================================================
   SKILL CATEGORIES DATA
   Add, remove, or rename skills here.
   Levels: 'Learning' | 'Familiar' | 'Proficient'
   ================================================================ */
const SKILL_CATEGORIES = [
  {
    /* ── Web Development ── */
    category: 'Web Development',
    icon:     '◈',
    skills: [
      { skill: 'React',       level: 'Proficient' },
      { skill: 'JavaScript',  level: 'Proficient' },
      { skill: 'HTML & CSS',  level: 'Proficient' },
      { skill: 'Tailwind CSS',level: 'Proficient' },
      { skill: 'Node.js',     level: 'Familiar'   },
      { skill: 'TypeScript',  level: 'Learning'   },
    ],
  },
  {
    /* ── Game Development ── */
    category: 'Game Development',
    icon:     '◉',
    skills: [
      { skill: 'Unity',       level: 'Proficient' },
      { skill: 'C#',          level: 'Proficient' },
      { skill: 'Game Design', level: 'Familiar'   },
      { skill: 'Physics Sim', level: 'Familiar'   },
      { skill: 'Level Design',level: 'Familiar'   },
    ],
  },
  {
    /* ── 3D Modelling ── */
    category: '3D Modelling',
    icon:     '◆',
    skills: [
      { skill: 'Blender',     level: 'Familiar'   },
      { skill: 'UV Mapping',  level: 'Learning'   },
      { skill: 'Texturing',   level: 'Learning'   },
      { skill: 'Rigging',     level: 'Learning'   },
    ],
  },
  {
    /* ── Music Production ── */
    category: 'Music Production',
    icon:     '◇',
    skills: [
      { skill: 'FL Studio',   level: 'Proficient' },
      { skill: 'Mixing',      level: 'Familiar'   },
      { skill: 'Synthesis',   level: 'Familiar'   },
      { skill: 'Arrangement', level: 'Familiar'   },
    ],
  },
];

/* ================================================================
   EDUCATION / EXPERIENCE TIMELINE DATA
   Edit entries here. Most recent should be first.
   ================================================================ */
const TIMELINE = [
  {
    year:   '2023 – Present',
    title:  'Bachelor of Information Technology',
    org:    'Southern Institute of Technology (SIT) — Invercargill, NZ',
    detail: 'Currently in my third year, studying Web Development, Software Engineering, Databases, and Networking. Working toward a full degree with a focus on practical project-based learning.',
  },
  {
    year:   '2022',
    title:  'Started My I.T Journey',
    org:    'Self-Directed',
    detail: 'Began exploring programming, web development, and game development independently — building small projects and developing a solid foundation across multiple disciplines.',
  },
  {
    year:   '2017',
    title:  'NCEA Graduate',
    org:    'Invercargill, New Zealand',
    detail: 'Completed NCEA secondary education.',
  },
];

/* ================================================================
   CUSTOM HOOK — useVisible
   Returns a ref and a boolean. The boolean becomes true when the
   attached element enters the viewport. Used for scroll animations.
   ================================================================ */
function useVisible(threshold = 0.15) {
  const ref     = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ================================================================
   ABOUT PAGE — Main Component
   ================================================================ */
export default function About() {
  /* Separate visibility refs for each section — staggered scroll animations */
  const [bioRef,      bioVisible]      = useVisible(0.1);
  const [skillsRef,   skillsVisible]   = useVisible(0.1);
  const [timelineRef, timelineVisible] = useVisible(0.1);

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeading
          label="// About"
          title="Who I Am"
          subtitle="IT student, game developer, 3D artist, and music producer from Invercargill, NZ."
        />

        {/* ════════════════════════════════════════════════════════
            SECTION 1 — BIO CARD
            Avatar on the left, bio text on the right.
            ════════════════════════════════════════════════════════ */}
        <section
          ref={bioRef}
          className={`grid md:grid-cols-5 gap-8 mb-24 transition-all duration-700
            ${bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Biography"
        >
          {/* ── Avatar / Identity card ── */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="relative">
              {/* Main avatar box */}
              <div
                className="w-48 h-48 flex items-center justify-center font-display font-black text-5xl text-neon animate-float animate-border-glow"
                style={{
                  background:   'linear-gradient(135deg, rgba(255,45,120,0.1), rgba(191,0,255,0.1))',
                  border:       '1px solid var(--pink-glow)',
                  position:     'relative',
                }}
              >
                KH
              </div>

              {/* Corner decorative accents — top-left */}
              <div
                className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2"
                style={{ borderColor: 'var(--cyan)' }}
                aria-hidden="true"
              />
              {/* Corner decorative accents — bottom-right */}
              <div
                className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2"
                style={{ borderColor: 'var(--cyan)' }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* ── Bio text column ── */}
          <div className="md:col-span-3 flex flex-col justify-center gap-5">
            <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-neon">
              Keegan Huxford
            </h2>

            {/* Bio paragraphs — edit these to update your description */}
            <div className="space-y-3 font-body text-sm md:text-base leading-relaxed"
                 style={{ color: 'var(--text-secondary)' }}>
              <p>
                I'm a third-year IT student at SIT (Southern Institute of Technology) in Invercargill, New Zealand,
                working toward a Bachelor of Information Technology.
              </p>
              <p>
                My interests span across multiple creative and technical disciplines — I build web apps with React,
                develop games in Unity, create 3D models in Blender, and produce music using FL Studio.
              </p>
              <p>
                I love the intersection of technology and creativity, and I'm constantly working on new projects
                to sharpen my skills across all these areas.
              </p>
            </div>

            {/* Quick fact grid — edit the value/label pairs below */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Location', value: 'Invercargill, NZ' },
                { label: 'Study',    value: 'Bachelor of IT'   },
                { label: 'Year',     value: '3rd Year'         },
                { label: 'Status',   value: 'Open to Work'     },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="px-3 py-2 border"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor:     'var(--pink-glow)',
                  }}
                >
                  <div className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>{label}</div>
                  <div className="font-body text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — SKILLS GRID
            Four categories. Each renders a row of SkillBadge components.
            ════════════════════════════════════════════════════════ */}
        <section
          ref={skillsRef}
          className={`mb-24 transition-all duration-700 delay-100
            ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Skills and technologies"
        >
          <SectionHeading
            label="// Toolkit"
            title="Skills"
            subtitle="What I work with across web, games, art, and audio."
          />

          {/* Render each skill category block */}
          <div className="space-y-10">
            {SKILL_CATEGORIES.map(({ category, icon, skills }) => (
              <div key={category}>
                {/* Category label row */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm" style={{ color: 'var(--pink)' }}>
                    {icon}
                  </span>
                  <span
                    className="font-display text-xs uppercase tracking-[0.2em]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {category}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: 'linear-gradient(to right, var(--pink-glow), transparent)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* SkillBadge components — reused for every skill in this category */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {skills.map(({ skill, level }) => (
                    <SkillBadge key={skill} skill={skill} level={level} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skill level legend */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            {[
              { level: 'Learning',  color: '#ffe600', border: '#ffe60040' },
              { level: 'Familiar',  color: '#00f5ff', border: '#00f5ff40' },
              { level: 'Proficient',color: '#ff2d78', border: '#ff2d7840' },
            ].map(({ level, color, border }) => (
              <span
                key={level}
                className="font-mono text-xs px-3 py-1 border"
                style={{ color, borderColor: border }}
              >
                {level.toUpperCase()}
              </span>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — EDUCATION TIMELINE
            Vertical timeline with dot markers.
            ════════════════════════════════════════════════════════ */}
        <section
          ref={timelineRef}
          className={`transition-all duration-700 delay-200
            ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Education and experience timeline"
        >
          <SectionHeading
            label="// History"
            title="Education"
          />

          <div className="relative">
            {/* Vertical timeline spine line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--pink), var(--purple), transparent)' }}
              aria-hidden="true"
            />

            <ol className="space-y-8">
              {TIMELINE.map((entry, i) => (
                <li key={i} className="pl-14 relative group">

                  {/* Timeline dot */}
                  <div
                    className="absolute left-3 top-2 w-4 h-4 border-2 transition-all duration-300
                      group-hover:scale-125"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor:     'var(--pink)',
                      boxShadow:       '0 0 8px var(--pink)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Timeline card */}
                  <div
                    className="p-5 border transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor:     'var(--pink-glow)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--pink)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--pink-glow)'}
                  >
                    {/* Year */}
                    <div className="font-mono text-xs mb-1" style={{ color: 'var(--cyan)' }}>
                      {entry.year}
                    </div>
                    {/* Title */}
                    <h4 className="font-display font-bold text-base uppercase tracking-wide mb-1"
                        style={{ color: 'var(--text-primary)' }}>
                      {entry.title}
                    </h4>
                    {/* Organisation */}
                    <div className="font-body text-sm mb-2" style={{ color: 'var(--text-dim)' }}>
                      {entry.org}
                    </div>
                    {/* Detail */}
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {entry.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

      </div>
    </main>
  );
}
