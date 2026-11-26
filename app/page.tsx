'use client';

import { useState, useEffect, useRef } from 'react';
import {
    ArrowRight,
    ArrowDown,
    Download,
    Github,
    Linkedin,
    Mail,
    Menu,
    X,
    Sun,
    Moon,
    MapPin, Phone, ArrowUp, ArrowUpRight, GraduationCap, Copy, Check, Eye, BriefcaseBusiness, Code2, FileText, UserRound
} from 'lucide-react';

import Image from 'next/image';

const email = 'vishwaudantha@gmail.com';
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

const links = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

const projects = [
    { name: 'Ceylon Railway', category: 'Development', label: 'DEVELOPMENT / AI RESEARCH', status: 'Completed', role: 'Researcher / Web Developer', description: 'Research showcase for an AI-driven intelligent railway operations system in Sri Lanka.', detail: 'Developed a responsive academic research website presenting research components, milestones and documents. My research focuses on ticket fraud detection and risk-aware passenger verification.', tags: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'], image: '/images/projects/ceylon-railway.webp', caption: 'Website screenshot', github: 'https://github.com/Vishwaa8/R26-IT-127-Research-Website', live: 'https://ceylon-railway.vercel.app' },
];


export default function Home() {

    const resumeDialog = useRef<HTMLDialogElement>(null);

    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(email);
            setCopyStatus('copied');
        } catch {
            setCopyStatus('error');
        }
    }

    const [light, setLight] = useState(false);
    const [menu, setMenu] = useState(false);
    const [filter, setFilter] = useState('All Projects');
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        setLight(document.documentElement.dataset.theme === 'light');
    }, []);


    // Track the visible section without changing the scroll position.
    useEffect(() => {
        const syncSection = () => {
            const headerHeight = document.querySelector('.header')?.clientHeight ?? 84;
            const offset = headerHeight + 150;
            let current = 'Home';

            for (const name of links) {
                const element = document.getElementById(name.toLowerCase());
                if (element && element.getBoundingClientRect().top <= offset) {
                    current = name;
                }
            }

            // At the end of the page, the last section may not reach the offset.
            const atBottom = window.scrollY > 0 &&
                window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;
            if (atBottom) {
                const last = [...links].reverse().find(name =>
                    document.getElementById(name.toLowerCase())
                );
                if (last) current = last;
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', syncSection, { passive: true });
        window.addEventListener('resize', syncSection);
        syncSection();
        return () => {
            window.removeEventListener('scroll', syncSection);
            window.removeEventListener('resize', syncSection);
        };
    }, []);

    function toggle() {
        const next = !light;

        setLight(next);

        document.documentElement.dataset.theme =
            next ? 'light' : 'dark';

        try {
            localStorage.setItem(
                'portfolio-theme',
                next ? 'light' : 'dark'
            );
        } catch {}
    }

    function navigate(name: string) {
        setMenu(false);
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        if (name === 'Home') window.scrollTo({ top: 0, behavior });
        else document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior, block: 'start' });
    }

    return (
        <main className="site">

            {/* NAVIGATION */}

            <header className="header">
                <a
                    className="logo"
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('Home');
                    }}
                    aria-label="Home"
                >
                    VU.
                </a>

                <nav
                    className={menu ? 'nav open' : 'nav'}
                    aria-label="Main navigation"
                >
                    {links.map(name => (
                        <button
                            key={name}
                            className={
                                activeSection === name
                                    ? 'active'
                                    : ''
                            }
                            onClick={() => navigate(name)}
                        >
                            {name}
                        </button>
                    ))}
                </nav>

                <div className="controls">
                    <button
                        className="theme"
                        onClick={toggle}
                        aria-label={
                            light
                                ? 'Switch to dark mode'
                                : 'Switch to light mode'
                        }
                    >
                        {light ? <Moon size={17} /> : <Sun size={17} />}
                        <span className="knob" />
                    </button>

                    <button
                        className="mobile-menu"
                        aria-label="Toggle navigation"
                        aria-expanded={menu}
                        onClick={() => setMenu(!menu)}
                    >
                        {menu ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* HOME SECTION */}

            <section className="hero" id="home">

                <div className="intro">

                    <div className="status">
                        <span />
                        Open to opportunities
                    </div>

                    <p className="eyebrow">HELLO, I’M</p>

                    <h1>
                        Vishwa
                        <br />
                        <span>Muthukudaarachchi.</span>
                    </h1>

                    <p className="role">
                        Software Development &amp; Project Management
                    </p>

                    <div className="rule" />

                    <p className="description">
                        Bridging technology and leadership to create
                        impactful digital solutions. Passionate about
                        innovation, collaboration, and continuous growth.
                    </p>

                    <div className="actions">

                        <button
                            className="primary"
                            onClick={() => navigate('Projects')}
                        >
                            Explore My Work
                            <ArrowRight size={20} />
                        </button>

                        <button
                            className="secondary"
                            onClick={() => resumeDialog.current?.showModal()}
                        >
                            <Download size={18} />
                            View Resume
                        </button>

                    </div>

                    <div className="socials">

                        <a
                            href="https://github.com/Vishwaa8"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github size={21} />
                            GitHub
                        </a>

                        <a href="https://www.linkedin.com/in/vishwa-muthukudaarachchi-a6868a36a/" target="_blank" rel="noreferrer">
                            <Linkedin size={21} />
                            LinkedIn
                        </a>

                        <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
                            <Mail size={21} />
                            Email
                        </a>

                    </div>
                </div>

                <div className="portrait">
                    <Image
                        src="/images/portrait.webp"
                        alt="Professional black and white portrait"
                        width={1024}
                        height={1536}
                        priority
                        sizes="(max-width: 760px) 90vw, 40vw"
                    />
                </div>

            </section>

            {/* ABOUT ME SECTION */}

            <section className="about-section" id="about">

                <div className="about-heading">
                    <span>01 / ABOUT ME</span>
                    <div className="about-heading-line" />
                </div>

                <div className="about-grid">

                    <div className="about-visual">

                        <div className="about-photo">
                            <Image
                                src="/images/about.webp"
                                alt="Professional seated portrait"
                                fill
                                sizes="(max-width: 760px) 90vw, 35vw"
                            />
                        </div>

                        <div className="about-location">
                            <MapPin size={16} />
                            Based in Sri Lanka
                        </div>

                    </div>

                    <div className="about-content">

                        <p className="about-kicker">
                            GET TO KNOW ME
                        </p>

                        <h2>
                            A little more
                            <br />
                            about me.
                        </h2>

                        <div className="about-rule" />

                        <h3>
                            Technology. Leadership. Innovation.
                        </h3>

                        <p>
                            I'm an Information Technology undergraduate
                            at the Sri Lanka Institute of Information
                            Technology (SLIIT), with professional
                            experience in software development and
                            project management.
                        </p>

                        <p>
                            Currently, I work as an Associate Project
                            Manager at NextGen CodeX (Pvt) Ltd, where I
                            coordinate development teams, analyse client
                            requirements, manage project documentation,
                            and oversee project progress.
                        </p>

                        <p>
                            With a strong foundation in technology and
                            a passion for leadership, I aim to bridge
                            the gap between business objectives and
                            technical execution, delivering innovative
                            and meaningful digital solutions.
                        </p>

                        <div className="education-inline">
                            <GraduationCap size={24} aria-hidden="true" />
                            <div><strong>B.Sc. (Hons) in Information Technology</strong><span>SLIIT · Undergraduate</span></div>
                        </div>

                        <button
                            className="about-button"
                            onClick={() => navigate('Experience')}
                        >
                            My Experience
                            <ArrowDown size={18} />
                        </button>

                    </div>
                </div>

                <div className="about-values">

                    <div className="about-value">
                        <span>01</span>
                        <h4>Technology</h4>
                        <p>Building solutions</p>
                    </div>

                    <div className="about-value">
                        <span>02</span>
                        <h4>Leadership</h4>
                        <p>Empowering teams</p>
                    </div>

                    <div className="about-value">
                        <span>03</span>
                        <h4>Innovation</h4>
                        <p>Creating impact</p>
                    </div>

                </div>

            </section>

            {/* WORK EXPERIENCE */}
            <section className="experience-section" id="experience" aria-labelledby="experience-title">
                <div className="about-heading">
                    <span>02 / WORK EXPERIENCE</span>
                    <div className="about-heading-line" />
                </div>
                <div className="experience-grid">
                    <div className="experience-content">
                        <p className="experience-kicker">MY CAREER PATH</p>
                        <h2 id="experience-title">My professional<br />journey.</h2>
                        <div className="about-rule" />
                        <ol className="career-timeline">
                            <li className="career-item current">
                                <div className="career-meta"><span>2026 — PRESENT</span><span className="career-current"><i />Current</span></div>
                                <h3>Associate Project Manager</h3>
                                <p className="career-company">NextGen CodeX (Pvt) Ltd</p>
                                <p>Coordinating cross-functional teams and managing project delivery from client requirements to execution.</p>
                                <ul className="career-duties">
                                    <li>Project planning and progress monitoring</li>
                                    <li>Team coordination and stakeholder communication</li>
                                    <li>Requirements analysis and project documentation</li>
                                    <li>Quality assurance coordination and delivery support</li>
                                </ul>
                                <div className="career-tags">{['Project Management', 'Agile', 'Leadership', 'Jira'].map(skill => <span key={skill}>{skill}</span>)}</div>
                            </li>
                            <li className="career-item">
                                <div className="career-meta"><span>2025</span></div>
                                <h3>Software Engineering Intern</h3>
                                <p className="career-company">NextGen CodeX (Pvt) Ltd</p>
                                <p>Gained practical experience in software development, technical collaboration and real-world digital projects.</p>
                                <div className="career-tags">{['Software Development', 'Git', 'Teamwork'].map(skill => <span key={skill}>{skill}</span>)}</div>
                            </li>
                        </ol>
                    </div>
                    <figure className="experience-visual">
                        <div className="experience-photo">
                            <Image src="/images/experience.webp" alt="Black and white office portrait" fill sizes="(max-width: 760px) 88vw, 35vw" />
                        </div>
                        <figcaption>Driven by purpose.</figcaption>
                    </figure>
                </div>
            </section>

            {/* SELECTED PROJECTS */}
            <section className="projects-section" id="projects" aria-labelledby="projects-title">
                <div className="about-heading"><span>03 / SELECTED PROJECTS</span><div className="about-heading-line" /></div>
                <div className="projects-intro">
                    <h2 id="projects-title">Ideas turned into reality.</h2>
                    <p>Selected work across software development and project management.</p>
                    <div className="about-rule" />
                </div>
                <div className="project-filters" role="group" aria-label="Filter projects">
                    {['All Projects', 'Development', 'Management'].map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
                </div>
                <div className="project-grid featured-project-grid">
                    {projects.filter(project => filter === 'All Projects' || project.category === filter).map(project => (
                        <article className="project-card featured-project" key={project.name}>
                            <div className="project-preview railway-preview" aria-label="Ceylon Railway website previews">
                                <div className="railway-browser railway-back">
                                    <div className="browser-bar" aria-hidden="true"><i/><i/><i/></div>
                                    <Image src="/images/projects/ceylon-milestones.webp" alt="Ceylon Railway research milestones" width={1440} height={840} unoptimized />
                                </div>
                                <div className="railway-browser railway-front">
                                    <div className="browser-bar" aria-hidden="true"><i/><i/><i/></div>
                                    <Image src={project.image} alt="Ceylon Railway home page" width={1440} height={800} unoptimized />
                                </div>
                            </div>
                            <div className="project-body featured-project-body">
                                <span className="project-status featured-status"><Check size={16}/>{project.status}</span>
                                <span className="project-category">{project.label}</span>
                                <h3>{project.name}</h3>
                                <p>AI-driven intelligent railway operations system in Sri Lanka, showcasing research, milestones, and findings.</p>
                                <div className="featured-role"><UserRound size={19}/><span><strong>Role:</strong> {project.role}</span></div>
                                <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                                <div className="featured-links">
                                    <a className="featured-primary" href={project.github} target="_blank" rel="noreferrer"><Github size={21}/> GitHub <ArrowUpRight size={16}/></a>
                                    <a className="featured-secondary" href={project.live} target="_blank" rel="noreferrer">Live Website <ArrowUpRight size={17}/></a>
                                </div>
                            </div>
                        </article>
                    ))}
                    {filter === 'Management' && <p className="project-empty">Management projects will be added here in the future.</p>}
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="contact-section" id="contact" aria-labelledby="contact-title">
                <div className="about-heading">
                    <span>04 / GET IN TOUCH</span>
                    <div className="about-heading-line" />
                </div>
                <div className="contact-intro">
                    <div className="status"><span />Available for opportunities</div>
                    <h2 id="contact-title">Let's work together.</h2>
                    <p>Have a project in mind or an exciting opportunity? I'd love to hear from you.</p>
                    <div className="about-rule" />
                    <div className="contact-actions">
                        <a className="contact-cta" href={gmailUrl} target="_blank" rel="noopener noreferrer"><Mail size={20} />Send Email<ArrowUpRight size={19} /></a>
                        <button type="button" className="contact-copy" onClick={copyEmail}>
                            {copyStatus === 'copied' ? <Check size={19} /> : <Copy size={19} />}
                            {copyStatus === 'copied' ? 'Copied!' : 'Copy Email'}
                        </button>
                    </div>
                    <span className="contact-email">{email}</span>
                    <span className="copy-feedback" role="status">{copyStatus === 'error' ? 'Copy unavailable. Please select and copy the email address above.' : copyStatus === 'copied' ? 'Email copied to clipboard.' : ''}</span>
                </div>
                <div className="contact-grid">
                    <a className="contact-card" href="https://www.linkedin.com/in/vishwa-muthukudaarachchi-a6868a36a/" target="_blank" rel="noreferrer"><Linkedin size={27} /><strong>LinkedIn</strong><span>Connect with me</span><ArrowUpRight className="contact-arrow" size={17} /></a>
                    <a className="contact-card" href="https://github.com/Vishwaa8" target="_blank" rel="noreferrer"><Github size={27} /><strong>GitHub</strong><span>Explore my work</span><ArrowUpRight className="contact-arrow" size={17} /></a>
                    <a className="contact-card" href="tel:+94765403667"><Phone size={27} /><strong>Phone</strong><span>+94 76 540 3667</span><ArrowUpRight className="contact-arrow" size={17} /></a>
                </div>
            </section>
            <footer className="portfolio-footer">
                <a className="logo" href="#home" onClick={e => { e.preventDefault(); navigate('Home'); }}>VU.</a>
                <p>© {new Date().getFullYear()} Vishwa Muthukudaarachchi. All rights reserved.</p>
                <button className="back-top" onClick={() => navigate('Home')} aria-label="Back to top"><ArrowUp size={20} /></button>
            </footer>

            <dialog ref={resumeDialog} className="resume-dialog" aria-labelledby="resume-title"
                onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
                <div className="resume-inner">
                    <div className="resume-top"><FileText size={20} /><span>MY RESUME</span><button type="button" className="resume-close" autoFocus onClick={() => resumeDialog.current?.close()} aria-label="Close resume dialog"><X size={22} /></button></div>
                    <h2 id="resume-title">Explore my resume.</h2>
                    <p className="resume-description">Select the resume that best matches your requirements.</p>
                    {[
                        { title: 'Project Management', description: 'Leadership, project coordination & delivery', file: 'project-management-cv.pdf', Icon: BriefcaseBusiness },
                        { title: 'Software Engineering', description: 'Technical skills, development & projects', file: 'software-engineering-cv.pdf', Icon: Code2 },
                    ].map(({ title, description, file, Icon }) => (
                        <article className="resume-card" key={file}>
                            <div className="resume-card-head"><div className="resume-icon"><Icon size={25} /></div><div><h3>{title}</h3><p>{description}</p><small>PDF Document</small></div></div>
                            <div className="resume-actions">
                                <a className="resume-view" href={`/resume/${file}`} target="_blank" rel="noopener noreferrer"><Eye size={18} />View CV</a>
                                <a className="resume-download" href={`/resume/${file}`} download={file}><Download size={18} />Download</a>
                            </div>
                        </article>
                    ))}
                    <p className="resume-hint">Choose a resume to view or download.</p>
                </div>
            </dialog>
        </main>
    );
}
