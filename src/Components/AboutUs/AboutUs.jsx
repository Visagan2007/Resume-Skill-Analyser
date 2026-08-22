import './AboutUs.css';
import { FaShieldAlt, FaBrain, FaUsers, FaHeart } from 'react-icons/fa';

function AboutUs() {
    return (
        <div className="about-page">
            <div className="about-container">

                {/* ── Hero ── */}
                <section className="about-hero">
                    <h1>About <span className="about-accent">Resume Skill Analyser</span></h1>
                    <p className="about-mission">
                        We&apos;re on a mission to help every professional unlock their full career potential.
                        Our AI-powered platform analyses your resume, identifies skill gaps, and provides
                        actionable insights to help you stand out in today&apos;s competitive job market.
                    </p>
                </section>

                {/* ── Values ── */}
                <section className="about-values">
                    <h2>What We Believe In</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon"><FaBrain /></div>
                            <h3>AI-First Approach</h3>
                            <p>We leverage cutting-edge artificial intelligence to deliver insights that go beyond surface-level analysis.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon"><FaShieldAlt /></div>
                            <h3>Privacy &amp; Security</h3>
                            <p>Your resume data is encrypted and never shared. We take your privacy seriously at every step.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon"><FaUsers /></div>
                            <h3>Built for Everyone</h3>
                            <p>Whether you&apos;re a fresh graduate or a seasoned executive, our tools adapt to your career stage.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon"><FaHeart /></div>
                            <h3>Continuous Improvement</h3>
                            <p>We constantly update our algorithms to keep up with evolving industry trends and hiring practices.</p>
                        </div>
                    </div>
                </section>

                {/* ── Stats ── */}
                <section className="about-stats">
                    <div className="about-stat">
                        <span className="about-stat-number">10,000+</span>
                        <span className="about-stat-label">Resumes Analyzed</span>
                    </div>
                    <div className="about-stat">
                        <span className="about-stat-number">95%</span>
                        <span className="about-stat-label">User Satisfaction</span>
                    </div>
                    <div className="about-stat">
                        <span className="about-stat-number">50+</span>
                        <span className="about-stat-label">Industries Covered</span>
                    </div>
                    <div className="about-stat">
                        <span className="about-stat-number">24/7</span>
                        <span className="about-stat-label">Available Anytime</span>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default AboutUs;
