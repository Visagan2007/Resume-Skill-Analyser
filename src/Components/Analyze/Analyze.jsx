import './Analyze.css';
import { useState, useRef, useEffect } from 'react';
import { FaCheck, FaArrowRight, FaArrowLeft, FaTimes } from 'react-icons/fa';

// --- Data extracted from CSV ---
const jobRoles = [
    'Account Executive', 'Architect', 'Architecture Intern', 'Associate Product Manager', 'Business Analyst', 'Business Analyst Intern',
    'Business Development Executive', 'Chief Financial Officer', 'Chief Human Resources Officer', 'Chief Information Security Officer',
    'Chief Marketing Officer', 'Civil Engineer', 'Civil Engineering Intern', 'Cloud Solutions Architect', 'Content Strategist',
    'Content Writer', 'Content Writing Intern', 'Corporate Counsel', 'Curriculum Coordinator', 'Customer Success Associate',
    'Customer Success Lead', 'Customer Support Executive', 'Customer Support Intern', 'Data Engineer', 'Data Engineering Intern',
    'Data Science Intern', 'Data Scientist', 'Design Director', 'Design Engineer', 'DevOps Engineer', 'DevOps Intern',
    'Digital Marketing Executive', 'Director of Business Analysis', 'Director of HR', 'Director of Operations', 'Electrical Design Intern',
    'Engineering Director', 'Finance Controller', 'Finance Intern', 'Finance Manager', 'Financial Analyst', 'General Counsel',
    'Group Product Manager', 'HR Executive', 'HR Generalist', 'HR Intern', 'HR Manager', 'Head of Content', 'Head of Customer Success',
    'Head of Design', 'Head of Electrical Engineering', 'Head of Engineering', 'Head of IT Infrastructure', 'Head of Quality Engineering',
    'IT Support Intern', 'Infrastructure Lead', 'Junior Architect', 'Junior Business Analyst', 'Junior Data Engineer',
    'Junior Data Scientist', 'Junior DevOps Engineer', 'Junior Electrical Engineer', 'Junior Security Analyst', 'Junior Software Engineer',
    'Junior UI/UX Designer', 'Lead Business Analyst', 'Lead Content Strategist', 'Lead Data Engineer', 'Lead Data Scientist',
    'Lead Product Designer', 'Lead Software Engineer', 'Legal Associate', 'Legal Intern', 'Marketing Intern', 'Marketing Manager',
    'Marketing Specialist', 'Mechanical Design Intern', 'Mechanical Engineer', 'Network Engineer', 'Operations Intern',
    'Operations Manager', 'Principal Architect', 'Principal Cloud Architect', 'Principal Data Engineer', 'Principal Data Scientist',
    'Principal Electrical Engineer', 'Principal Mechanical Engineer', 'Principal Software Engineer', 'Product Management Intern',
    'Product Manager', 'Project Manager - Infrastructure', 'QA Automation Engineer', 'QA Engineer', 'QA Intern', 'QA Lead',
    'Sales Intern', 'Sales Manager', 'School Principal', 'Security Analyst', 'Security Analyst Intern', 'Security Architect',
    'Senior Account Manager', 'Senior Architect', 'Senior Business Analyst', 'Senior Civil Engineer', 'Senior Content Writer',
    'Senior Corporate Counsel', 'Senior Customer Success Manager', 'Senior Data Engineer', 'Senior Data Scientist',
    'Senior DevOps Engineer', 'Senior Electrical Engineer', 'Senior Financial Analyst', 'Senior Legal Associate',
    'Senior Marketing Manager', 'Senior Mechanical Engineer', 'Senior Network Engineer', 'Senior Operations Manager',
    'Senior Product Designer', 'Senior Product Manager', 'Senior QA Engineer', 'Senior Security Analyst', 'Senior Software Engineer',
    'Senior Teacher', 'Site Engineer', 'Software Engineer', 'Software Engineer Trainee', 'Subject Teacher', 'Supply Chain Analyst',
    'Systems Administrator', 'Teaching Assistant', 'UI/UX Design Intern', 'UI/UX Designer', 'VP of Product', 'VP of Sales', 'VP of Supply Chain', 'Vice Principal'
].sort();

const domains = [
    'Architecture', 'Business Analysis', 'Civil Engineering', 'Content Writing & Communications', 'Customer Support / Success',
    'Cybersecurity', 'Data Engineering', 'Data Science', 'DevOps / Cloud', 'Electrical Engineering', 'Finance', 'Human Resources',
    'Legal', 'Marketing', 'Mechanical Engineering', 'Network & Systems Administration', 'Product Management', 'Quality Assurance',
    'Sales & Business Development', 'Software Development', 'Supply Chain & Operations', 'Teaching & Education', 'UI/UX Design'
].sort();

