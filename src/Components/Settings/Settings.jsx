import { memo } from 'react';
import Icon from '../UI/Icon.jsx';
import useVisualEffects from '../../useVisualEffects.js';
import './Settings.css';

const themes = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
];

const effects = [
  {
    value: 'full',
    label: 'Full effects',
    description: 'Liquid glass, fluid backgrounds, and smooth scrolling.',
  },
  {
    value: 'system',
    label: 'Use device settings',
    description: 'Follow your device’s motion and transparency preferences.',
  },
  {
    value: 'reduced',
    label: 'Reduced effects',
    description: 'Solid surfaces and minimal animation.',
  },
];

const ThemePreview = memo(function ThemePreview({ theme }) {
  return (
    <span className={`settings-theme-preview settings-theme-preview--${theme}`} aria-hidden="true">
      <span className="settings-preview-nav">
        <span>rsa.</span>
        <span className="settings-preview-dot" />
      </span>
      <span className="settings-preview-content">
        <span>Your next chapter.</span>
        <span className="settings-preview-profile">
          <span>Professional profile</span>
          <Icon name="arrowUpRight" size={13} />
        </span>
      </span>
    </span>
  );
});

export default function Settings({ theme, onThemeChange }) {
  const { preference, setPreference } = useVisualEffects();

  return (
    <div className="settings-page page-shell" data-ui>
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Choose how your workspace looks and feels.</p>
      </header>

      <section className="settings-section" aria-labelledby="settings-theme-title">
        <div className="settings-section-copy">
          <h2 id="settings-theme-title">Theme</h2>
          <p id="settings-theme-description">A lighter canvas or a softer evening palette.</p>
        </div>
        <fieldset
          className="settings-theme-options"
          aria-labelledby="settings-theme-title"
          aria-describedby="settings-theme-description"
        >
          {themes.map((choice) => (
            <label className="settings-theme-choice" key={choice.value}>
              <ThemePreview theme={choice.value} />
              <span className="settings-theme-label">
                <span>
                  <Icon name={choice.icon} size={17} />
                  {choice.label}
                </span>
                <input
                  type="radio"
                  name="site-theme"
                  value={choice.value}
                  checked={theme === choice.value}
                  onChange={() => onThemeChange(choice.value)}
                  onClick={() => onThemeChange(choice.value)}
                />
              </span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="settings-section" aria-labelledby="settings-effects-title">
        <div className="settings-section-copy">
          <h2 id="settings-effects-title">Visual effects</h2>
          <p id="settings-effects-description">
            Set the level of glass and motion that feels right for you.
          </p>
        </div>
        <fieldset
          className="settings-effects-options"
          aria-labelledby="settings-effects-title"
          aria-describedby="settings-effects-description"
        >
          {effects.map((choice) => (
            <label className="settings-effects-choice" key={choice.value}>
              <span>
                <strong>{choice.label}</strong>
                <small>{choice.description}</small>
              </span>
              <input
                type="radio"
                name="site-effects"
                value={choice.value}
                checked={preference === choice.value}
                onChange={() => setPreference(choice.value)}
                onClick={() => {
                  if (preference === choice.value) setPreference(choice.value);
                }}
              />
            </label>
          ))}
        </fieldset>
      </section>

      <p className="settings-save-note">
        <Icon name="check" size={16} />
        Changes apply automatically across the site. Preferences are saved in this browser.
      </p>
    </div>
  );
}
