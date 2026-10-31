import { Link } from 'react-router';
import Icon from '../UI/Icon';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page page-shell">
      <div className="notfound-content">
        <p className="notfound-context">Page not found</p>
        <h1>This path ends here.</h1>
        <p className="notfound-description">
          The page you&apos;re looking for has moved, or the address isn&apos;t quite right.
          There&apos;s still a good place to start.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="button button-primary">
            Back to home
            <span className="button-icon">
              <Icon name="arrowUpRight" />
            </span>
          </Link>
          <Link to="/Analyze" className="notfound-profile-link">
            Build your profile
            <Icon name="arrowRight" />
          </Link>
        </div>
      </div>
      <div className="notfound-art-shell" aria-hidden="true">
        <div className="notfound-art">
          <span className="notfound-number">404</span>
          <span className="notfound-route">
            <span />A different direction awaits
            <Icon name="arrowUpRight" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
