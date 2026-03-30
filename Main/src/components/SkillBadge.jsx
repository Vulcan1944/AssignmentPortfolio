export default function SkillBadge({ skill, level }) {

  const LEVEL_STYLES = {
    'Learning':  { color: '#ffe600', border: '#ffe60040', bg: '#ffe60010' }, // Yellow
    'Familiar':  { color: '#00f5ff', border: '#00f5ff40', bg: '#00f5ff10' }, // Cyan
    'Proficient':{ color: '#ff2d78', border: '#ff2d7840', bg: '#ff2d7810' }, // Pink
  };

  const style = LEVEL_STYLES[level] || LEVEL_STYLES['Learning'];

  return (
    <div
      className="flex flex-col items-center justify-center gap-1 px-3 py-3 border text-center
        transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{
        color:           style.color,
        borderColor:     style.border,
        backgroundColor: style.bg,
      }}
      title={`${skill} — ${level}`}
    >
      <span className="font-mono text-sm font-medium">{skill}</span>

      <span
        className="font-mono text-xs opacity-60"
        style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}
      >
        {level.toUpperCase()}
      </span>
    </div>
  );
}
