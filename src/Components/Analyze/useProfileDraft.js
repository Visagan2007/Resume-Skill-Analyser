import { createContext, useContext } from 'react';

export const ProfileDraftContext = createContext(null);

export function useProfileDraft() {
  const draft = useContext(ProfileDraftContext);
  if (!draft) throw new Error('useProfileDraft requires a ProfileDraftProvider.');
  return draft;
}
