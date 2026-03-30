import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import SkillBadge from '../components/SkillBadge';

const skills = {
  'Languages': [
    { skill: 'JavaScript', level: 'Proficient' },
    { skill: 'HTML & CSS', level: 'Proficient' },
    { skill: 'Python', level: 'Familiar' },
    { skill: 'Java', level: 'Familiar' },
    { skill: 'SQL', level: 'Learning' },
    { skill: 'TypeScript', level: 'Learning' },
  ],
  'Frameworks & Tools': [
    { skill: 'React', level: 'Proficient' },
    { skill: 'Tailwind CSS', level: 'Proficient' },
    { skill: 'Node.js', level: 'Familiar' },
    { skill: 'Git & GitHub', level: 'Proficient' },
    { skill: 'Vite', level: 'Familiar' },
    { skill: 'REST APIs', level: 'Familiar' },
  ],
};

const timeline = [
  {
    year: '2023 – Present',
    title: 'Bachelor of Information Technology',
    org: 'Southern Institute of Technology (SIT)',
    detail: 'Studying Web Development, Databases, Networking, and Software Engineering. Currently in my second year.',
  },
  {
    year: '2022',
    title: 'Started Web Development Journey',
    org: 'Self-Directed',
    detail: 'Built my first HTML/CSS websites, then progressed to JavaScript and eventually React.',
  },
  {
    year: '2022',
    title: 'Secondary School Graduate',
    org: 'Invercargill, New Zealand',
    detail: 'Completed NCEA with a focus on digital technologies and computing.',
  },
];

// Custom hook for section visibility using IntersectionObserver
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
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

export default function About() {
  const [bioRef, bioVisible] = useVisible();
  const [skillsRef, skillsVisible] = useVisible();
  const [timelineRef, timelineVisible] = useVisible();

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ─── Intro ─── */}
        <SectionHeading
          label="Who I Am"
          title="About Me"
          subtitle="IT student, curious builder, and lifelong learner."
        />

        {/* ─── Bio + Avatar card ─── */}
        <section
          ref={bioRef}
          aria-label="Biography"
          className={`grid md:grid-cols-5 gap-8 mb-24 transition-all duration-700
            ${bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Avatar */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-400/10 
                border border-slate-700/60 flex items-center justify-center text-7xl font-display font-bold text-gradient
                animate-float select-none"
                aria-hidden="true"
              >
                KH
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-cyan-400/40 rounded-br-xl" aria-hidden="true" />
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-xl" aria-hidden="true" />
            </div>
          </div>

          {/* Bio text */}
          <div className="md:col-span-3 flex flex-col justify-center gap-5">
            <h2 className="font-display font-bold text-2xl text-slate-100">
              Hey, I'm <span className="text-gradient">Keegan Huxford</span>
            </h2>
            <div className="space-y-3 text-slate-400 font-body text-sm md:text-base leading-relaxed">
              <p>
                I'm a second-year IT student at SIT (Southern Institute of Technology) in Invercargill, New Zealand, 
                working toward a Bachelor of Information Technology with a focus on web development and software engineering.
              </p>
              <p>
                I enjoy turning ideas into real, functional applications — whether that's a clean UI, a well-structured API, 
                or a fully deployed web app. I'm passionate about writing maintainable code and constantly expanding my technical knowledge.
              </p>
              <p>
                Outside of studying, I spend time working on personal projects, exploring new frameworks, and learning
                industry best practices in software development.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Location', value: 'Invercargill, NZ' },
                { label: 'Study', value: 'Bachelor of IT' },
                { label: 'Focus', value: 'Web Development' },
                { label: 'Status', value: 'Open to Work' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-900/50 border border-slate-800/60 rounded-lg px-3 py-2">
                  <div className="font-mono text-xs text-slate-500">{label}</div>
                  <div className="font-body text-sm text-slate-200 font-medium mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Skills ─── */}
        <section
          ref={skillsRef}
          aria-label="Technical skills"
          className={`mb-24 transition-all duration-700 delay-100
            ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            label="Toolkit"
            title="Skills & Technologies"
            subtitle="What I'm working with — and still learning."
          />
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">{category}</h3>
              {/* SkillBadge reused here for every skill */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {items.map(({ skill, level }) => (
                  <SkillBadge key={skill} skill={skill} level={level} />
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {[
              { level: 'Learning', color: 'text-amber-400 border-amber-400/30 bg-amber-400/10' },
              { level: 'Familiar', color: 'text-sky-400 border-sky-400/30 bg-sky-400/10' },
              { level: 'Proficient', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10' },
            ].map(({ level, color }) => (
              <span key={level} className={`font-mono text-xs px-3 py-1 rounded-full border ${color}`}>
                {level}
              </span>
            ))}
          </div>
        </section>

        {/* ─── Timeline ─── */}
        <section
          ref={timelineRef}
          aria-label="Education and experience timeline"
          className={`transition-all duration-700 delay-200
            ${timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            label="Journey"
            title="Education & Experience"
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-slate-700 to-transparent" aria-hidden="true" />

            <ol className="space-y-8">
              {timeline.map((item, i) => (
                <li key={i} className="pl-12 md:pl-16 relative group">
                  {/* Dot */}
                  <div
                    className="absolute left-2 md:left-4 top-1.5 w-4 h-4 rounded-full border-2 border-cyan-400 bg-slate-950 
                      group-hover:bg-cyan-400 transition-colors duration-300"
                    aria-hidden="true"
                  />
                  <div className="bg-slate-900/50 border border-slate-800/60 hover:border-cyan-400/25 
                    rounded-xl p-5 transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(34,211,238,0.06)]">
                    <div className="font-mono text-xs text-cyan-400 mb-1">{item.year}</div>
                    <h4 className="font-display font-semibold text-slate-100 text-base">{item.title}</h4>
                    <div className="font-body text-sm text-slate-500 mb-2">{item.org}</div>
                    <p className="font-body text-sm text-slate-400 leading-relaxed">{item.detail}</p>
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
