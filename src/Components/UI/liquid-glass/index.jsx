import { memo, useEffect, useId, useRef } from 'react';
import { createGlassController } from './controller.js';

/**
 * Enhance existing semantic DOM with live glass optics derived from
 * dashersw/liquid-glass-js. Render once inside App; no component wrappers needed.
 */
function LiquidGlassEffectsComponent({ selector }) {
  const defsRef = useRef(null);
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');

  useEffect(() => createGlassController(defsRef.current, id, selector), [id, selector]);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs ref={defsRef} />
    </svg>
  );
}

export const LiquidGlassEffects = memo(LiquidGlassEffectsComponent);
export default LiquidGlassEffects;
