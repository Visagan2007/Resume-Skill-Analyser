import { useEffect, useRef } from 'react';

export default function GlassScenery() {
  const sceneryRef = useRef(null);

  useEffect(() => {
    const scenery = sceneryRef.current;
    const syncVisibility = () => scenery.toggleAttribute('data-paused', document.hidden);
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, []);

  return (
    <div ref={sceneryRef} className="glass-scenery" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