const educationLevels = ["Bachelor's Degree", "Master's Degree", "PhD", "CA / CFA", "MBA", "LLB", "LLM"];

const fieldsOfStudy = [
    'Accounting', 'Architecture', 'Business Administration', 'Civil Engineering', 'Computer Engineering', 'Computer Science',
    'Cybersecurity', 'Data Science', 'Design', 'Education', 'Electrical Engineering', 'Electronics & Communication Engineering',
    'English Literature', 'Finance', 'Fine Arts', 'Human Resources', 'Industrial Engineering', 'Information Security',
    'Information Technology', 'Journalism & Mass Communication', 'Law', 'Marketing', 'Mass Communication', 'Mechanical Engineering',
    'Operations Management', 'Statistics', 'Structural Engineering', 'Urban Planning'
].sort();

const experienceBands = [
    '0.5 (Entry-level 0-1 yrs)', '3 (Junior 2-4 yrs)', '6 (Mid-level 5-7 yrs)', '9 (Senior 8-10 yrs)', '12 (Lead 11-13 yrs)', '15 (Principal/Director 14-16 yrs)'
];

const noticePeriods = ['Immediate / 15 Days', '30 Days', '60 Days', '90 Days'];
const workModes = ['Remote', 'Hybrid', 'Onsite'];

const softSkillsList = [
    'Adaptability', 'Communication', 'Conflict Resolution', 'Cross-functional Collaboration', 'Eagerness to Learn',
    'Executive Communication', 'Mentoring', 'People Leadership', 'Problem Solving', 'Stakeholder Management',
    'Strategic Thinking', 'Team Collaboration', 'Time Management'
].sort();

const techSkillsList = [
    '3D Modeling', 'Active Directory', 'Agile', 'Algorithms', 'Analytics', 'API Testing', 'AutoCAD', 'AutoCAD Electrical',
    'AWS', 'Bash', 'Budgeting', 'Building Codes', 'C', 'CI/CD', 'Circuit Design', 'Classroom Management', 'Client Relationship Management',
    'Compliance', 'Content Planning', 'Content Strategy', 'Contract Drafting', 'Copywriting', 'CRM Software', 'Curriculum Development',
    'Customer Onboarding', 'Data Analysis', 'Data Structures', 'Data Visualization', 'Data Warehousing', 'Demand Forecasting',
    'Docker', 'Editing', 'Electrical Safety Standards', 'Employee Relations', 'ERP Systems', 'Estimation', 'ETL', 'Excel', 'Figma',
    'Financial Modeling', 'GD&T', 'Git', 'Go', 'Google Ads', 'HRIS', 'Inventory Management', 'Java', 'JavaScript', 'Lead Generation',
    'Legal Research', 'Lesson Planning', 'Linux', 'Linux Administration', 'Machine Learning', 'Manufacturing Processes',
    'Materials Science', 'Negotiation', 'Network Security', 'NumPy', 'Onboarding', 'Pandas', 'PLC Programming', 'Power Systems',
    'PowerShell', 'Process Mapping', 'Product Strategy', 'Prototyping', 'Python', 'R', 'Recruitment', 'Reporting',
    'Requirements Gathering', 'Research', 'REST APIs', 'Revit', 'Risk Analysis', 'Roadmapping', 'Sales Pipeline Management',
    'Scala', 'Selenium', 'SEO', 'SEO Writing', 'SIEM', 'Site Planning', 'Site Supervision', 'SolidWorks', 'SQL', 'Statistics',
    'Structural Analysis', 'Student Assessment', 'TCP/IP', 'Terraform', 'Test Automation', 'Test Planning', 'Ticketing Systems',
    'TypeScript', 'User Research', 'Visual Design', 'Vulnerability Assessment', 'Windows Server', 'Wireframing'
].sort();

