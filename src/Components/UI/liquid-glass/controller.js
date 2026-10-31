import { createOpticalMap, DISPLACEMENT_SCALE, measureSurface } from './optics';
import { getVisualPreferences, subscribeVisualEffects } from '../../../visualEffects';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const MAX_FILTERS = 48;
const HIGHLIGHT_SURFACE_SELECTOR = '.navbar, .preview-stage, .closing-panel, .about-principles';

const GLASS_SURFACE_SELECTOR = [
  '.navbar',
  '.mobile-menu',
  '.button',
  '.settings-link',
  '.menu-toggle',
  '.nav-links',
  '.nav-signin',
  '.role-tabs',
  '.role-tabs button',
  '.sample-skill',
  '.preview-stage',
  '.career-preview-shell',
  '.career-preview',
  '.snapshot-next',
  '.inventory-stage',
  '.inventory-paper',
  '.skill-collection > span',
  '.target-stage',
  '.target-paper',
  '.target-symbol',
  '.perspective-art',
  '.perspective-paper',
  '.process-flow > li',
  '.process-step-marker',
  '.closing-panel',
  '.site-footer',
  '.profile-workspace',
  '.profile-sidebar',
  '.profile-sheet-shell',
  '.profile-sheet',
  '.profile-stages button',
  '.profile-live-summary',
  '.profile-select',
  '.profile-options',
  '.profile-selected > li',
  '.profile-focus-options > label',
  '.profile-review-direction',
  '.profile-review-group',
  '.profile-review-notice',
  '.profile-back',
  '.auth-journey-shell',
  '.auth-journey',
  '.auth-form-panel',
  '.auth-field-shell',
  '.auth-feedback',
  '.auth-preview-note',
  '.auth-password-toggle',
  '.about-map-shell',
  '.about-map-paper',
  '.about-path-destination',
  '.about-principles',
  '.about-principle',
  '.about-close',
  '.notfound-art-shell',
  '.notfound-art',
  '.footer-disclosure > p',
  '.settings-theme-choice',
  '.settings-effects-options',
  '[data-liquid-glass]',
].join(', ');

// Refraction is restricted to larger surfaces; small controls share CSS glass.
const REFRACTION_SELECTOR = [
  '.navbar',
  '.mobile-menu',
  '.career-preview',
  '.inventory-paper',
  '.target-paper',
  '.perspective-paper',
  '.closing-panel',
  '.profile-sheet',
  '.profile-options',
  '.auth-journey',
  '.auth-form-panel',
  '.about-map-paper',
  '.notfound-art',
  '[data-liquid-glass="refract"]',
].join(', ');

