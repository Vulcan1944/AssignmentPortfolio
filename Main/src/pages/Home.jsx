import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import FrictionlessImage from '';

/* ================================================================
   FEATURED PROJECT DATA
   ================================================================ */
const FEATURED_PROJECT = {
  title: 'Friction-Less',
  description:
    'My current game project, an evolution of Friction-Less Arena. A fast paced story driven game built in Unity. Still in active development with new mechanics and levels being added regularly.',
  tags: ['Unity', 'C#', 'Game Design', '3D Modelling'],
  github: '#',
  demo: null,
  status: 'In Progress',
  image: FrictionlessImage,
  imageAlt: 'Friction-Less game preview',
};

/* ================================================================
   SYNTHWAVE SUN (STATIC)
   ================================================================ */
function SynthwaveSun() {
  return (
    <div className="relative mx-auto" style={{ width: '280px', height: '180px' }}>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
        style={{
          width: '280px',
          height: '280px',
          background:
            'linear-gradient(to bottom, #ffe600 0%, #ff8800 30%, #ff2d78 60%, #bf00ff 100%)',
        }}
      >
        {[38, 48, 57, 65, 72, 78, 84].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${top}%`,
              height: `${3 + i * 0.5}px`,
              backgroundColor: 'var(--bg-base)',
            }}
          />
        ))}
      </div>
    </div>
  );
}


/* ================================================================
   HOME PAGE
   ================================================================ */
export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        
        {/* Sun */}
        <div className="mb-6">
          <SynthwaveSun />
        </div>

        {/* Text */}
        <div className="text-center max-w-3xl">
          
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-wider mb-4">
            <span className="text-neon">Keegan</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Huxford</span>
          </h1>

          {/* Static subtitle */}
          <p className="font-mono text-lg mb-6" style={{ color: 'var(--cyan)' }}>
            IT Student • Web Developer • Game Developer
          </p>

          <p
            className="font-body text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Third-year IT student at SIT, Invercargill. Building games, websites,
            3D models, and music.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/projects" className="btn-neon-solid">
              View Projects
            </Link>
            <Link to="/about" className="btn-neon">
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 px-6" style={{ borderTop: '1px solid var(--pink-glow)' }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="// Featured"
            title="Latest Project"
            subtitle="What I'm actively working on right now."
          />
          <ProjectCard project={FEATURED_PROJECT} index={0} />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6" style={{ borderTop: '1px solid var(--pink-glow)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '3rd', label: 'Year of Study' },
            { value: '3+', label: 'Projects Built' },
            { value: '4', label: 'Creative Fields' },
            { value: '∞', label: 'Things to Learn' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-black text-3xl md:text-5xl text-neon mb-1">
                {value}
              </div>
              <div
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'var(--text-dim)' }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}