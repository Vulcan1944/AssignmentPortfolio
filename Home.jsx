import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';

// Featured projects shown on home page — reusing ProjectCard component
const featuredProjects = [
  {
    title: 'Student Task Manager',
    description: 'A full-stack web application for organising university assignments and deadlines, with priority tagging and due-date reminders.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    status: 'In Progress',
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather app consuming the OpenWeather API, displaying 5-day forecasts with animated condition icons.',
    tags: ['JavaScript', 'REST API', 'CSS Grid'],
    github: '#',
    demo: '#',
    status: 'Live',
  },
];

// Typing animation hook
function useTypingEffect(words, speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

export default function Home() {
  const heroRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver for hero fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const typedText = useTypingEffect(
    ['IT Student', 'Web Developer', 'Problem Solver', 'React Enthusiast'],
    90,
    2000
  );

  return (
    <main>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
        aria-label="Hero section"
      >
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-400/5 rounded-full blur-3xl animate-pulse-slow animate-delay-300" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div
          className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-xs text-cyan-400 border border-cyan-400/25 bg-cyan-400/5 px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-slate-100 leading-none tracking-tight mb-4">
            Keegan{' '}
            <span className="text-gradient">Huxford</span>
          </h1>

          {/* Typing subtitle */}
          <div className="h-10 flex items-center justify-center mb-6" aria-live="polite">
            <p className="font-mono text-lg md:text-xl text-slate-400">
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse align-middle" aria-hidden="true" />
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-400 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Studying a Bachelor of Information Technology in New Zealand, building modern web experiences
            and exploring the full stack — one project at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-display font-semibold
                px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:-translate-y-0.5"
            >
              View My Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-cyan-400/50 text-slate-300
                hover:text-cyan-400 font-display font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-24 px-6 border-t border-slate-800/50" aria-label="Featured projects">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Selected Work"
            title="Featured Projects"
            subtitle="A snapshot of what I've been building."
          />
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-cyan-400 hover:text-cyan-300 
                border border-cyan-400/30 hover:border-cyan-400/60 px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              See all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Quick Stats ─── */}
      <section className="py-16 px-6 border-t border-slate-800/50" aria-label="Quick stats">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '2+', label: 'Years Studying' },
            { value: '10+', label: 'Projects Built' },
            { value: '5+', label: 'Technologies' },
            { value: '∞', label: 'Things to Learn' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center group">
              <div className="font-display font-extrabold text-3xl md:text-4xl text-gradient mb-1 group-hover:scale-105 transition-transform duration-200">
                {value}
              </div>
              <div className="font-body text-xs text-slate-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
