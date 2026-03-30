// Reusable badge for displaying skills — reused in About page skill grid
export default function SkillBadge({ skill, level }) {
  const levelColor = {
    Learning: 'from-amber-400/20 to-amber-400/5 border-amber-400/25 text-amber-300',
    Familiar: 'from-sky-400/20 to-sky-400/5 border-sky-400/25 text-sky-300',
    Proficient: 'from-cyan-400/20 to-cyan-400/5 border-cyan-400/25 text-cyan-300',
  };

  return (
    <div
      className={`group relative rounded-xl bg-gradient-to-b border px-4 py-3 text-center
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
        ${levelColor[level] || levelColor['Learning']}`}
    >
      <span className="font-mono text-sm font-medium block">{skill}</span>
      <span className="text-xs opacity-60 mt-0.5 block">{level}</span>
    </div>
  );
}
