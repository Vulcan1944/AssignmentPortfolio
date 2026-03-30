import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/',         label: 'Home'     },
  { path: '/about',    label: 'About'    },
  { path: '/projects', label: 'Projects' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 backdrop-blur-md border-b'
          : 'py-5'
      }`}
      style={isScrolled ? {
        backgroundColor: 'rgba(10, 0, 16, 0.92)',
        borderColor:      'var(--pink-glow)',
      } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <NavLink
          to="/"
          className="font-display font-black text-lg tracking-widest uppercase"
          style={{ color: 'var(--pink)' }}
          aria-label="Home"
        >
          Keegan Huxford
          <span
            className="text-xs ml-1 tracking-[0.2em] font-mono"
            style={{ color: 'var(--text-dim)' }}
          >
            .Portfollio
          </span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-display text-xs tracking-widest uppercase transition-all duration-300 ${
                    isActive ? '' : 'hover:opacity-100'
                  }`
                }
                style={({ isActive }) => ({
                  color:   isActive ? 'var(--pink)' : 'var(--text-secondary)',
                  opacity: isActive ? 1 : 0.7,
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                      style={{
                        width:      isActive ? '70%' : '0%',
                        background: 'var(--pink)',
                        boxShadow:  isActive ? '0 0 6px var(--pink)' : 'none',
                      }}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`}
                style={{ backgroundColor: 'var(--pink)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`}
                style={{ backgroundColor: 'var(--pink)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
                style={{ backgroundColor: 'var(--pink)' }} />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul
          className="flex flex-col px-6 pb-4 pt-2 gap-1 border-t"
          style={{
            backgroundColor: 'rgba(10, 0, 16, 0.97)',
            borderColor: 'var(--pink-glow)',
          }}
        >
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className="block px-4 py-3 font-display text-xs tracking-widest uppercase transition-all duration-200"
                style={({ isActive }) => ({
                  color:           isActive ? 'var(--pink)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--pink-glow)' : 'transparent',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
