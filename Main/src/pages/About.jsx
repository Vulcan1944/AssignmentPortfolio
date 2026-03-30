/* ============================================================
   ABOUT PAGE (CLEAN - NO ANIMATIONS)
   ============================================================ */

import SectionHeading from '../components/SectionHeading';
import SkillBadge from '../components/SkillBadge';

/* ================================================================
   SKILL CATEGORIES
   ================================================================ */
const SKILL_CATEGORIES = [
  {
    category: 'Web Development',
    icon: '◈',
    skills: [
      { skill: 'React', level: 'Proficient' },
      { skill: 'JavaScript', level: 'Proficient' },
      { skill: 'HTML & CSS', level: 'Proficient' },
      { skill: 'Tailwind CSS', level: 'Proficient' },
      { skill: 'Node.js', level: 'Familiar' },
      { skill: 'TypeScript', level: 'Learning' },
    ],
  },
  {
    category: 'Game Development',
    icon: '◉',
    skills: [
      { skill: 'Unity', level: 'Proficient' },
      { skill: 'C#', level: 'Proficient' },
      { skill: 'Game Design', level: 'Familiar' },
      { skill: 'Physics Sim', level: 'Familiar' },
      { skill: 'Level Design', level: 'Familiar' },
    ],
  },
  {
    category: '3D Modelling',
    icon: '◆',
    skills: [
      { skill: 'Blender', level: 'Familiar' },
      { skill: 'UV Mapping', level: 'Learning' },
      { skill: 'Texturing', level: 'Learning' },
      { skill: 'Rigging', level: 'Learning' },
    ],
  },
  {
    category: 'Music Production',
    icon: '◇',
    skills: [
      { skill: 'FL Studio', level: 'Proficient' },
      { skill: 'Mixing', level: 'Familiar' },
      { skill: 'Synthesis', level: 'Familiar' },
      { skill: 'Arrangement', level: 'Familiar' },
    ],
  },
];

/* ================================================================
   TIMELINE
   ================================================================ */
const TIMELINE = [
  {
    year: '2023 – Present',
    title: 'Bachelor of Information Technology',
    org: 'Southern Institute of Technology (SIT) — Invercargill, NZ',
    detail:
      'Currently in my third year, studying Web Development, Software Engineering, Databases, and Networking. Working toward a full degree with a focus on practical project-based learning.',
  },
  {
    year: '2022',
    title: 'Started My I.T Journey',
    org: 'Self-Directed',
    detail:
      'Began exploring programming, web development, and game development independently — building small projects and developing a solid foundation across multiple disciplines.',
  },
  {
    year: '2017',
    title: 'NCEA Graduate',
    org: 'Invercargill, New Zealand',
    detail: 'Completed NCEA secondary education.',
  },
];

/* ================================================================
   ABOUT PAGE
   ================================================================ */
export default function About() {
  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeading
          label="// About"
          title="Who I Am"
          subtitle="IT student, game developer, 3D artist, and music producer from Invercargill, NZ."
        />

        {/* BIO */}
<section className="flex flex-col items-center text-center gap-5 mb-24">

  <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-neon">
    Keegan Huxford
  </h2>

  <div
    className="space-y-3 font-body text-sm md:text-base leading-relaxed max-w-xl"
    style={{ color: 'var(--text-secondary)' }}
  >
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

  {/* Quick facts */}
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

</section>

        {/* SKILLS */}
        <section className="mb-24">
          <SectionHeading
            label="// Toolkit"
            title="Skills"
            subtitle="What I work with across web, games, art, and audio."
          />

          <div className="space-y-10">
            {SKILL_CATEGORIES.map(({ category, icon, skills }) => (
              <div key={category}>
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
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {skills.map(({ skill, level }) => (
                    <SkillBadge key={skill} skill={skill} level={level} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            {[
              { level: 'Learning', color: '#ffe600', border: '#ffe60040' },
              { level: 'Familiar', color: '#00f5ff', border: '#00f5ff40' },
              { level: 'Proficient', color: '#ff2d78', border: '#ff2d7840' },
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

        {/* TIMELINE */}
        <section>
          <SectionHeading label="// History" title="Education" />

          <div className="relative">
            <div
              className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--pink), var(--purple), transparent)' }}
            />

            <ol className="space-y-8">
              {TIMELINE.map((entry, i) => (
                <li key={i} className="pl-14 relative">

                  <div
                    className="absolute left-3 top-2 w-4 h-4 border-2"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor: 'var(--pink)',
                      boxShadow: '0 0 8px var(--pink)',
                    }}
                  />

                  <div
                    className="p-5 border"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--pink-glow)',
                    }}
                  >
                    <div className="font-mono text-xs mb-1" style={{ color: 'var(--cyan)' }}>
                      {entry.year}
                    </div>
                    <h4 className="font-display font-bold text-base uppercase tracking-wide mb-1">
                      {entry.title}
                    </h4>
                    <div className="font-body text-sm mb-2" style={{ color: 'var(--text-dim)' }}>
                      {entry.org}
                    </div>
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