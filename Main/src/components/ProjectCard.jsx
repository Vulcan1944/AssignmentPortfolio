/* ============================================================
   PROJECT CARD COMPONENT  (Reusable)
   Used on: Home page (featured) + Projects page (full list)

   Layout: Wide rectangle — text on left, image/gif on right.
   Replace the image placeholder with a real <img> or <video>
   by swapping the placeholder div with your actual media.

   Props:
     project.title       — project name
     project.description — short description text
     project.tags        — array of tech strings e.g. ['React', 'Unity']
     project.github      — GitHub URL string (optional)
     project.demo        — Live demo URL string (optional)
     project.status      — 'Live' | 'In Progress' | 'Complete'
     project.image       — image/gif path or URL (optional)
     project.imageAlt    — alt text for the image
   index — card number, used for animation stagger delay
   ============================================================ */

export default function ProjectCard({ project, index = 0 }) {
  const { title, description, tags, github, demo, status, image, imageAlt } = project;

  /* ── Status badge colour mapping — edit here to change badge colours ── */
  const STATUS_STYLES = {
    'Live':        { color: '#00ff88', borderColor: '#00ff8840', bg: '#00ff8812', dot: true },
    'In Progress': { color: '#ffe600', borderColor: '#ffe60040', bg: '#ffe60012', dot: false },
    'Complete':    { color: '#c090d8', borderColor: '#c090d840', bg: '#c090d812', dot: false },
  };
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES['Complete'];

  return (
    /* ── Outer card container — edit padding/border-radius here ── */
    <article
      className="card-synth flex flex-col md:flex-row gap-0 overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 0.12}s`, animationFillMode: 'both', opacity: 0 }}
      aria-label={`Project: ${title}`}
    >
      {/* ════════════════════════════════════
          LEFT SIDE — Text content
          ════════════════════════════════════ */}
      <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">

        {/* ── Card number + status row ── */}
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--text-dim)' }}
          >
            {/* Project index number — e.g. 01, 02, 03 */}
            // {String(index + 1).padStart(2, '0')}
          </span>

          {/* Status badge */}
          {status && (
            <span
              className="font-mono text-xs px-3 py-1 border flex items-center gap-1.5"
              style={{
                color:           statusStyle.color,
                borderColor:     statusStyle.borderColor,
                backgroundColor: statusStyle.bg,
              }}
            >
              {/* Pulsing dot for "Live" status */}
              {statusStyle.dot && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: statusStyle.color }}
                  aria-hidden="true"
                />
              )}
              {status}
            </span>
          )}
        </div>

        {/* ── Project title ── */}
        <h3
          className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>

        {/* ── Description ── */}
        <p
          className="font-body text-sm md:text-base leading-relaxed flex-grow"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>

        {/* ── Technology tags ── */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 border transition-colors duration-200"
              style={{
                color:           'var(--cyan)',
                borderColor:     'var(--cyan-glow)',
                backgroundColor: 'rgba(0, 245, 255, 0.05)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Action links row ── */}
        {(github || demo) && (
          <div
            className="flex gap-4 pt-4 border-t"
            style={{ borderColor: 'var(--pink-glow)' }}
          >
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon text-xs"
                aria-label={`View ${title} source code on GitHub`}
              >
                {/* GitHub icon */}
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                className="btn-neon text-xs"
                aria-label={`View live demo of ${title}`}
              >
                {/* External link icon */}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════
          RIGHT SIDE — Image / GIF panel
          To use a real image, replace the inner div with:
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
          ════════════════════════════════════ */}
      <div
        className="md:w-72 lg:w-80 flex-shrink-0 min-h-48 md:min-h-0 relative overflow-hidden border-t md:border-t-0 md:border-l"
        style={{ borderColor: 'var(--pink-glow)' }}
      >
        {image ? (
          /* ── Real image — swap placeholder once you have assets ── */
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
            style={{ minHeight: '200px' }}
          />
        ) : (
          /* ── Placeholder shown when no image is provided ── */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 min-h-48"
            style={{ backgroundColor: 'rgba(255, 45, 120, 0.04)' }}
          >
            {/* Decorative grid lines in placeholder */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(var(--pink) 1px, transparent 1px), linear-gradient(90deg, var(--pink) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-xs tracking-widest relative z-10"
              style={{ color: 'var(--text-dim)' }}
            >
              {/* Replace this placeholder text with your image/gif */}
              [ IMAGE / GIF ]
            </span>
            <span
              className="font-display text-xs uppercase tracking-widest relative z-10"
              style={{ color: 'var(--pink-glow)' }}
            >
              Add project.image
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