const certificationsList = [
    'Agile Analysis Certification', 'Arbitration & ADR Certification', 'AutoCAD Certified Professional', 'AutoCAD Certified User',
    'AWS Certified Cloud Practitioner', 'AWS Certified Data Analytics – Specialty', 'AWS Certified Developer – Associate',
    'AWS Certified DevOps Engineer – Professional', 'AWS Certified Machine Learning – Specialty', 'AWS Certified Solutions Architect – Associate',
    'AWS Certified Solutions Architect – Professional', 'AWS Certified SysOps Administrator', 'Brand Leadership Program',
    'CBAP (Certified Business Analysis Professional)', 'CCBA (Capability in Business Analysis)', 'CCSM Level 2', 'Certificate in Contract Management',
    'Certified Agile Tester', 'Certified Compliance & Ethics Professional (CCEP)', 'Certified Customer Success Manager (CCSM)',
    'Certified Electrical Safety Compliance Professional', 'Certified Energy Manager', 'Certified Ethical Hacker (CEH)', 'Certified Kubernetes Administrator (CKA)',
    'Certified Sales Professional (CSP)', 'Certified Scrum Product Owner (CSPO)', 'Certified Selenium Professional', 'Certified SolidWorks Professional',
    'CFA Charterholder', 'CFA Level II', 'Chartered Engineer (Electrical)', 'Cisco Certified Network Associate (CCNA)', 'Cisco Certified Network Professional (CCNP)',
    'CISM', 'CISSP', 'COA Fellowship', 'CompTIA Network+', 'CompTIA Security+', 'Content Strategy Certification (Advanced)', 'Content Strategy Certification (CMI)',
    'Council of Architecture (COA) License', 'CPIM (Certified in Planning and Inventory Management)', 'CSCP (Certified Supply Chain Professional)',
    'CSCP – In Progress', 'CTET (Central Teacher Eligibility Test)', 'Databricks Certified Data Engineer Associate', 'Databricks Certified Data Engineer Professional',
    'Design Leadership Certificate', 'Digital Marketing Leadership Certificate', 'Diploma in Corporate Law', 'Diploma in Cyber Law',
    'ECBA (Entry Certificate in Business Analysis)', 'Executive Leadership Certificate', 'Executive MBA Program', 'Financial Modeling & Valuation Analyst (FMVA)',
    'FRM', 'Google Analytics Certified', 'Google Professional Data Engineer', 'Google Professional ML Engineer', 'Google UX Design Certificate',
    'HDI Customer Service Representative', 'HR Analytics Certification', 'HubSpot Content Marketing Certification', 'HubSpot Inbound Marketing Certification',
    'HubSpot Sales Software Certification', 'IBM Data Science Professional Certificate', 'ISTQB Advanced Level', 'ISTQB Expert Level', 'ISTQB Foundation Level',
    'ITIL Expert', 'LEED AP', 'LEED Green Associate', 'Microsoft Certified: Azure Administrator', 'Montessori Teaching Certification', 'NCFM Certification',
    'NET/SET Qualified', 'NN/g UX Certification', 'Oracle Certified Associate (Java)', 'OSCP', 'PLC Programming Certification', 'PMP', 'PMP Certification',
    'Product Leadership Certificate', 'Product Management Certificate (Pragmatic Institute)', 'SAFe POPM', 'Salesforce Certified Sales Representative',
    'School Leadership Certification', 'SEO Content Writing Certification', 'SHRM-CP', 'SHRM-SCP', 'Six Sigma Black Belt', 'Six Sigma Green Belt',
    'SolidWorks Certified Associate', 'Strategic Account Management Certification', 'TensorFlow Developer Certificate', 'TOGAF', 'Zendesk Certified Administrator'
].sort();

const focusOptions = [
    { id: 'technical', label: 'Technical Skills', desc: 'Programming languages, frameworks, tools' },
    { id: 'soft', label: 'Soft Skills', desc: 'Communication, leadership, teamwork' },
    { id: 'ats', label: 'ATS Compatibility', desc: 'Applicant Tracking System optimization' },
    { id: 'industry', label: 'Industry Relevance', desc: 'Alignment with your target industry' },
];

