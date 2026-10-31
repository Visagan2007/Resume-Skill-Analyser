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

const domainSet = new Set(domains);
const jobRoleSet = new Set(jobRoles);
const experienceBandSet = new Set(experienceBands);
const educationLevelSet = new Set(educationLevels);
const fieldOfStudySet = new Set(fieldsOfStudy);
const workModeSet = new Set(workModes);
const noticePeriodSet = new Set(noticePeriods);

export function getStageValidity(profile) {
  return [
    domainSet.has(profile.domain) &&
      jobRoleSet.has(profile.currentTitle) &&
      experienceBandSet.has(profile.experience) &&
      educationLevelSet.has(profile.education) &&
      fieldOfStudySet.has(profile.fieldOfStudy),
    profile.technicalSkills.length > 0 || profile.softSkills.length > 0,
    jobRoleSet.has(profile.targetTitle) &&
      workModeSet.has(profile.workMode) &&
      noticePeriodSet.has(profile.noticePeriod),
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
