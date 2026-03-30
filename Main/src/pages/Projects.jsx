/* ============================================================
   PROJECTS PAGE
   Displays 3 projects as large horizontal cards.
   Each card shows text on the left and an image slot on the right.

   Sections:
     1. Header / intro
     2. Filter tabs (optional filtering by category)
     3. Project cards list
   ============================================================ */

import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard    from '../components/ProjectCard';

/* ================================================================
   ALL PROJECTS DATA
   Edit this array to update your projects.

   Fields:
     title       — project name
     description — paragraph describing the project
     tags        — array of technology/tool strings
     github      — GitHub URL (use '#' as placeholder, or null to hide)
     demo        — live demo / itch.io URL (or null to hide button)
     status      — 'Live' | 'In Progress' | 'Complete'
     category    — used for filter tabs: 'Web' | 'Game' | 'Other'
     image       — path to image or gif, e.g. '/images/project.gif'
                   Set to null to show the placeholder box.
     imageAlt    — accessibility alt text for the image
   ================================================================ */
const ALL_PROJECTS = [
  {
    /* ── Project 1: This Portfolio ── */
    title:       'Portfolio Website',
    description: 'My personal portfolio — the site you are looking at right now. Built with React, React Router, and Tailwind CSS. Features a full synthwave 80s aesthetic, multi-page routing, scroll animations, and a typing effect on the home page.',
    tags:        ['React', 'React Router', 'Tailwind CSS', 'Vite', 'JavaScript'],
    github:      '#',    // ← Replace with real GitHub URL
    demo:        '#',    // ← Replace with live Vercel/GitHub Pages URL
    status:      'Live',
    category:    'Web',
    image:       null,   // ← Replace with '/images/portfolio-preview.png'
    imageAlt:    'Portfolio website screenshot',
  },
  {
    /* ── Project 2: Friction-Less Arena ── */
    title:       'Friction-Less Arena',
    description: 'A physics-based arena game developed in Unity. Players navigate a frictionless surface, managing momentum to outmanoeuvre obstacles and opponents. My first complete game — developed to explore Unity\'s physics engine and C# scripting.',
    tags:        ['Unity', 'C#', 'Game Design', 'Physics', '3D Modelling'],
    github:      '#',    // ← Replace with real GitHub URL
    demo:        null,   // ← Replace with itch.io link when published
    status:      'Complete',
    category:    'Game',
    image:       null,   // ← Replace with '/images/friction-less-arena.gif'
    imageAlt:    'Friction-Less Arena gameplay screenshot',
  },
  {
    /* ── Project 3: Friction-Less (sequel) ── */
    title:       'Friction-Less',
    description: 'The next evolution of Friction-Less Arena. A more refined and expanded game with improved mechanics, new level designs, and enhanced visuals. Currently in active development — pushing the physics-based gameplay further with new challenges and environments.',
    tags:        ['Unity', 'C#', 'Game Design', '3D Modelling', 'Level Design'],
    github:      '#',    // ← Replace with real GitHub URL
    demo:        null,   // ← Add demo link when ready
    status:      'In Progress',
    category:    'Game',
    image:       null,   // ← Replace with '/images/friction-less.gif'
    imageAlt:    'Friction-Less game preview',
  },
];

/* ── Filter tab options — matches the "category" field in projects above ── */
const FILTER_TABS = ['All', 'Web', 'Game'];

/* ================================================================
   PROJECTS PAGE — Main Component
   ================================================================ */
export default function Projects() {
  const [projects,      setProjects]      = useState([]);
  const [isLoading,     setIsLoading]     = useState(true);
  const [activeFilter,  setActiveFilter]  = useState('All');

  /* ── Simulated async data load — demonstrates useEffect + data fetching ──
     In a real app, replace this with a fetch() call to an API or CMS.     */
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProjects(ALL_PROJECTS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  /* ── Derived filtered list — recalculates whenever filter changes ── */
  const filteredProjects = projects.filter(p =>
    activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeading
          label="// Work"
          title="Projects"
          subtitle="Games, websites, and everything in between."
        />

        {/* ════════════════════════════════════════════════════════
            FILTER TABS
            Click to filter projects by category.
            ════════════════════════════════════════════════════════ */}
        <div
          className="flex flex-wrap gap-3 mb-10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeFilter === tab}
              onClick={() => setActiveFilter(tab)}
              className="font-display text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200"
              style={activeFilter === tab ? {
                /* Active tab — filled pink */
                backgroundColor: 'var(--pink)',
                borderColor:     'var(--pink)',
                color:           'var(--bg-base)',
                boxShadow:       'var(--shadow-pink)',
              } : {
                /* Inactive tab — outlined */
                backgroundColor: 'transparent',
                borderColor:     'var(--pink-glow)',
                color:           'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                if (activeFilter !== tab) {
                  e.currentTarget.style.borderColor = 'var(--pink)';
                  e.currentTarget.style.color       = 'var(--pink)';
                }
              }}
              onMouseLeave={e => {
                if (activeFilter !== tab) {
                  e.currentTarget.style.borderColor = 'var(--pink-glow)';
                  e.currentTarget.style.color       = 'var(--text-secondary)';
                }
              }}
            >
              {tab}
            </button>
          ))}

          {/* Results count */}
          {!isLoading && (
            <span
              className="ml-auto font-mono text-xs self-center"
              style={{ color: 'var(--text-dim)' }}
              aria-live="polite"
            >
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════
            PROJECT CARDS LIST
            Each ProjectCard is a wide rectangle with image on right.
            ════════════════════════════════════════════════════════ */}
        {isLoading ? (
          /* ── Loading skeleton placeholders ── */
          <div className="space-y-6" aria-busy="true" aria-label="Loading projects">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-52 animate-pulse border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor:     'var(--pink-glow)',
                }}
                aria-hidden="true"
              />
            ))}
          </div>

        ) : filteredProjects.length > 0 ? (
          /* ── Actual project cards — stacked vertically ── */
          <div className="space-y-6">
            {filteredProjects.map((project, i) => (
              /* ProjectCard is reused here for every project */
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

        ) : (
          /* ── Empty state when no projects match the filter ── */
          <div className="text-center py-24" role="status">
            <p
              className="font-display text-lg uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              No projects in this category yet
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
              Check back soon
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
