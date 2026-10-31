import { useLayoutEffect, useRef } from 'react';
import Icon from '../UI/Icon';
import { scrollPageTo } from '../../smoothScroll.js';
import ProfileFields from './ProfileFields';
import ProfileReview from './ProfileReview';
import ProfileSidebar from './ProfileSidebar';
import { useProfileDraft } from './useProfileDraft.js';
import { profileStages } from './profileOptions.js';
import { getContinueHint, getStageValidity } from './profileState.js';
import './Analyze.css';

function Analyze() {
  const { formData, setFormData, step, setStep, reviewing, setReviewing } = useProfileDraft();
  const headingRef = useRef(null);
  const previousStage = useRef({ step, reviewing });

  useLayoutEffect(() => {
    const changed =
      previousStage.current.step !== step || previousStage.current.reviewing !== reviewing;
    previousStage.current = { step, reviewing };
    if (!changed) return;
    headingRef.current?.focus({ preventScroll: true });
    scrollPageTo(0);
  }, [step, reviewing]);

  const updateField = (name, value) => setFormData((previous) => ({ ...previous, [name]: value }));
  const toggleFocus = (id) =>
    setFormData((previous) => ({
      ...previous,
      focusAreas: previous.focusAreas.includes(id)
        ? previous.focusAreas.filter((item) => item !== id)
        : [...previous.focusAreas, id],
    }));
  const validStages = getStageValidity(formData);
  const canContinue = validStages[step - 1];
  const stage = profileStages[step - 1];
  const lastStep = step === profileStages.length;
  const editStage = (next) => {
    setReviewing(false);
    setStep(next);
  };
  const onContinue = (event) => {
    event.preventDefault();
    if (!canContinue) return;
    if (!lastStep) setStep((previous) => previous + 1);
    else if (validStages.every(Boolean)) setReviewing(true);
  };

  return (
    <div className="analyze-page page-shell">
      <header className="profile-page-header">
        <div>
          <h1>Build your profile.</h1>
          <p>A little context. A clearer picture of what comes next.</p>
        </div>
        <span className="profile-session-note">
          <Icon name="lock" />
          Your private workspace
        </span>
      </header>
      <div className="profile-workspace" data-ui>
        <ProfileSidebar step={step} reviewing={reviewing} profile={formData} onEdit={editStage} />
        <div className="profile-sheet-shell">
          <div className="profile-sheet">
            {reviewing ? (
              <ProfileReview profile={formData} onEdit={editStage} titleRef={headingRef} />
            ) : (
              <form className="profile-form" onSubmit={onContinue}>
                <div className="profile-form-content" key={step}>
                  <div className="profile-form-title-row">
                    <h2 ref={headingRef} tabIndex={-1}>
                      {stage.label}
                    </h2>
                    <span>
                      {step} / {profileStages.length}
                    </span>
                  </div>
                  <p className="profile-form-description">{stage.description}</p>
                  <ProfileFields
                    step={step}
                    profile={formData}
                    onChange={updateField}
                    onToggleFocus={toggleFocus}
                  />
                </div>
                <div className="profile-form-footer">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="profile-back"
                      onClick={() => setStep((previous) => previous - 1)}
                    >
                      <Icon name="arrowLeft" />
                      Back
                    </button>
                  ) : (
                    <p className="profile-required-note">All fields are required.</p>
                  )}
                  <div className="profile-continue">
                    <button
                      className="button button-primary"
                      type="submit"
                      disabled={!canContinue}
                      aria-describedby="profile-continue-hint"
                    >
                      {lastStep ? 'Review my profile' : 'Continue'}
                      <span className="button-icon">
                        <Icon name="arrowRight" />
                      </span>
                    </button>
                  </div>
                </div>
                <p id="profile-continue-hint" className="profile-continue-hint">
                  {getContinueHint(step, canContinue)}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyze;
