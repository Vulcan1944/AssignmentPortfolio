import SectionHeading from '../components/SectionHeading';
import SkillBadge     from '../components/SkillBadge';

const SKILL_CATEGORIES = [
  {
    category: 'Web Development',
    icon: '◈',
    skills: [
      { skill: 'React',        level: 'Learning'   },
      { skill: 'JavaScript',   level: 'Familiar'   },
      { skill: 'HTML & CSS',   level: 'Proficient' },
      { skill: 'Tailwind CSS', level: 'Learning'   },
    ],
  },
  {
    category: 'Game Development',
    icon: '◉',
    skills: [
      { skill: 'Unity',        level: 'Familiar'   },
      { skill: 'C#',           level: 'Familiar'   },
      { skill: 'Game Design',  level: 'Proficient' },
      { skill: 'Level Design', level: 'Proficient' },
    ],
  },
  {
    category: '3D Modelling',
    icon: '◆',
    skills: [
      { skill: 'Blender',    level: 'Familiar' },
      { skill: 'UV Mapping', level: 'Learning' },
      { skill: 'Texturing',  level: 'Learning' },
      { skill: 'Rigging',    level: 'Learning' },
    ],
  },
  {
    category: 'Music Production',
    icon: '◇',
    skills: [
      { skill: 'FL Studio',   level: 'Proficient' },
      { skill: 'Mixing',      level: 'Familiar'   },
      { skill: 'Synthesis',   level: 'Familiar'   },
      { skill: 'Arrangement', level: 'Proficient' },
    ],
  },
];

const TIMELINE = [
  {
    year:   '2023 – Present',
    title:  'Bachelor of Information Technology',
    org:    'Southern Institute of Technology — Invercargill, NZ',
    detail: 'Currently in my third year, studying Web Development, Game Development, Databases, and Security. Working toward a full degree with a focus on practical project based learning.',
  },
  {
    year:   '2021',
    title:  'Construction Certificate',
    org:    'Southern Institute of Technology — Invercargill, NZ',
  },
  {
    year: '2019',
    title: 'Butcher Certificate',
    org: 'Alliance Meatworks - Lorneville'
  },
  {
    year:   '2017',
    title:  'NCEA Graduate',
    org:    'Invercargill, New Zealand',
    detail: 'Completed NCEA secondary education.',
  },
];


export default function About() {
  return (
    <main className="pt-28 pb-24">

      <div className="px-6">
        <SectionHeading
          label="// About"
          title="Who I Am"
          subtitle="IT student, game developer, 3D artist, and music producer from Invercargill, NZ."
        />
      </div>

      <div
        className="flex flex-col lg:flex-row border-y px-10"
        style={{ borderColor: 'var(--pink-glow)' }}
      >

        <section
          aria-label="Biography"
          className="flex-1 px-10 py-12 border-b lg:border-b-0 lg:border-r"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor:     'var(--pink-glow)',
          }}
        >
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
            style={{ color: 'var(--cyan)' }}
          >
            // Who I Am
          </p>

          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-neon mb-6">
            Keegan Huxford
          </h2>

          <div
            className="space-y-5 font-body text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              I'm a third year IT student at Southern Institute of Technology
              in Invercargill, New Zealand, working toward a Bachelor of Information Technology.
            </p>
            <p>
              My interests span across multiple creative and technical disciplines. I build
              web apps with React, develop games in Unity, create 3D models in Blender,
              and produce music using FL Studio.
            </p>
            <p>
              I enjoy the intersection of technology and creativity, and I'm constantly
              working on new projects to sharpen my skills across all these areas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs">
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
                  backgroundColor: 'var(--bg-base)',
                  borderColor:     'var(--pink-glow)',
                }}
              >
                <div
                  className="font-mono text-xs"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {label}
                </div>
                <div
                  className="font-body text-sm font-semibold mt-0.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-label="Skills and technologies"
          className="flex-1 px-10 py-12"
          style={{ backgroundColor: 'var(--bg-base)' }}
        >
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
            style={{ color: 'var(--cyan)' }}
          >
            // Toolkit
          </p>

          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-neon mb-6">
            Skills
          </h2>

          <div className="space-y-6">
            {SKILL_CATEGORIES.map(({ category, icon, skills }) => (
              <div key={category}>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-mono text-xs"
                    style={{ color: 'var(--pink)' }}
                  >
                    {icon}
                  </span>
                  <span
                    className="font-display text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {category}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: 'linear-gradient(to right, var(--pink-glow), transparent)',
                    }}
                    aria-hidden="true"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {skills.map(({ skill, level }) => (
                    <SkillBadge key={skill} skill={skill} level={level} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap gap-3 mt-6 pt-4 border-t"
            style={{ borderColor: 'var(--pink-glow)' }}
          >
            {[
              { level: 'Learning',   color: '#ffe600', border: '#ffe60040' },
              { level: 'Familiar',   color: '#00f5ff', border: '#00f5ff40' },
              { level: 'Proficient', color: '#ff2d78', border: '#ff2d7840' },
            ].map(({ level, color, border }) => (
              <span
                key={level}
                className="font-mono text-xs px-2.5 py-1 border"
                style={{ color, borderColor: border }}
              >
                {level.toUpperCase()}
              </span>
            ))}
          </div>
        </section>

      </div>

      <div className="h-20" aria-hidden="true" />

      <section
        className="px-6 max-w-3xl mx-auto"
        aria-label="Education and experience timeline"
      >
        <SectionHeading label="// History" title="Education" />

        <div className="relative">
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, var(--pink), var(--purple), transparent)',
            }}
            aria-hidden="true"
          />

          <ol className="space-y-6">
            {TIMELINE.map((entry, i) => (
              <li key={i} className="pl-14 relative">

                <div
                  className="absolute left-3 top-2 w-4 h-4 border-2"
                  style={{
                    backgroundColor: 'var(--bg-base)',
                    borderColor:     'var(--pink)',
                    boxShadow:       '0 0 8px var(--pink)',
                  }}
                  aria-hidden="true"
                />

                <div
                  className="p-5 border"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor:     'var(--pink-glow)',
                  }}
                >
                  <div
                    className="font-mono text-xs mb-1"
                    style={{ color: 'var(--cyan)' }}
                  >
                    {entry.year}
                  </div>
                  {/* Title */}
                  <h4
                    className="font-display font-bold text-base uppercase tracking-wide mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {entry.title}
                  </h4>
                  <div
                    className="font-body text-sm mb-2"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {entry.org}
                  </div>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {entry.detail}
                  </p>
                </div>

              </li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  );
}
