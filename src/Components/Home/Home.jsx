import './Home.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FaFileAlt, FaChartBar, FaLightbulb, FaRocket, FaCloudUploadAlt, FaCogs, FaCheckCircle } from 'react-icons/fa';

function Home() {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        const elements = containerRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="home-container" ref={containerRef}>

                {/* ── Hero ── */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>
                            Discover the Skills
                            <br />
                            <span className="hero-accent">That Set You Apart</span>
                        </h1>
                        <p className="hero-sub">
                            Upload your resume and let our AI identify your strengths,
                            uncover skill gaps, and deliver personalised recommendations
                            to accelerate your career.
                        </p>
                        <div className="hero-actions">
                            <Link to="/SignUp" className="hero-cta-primary">Analyze Your Resume</Link>
                            <a href="#features" className="hero-cta-secondary">Learn More</a>
                        </div>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Resumes Analyzed</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Skills Tracked</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Accuracy Rate</span>
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section className="features" id="features">
                    <div className="section-header reveal">
                        <h2>Powerful Features</h2>
                        <p>Everything you need to understand and improve your resume</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card reveal" style={{ '--delay': '0s' }}>
                            <div className="feature-icon">
                                <FaFileAlt />
                            </div>
                            <h3>Skill Extraction</h3>
                            <p>Our AI reads your resume and identifies every technical and soft skill, even the ones you didn&apos;t realise you had.</p>
                        </div>
                        <div className="feature-card reveal" style={{ '--delay': '0.12s' }}>
                            <div className="feature-icon">
                                <FaChartBar />
                            </div>
                            <h3>Gap Analysis</h3>
                            <p>Compare your skill set against industry standards and discover exactly where to focus your learning efforts.</p>
                        </div>
                        <div className="feature-card reveal" style={{ '--delay': '0.24s' }}>
                            <div className="feature-icon">
                                <FaLightbulb />
                            </div>
                            <h3>Smart Recommendations</h3>
                            <p>Get personalised suggestions for courses, certifications, and projects that will make your resume stand out.</p>
                        </div>
                        <div className="feature-card reveal" style={{ '--delay': '0.36s' }}>
                            <div className="feature-icon">
                                <FaRocket />
                            </div>
                            <h3>Career Growth</h3>
                            <p>Track your progress over time and see how your skills evolve as you advance in your career.</p>
                        </div>
                    </div>
                </section>

                {/* ── How It Works ── */}
                <section className="how-it-works" id="how-it-works">
                    <div className="section-header reveal">
                        <h2>How It Works</h2>
                        <p>Three simple steps to unlock your resume&apos;s potential</p>
                    </div>
                    <div className="steps">
                        <div className="step reveal" style={{ '--delay': '0s' }}>
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <FaCloudUploadAlt />
                            </div>
                            <h3>Upload Your Resume</h3>
                            <p>Drop your resume in PDF, DOCX, or plain text format. We handle the rest.</p>
                        </div>
                        <div className="step-connector reveal" style={{ '--delay': '0.1s' }}></div>
                        <div className="step reveal" style={{ '--delay': '0.2s' }}>
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <FaCogs />
                            </div>
                            <h3>AI-Powered Analysis</h3>
                            <p>Our engine parses your experience, maps your skills, and benchmarks against your target roles.</p>
                        </div>
                        <div className="step-connector reveal" style={{ '--delay': '0.3s' }}></div>
                        <div className="step reveal" style={{ '--delay': '0.4s' }}>
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <FaCheckCircle />
                            </div>
                            <h3>Get Actionable Results</h3>
                            <p>Receive a detailed report with scores, gaps, and a personalised roadmap for improvement.</p>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="cta-section">
                    <div className="cta-card reveal">
                        <h2>Ready to Unlock Your Potential?</h2>
                        <p>Join thousands of professionals who have improved their resumes and landed better opportunities.</p>
                        <Link to="/SignUp" className="cta-button">Get Started Free</Link>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Home;