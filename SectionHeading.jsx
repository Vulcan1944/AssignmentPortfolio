// Reusable section heading component — used across Home, About, and Projects pages
export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-14 text-center">
      {label && (
        <span className="inline-block font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase mb-3 border border-cyan-400/30 px-3 py-1 rounded-full bg-cyan-400/5">
          {label}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-100 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-5 flex items-center justify-center gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
        <div className="h-1 w-1 rounded-full bg-cyan-400" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/60" />
      </div>
    </div>
  );
}
