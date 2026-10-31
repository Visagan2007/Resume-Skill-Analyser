import { memo } from 'react';
import Icon from '../UI/Icon.jsx';

function AuthJourney({ title, steps }) {
  return (
    <div className="auth-journey-shell" data-ui>
      <div className="auth-journey">
        <div className="auth-journey-heading">
          <span>{title}</span>
          <Icon name="leaf" />
        </div>
        {steps.map(({ title: stepTitle, description, icon, next }) => (
          <div className={`auth-journey-row${next ? ' auth-journey-next' : ''}`} key={stepTitle}>
            <span className="auth-journey-symbol">
              <Icon name={icon} />
            </span>
            <div>
              <strong>{stepTitle}</strong>
              <span>{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(AuthJourney);
