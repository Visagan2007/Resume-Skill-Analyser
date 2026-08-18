import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link to="/" className="nav-logo">
                    <span className="logo-mark">RSA</span>
                    <span className="logo-text">Resume Skill Analyser</span>
                </Link>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                </div>
                <div className="nav-actions">
                    <Link to="/SignIn" className="nav-signin">Sign In</Link>
                    <Link to="/SignUp" className="nav-signup">Get Started</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;