// Reusable card component for displaying individual projects
export default function ProjectCard({ project, index }) {
  const { title, description, tags, github, demo, status } = project;

  return (
    <article
      className="group relative bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden
        hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,211,238,0.08)]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Top accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 flex flex-col h-full gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 
              border border-cyan-400/20 flex items-center justify-center flex-shrink-0
              group-hover:border-cyan-400/40 transition-colors duration-300">
              <span className="font-mono text-xs font-medium text-cyan-400">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-100 leading-snug group-hover:text-cyan-300 transition-colors duration-300">
              {title}
            </h3>
          </div>

          {status && (
            <span className={`flex-shrink-0 text-xs font-mono px-2.5 py-1 rounded-full border
              ${status === 'Live'
                ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
                : status === 'In Progress'
                ? 'text-amber-400 border-amber-400/30 bg-amber-400/10'
                : 'text-slate-400 border-slate-600/50 bg-slate-800/50'
              }`}>
              {status === 'Live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />}
              {status}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm font-body leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-slate-400 bg-slate-800/80 border border-slate-700/60 
                px-2.5 py-1 rounded-md hover:text-cyan-400 hover:border-cyan-400/30 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(github || demo) && (
          <div className="flex gap-3 pt-1 border-t border-slate-800/60">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label={`View ${title} on GitHub`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label={`View live demo of ${title}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