function SearchableSelect({ options, value, onChange, name, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || '');
    const wrapperRef = useRef(null);
    const searchTermRef = useRef(searchTerm);
    const onChangeRef = useRef(onChange);
    const nameRef = useRef(name);
    const [prevValue, setPrevValue] = useState(value);

    useEffect(() => {
        searchTermRef.current = searchTerm;
        onChangeRef.current = onChange;
        nameRef.current = name;
    });

    if (value !== prevValue) {
        setPrevValue(value);
        setSearchTerm(value || '');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                const typed = searchTermRef.current;
                const exactMatch = options.find(
                    opt => opt.toLowerCase() === typed.toLowerCase()
                );
                if (exactMatch) {
                    setSearchTerm(exactMatch);
                    if (exactMatch !== value) {
                        onChangeRef.current({ target: { name: nameRef.current, value: exactMatch } });
                    }
                } else {
                    setSearchTerm(value || '');
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("focusin", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("focusin", handleClickOutside);
        };
    }, [value, options]);

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (opt) => {
        setSearchTerm(opt);
        setIsOpen(false);
        onChange({ target: { name, value: opt } });
    };

    return (
        <div className="searchable-select-wrapper" ref={wrapperRef}>
            <input
                type="text"
                className="searchable-input"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onClick={() => setIsOpen(true)}
                placeholder={placeholder}
            />
            <span className="searchable-arrow">▼</span>
            {isOpen && (
                <ul className="searchable-list" onMouseDown={(e) => e.preventDefault()}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(opt => (
                            <li
                                key={opt}
                                className={`searchable-item ${opt === value ? 'selected' : ''}`}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt}
                            </li>
                        ))
                    ) : (
                        <li className="searchable-empty">No options found</li>
                    )}
                </ul>
            )}
        </div>
    );
}

