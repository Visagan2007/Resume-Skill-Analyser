import './SignUp.css';
import '../shared-auth.css';
import { Link } from 'react-router';
import { useState } from 'react';
import Icon from '../../UI/Icon';
import { AuthFeedback, AuthField, AuthFormHeading, PasswordField } from '../AuthFields';
import AuthJourney from '../AuthJourney';

const journeySteps = [
  { title: 'Your background', description: 'Experience, education, and domain', icon: 'file' },
  { title: 'Your strengths', description: 'Skills and credentials you bring', icon: 'plus' },
  {
    title: 'Your ambition',
    description: 'The role you want to grow into',
    icon: 'arrowUpRight',
    next: true,
  },
];

function SignUp() {
  const [today] = useState(() => {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    agreedToPreview: false,
  });
  const [feedback, setFeedback] = useState('');
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
    setFeedback('');
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    setFeedback(
      'Account creation is not connected in this preview. Your details have not been sent or saved. You can try the profile builder without an account.',
    );
  };

  return (
    <div className="auth-page auth-signup page-shell">
      <aside className="auth-story" aria-labelledby="signup-story-title">
        <Link className="auth-back-link" to="/">
          <Icon name="arrowLeft" /> Back to home
        </Link>
        <h2 id="signup-story-title">
          Start with you.
          <br />
          See what follows.
        </h2>
        <p>
          Your experience deserves a closer look. Put your strengths in perspective and give your
          next move a little more direction.
        </p>
        <AuthJourney title="A profile with perspective" steps={journeySteps} />
        <span className="auth-story-footnote">Build your profile at your own pace.</span>
      </aside>
      <div className="auth-form-shell">
        <div className="auth-form-panel">
          <AuthFormHeading
            title="Make a fresh start."
            description="A space for the professional you are becoming."
          />
          <form className="auth-form" onSubmit={handleSignUp}>
            <AuthField
              id="signup-username"
              label="Username"
              type="text"
              name="username"
              placeholder="Choose your username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <AuthField
              id="signup-email"
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
              id="signup-password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
              help="Use at least 8 characters."
            />
            <AuthField
              id="signup-dob"
              label={
                <>
                  Date of birth <span className="auth-optional">Optional</span>
                </>
              }
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              autoComplete="bday"
              max={today}
            />
            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="agreedToPreview"
                checked={formData.agreedToPreview}
                onChange={handleChange}
                required
              />
              <span>I understand this preview does not create an account.</span>
            </label>
            <AuthFeedback>{feedback}</AuthFeedback>
            <button type="submit" className="button button-primary auth-submit">
              Create account{' '}
              <span className="button-icon">
                <Icon name="arrowUpRight" />
              </span>
            </button>
          </form>
          <p className="auth-account-switch">
            Already have an account? <Link to="/SignIn">Sign in</Link>
          </p>
          <Link className="auth-without-account" to="/Analyze">
            Explore without an account <Icon name="arrowRight" />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
