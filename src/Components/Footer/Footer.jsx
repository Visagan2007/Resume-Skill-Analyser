import { memo } from 'react';
import { Link, NavLink } from 'react-router';
import Icon from '../UI/Icon.jsx';
import BrandSymbol from '../UI/BrandSymbol.jsx';
import { scrollPageTo } from '../../smoothScroll.js';
import './Footer.css';

const currentYear = new Date().getFullYear();

function backToTop() {
  document.getElementById('main-content')?.focus({ preventScroll: true });
  scrollPageTo(0);
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-panel" data-liquid-glass>
        <div className="footer-masthead">
          <span className="footer-name">
            <BrandSymbol />
            Resume Skill Analyser
          </span>
          <button className="footer-top-button" type="button" onClick={backToTop}>
            Back to top
            <span>
              <Icon name="arrowUpRight" size={18} />
            </span>
          </button>
        </div>
        <div className="footer-main">
          <div className="footer-signature">
            <Link className="footer-brand" to="/" aria-label="Resume Skill Analyser home">
              <span aria-hidden="true">
                rsa<span className="footer-brand-dot">.</span>
              </span>
            </Link>
            <p>
              Make sense of your experience.
              <br />
              Make room for what comes next.
            </p>
          </div>
          <div className="footer-invitation">
            <h2>
              Your next chapter.
              <br />
              <span>It starts with you.</span>
            </h2>
            <Link className="footer-profile-link" to="/Analyze">
              Build my profile
              <span>
                <Icon name="arrowUpRight" size={22} />
              </span>
            </Link>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-nav-group">
              <h3>Explore</h3>
              <NavLink to="/" end>
                Overview
                <Icon name="arrowUpRight" size={15} />
              </NavLink>
              <NavLink to="/Analyze">
                Your workspace
                <Icon name="arrowUpRight" size={15} />
              </NavLink>
              <NavLink to="/AboutUs">
                Our approach
                <Icon name="arrowUpRight" size={15} />
              </NavLink>
              <NavLink to="/Settings">
                Settings
                <Icon name="arrowUpRight" size={15} />
              </NavLink>
            </div>
            <div className="footer-nav-group">
              <h3>Your account</h3>
              <NavLink to="/SignIn">
                Sign in
                <Icon name="arrowUpRight" size={15} />
              </NavLink>
              <NavLink to="/SignUp">
                Create an account
                <Icon name="arrowUpRight" size={15} />
              </NavLink>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {currentYear} Resume Skill Analyser</span>
          <span className="footer-colophon">Made for your next chapter.</span>
          <details className="footer-disclosure">
            <summary>
              About this preview
              <Icon name="plus" size={15} />
            </summary>
            <p>
              Your profile stays in the current browser session. Sign-in and automated analysis are
              not connected to a service yet.
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
