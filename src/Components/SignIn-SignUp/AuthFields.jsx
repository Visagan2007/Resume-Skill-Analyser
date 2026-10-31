import { useState } from 'react';
import Icon from '../UI/Icon';

function FieldLayout({ id, label, labelAction, help, children }) {
  const fieldLabel = <label htmlFor={id}>{label}</label>;

  return (
    <div className="auth-field">
      {labelAction ? (
        <div className="auth-label-row">
          {fieldLabel}
          {labelAction}
        </div>
      ) : (
        fieldLabel
      )}
      {children}
      {help && (
        <span id={`${id}-help`} className="auth-field-help">
          {help}
        </span>
      )}
    </div>
  );
}

export function AuthField({ id, label, ...inputProps }) {
  return (
    <FieldLayout id={id} label={label}>
      <div className="auth-field-shell">
        <input id={id} {...inputProps} />
      </div>
    </FieldLayout>
  );
}

export function PasswordField({ id, labelAction, help, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <FieldLayout id={id} label="Password" labelAction={labelAction} help={help}>
      <div className="auth-field-shell auth-password-field">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-describedby={help ? `${id}-help` : undefined}
          {...inputProps}
        />
        <button
          className="auth-password-toggle"
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          <Icon name={visible ? 'eyeOff' : 'eye'} />
        </button>
      </div>
    </FieldLayout>
  );
}

export function AuthFormHeading({ title, description }) {
  return (
    <div className="auth-form-heading">
      <span className="auth-small-mark" aria-hidden="true">
        <Icon name="leaf" />
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export function AuthFeedback({ children }) {
  if (!children) return null;
  return (
    <div className="auth-feedback" role="status">
      <Icon name="lock" />
      <p>{children}</p>
    </div>
  );
}
