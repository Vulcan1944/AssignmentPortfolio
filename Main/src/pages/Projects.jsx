import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard    from '../components/ProjectCard';
import FrictionlessImage from '../Images/Frictionless.png';
import FrictionlessArenaImage from '../Images/FrictionLessArena.png';

const ALL_PROJECTS = [
  {
    title:       'Portfolio Website',
    description: 'My personal portfolio the site you are looking at right now. Built with React, React Router, and Tailwind CSS. Features a full synthwave 80s aesthetic and multi-page routing.',
    tags:        ['React', 'React Router', 'Tailwind CSS', 'JavaScript'],
    status:      'In Progress',
    category:    'Web',
    image:       null,
    imageAlt:    'Portfolio website screenshot',
  },
  {
    title:       'Friction-Less Arena',
    description: 'A arena game developed in Unity. Players navigate an rogulike arena, managing momentum to outmanoeuvre obstacles and opponents. My first complete game developed to explore Unity\'s engine and C# scripting.',
    tags:        ['Unity', 'C#', 'Game Design', '3D Modelling'],
    status:      'Complete',
    category:    'Game',
    image:       FrictionlessArenaImage,
    imageAlt:    'Friction-Less Arena gameplay screenshot',
  },
  {
    title:       'Friction-Less',
    description: 'The next evolution of Friction-Less. A more refined and expanded game with improved mechanics, new level designs, and enhanced visuals. Currently in active development.',
    tags:        ['Unity', 'C#', 'Game Design', '3D Modelling', 'Level Design'],
    status:      'In Progress',
    category:    'Game',
    image:       FrictionlessImage,
    imageAlt:    'Friction-Less game preview',
  },
];

const FILTER_TABS = ['All', 'Web', 'Game'];

export default function Projects() {
  const [projects,      setProjects]      = useState([]);
  const [isLoading,     setIsLoading]     = useState(true);
  const [activeFilter,  setActiveFilter]  = useState('All');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProjects(ALL_PROJECTS);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(p =>
    activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeading
          label="// Work"
          title="Projects"
        />

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
                backgroundColor: 'var(--pink)',
                borderColor:     'var(--pink)',
                color:           'var(--bg-base)',
                boxShadow:       'var(--shadow-pink)',
              } : {
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

        {isLoading ? (
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
          <div className="space-y-6">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

        ) : (
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
