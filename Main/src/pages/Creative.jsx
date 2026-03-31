import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';

const MODEL_PATH = 'models/SentinalMkVWeb.glb';

const MUSIC_TRACKS = [
  {
    id:          1,
    title:       'Friction-Less Main Menu',
    audioSrc:    '/music/FrictionLessMainMenu.mp3',
  },
  {
    id:          2,
    title:       'Friction-Less Battle Music',
    audioSrc:    '/music/battle.mp3',
  },
];

function ModelViewer({ modelPath }) {
  const mountRef = useRef(null);
  const [status,   setStatus]   = useState('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationId;
    let renderer;
    let isMounted = true;

    const init = async () => {
      try {
        const THREE             = await import('three');
        const { GLTFLoader }    = await import('three/addons/loaders/GLTFLoader.js');
        const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

        if (!isMounted || !mountRef.current) return;

        const container = mountRef.current;
        const W = container.clientWidth;
        const H = container.clientHeight;

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.set(0, 0, 5);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const pinkLight = new THREE.DirectionalLight(0xff2d78, 2.5);
        pinkLight.position.set(3, 5, 3);
        scene.add(pinkLight);
        const cyanLight = new THREE.DirectionalLight(0x00f5ff, 1.5);
        cyanLight.position.set(-3, 2, -2);
        scene.add(cyanLight);
        const purpleBack = new THREE.PointLight(0xbf00ff, 2, 10);
        purpleBack.position.set(0, -1, -4);
        scene.add(purpleBack);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping   = true;
        controls.dampingFactor   = 0.05;
        controls.enablePan       = false;
        controls.autoRotate      = true;
        controls.autoRotateSpeed = 1.2;
        controls.target.set(0, 0, 0);

        const loader = new GLTFLoader();
        loader.load(
          modelPath,
          (gltf) => {
            if (!isMounted) return;
            const model = gltf.scene;

            scene.add(model);
            const rawBox  = new THREE.Box3().setFromObject(model);
            const rawSize = rawBox.getSize(new THREE.Vector3());

            model.scale.setScalar(2 / Math.max(rawSize.x, rawSize.y, rawSize.z));

            const scaledBox    = new THREE.Box3().setFromObject(model);
            const scaledCentre = scaledBox.getCenter(new THREE.Vector3());
            const scaledSize   = scaledBox.getSize(new THREE.Vector3());
            model.position.set(-scaledCentre.x, -scaledCentre.y, -scaledCentre.z);

            
            const fittedMax = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
            const camDist   = (fittedMax / (2 * Math.tan((Math.PI / 180) * 22.5))) * 1.6;
            camera.position.set(0, 0, camDist);
            camera.lookAt(0, 0, 0);

            controls.minDistance = camDist * 0.5;
            controls.maxDistance = camDist * 1.8;
            controls.target.set(0, 0, 0);
            controls.update();

            setStatus('ready');
          },
          (xhr) => {
            if (xhr.total > 0) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
          },
          () => { if (isMounted) setStatus('error'); }
        );

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
          if (!container) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
          isMounted = false;
          window.removeEventListener('resize', onResize);
          cancelAnimationFrame(animationId);
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };

      } catch (err) {
        console.error('Three.js error:', err);
        if (isMounted) setStatus('error');
      }
    };

    let cleanup;
    init().then(fn => { cleanup = fn; });
    return () => {
      isMounted = false;
      if (cleanup) cleanup();
    };
  }, [modelPath]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '360px', border: '1px solid var(--pink-glow)' }}
    >
      {status === 'loading' && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: 'var(--pink)', borderTopColor: 'transparent' }}
            aria-hidden="true"
          />
          <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            {progress > 0 ? `Loading model... ${progress}%` : 'Initialising...'}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <p className="font-display text-sm uppercase tracking-widest" style={{ color: 'var(--pink)' }}>
            Could not load model
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            Check MODEL_PATH at the top of Creative.jsx
          </p>
        </div>
      )}

      <div ref={mountRef} className="w-full h-full" aria-label="Interactive 3D model viewer" />
    </div>
  );
}

function MusicCard({ track, index }) {
  const { title, audioSrc, embedUrl } = track;

  return (
    <div
      className="flex flex-col border transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--pink-glow)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--pink)';
        e.currentTarget.style.boxShadow   = 'var(--shadow-pink)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--pink-glow)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      <div
        className="h-1 w-full"
        style={{
          background: index === 0
            ? 'linear-gradient(to right, var(--pink), var(--purple))'
            : 'linear-gradient(to right, var(--purple), var(--cyan))',
        }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-dim)' }}>
              // Track {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display font-bold text-xl uppercase tracking-wide"
                style={{ color: 'var(--text-primary)' }}>
              {title}
            </h3>
          </div>
          <span className="font-display text-3xl opacity-20" style={{ color: 'var(--pink)' }} aria-hidden="true">
            ♪
          </span>
        </div>

        {embedUrl ? (
          <iframe title={title} src={embedUrl} width="100%" height="120" allow="autoplay" style={{ border: 'none' }} />
        ) : audioSrc ? (
          <audio controls className="w-full" aria-label={`Play ${title}`}>
            <source src={audioSrc} type="audio/mpeg" />
          </audio>
        ) : (
          <div
            className="flex items-center justify-center gap-3 py-5 border border-dashed"
            style={{ borderColor: 'var(--pink-glow)' }}
          >
            <div className="flex items-end gap-0.5 h-8" aria-hidden="true">
              {[3,6,4,8,5,7,3,6,4,5,8,4,6,3,7,5,4,6].map((h, i) => (
                <div key={i} className="w-1 rounded-sm opacity-40"
                     style={{ height: `${h * 3}px`, backgroundColor: i % 2 === 0 ? 'var(--pink)' : 'var(--purple)' }} />
              ))}
            </div>
            <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
              Set audioSrc or embedUrl in Creative.jsx
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Creative() {
  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeading
          label="// Hobbies"
          title="Creative"
        />

        <section className="mb-6" aria-label="3D model showcase">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs" style={{ color: 'var(--pink)' }}>◆</span>
            <h2 className="font-display text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--text-secondary)' }}>
              3D Modelling — Blender
            </h2>
            <div className="flex-1 h-px"
                 style={{ background: 'linear-gradient(to right, var(--pink-glow), transparent)' }}
                 aria-hidden="true" />
          </div>

          {MODEL_PATH
            ? <ModelViewer modelPath={MODEL_PATH} />
            : (
              <div
                className="w-full flex items-center justify-center"
                style={{ height: '360px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--pink-glow)' }}
              >
                <p className="font-mono text-xs text-center" style={{ color: 'var(--text-dim)' }}>
                  Set <span style={{ color: 'var(--cyan)' }}>MODEL_PATH</span> at the top of Creative.jsx
                </p>
              </div>
            )
          }
        </section>

        <div className="divider-neon my-16" aria-hidden="true" />

        <section aria-label="Music tracks">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs" style={{ color: 'var(--pink)' }}>◇</span>
            <h2 className="font-display text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--text-secondary)' }}>
              Music Production — FL Studio
            </h2>
            <div className="flex-1 h-px"
                 style={{ background: 'linear-gradient(to right, var(--pink-glow), transparent)' }}
                 aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MUSIC_TRACKS.map((track, i) => (
              <MusicCard key={track.id} track={track} index={i} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}