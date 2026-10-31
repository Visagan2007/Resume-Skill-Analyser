import { memo, useEffect, useRef } from 'react';

function GlassScenery() {
  const sceneryRef = useRef(null);

  useEffect(() => {
    const scenery = sceneryRef.current;
    if (!scenery) return undefined;
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

export default memo(GlassScenery);