function MultiSelectDropdown({ options, selected, setSelected, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("focusin", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("focusin", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(opt =>
        !selected.includes(opt) && opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (opt) => {
        setSelected([...selected, opt]);
        setSearchTerm('');
        setIsOpen(false);
    };

    const removeTag = (tag) => setSelected(selected.filter(t => t !== tag));

    return (
        <div className="searchable-select-wrapper" ref={wrapperRef}>
            <input
                type="text"
                className="searchable-input"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onClick={() => setIsOpen(true)}
                placeholder={placeholder}
            />
            <span className="searchable-arrow">▼</span>
            
            {isOpen && (
                <ul className="searchable-list" onMouseDown={(e) => e.preventDefault()}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(opt => (
                            <li 
                                key={opt} 
                                className="searchable-item" 
                                onClick={() => handleSelect(opt)}
                            >
                                {opt}
                            </li>
                        ))
                    ) : (
                        <li className="searchable-empty">No options found</li>
                    )}
                </ul>
            )}

            {selected.length > 0 && (
                <div className="selected-chips">
                    {selected.map(tag => (
                        <span key={tag} className="skill-tag">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                                <FaTimes />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function Analyze() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
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
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleFocus = (id) => {
        setFormData(prev => ({
            ...prev,
            focusAreas: prev.focusAreas.includes(id)
                ? prev.focusAreas.filter(f => f !== id)
                : [...prev.focusAreas, id],
        }));
    };

    const canProceed = () => {
        if (step === 1) {
            return domains.includes(formData.domain)
                && jobRoles.includes(formData.currentTitle)
                && experienceBands.includes(formData.experience)
                && educationLevels.includes(formData.education)
                && fieldsOfStudy.includes(formData.fieldOfStudy);
        }
        if (step === 2) return formData.technicalSkills.length > 0 || formData.softSkills.length > 0;
        if (step === 3) {
            return jobRoles.includes(formData.targetTitle)
                && workModes.includes(formData.workMode)
                && noticePeriods.includes(formData.noticePeriod);
        }
        return true;
    };

    const handleSubmit = () => {
        if (!canProceed()) return;
        console.log('Profile submitted for analysis:', formData);
        alert('Your structured profile details have been submitted for analysis!');
    };

    const stepsInfo = [
        { num: 1, label: 'Professional Profile' },
        { num: 2, label: 'Skills & Credentials' },
        { num: 3, label: 'Target Preferences' },
    ];

    return (
        <div className="analyze-page">
            <div className="analyze-container">

                {/* ── Header ── */}
                <div className="analyze-header">
                    <h1>Analyze Your Profile</h1>
                    <p>Select your profile details to evaluate your skill set against target roles</p>
                </div>

                {/* ── Stepper ── */}
                <div className="stepper">
                    {stepsInfo.map((s, i) => (
                        <div key={s.num} className="stepper-item-wrap">
                            <button
                                className={`stepper-item ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
                                onClick={() => step > s.num && setStep(s.num)}
                                type="button"
                            >
                                <span className="stepper-circle">
                                    {step > s.num ? <FaCheck /> : s.num}
                                </span>
                                <span className="stepper-label">{s.label}</span>
                            </button>
                            {i < stepsInfo.length - 1 && (
                                <div className={`stepper-line ${step > s.num ? 'completed' : ''}`}></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Step Card ── */}
                <div className="step-card">

                    {/* STEP 1 — Professional Profile */}
                    {step === 1 && (
                        <div className="step-content">
                            <h2>Professional Profile</h2>
                            <p className="step-desc">Search and select your professional background</p>

                            <div className="form-grid">
                                <div className="form-group full">
                                    <label>Primary Domain <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="domain" 
                                        value={formData.domain} 
                                        onChange={handleChange} 
                                        options={domains} 
                                        placeholder="Type to search domain..." 
                                    />
                                </div>
                                <div className="form-group full">
                                    <label>Current Job Role <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="currentTitle" 
                                        value={formData.currentTitle} 
                                        onChange={handleChange} 
                                        options={jobRoles} 
                                        placeholder="Type to search role..." 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Years of Experience <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="experience" 
                                        value={formData.experience} 
                                        onChange={handleChange} 
                                        options={experienceBands} 
                                        placeholder="Select experience..." 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Education Level <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="education" 
                                        value={formData.education} 
                                        onChange={handleChange} 
                                        options={educationLevels} 
                                        placeholder="Select education..." 
                                    />
                                </div>
                                <div className="form-group full">
                                    <label>Field of Study <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="fieldOfStudy" 
                                        value={formData.fieldOfStudy} 
                                        onChange={handleChange} 
                                        options={fieldsOfStudy} 
                                        placeholder="Type to search field of study..." 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 — Skills & Credentials */}
                    {step === 2 && (
                        <div className="step-content">
                            <h2>Skills &amp; Credentials</h2>
                            <p className="step-desc">Search and select your core competencies</p>

                            <div className="form-group">
                                <label>Technical Skills <span className="required">*</span></label>
                                <MultiSelectDropdown
                                    options={techSkillsList}
                                    selected={formData.technicalSkills}
                                    setSelected={(skills) => setFormData(prev => ({ ...prev, technicalSkills: skills }))}
                                    placeholder="Type to search a technical skill..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Soft Skills</label>
                                <MultiSelectDropdown
                                    options={softSkillsList}
                                    selected={formData.softSkills}
                                    setSelected={(skills) => setFormData(prev => ({ ...prev, softSkills: skills }))}
                                    placeholder="Type to search a soft skill..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Certifications</label>
                                <MultiSelectDropdown
                                    options={certificationsList}
                                    selected={formData.certifications}
                                    setSelected={(certs) => setFormData(prev => ({ ...prev, certifications: certs }))}
                                    placeholder="Type to search a certification..."
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — Target Preferences */}
                    {step === 3 && (
                        <div className="step-content">
                            <h2>Target Preferences</h2>
                            <p className="step-desc">Define the role you&apos;re targeting</p>

                            <div className="form-grid">
                                <div className="form-group full">
                                    <label>Target Job Role <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="targetTitle" 
                                        value={formData.targetTitle} 
                                        onChange={handleChange} 
                                        options={jobRoles} 
                                        placeholder="Type to search target role..." 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Preferred Work Mode <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="workMode" 
                                        value={formData.workMode} 
                                        onChange={handleChange} 
                                        options={workModes} 
                                        placeholder="Select mode..." 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Notice Period <span className="required">*</span></label>
                                    <SearchableSelect 
                                        name="noticePeriod" 
                                        value={formData.noticePeriod} 
                                        onChange={handleChange} 
                                        options={noticePeriods} 
                                        placeholder="Select notice period..." 
                                    />
                                </div>
                            </div>

                            <div className="focus-section">
                                <label>Focus Areas (Optional MCQ)</label>
                                <div className="focus-grid">
                                    {focusOptions.map(opt => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            className={`focus-chip ${formData.focusAreas.includes(opt.id) ? 'selected' : ''}`}
                                            onClick={() => toggleFocus(opt.id)}
                                        >
                                            <span className="focus-check">
                                                {formData.focusAreas.includes(opt.id) && <FaCheck />}
                                            </span>
                                            <div className="focus-text">
                                                <span className="focus-label">{opt.label}</span>
                                                <span className="focus-desc">{opt.desc}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Navigation ── */}
                <div className="analyze-step-nav">
                    {step > 1 && (
                        <button type="button" className="analyze-btn back" onClick={() => setStep(s => s - 1)}>
                            <FaArrowLeft /> Back
                        </button>
                    )}
                    <div className="analyze-spacer"></div>
                    {step < 3 ? (
                        <button type="button" className="analyze-btn next" onClick={() => setStep(s => s + 1)} disabled={!canProceed()}>
                            Next <FaArrowRight />
                        </button>
                    ) : (
                        <button type="button" className="analyze-btn submit" onClick={handleSubmit} disabled={!canProceed()}>
                            Analyze My Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Analyze;
