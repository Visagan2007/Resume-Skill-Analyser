import { useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal.js';
import { Link } from 'react-router';
import Icon from '../UI/Icon';
import './AboutUs.css';

const principles = [
  {
    title: 'Start with your experience.',
    text: 'A job title is only part of the story. Bring your domain, education, and professional background into the picture.',
  },
  {
    title: 'Make your skills visible.',
    text: 'Give technical skills, people skills, and certifications their own space. Recognise what you already bring to a role.',
  },
  {
    title: 'Choose your own direction.',
    text: 'A useful next step starts with your goals. Set a target role and the working preferences that matter to you.',
  },
];

function AboutUs() {
  const pageRef = useRef(null);

  useScrollReveal(pageRef, '[data-about-reveal]', 'about-in-view');

  return (
    <div className="about-page" ref={pageRef}>
      <div className="page-shell">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-copy">
            <p className="about-context">About Resume Skill Analyser</p>
            <h1 id="about-title">
              <span>A clearer way</span>
              <span>to move forward.</span>
            </h1>
            <p className="about-intro">
              There&apos;s a story behind every job title. We&apos;re building a thoughtful way to
              see your experience, understand your skills, and decide what comes next.
            </p>
            <Link to="/Analyze" className="button button-primary">
              Explore your profile
              <span className="button-icon">
                <Icon name="arrowUpRight" />
              </span>
            </Link>
          </div>
          <div className="about-map-shell" data-ui>
            <div className="about-map-paper">
              <div className="about-map-heading">
                <span className="about-map-symbol">
                  <Icon name="target" />
                </span>
                <span>Your career, in context</span>
              </div>
              <p className="about-map-caption">An example path through the profile</p>
              <div className="about-path">
                <div className="about-path-node">
                  <span className="about-path-dot">
                    <Icon name="check" />
                  </span>
                  <div>
                    <span className="about-path-label">Your foundation</span>
                    <strong>Software Development</strong>
                    <p>Computer Science · Bachelor&apos;s Degree</p>
                  </div>
                </div>
                <div className="about-path-node">
                  <span className="about-path-dot">
                    <Icon name="check" />
                  </span>
                  <div>
                    <span className="about-path-label">What you bring</span>
                    <strong>Junior Software Engineer</strong>
                    <div className="about-skill-list">
                      <span>JavaScript</span>
                      <span>Problem Solving</span>
                      <span>Git</span>
                    </div>
                  </div>
                </div>
                <div className="about-path-node about-path-destination">
                  <span className="about-path-dot">
                    <Icon name="arrowUpRight" />
                  </span>
                  <div>
                    <span className="about-path-label">Where you want to go</span>
                    <strong>Software Engineer</strong>
                    <p>A direction that starts with you.</p>
                  </div>
                </div>
              </div>
              <p className="about-map-footnote">
                <Icon name="leaf" /> Room to grow. A place to begin.
              </p>
            </div>
          </div>
        </section>
        <section className="about-reason" aria-labelledby="about-reason-title" data-about-reveal>
          <h2 id="about-reason-title">
            Less guesswork.
            <br />
            More perspective.
          </h2>
          <div className="about-reason-copy">
            <p>
              A resume can hold years of work in a few lines. It doesn&apos;t always make the
              connections clear: the skills you use every day, the strengths you take for granted,
              or the role you&apos;re working towards.
            </p>
            <p>
              Resume Skill Analyser brings those pieces together. The starting point is a structured
              profile, built around your professional background, skills, and target preferences.
            </p>
          </div>
        </section>
        <section
          className="about-principles"
          aria-labelledby="about-principles-title"
          data-about-reveal
        >
          <div className="about-principles-intro">
            <h2 id="about-principles-title">
              Built around
              <br />
              your next chapter.
            </h2>
            <p>Three simple ideas guide the experience.</p>
          </div>
          <div className="about-principle-list">
            {principles.map((principle) => (
              <article className="about-principle" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="about-close" aria-labelledby="about-close-title" data-about-reveal>
          <div>
            <h2 id="about-close-title">Make space for what&apos;s next.</h2>
            <p>Start with what you know. Add where you want to go.</p>
          </div>
          <Link to="/Analyze" className="button button-primary">
            Build my profile
            <span className="button-icon">
              <Icon name="arrowUpRight" />
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
