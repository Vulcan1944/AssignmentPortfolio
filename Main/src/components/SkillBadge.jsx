/* ============================================================
   SKILL BADGE COMPONENT  (Reusable)
   Used on: About page — rendered once per skill in the grid.

   Props:
     skill — the skill name string e.g. "React"
     level — proficiency level: 'Learning' | 'Familiar' | 'Proficient'

   To add a new level, add an entry to LEVEL_STYLES below.
   ============================================================ */

export default function SkillBadge({ skill, level }) {

  /* ── Level colour mapping — edit colours here ── */
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
      {/* Skill name */}
      <span className="font-mono text-sm font-medium">{skill}</span>

      {/* Proficiency level label */}
      <span
        className="font-mono text-xs opacity-60"
        style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}
      >
        {level.toUpperCase()}
      </span>
    </div>
  );
}
