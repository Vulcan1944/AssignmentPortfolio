export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-14 text-center">

      {label && (
        <p
          className="font-mono text-xs tracking-[0.25em] uppercase mb-3 inline-block"
          style={{ color: 'var(--cyan)' }}
        >
          {label}
        </p>
      )}

      <h2
        className="font-display font-black text-3xl md:text-4xl uppercase tracking-wider text-neon"
      >
        {title}
      </h2>

      <div className="mt-4 flex items-center justify-center gap-3">
        <div
          className="h-px w-16"
          style={{ background: 'linear-gradient(to right, transparent, var(--pink))' }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{ backgroundColor: 'var(--pink)', boxShadow: '0 0 8px var(--pink)' }}
        />
        <div
          className="h-px w-16"
          style={{ background: 'linear-gradient(to left, transparent, var(--pink))' }}
        />
      </div>

      {subtitle && (
        <p
          className="mt-5 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
