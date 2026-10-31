import assert from 'node:assert/strict';
import test from 'node:test';
import { createProfile, getStageValidity } from './profileState.js';

test('new profiles have independent selections and begin with no valid stages', () => {
  const first = createProfile();
  const second = createProfile();
  first.technicalSkills.push('JavaScript');
  first.focusAreas.pop();

  assert.deepEqual(getStageValidity(second), [false, false, false]);
  assert.deepEqual(second.technicalSkills, []);
  assert.deepEqual(second.focusAreas, ['technical', 'soft', 'ats']);
});

test('professional details must all match a supported option', () => {
  const profile = {
    ...createProfile(),
    domain: 'Software Development',
    currentTitle: 'Software Engineer',
    experience: '3 (Junior 2-4 yrs)',
    education: "Bachelor's Degree",
    fieldOfStudy: 'Computer Science',
  };
  assert.equal(getStageValidity(profile)[0], true);

  for (const field of ['domain', 'currentTitle', 'experience', 'education', 'fieldOfStudy']) {
    assert.equal(getStageValidity({ ...profile, [field]: '' })[0], false, field);
    assert.equal(getStageValidity({ ...profile, [field]: 'Unsupported option' })[0], false, field);
  }
});

test('one technical or people skill is sufficient; certifications alone are not', () => {
  const profile = createProfile();
  assert.equal(getStageValidity({ ...profile, certifications: ['PMP'] })[1], false);
  assert.equal(getStageValidity({ ...profile, technicalSkills: ['JavaScript'] })[1], true);
  assert.equal(getStageValidity({ ...profile, softSkills: ['Communication'] })[1], true);
});

test('target preferences require a supported role, work mode, and notice period', () => {
  const profile = {
    ...createProfile(),
    targetTitle: 'Software Engineer',
    workMode: 'Remote',
    noticePeriod: '30 Days',
  };
  assert.equal(getStageValidity(profile)[2], true);

  for (const field of ['targetTitle', 'workMode', 'noticePeriod']) {
    assert.equal(getStageValidity({ ...profile, [field]: '' })[2], false, field);
    assert.equal(getStageValidity({ ...profile, [field]: 'Unsupported option' })[2], false, field);
  }
});
