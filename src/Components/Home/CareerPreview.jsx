import { memo, useCallback, useId, useState } from 'react';
import Icon from '../UI/Icon.jsx';

const examples = [
  {
    label: 'Software engineer',
    short: 'Engineering',
    skills: ['JavaScript', 'React', 'Git', 'SQL'],
    gaps: ['Docker', 'CI/CD'],
  },
  {
    label: 'Data scientist',
    short: 'Data science',
    skills: ['Python', 'SQL', 'Pandas', 'Statistics', 'Data Visualization'],
    gaps: ['Machine Learning'],
  },
  {
    label: 'UI/UX designer',
    short: 'Design',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Visual Design'],
    gaps: ['User Research', 'Design Systems'],
  },
];

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const CoverageRing = memo(function CoverageRing({ matched, total }) {
  return (
    <div className="coverage-ring">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="ring-track" cx="50" cy="50" r={RING_RADIUS} />
        <circle
          className="ring-value"
          cx="50"
          cy="50"
          r={RING_RADIUS}
          strokeDasharray={`${(RING_CIRCUMFERENCE * matched) / total} ${RING_CIRCUMFERENCE}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span>
        {matched}
        <small>/{total}</small>
      </span>
    </div>
  );
});

function CareerPreview() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  const tabId = useId();
  const total = example.skills.length + example.gaps.length;

  const changeTab = useCallback(
    (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? examples.length - 1
            : (selected + (event.key === 'ArrowRight' ? 1 : -1) + examples.length) %
              examples.length;
      setSelected(next);
      document.getElementById(`${tabId}-${next}`)?.focus();
    },
    [selected, tabId],
  );

  return (
    <div className="preview-stage" data-ui>
      <div className="preview-stage-label">
        <span className="live-dot" />A little career clarity<span>Interactive example</span>
      </div>
      <div className="career-preview-shell">
        <div className="career-preview">
          <div className="preview-topline">
            <span className="preview-logo">rsa.</span>
            <span className="sample-label">Sample profile</span>
          </div>
          <div className="preview-title">
            <div>
              <p>Your next chapter</p>
              <h2>Career snapshot</h2>
            </div>
            <span className="document-mark">
              <Icon name="file" size={23} />
            </span>
          </div>
          <div
            className="role-tabs"
            role="tablist"
            aria-label="Explore a sample career profile"
            onKeyDown={changeTab}
          >
            {examples.map((item, index) => (
              <button
                key={item.short}
                id={`${tabId}-${index}`}
                role="tab"
                aria-selected={selected === index}
                aria-controls={`${tabId}-panel`}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
              >
                {item.short}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`${tabId}-panel`}
            aria-labelledby={`${tabId}-${selected}`}
            className="snapshot-panel"
            tabIndex={0}
          >
            <div className="coverage-row">
              <CoverageRing matched={example.skills.length} total={total} />
              <div>
                <span className="snapshot-caption">Aiming for</span>
                <h3>{example.label}</h3>
                <p>
                  {example.skills.length} of {total} example focus skills present
                </p>
              </div>
            </div>
            <div className="snapshot-skills">
              <span className="snapshot-caption">Your foundations</span>
              <div>
                {example.skills.map((skill) => (
                  <span className="sample-skill" key={skill}>
                    <Icon name="check" size={13} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="snapshot-next">
              <span className="next-icon">
                <Icon name="arrowUpRight" size={19} />
              </span>
              <div>
                <p>A direction to explore</p>
                <strong>{example.gaps.join(' & ')}</strong>
              </div>
              <span className="next-count">+{example.gaps.length}</span>
            </div>
          </div>
          <div className="preview-bottom">
            <span>Illustrative skills, real possibilities.</span>
            <Icon name="lock" size={13} />
          </div>
        </div>
      </div>
      <div className="preview-stage-footer">
        <span>Less guesswork.</span>
        <span>
          More perspective.
          <Icon name="arrowUpRight" size={17} />
        </span>
      </div>
    </div>
  );
}

export default memo(CareerPreview);
