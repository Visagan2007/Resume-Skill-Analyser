import { useRef } from 'react';
import { Link } from 'react-router';
import Icon from '../UI/Icon.jsx';
import useScrollReveal from '../../hooks/useScrollReveal.js';
import CareerPreview from './CareerPreview.jsx';
import './Home.css';

const exampleSkills = [
  { label: 'JavaScript', category: 'technical' },
  { label: 'React', category: 'technical' },
  { label: 'Problem Solving', category: 'people' },
  { label: 'Git', category: 'technical' },
  { label: 'Communication', category: 'people' },
  { label: 'SQL', category: 'technical' },
];
const technicalSkillCount = exampleSkills.filter((skill) => skill.category === 'technical').length;
const peopleSkillCount = exampleSkills.length - technicalSkillCount;

export default function Home() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, '[data-reveal]', 'is-visible');

  return (
    <div className="home-page" ref={pageRef}>
      <section className="home-hero page-shell" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">
            <span>
              <span>Your skills.</span>
            </span>
            <span>
              <span>Your next move.</span>
            </span>
          </h1>
          <p className="hero-description">
            Make sense of your experience, map your skills, and build a profile for the role you
            want next.
          </p>
          <div className="hero-actions">
            <Link to="/Analyze" className="button button-primary">
              Build my profile
              <span className="button-icon">
                <Icon name="arrowUpRight" />
              </span>
            </Link>
            <Link to="#how-it-works" className="text-link">
              See how it works
              <Icon name="arrowRight" size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <span>
              <Icon name="check" size={14} />
              No account required
            </span>
            <span>Built around you</span>
          </div>
        </div>
        <CareerPreview />
        <div className="hero-bottom">
          <span>For the first role. The new direction. The next chapter.</span>
          <Link to="#inside" aria-label="Explore what is inside">
            <Icon name="arrowDown" size={18} />
          </Link>
        </div>
      </section>

      <section id="inside" className="inside-section page-shell" aria-labelledby="inside-title">
        <div className="section-intro" data-reveal>
          <h2 id="inside-title">
            Your skills,
            <br />
            in perspective.
          </h2>
          <p>
            Your experience tells a bigger story. Give it a little structure, and the next step
            becomes easier to see.
          </p>
        </div>
        <div className="insight-composition">
          <article className="foundation-story" data-reveal>
            <div className="inventory-stage" data-ui>
              <div className="inventory-paper">
                <div className="mini-window-heading">
                  <span>Your skill collection</span>
                  <Icon name="plus" size={19} />
                </div>
                <h3>Know what you bring.</h3>
                <div className="skill-collection">
                  {exampleSkills.map((skill) => (
                    <span key={skill.label}>
                      {skill.label}
                      <Icon name="close" size={13} />
                    </span>
                  ))}
                </div>
                <div className="inventory-categories">
                  <div>
                    <strong>{technicalSkillCount}</strong>
                    <span>Technical skills</span>
                  </div>
                  <div>
                    <strong>{peopleSkillCount}</strong>
                    <span>People skills</span>
                  </div>
                  <span className="inventory-check">
                    <Icon name="check" size={20} />
                  </span>
                </div>
                <p className="interface-note">An example collection, ready to grow.</p>
              </div>
            </div>
            <div className="story-copy">
              <h3>Start with your strengths.</h3>
              <p>
                Bring your technical skills, people skills, and credentials into one considered
                profile. Every part of your experience has a place.
              </p>
            </div>
          </article>
          <article className="direction-story" data-reveal>
            <div className="target-stage" data-ui>
              <div className="target-paper">
                <span className="target-symbol">
                  <Icon name="target" size={30} />
                </span>
                <span className="snapshot-caption">Your direction</span>
                <h3>Software Engineer</h3>
                <div className="target-detail">
                  <span>Preferred work style</span>
                  <strong>Hybrid</strong>
                </div>
                <div className="target-detail">
                  <span>Focus on</span>
                  <strong>Technical skills</strong>
                </div>
                <div className="target-foot">
                  <span>A goal that feels like you.</span>
                  <Icon name="arrowUpRight" size={18} />
                </div>
              </div>
            </div>
            <div className="story-copy">
              <h3>Give your ambition a shape.</h3>
              <p>
                A target role, a way of working, a new challenge. Define what matters to you, then
                build from there.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="process-section" aria-labelledby="process-title">
        <div className="page-shell">
          <div className="process-intro" data-reveal>
            <h2 id="process-title">
              A small start.
              <br />A clearer direction.
            </h2>
            <div>
              <p>
                No perfect resume needed. Just the experience you already have and a little room to
                think about what comes next.
              </p>
              <Link to="/Analyze" className="text-link">
                Let's build your profile
                <Icon name="arrowUpRight" size={18} />
              </Link>
            </div>
          </div>
          <ol className="process-flow">
            <li data-reveal>
              <span className="process-step-marker">
                <Icon name="file" size={24} />
              </span>
              <h3>Your professional story</h3>
              <p>Your field, experience, and education. Start with the foundations.</p>
              <span className="process-stage-label">Professional profile</span>
            </li>
            <li data-reveal>
              <span className="process-step-marker">
                <Icon name="plus" size={24} />
              </span>
              <h3>The skills you bring</h3>
              <p>The knowledge, strengths, and credentials that make your profile yours.</p>
              <span className="process-stage-label">Skills & credentials</span>
            </li>
            <li data-reveal>
              <span className="process-step-marker">
                <Icon name="arrowUpRight" size={24} />
              </span>
              <h3>Where you want to go</h3>
              <p>A role to work toward, with preferences that fit the life you want.</p>
              <span className="process-stage-label">Target preferences</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="perspective-section page-shell" aria-labelledby="perspective-title">
        <div className="perspective-art" data-ui data-reveal>
          <div className="perspective-paper">
            <span className="mini-window-heading">
              Your profile, in perspective
              <Icon name="chart" size={18} />
            </span>
            <div className="profile-path">
              <span className="path-node">Today</span>
              <span className="path-line" />
              <span className="path-node target-node">
                Next chapter
                <Icon name="arrowUpRight" size={15} />
              </span>
            </div>
            <div className="perspective-skills">
              <span>What you know</span>
              <span>What you'll build</span>
            </div>
            <p>
              Experience creates a foundation.
              <br />
              Intention gives it direction.
            </p>
          </div>
        </div>
        <div className="perspective-copy" data-reveal>
          <h2 id="perspective-title">
            Your career.
            <br />
            On your terms.
          </h2>
          <p>
            A job title is only part of the picture. Your skills, curiosity, and personal goals
            deserve space in the conversation, too.
          </p>
          <Link to="/AboutUs" className="text-link">
            Get to know our approach
            <Icon name="arrowUpRight" size={18} />
          </Link>
        </div>
      </section>

      <section className="closing-section page-shell" aria-labelledby="closing-title">
        <div className="closing-panel">
          <div data-reveal>
            <h2 id="closing-title">
              Ready for
              <br />
              what's next?
            </h2>
            <p>
              Start with what you know.
              <br />
              Make space for what you could become.
            </p>
          </div>
          <Link to="/Analyze" className="button button-primary" data-reveal>
            Find my starting point
            <span className="button-icon">
              <Icon name="arrowUpRight" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