function svgElement(name, attributes) {
  const element = document.createElementNS(SVG_NAMESPACE, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

function createFilter(id, dataUrl) {
  const filter = svgElement('filter', {
    id,
    x: '0%',
    y: '0%',
    width: '100%',
    height: '100%',
    'color-interpolation-filters': 'sRGB',
  });
  const image = svgElement('feImage', {
    href: dataUrl,
    x: '0',
    y: '0',
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'none',
    result: 'liquid-glass-map',
  });
  filter.append(
    image,
    svgElement('feDisplacementMap', {
      in: 'SourceGraphic',
      in2: 'liquid-glass-map',
      scale: DISPLACEMENT_SCALE,
      xChannelSelector: 'R',
      yChannelSelector: 'G',
    }),
  );
  return filter;
}

export function createGlassController(defs, id, selector = GLASS_SURFACE_SELECTOR) {
  if (!defs) return undefined;
  const surfaces = new Map();
  const filters = new Map();
  const pending = new Set();
  const finePointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
  // Referenced SVG backdrop filters are implemented by Chromium. Keep the
  // CSS blur fallback on other engines, even if their parser accepts url().
  const chromium =
    /Chrome|Chromium|Edg\//.test(navigator.userAgent) && !/OPR\//.test(navigator.userAgent);
  const supportsRefraction = chromium && CSS.supports('backdrop-filter', 'url("#glass")');
  let frame = 0;
  let scanFrame = 0;
  let pointerFrame = 0;
  let pointerEvent = null;
  let hovered = null;
  let disposed = false;
  let filterNumber = 0;

  function releaseFilter(state) {
    if (state.key) filters.get(state.key)?.users.delete(state.element);
    state.key = null;
    state.element.style.removeProperty('--liquid-glass-filter');
    delete state.element.dataset.liquidGlassReady;
  }

  function applyFilter(state, entry) {
    if (!entry.ready || disposed || getVisualPreferences().reducedTransparency) return;
    // Blur the live scene first, then bend only that scene. Text and
    // interactive children remain sharp because this is backdrop-filter.
    state.element.style.setProperty(
      '--liquid-glass-filter',
      `blur(14px) url("#${entry.id}") saturate(1.16)`,
    );
    state.element.dataset.liquidGlassReady = 'true';
  }

  function getFilter(measurement) {
    let entry = filters.get(measurement.key);
    if (entry) return entry;
    if (filters.size >= MAX_FILTERS) {
      for (const [key, candidate] of filters) {
        if (candidate.users.size === 0) {
          candidate.node.remove();
          filters.delete(key);
          break;
        }
      }
    }
    if (filters.size >= MAX_FILTERS) return null;
    const dataUrl = createOpticalMap(measurement.width, measurement.height, measurement.radius);
    if (!dataUrl) return null;
    const filterId = `liquid-glass-${id}-${filterNumber++}`;
    const node = createFilter(filterId, dataUrl);
    entry = { id: filterId, node, ready: false, users: new Set() };
    filters.set(measurement.key, entry);
    defs.appendChild(node);

    // Decode the map before exposing the URL so unsupported or failed
    // canvas/image handling always leaves the regular CSS blur intact.
    const image = new Image();
    image.src = dataUrl;
    image
      .decode()
      .then(() => {
        if (disposed || !node.isConnected) return;
        entry.ready = true;
        for (const element of entry.users) {
          const state = surfaces.get(element);
          if (state?.key === measurement.key) applyFilter(state, entry);
        }
      })
      .catch(() => {
        // The accessible CSS glass surface remains the fallback.
      });
    return entry;
  }

  function refreshSurface(element) {
    const state = surfaces.get(element);
    if (!state || !element.isConnected) return;
    if (
      !supportsRefraction ||
      getVisualPreferences().reducedTransparency ||
      !element.matches(REFRACTION_SELECTOR)
    ) {
      if (state.key) releaseFilter(state);
      return;
    }
    const measurement = measureSurface(element);
    if (!measurement) return;
    if (measurement.key === state.key) return;
    releaseFilter(state);
    const entry = getFilter(measurement);
    if (!entry) return;
    state.key = measurement.key;
    entry.users.add(element);
    applyFilter(state, entry);
  }

  function processPending() {
    frame = 0;
    let count = 0;
    for (const element of pending) {
      pending.delete(element);
      refreshSurface(element);
      count += 1;
      if (count >= 6) break;
    }
    if (pending.size) frame = window.requestAnimationFrame(processPending);
  }

  function scheduleSurface(element) {
    pending.add(element);
    if (!frame) frame = window.requestAnimationFrame(processPending);
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) scheduleSurface(entry.target);
  });

  function removeSurface(element, state) {
    releaseFilter(state);
    resizeObserver.unobserve(element);
    pending.delete(element);
    if (!state.hadClass) element.classList.remove('liquid-glass-surface');
    element.style.removeProperty('--glass-pointer-x');
    element.style.removeProperty('--glass-pointer-y');
    delete element.dataset.glassPointer;
    if (hovered === element) hovered = null;
    surfaces.delete(element);
  }

  function scan() {
    scanFrame = 0;
    if (disposed) return;
    for (const [element, state] of surfaces) {
      if (!element.isConnected) removeSurface(element, state);
    }
    for (const element of document.querySelectorAll(selector)) {
      if (surfaces.has(element) || element.dataset.liquidGlass === 'off') continue;
      const state = {
        element,
        key: null,
        hadClass: element.classList.contains('liquid-glass-surface'),
      };
      surfaces.set(element, state);
      element.classList.add('liquid-glass-surface');
      if (supportsRefraction && element.matches(REFRACTION_SELECTOR)) {
        resizeObserver.observe(element);
        scheduleSurface(element);
      }
    }
  }

  const mutationObserver = new MutationObserver((records) => {
    // Ignore the definitions we own; React route changes and new
    // dropdowns are picked up without re-running on every keystroke.
    if (records.every((record) => defs.contains(record.target))) return;
    if (!scanFrame) scanFrame = window.requestAnimationFrame(scan);
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  function resetPointer() {
    window.cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    pointerEvent = null;
    if (hovered) {
      hovered.style.removeProperty('--glass-pointer-x');
      hovered.style.removeProperty('--glass-pointer-y');
      delete hovered.dataset.glassPointer;
      hovered = null;
    }
  }

  function updatePointer() {
    pointerFrame = 0;
    const preferences = getVisualPreferences();
    const event = pointerEvent;
    if (
      !event ||
      preferences.reducedMotion ||
      preferences.reducedTransparency ||
      !finePointer.matches
    ) {
      resetPointer();
      return;
    }
    const target =
      event.target instanceof Element ? event.target.closest(HIGHLIGHT_SURFACE_SELECTOR) : null;
    if (target !== hovered) resetPointer();
    if (!target || !surfaces.has(target)) return;
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    hovered = target;
    target.style.setProperty('--glass-pointer-x', `${x.toFixed(1)}px`);
    target.style.setProperty('--glass-pointer-y', `${y.toFixed(1)}px`);
    target.dataset.glassPointer = 'true';
  }

  function onPointerMove(event) {
    if (event.pointerType === 'touch') {
      resetPointer();
      return;
    }
    pointerEvent = event;
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
  }

  function onPointerOut(event) {
    if (!event.relatedTarget) resetPointer();
  }

  function onPreferenceChange() {
    resetPointer();
    for (const element of surfaces.keys()) {
      if (supportsRefraction && element.matches(REFRACTION_SELECTOR)) scheduleSurface(element);
    }
  }

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', resetPointer);
  document.addEventListener('pointerout', onPointerOut);
  document.addEventListener('scroll', resetPointer, { passive: true, capture: true });
  document.addEventListener('visibilitychange', resetPointer);
  window.addEventListener('blur', resetPointer);
  window.addEventListener('resize', resetPointer);
  const unsubscribeEffects = subscribeVisualEffects(onPreferenceChange);
  finePointer.addEventListener('change', onPreferenceChange);
  scan();

  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    window.cancelAnimationFrame(scanFrame);
    window.cancelAnimationFrame(pointerFrame);
    mutationObserver.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerleave', resetPointer);
    document.removeEventListener('pointerout', onPointerOut);
    document.removeEventListener('scroll', resetPointer, true);
    document.removeEventListener('visibilitychange', resetPointer);
    window.removeEventListener('blur', resetPointer);
    window.removeEventListener('resize', resetPointer);
    unsubscribeEffects();
    finePointer.removeEventListener('change', onPreferenceChange);
    for (const [element, state] of surfaces) removeSurface(element, state);
    for (const entry of filters.values()) entry.node.remove();
    filters.clear();
  };
}
