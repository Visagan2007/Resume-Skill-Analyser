import './SignIn.css';
import '../shared-auth.css';
import { Link } from 'react-router';
import { useState } from 'react';
import Icon from '../../UI/Icon';
import { AuthFeedback, AuthField, AuthFormHeading, PasswordField } from '../AuthFields';
import AuthJourney from '../AuthJourney';

const journeySteps = [
  { title: 'Where you are', description: 'Your professional background', icon: 'check' },
  { title: 'What you bring', description: 'Technical and people skills', icon: 'check' },
  {
    title: 'Where you could go',
    description: 'A direction worth working toward',
    icon: 'arrowUpRight',
    next: true,
  },
];

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setFeedback('');
  };
  const handleSignIn = (event) => {
    event.preventDefault();
    setFeedback(
      'Sign-in is not connected in this preview. You can explore the profile builder without an account.',
    );
  };

  return (
    <div className="auth-page auth-signin page-shell">
      <aside className="auth-story" aria-labelledby="signin-story-title">
        <Link className="auth-back-link" to="/">
          <Icon name="arrowLeft" /> Back to home
        </Link>
        <h2 id="signin-story-title">
          Make room for
          <br />
          your next move.
        </h2>
        <p>
          A little clarity goes a long way. Bring your experience, your skills, and an idea of where
          you want to go.
        </p>
        <AuthJourney title="Your career, considered" steps={journeySteps} />
        <span className="auth-story-footnote">A more thoughtful way to see your potential.</span>
      </aside>
      <div className="auth-form-shell">
        <div className="auth-form-panel">
          <AuthFormHeading title="Welcome back." description="Your next chapter starts with you." />
          <form className="auth-form" onSubmit={handleSignIn}>
            <AuthField
              id="signin-email"
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <PasswordField
              id="signin-password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              labelAction={
                <button
                  className="auth-text-button"
                  type="button"
                  onClick={() =>
                    setFeedback(
                      'Password reset is not connected in this preview. No reset email has been sent.',
                    )
                  }
                >
                  Forgot password?
                </button>
              }
            />
            <AuthFeedback>{feedback}</AuthFeedback>
            <button type="submit" className="button button-primary auth-submit">
              Sign in{' '}
              <span className="button-icon">
                <Icon name="arrowUpRight" />
              </span>
            </button>
          </form>
          <div className="auth-preview-note">
            <Icon name="lock" />
            <span>Account access is not connected in this preview.</span>
          </div>
          <div className="auth-form-alternative">
            <span>Just looking around?</span>
            <Link to="/Analyze">
              Try the profile builder <Icon name="arrowRight" />
            </Link>
          </div>
          <p className="auth-account-switch">
            New here? <Link to="/SignUp">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
