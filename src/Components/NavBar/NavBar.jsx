import { memo } from 'react';
import { Link, NavLink } from 'react-router';
import BrandSymbol from '../UI/BrandSymbol.jsx';
import Icon from '../UI/Icon.jsx';
import useNavigationMenu from './useNavigationMenu.js';
import './NavBar.css';

const navigationItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/Analyze', label: 'Workspace' },
  { to: '/AboutUs', label: 'Our approach' },
];

const Brand = memo(function Brand() {
  return (
    <span className="brand">
      <BrandSymbol className="brand-symbol" />
      <span className="brand-name">
        rsa<span>.</span>
      </span>
      <span className="brand-description">
        Resume Skill
        <br />
        Analyser
      </span>
    </span>
  );
});

const BrandLink = memo(function BrandLink({ onClick }) {
  return (
    <Link className="nav-brand" to="/" aria-label="Resume Skill Analyser home" onClick={onClick}>
      <Brand />
    </Link>
  );
});

function NavBar() {
  const {
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
  } = useNavigationMenu();

  return (
    <>
      <header className={`site-header${menuOpen ? ' has-open-menu' : ''}`}>
        <nav className="navbar" aria-label="Main navigation">
          <BrandLink />
          <div className="nav-links">
            {navigationItems.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="nav-actions">
            <NavLink className="nav-signin" to="/SignIn">
              Sign in
            </NavLink>
            <Link className="button button-primary nav-cta" to="/Analyze">
              Build profile
              <span className="button-icon">
                <Icon name="arrowUpRight" size={17} />
              </span>
            </Link>
          </div>
          <div className="nav-controls">
            <button
              ref={menuButtonRef}
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={openMenu}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>
      <NavLink
        className="settings-link floating-settings"
        to="/Settings"
        aria-label="Settings"
        title="Settings"
        hidden={menuOpen}
      >
        <Icon name="settings" size={19} />
      </NavLink>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className={`mobile-menu${menuExpanded ? ' is-expanded' : ''}`}
        data-liquid-glass="off"
        aria-label="Navigation menu"
        onCancel={onCancel}
        onClose={onClose}
        onTransitionEnd={onTransitionEnd}
        onClick={onBackdropClick}
      >
        <div className="mobile-menu-top">
          <BrandLink onClick={() => closeMenu('main')} />
          <div className="nav-controls">
            <button
              ref={closeButtonRef}
              type="button"
              className={`menu-toggle${menuExpanded ? ' is-open' : ''}`}
              aria-label="Close navigation menu"
              onClick={() => closeMenu()}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="mobile-menu-expansion">
          <div className="mobile-menu-content">
            <nav aria-label="Mobile navigation">
              {navigationItems.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} onClick={() => closeMenu('main')}>
                  {label}
                  <Icon name="arrowUpRight" />
                </NavLink>
              ))}
              <NavLink to="/SignIn" onClick={() => closeMenu('main')}>
                Sign in
                <Icon name="arrowUpRight" />
              </NavLink>
            </nav>
            <Link className="button button-primary" to="/Analyze" onClick={() => closeMenu('main')}>
              Build my profile
              <span className="button-icon">
                <Icon name="arrowUpRight" />
              </span>
            </Link>
            <p>A little clarity for your next chapter.</p>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default memo(NavBar);
