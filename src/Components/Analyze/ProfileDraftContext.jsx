import { useMemo, useState } from 'react';
import { createProfile } from './profileState.js';
import { ProfileDraftContext } from './useProfileDraft.js';

export function ProfileDraftProvider({ children }) {
  const [formData, setFormData] = useState(createProfile);
  const [step, setStep] = useState(1);
  const [reviewing, setReviewing] = useState(false);
  const value = useMemo(
    () => ({ formData, setFormData, step, setStep, reviewing, setReviewing }),
    [formData, step, reviewing],
  );

  return <ProfileDraftContext.Provider value={value}>{children}</ProfileDraftContext.Provider>;
}
