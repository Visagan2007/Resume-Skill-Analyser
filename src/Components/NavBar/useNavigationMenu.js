import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getVisualPreferences } from '../../visualEffects';
import { setPageScrollLocked } from '../../smoothScroll.js';

export default function useNavigationMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const dialogRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openingFrameRef = useRef(0);
  const closingTimerRef = useRef(0);
  const returnFocusRef = useRef('trigger');

  const finishClose = useCallback(() => {
    clearTimeout(closingTimerRef.current);
    closingTimerRef.current = 0;
    dialogRef.current?.close();
    setMenuOpen(false);
    setMenuExpanded(false);
  }, []);

  useLayoutEffect(() => {
    if (!menuOpen) return undefined;
    const dialog = dialogRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    setPageScrollLocked(true);
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
    dialog.getBoundingClientRect();
    openingFrameRef.current = requestAnimationFrame(() => {
      openingFrameRef.current = 0;
      setMenuExpanded(true);
    });
    return () => {
      cancelAnimationFrame(openingFrameRef.current);
      clearTimeout(closingTimerRef.current);
      openingFrameRef.current = 0;
      closingTimerRef.current = 0;
      dialog.close();
      document.body.style.overflow = previousOverflow;
      setPageScrollLocked(false);
      const target =
        returnFocusRef.current === 'main' ? document.getElementById('main-content') : menuButton;
      target?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const onChange = (event) => {
      if (!event.matches || !dialogRef.current?.open) return;
      cancelAnimationFrame(openingFrameRef.current);
      returnFocusRef.current = 'main';
      finishClose();
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [finishClose]);

  const openMenu = () => {
    returnFocusRef.current = 'trigger';
    setMenuOpen(true);
  };

  const closeMenu = (returnFocus = 'trigger') => {
    if (closingTimerRef.current || !dialogRef.current?.open) return;
    returnFocusRef.current = returnFocus;
    cancelAnimationFrame(openingFrameRef.current);
    setMenuExpanded(false);
    if (!menuExpanded || getVisualPreferences().reducedMotion) finishClose();
    else closingTimerRef.current = window.setTimeout(finishClose, 360);
  };

  const onCancel = (event) => {
    event.preventDefault();
    closeMenu();
  };

  const onClose = (event) => {
    if (!event.currentTarget.open) {
      setMenuOpen(false);
      setMenuExpanded(false);
    }
  };

  const onTransitionEnd = (event) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === 'grid-template-rows' &&
      !menuExpanded
    )
      finishClose();
  };

  const onBackdropClick = (event) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeMenu();
  };

  return {
    menuOpen,
    menuExpanded,
    dialogRef,
    menuButtonRef,
    closeButtonRef,
    openMenu,
    closeMenu,
    onCancel,
    onClose,
    onTransitionEnd,
    onBackdropClick,
  };
}
