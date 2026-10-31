import { memo } from 'react';
import Icon from '../UI/Icon.jsx';
import { profileStages } from './profileOptions.js';

function ProfileSidebar({ step, reviewing, profile, onEdit }) {
  const skillCount = profile.technicalSkills.length + profile.softSkills.length;

  return (
    <aside className="profile-sidebar" aria-label="Profile progress">
      <div className="profile-sidebar-heading">
        <span>Your profile</span>
        <span>{reviewing ? 'Ready' : `${step} of ${profileStages.length}`}</span>
      </div>
      <ol className="profile-stages">
        {profileStages.map((stage) => {
          const completed = reviewing || step > stage.number;
          const active = !reviewing && step === stage.number;
          return (
            <li key={stage.number}>
              <button
                type="button"
                className={`${active ? 'is-current' : ''} ${completed ? 'is-complete' : ''}`}
                aria-current={active ? 'step' : undefined}
                disabled={!reviewing && stage.number > step}
                onClick={() => onEdit(stage.number)}
              >
                <span className="profile-stage-number">
                  {completed ? <Icon name="check" /> : stage.number}
                </span>
                <span>
                  <strong>{stage.label}</strong>
                  <small>{stage.detail}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <section className="profile-live-summary">
        <h2>Taking shape</h2>
        <dl>
          <div>
            <dt>Your field</dt>
            <dd>{profile.domain || 'Add your professional domain'}</dd>
          </div>
          <div>
            <dt>Your strengths</dt>
            <dd>
              {skillCount
                ? `${skillCount} skill${skillCount === 1 ? '' : 's'} selected`
                : 'Ready to discover'}
            </dd>
          </div>
          <div>
            <dt>Your next role</dt>
            <dd>{profile.targetTitle || 'A direction worth exploring'}</dd>
          </div>
        </dl>
      </section>
      <p className="profile-tab-note">
        Your details stay in this tab.
        <br />
        Refreshing starts a new profile.
      </p>
    </aside>
  );
}

export default memo(ProfileSidebar);
