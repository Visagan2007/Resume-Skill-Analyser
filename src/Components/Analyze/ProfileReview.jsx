import { memo, useMemo } from 'react';
import Icon from '../UI/Icon.jsx';
import { focusOptions } from './profileOptions.js';

function ProfileReview({ profile, onEdit, titleRef }) {
  const groups = [
    { label: 'Technical skills', skills: profile.technicalSkills },
    { label: 'People skills', skills: profile.softSkills },
    { label: 'Certifications', skills: profile.certifications },
  ];

  const focusSummary = useMemo(() => {
    if (!profile.focusAreas.length) return 'No specific focus areas selected.';
    const focusSet = new Set(profile.focusAreas);
    return focusOptions
      .filter((option) => focusSet.has(option.id))
      .map((option) => option.label)
      .join(' · ');
  }, [profile.focusAreas]);

  return (
    <div className="profile-review">
      <div className="profile-review-mark">
        <Icon name="check" />
      </div>
      <h2 ref={titleRef} tabIndex={-1}>
        Your profile, in focus.
      </h2>
      <p className="profile-form-description">
        Here is the foundation for your next move. Take a moment to make sure it feels like you.
      </p>
      <div className="profile-review-direction">
        <div>
          <span>Where you are</span>
          <strong>{profile.currentTitle}</strong>
        </div>
        <Icon name="arrowRight" />
        <div>
          <span>Where you want to go</span>
          <strong>{profile.targetTitle}</strong>
        </div>
      </div>
      <dl className="profile-review-details">
        <div>
          <dt>Professional domain</dt>
          <dd>{profile.domain}</dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>{profile.experience}</dd>
        </div>
        <div>
          <dt>Education</dt>
          <dd>
            {profile.education} · {profile.fieldOfStudy}
          </dd>
        </div>
        <div>
          <dt>Work preferences</dt>
          <dd>
            {profile.workMode} · {profile.noticePeriod} notice
          </dd>
        </div>
      </dl>
      {groups.map((group) => (
        <section className="profile-review-group" key={group.label}>
          <h3>
            {group.label}
            <span>{group.skills.length}</span>
          </h3>
          {group.skills.length ? (
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No {group.label.toLowerCase()} added.</p>
          )}
        </section>
      ))}
      <section className="profile-review-group">
        <h3>What you want to focus on</h3>
        <p>{focusSummary}</p>
      </section>
      <p className="profile-review-notice" role="status">
        <Icon name="lock" />
        This is a local review of your selections. Nothing has been submitted for analysis.
      </p>
      <button className="button button-primary" type="button" onClick={() => onEdit(1)}>
        Edit your profile
        <span className="button-icon">
          <Icon name="arrowLeft" />
        </span>
      </button>
    </div>
  );
}

export default memo(ProfileReview);
