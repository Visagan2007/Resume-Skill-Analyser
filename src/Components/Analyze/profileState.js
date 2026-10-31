import {
  domains,
  educationLevels,
  experienceBands,
  fieldsOfStudy,
  jobRoles,
  noticePeriods,
  workModes,
} from './profileOptions.js';

export function createProfile() {
  return {
    domain: '',
    currentTitle: '',
    experience: '',
    education: '',
    fieldOfStudy: '',
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    targetTitle: '',
    workMode: '',
    noticePeriod: '',
    focusAreas: ['technical', 'soft', 'ats'],
  };
}

export function getStageValidity(profile) {
  return [
    domains.includes(profile.domain) &&
      jobRoles.includes(profile.currentTitle) &&
      experienceBands.includes(profile.experience) &&
      educationLevels.includes(profile.education) &&
      fieldsOfStudy.includes(profile.fieldOfStudy),
    profile.technicalSkills.length > 0 || profile.softSkills.length > 0,
    jobRoles.includes(profile.targetTitle) &&
      workModes.includes(profile.workMode) &&
      noticePeriods.includes(profile.noticePeriod),
  ];
}

export function getContinueHint(step, canContinue) {
  if (!canContinue) {
    return step === 2
      ? 'Select at least one technical or people skill to continue.'
      : 'Choose an option for each field to continue.';
  }
  return step === 3
    ? 'Review your selections before you finish.'
    : 'You can return to this step and make changes.';
}
