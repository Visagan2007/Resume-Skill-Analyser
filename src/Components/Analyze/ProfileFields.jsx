import Icon from '../UI/Icon';
import SelectionField from './SelectionField';
import { focusOptions, stageFields } from './profileOptions.js';

export default function ProfileFields({ step, profile, onChange, onToggleFocus }) {
  return (
    <>
      <div className={step === 2 ? 'profile-skills-fields' : 'profile-field-grid'}>
        {stageFields[step - 1].map((field) => {
          const input = (
            <SelectionField
              key={field.name}
              name={field.name}
              label={field.label}
              options={field.options}
              placeholder={field.placeholder}
              optional={field.optional}
              value={field.multiple ? undefined : profile[field.name]}
              selected={field.multiple ? profile[field.name] : undefined}
              onChange={(value) => onChange(field.name, value)}
            />
          );
          return field.wide ? (
            <div className="profile-field-wide" key={field.name}>
              {input}
            </div>
          ) : (
            input
          );
        })}
      </div>
      {step === 3 && (
        <fieldset className="profile-focus">
          <legend>
            What matters most to you?<span>Optional</span>
          </legend>
          <div className="profile-focus-options">
            {focusOptions.map((option) => {
              const selected = profile.focusAreas.includes(option.id);
              return (
                <label key={option.id} className={selected ? 'is-selected' : ''}>
                  <input
                    type="checkbox"
                    name="focusAreas"
                    value={option.id}
                    checked={selected}
                    onChange={() => onToggleFocus(option.id)}
                  />
                  <span className="profile-focus-check">{selected && <Icon name="check" />}</span>
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.desc}</small>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
    </>
  );
}
