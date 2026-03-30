import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';

// All projects data — in a real app this could be fetched from an API or CMS
const ALL_PROJECTS = [
  {
    title: 'Student Task Manager',
    description: 'A full-stack web app for managing university assignments and deadlines with priority tagging, status tracking, and due-date reminders.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    status: 'In Progress',
    category: 'Fullstack',
  },
  {
    title: 'Weather Dashboard',
    description: 'Responsive weather app consuming the OpenWeatherMap API, featuring 5-day forecasts, animated weather icons, and geolocation support.',
    tags: ['JavaScript', 'REST API', 'CSS Grid'],
    github: '#',
    demo: '#',
    status: 'Live',
    category: 'Frontend',
  },
  {
    title: 'Portfolio Website',
    description: 'This portfolio — built with React, React Router, and Tailwind CSS. Includes animations, a responsive layout, and multi-page routing.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    github: '#',
    demo: '#',
    status: 'Live',
    category: 'Frontend',
  },
  {
    title: 'Library Database System',
    description: 'A relational database project for a library management system. Includes complex SQL queries, stored procedures, and an ER diagram.',
    tags: ['SQL', 'MySQL', 'Database Design'],
    github: '#',
    status: 'Complete',
    category: 'Backend',
  },
  {
    title: 'Python CLI Quiz App',
    description: 'A command-line quiz application with multiple-choice questions, score tracking, and category filtering. Built as an intro to Python project.',
    tags: ['Python', 'CLI', 'OOP'],
    github: '#',
    status: 'Complete',
    category: 'Backend',
  },
  {
    title: 'Expense Tracker',
    description: 'A simple React app to log and categorise daily expenses, with a summary chart using Chart.js and local state management.',
    tags: ['React', 'Chart.js', 'useState'],
    github: '#',
    status: 'Live',
    category: 'Frontend',
  },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Fullstack'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Simulate async data fetch — demonstrates useEffect + data fetching requirement
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProjects(ALL_PROJECTS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Derived filtered list — reacts to filter + search state
  const filtered = projects.filter((p) => {
    const matchCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeading
          label="My Work"
          title="Projects"
          subtitle="A collection of things I've built while studying and experimenting."
        />

        {/* ─── Controls ─── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-xs px-4 py-2 rounded-xl border transition-all duration-200
                  ${activeFilter === cat
                    ? 'bg-cyan-400 text-slate-950 border-cyan-400 font-semibold shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                    : 'text-slate-400 border-slate-700 hover:border-cyan-400/40 hover:text-slate-200 bg-slate-900/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-56">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              className="w-full bg-slate-900/60 border border-slate-700/60 text-slate-300 placeholder-slate-500
                font-mono text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-cyan-400/50 
                focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* ─── Results count ─── */}
        {!loading && (
          <p className="font-mono text-xs text-slate-500 mb-6" aria-live="polite">
            Showing <span className="text-cyan-400">{filtered.length}</span> of {projects.length} projects
          </p>
        )}

        {/* ─── Grid ─── */}
        {loading ? (
          // Loading skeleton — reusing the card shape
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading projects">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 h-56 animate-pulse"
                aria-hidden="true"
              >
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-2/3" />
                    <div className="h-3 bg-slate-800 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-800 rounded" />
                  <div className="h-3 bg-slate-800 rounded w-5/6" />
                  <div className="h-3 bg-slate-800 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ProjectCard component reused for every project */}
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" role="status">
            <div className="text-4xl mb-4" aria-hidden="true">🔍</div>
            <p className="font-display text-slate-400 text-lg">No projects found</p>
            <p className="font-mono text-slate-600 text-sm mt-2">Try a different filter or search term</p>
          </div>
        )}

      </div>
    </main>
  );
}
