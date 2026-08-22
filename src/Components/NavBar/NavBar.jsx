import './NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <span className="logo-mark">RSA</span>
                    <span className="logo-text">Resume Skill Analyser</span>
                </Link>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    type="button"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <div className="nav-links">
                        <NavLink to="/" end className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Home</NavLink>
                        <NavLink to="/Analyze" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Analyze</NavLink>
                        <NavLink to="/AboutUs" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>About Us</NavLink>
                    </div>
                    <div className="nav-actions">
                        <Link to="/SignIn" className="nav-signin" onClick={closeMenu}>Sign In</Link>
                        <Link to="/SignUp" className="nav-signup" onClick={closeMenu}>Get Started</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;