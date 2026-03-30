export default function ProjectCard({ project, index = 0 }) {
  const { title, description, tags, status, image, imageAlt } = project;

  const STATUS_STYLES = {
    'In Progress': { color: '#ffe600', borderColor: '#ffe60040', bg: '#ffe60012', dot: false },
    'Complete':    { color: '#ffe600', borderColor: '#ffe600', bg: '#09bd09b4', dot: false },
  };
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES['Complete'];

  return (
    <article
      className="card-synth flex flex-col md:flex-row gap-0 overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 0.12}s`, animationFillMode: 'both', opacity: 0 }}
      aria-label={`Project: ${title}`}
    >
      <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--text-dim)' }}
          >
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
              {status}
            </span>
          )}
        </div>

        <h3
          className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>

        <p
          className="font-body text-sm md:text-base leading-relaxed flex-grow"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>

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
      </div>

      <div
        className="md:w-72 lg:w-80 flex-shrink-0 min-h-48 md:min-h-0 relative overflow-hidden border-t md:border-t-0 md:border-l"
        style={{ borderColor: 'var(--pink-glow)' }}
      >
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
            style={{ minHeight: '200px' }}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 min-h-48"
            style={{ backgroundColor: 'rgba(255, 45, 120, 0.04)' }}
          >
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
