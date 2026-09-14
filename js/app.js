function App() {
    const [soundEnabled, setSoundEnabled] = React.useState(true);
    const [activeNav, setActiveNav] = React.useState('home');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [rotatingIndex, setRotatingIndex] = React.useState(0);
    const [copiedField, setCopiedField] = React.useState(null);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [formState, setFormState] = React.useState({ name: '', email: '', message: '' });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setRotatingIndex(prev => (prev + 1) % PORTFOLIO_DATA.heroRotatingText.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);

            const sections = ['home', 'about', 'skills', 'cp', 'projects', 'contact'];
            const current = sections.find(sec => {
                const el = document.getElementById(sec);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 200 && rect.bottom >= 200;
                }
                return false;
            });
            if (current) setActiveNav(current);

            const reveals = document.querySelectorAll('.reveal-element');
            reveals.forEach(el => {
                const top = el.getBoundingClientRect().top;
                if (top < window.innerHeight - 80) {
                    el.classList.add('is-visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    const scrollToSection = (id) => {
        if (soundEnabled) playSoundEffect('click');
        setMobileMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const copyToClipboard = (text, fieldName) => {
        if (soundEnabled) playSoundEffect('click');
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2500);
        } catch (err) {}
        document.body.removeChild(textarea);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (soundEnabled) playSoundEffect('click');
        setFormSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return (
        <div className="relative bg-[#040308] text-gray-100 min-h-screen">
            <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-60"></div>

            <DynamicBackgroundCanvas />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-120px] left-[-120px] w-[580px] h-[580px] bg-[#7C3AED]/25 rounded-full blur-[150px] animate-aurora"></div>
                <div className="absolute top-[40%] right-[-120px] w-[650px] h-[650px] bg-[#A855F7]/20 rounded-full blur-[170px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-100px] left-[25%] w-[580px] h-[580px] bg-[#06B6D4]/15 rounded-full blur-[150px] animate-aurora"></div>
            </div>

            {/* Header Navbar */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#040308]/90 backdrop-blur-md border-b border-purple-900/40 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    
                    <a 
                        href="#home" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
                            M
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-purple-300 transition-colors">
                                {PORTFOLIO_DATA.fullName}
                            </span>
                            <span className="text-[10px] text-purple-400 font-mono">
                                CSE Undergraduate @ IIUC
                            </span>
                        </div>
                    </a>

                    <nav className="hidden lg:flex items-center gap-1 bg-[#0C0816]/80 p-1.5 rounded-full border border-purple-900/40 backdrop-blur-md">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'about', label: 'About' },
                            { id: 'skills', label: 'Skills' },
                            { id: 'cp', label: 'CP & Codeforces' },
                            { id: 'projects', label: 'Projects' },
                            { id: 'contact', label: 'Contact' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                    activeNav === item.id 
                                    ? 'bg-[#7C3AED] text-white shadow-md shadow-purple-600/40' 
                                    : 'text-gray-400 hover:text-white hover:bg-purple-900/20'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            title={soundEnabled ? "Mute Sound FX" : "Enable Sound FX"}
                            className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                                soundEnabled 
                                ? 'bg-purple-950/60 border-purple-500/50 text-purple-300' 
                                : 'bg-[#0C0816] border-purple-900/40 text-gray-500'
                            }`}
                        >
                            <i data-lucide={soundEnabled ? "volume-2" : "volume-x"} className="w-4 h-4"></i>
                        </button>

                        <a href={PORTFOLIO_DATA.socials.github.url} target="_blank" rel="noreferrer" title="GitHub Repository" className="p-2.5 rounded-xl bg-[#0C0816] border border-purple-900/40 text-gray-400 hover:text-white hover:border-purple-500/50 transition-all hover:scale-105">
                            <i data-lucide="github" className="w-4 h-4"></i>
                        </a>

                        <button onClick={() => scrollToSection('contact')} className="purple-gradient-btn px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg shadow-purple-600/30">
                            Let's Connect
                        </button>
                    </div>

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-300 hover:text-white">
                        <i data-lucide={mobileMenuOpen ? "x" : "menu"} className="w-6 h-6"></i>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#0C0816] border-b border-purple-900/40 px-6 py-4 space-y-3 backdrop-blur-xl">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'about', label: 'About' },
                            { id: 'skills', label: 'Skills' },
                            { id: 'cp', label: 'Competitive Programming' },
                            { id: 'projects', label: 'Projects' },
                            { id: 'contact', label: 'Contact' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left py-2 text-sm text-gray-300 hover:text-[#A855F7] font-medium"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* HERO SECTION */}
            <section id="home" className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-28 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-12 gap-12 items-center">
                    
                    <div className="md:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0C0816] border border-purple-500/30 text-purple-300 text-xs font-mono shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-ping"></span>
                            {PORTFOLIO_DATA.department}
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-400 text-sm font-mono tracking-wider uppercase">Welcome to my portfolio</p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                                Hi, I'm <span className="text-gradient">{PORTFOLIO_DATA.fullName}</span>
                            </h1>
                        </div>

                        <div className="h-9 flex items-center font-mono text-base sm:text-xl text-[#A855F7]">
                            <span className="text-gray-500 mr-2">&gt;</span>
                            <span className="transition-all duration-300 border-b-2 border-purple-500/50 pb-0.5">
                                {PORTFOLIO_DATA.heroRotatingText[rotatingIndex]}
                            </span>
                            <span className="ml-1.5 w-2.5 h-6 bg-[#A855F7] animate-pulse"></span>
                        </div>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                            {PORTFOLIO_DATA.introShort}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button 
                                onClick={() => scrollToSection('projects')} 
                                className="purple-gradient-btn px-6 py-3.5 rounded-xl text-white font-semibold text-sm shadow-xl shadow-purple-600/30 flex items-center gap-2"
                            >
                                <span>Explore Featured Work</span>
                                <i data-lucide="arrow-right" className="w-4 h-4"></i>
                            </button>
                            <button 
                                onClick={() => scrollToSection('contact')} 
                                className="px-6 py-3.5 rounded-xl bg-[#0C0816] border border-purple-900/50 hover:border-purple-500/60 text-gray-200 font-semibold text-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                <i data-lucide="mail" className="w-4 h-4 text-purple-400"></i>
                                <span>Contact Me</span>
                            </button>
                        </div>

                        <div className="pt-4 border-t border-purple-900/30 space-y-3">
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Verified Social & Coding Profiles:</span>
                            <div className="grid sm:grid-cols-3 gap-3">
                                <a href={PORTFOLIO_DATA.socials.github.url} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-[#0C0816] border border-purple-900/40 hover:border-purple-500 transition-all group flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-purple-950 text-purple-300 group-hover:bg-purple-900">
                                        <i data-lucide="github" className="w-4 h-4"></i>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white group-hover:text-purple-300">GitHub</span>
                                        <span className="text-[10px] text-gray-400 font-mono">maheecse</span>
                                    </div>
                                </a>

                                <a href={PORTFOLIO_DATA.socials.linkedin.url} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-[#0C0816] border border-purple-900/40 hover:border-purple-500 transition-all group flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-purple-950 text-purple-300 group-hover:bg-purple-900">
                                        <i data-lucide="linkedin" className="w-4 h-4"></i>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white group-hover:text-purple-300">LinkedIn</span>
                                        <span className="text-[10px] text-gray-400 font-mono">Professional Profile</span>
                                    </div>
                                </a>

                                <a href={PORTFOLIO_DATA.socials.codeforces.url} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-[#0C0816] border border-purple-900/40 hover:border-purple-500 transition-all group flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-purple-950 text-purple-300 group-hover:bg-purple-900">
                                        <i data-lucide="code-2" className="w-4 h-4"></i>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white group-hover:text-purple-300">Codeforces</span>
                                        <span className="text-[10px] text-gray-400 font-mono">@maheecse</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 relative animate-float">
                        <InteractiveTerminal soundEnabled={soundEnabled} />
                    </div>

                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="space-y-12">
                    
                    <div className="space-y-3">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Biography & Background</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
                            About {PORTFOLIO_DATA.fullName}
                        </h2>
                        <p className="text-gray-300 text-base max-w-3xl leading-relaxed">
                            {PORTFOLIO_DATA.introAbout}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                        
                        <TiltCard className="p-6 space-y-3" soundEnabled={soundEnabled}>
                            <div className="w-11 h-11 rounded-xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-center text-purple-300 shadow-md">
                                <i data-lucide="graduation-cap" className="w-6 h-6"></i>
                            </div>
                            <h3 className="font-bold text-lg text-white">🎓 Academic Standing</h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Studying at <span className="text-purple-300 font-semibold">{PORTFOLIO_DATA.university}</span>.<br />
                                Department of Computer Science & Engineering.
                            </p>
                        </TiltCard>

                        <TiltCard className="p-6 space-y-3" soundEnabled={soundEnabled}>
                            <div className="w-11 h-11 rounded-xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-center text-purple-300 shadow-md">
                                <i data-lucide="cpu" className="w-6 h-6"></i>
                            </div>
                            <h3 className="font-bold text-lg text-white">💻 Technical Focus</h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Algorithmic efficiency, C++ STL, Java Object-Oriented paradigms, Data Structures, and software design.
                            </p>
                        </TiltCard>

                        <TiltCard className="p-6 space-y-3" soundEnabled={soundEnabled}>
                            <div className="w-11 h-11 rounded-xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-center text-purple-300 shadow-md">
                                <i data-lucide="trophy" className="w-6 h-6"></i>
                            </div>
                            <h3 className="font-bold text-lg text-white">🏆 Problem Solving</h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Active participant in competitive programming contests on Codeforces under handle <span className="text-purple-300 font-mono">@maheecse</span>.
                            </p>
                        </TiltCard>

                    </div>

                </div>
            </section>

            {/* UNIVERSITY BADGE BANNER */}
            <section className="relative z-10 py-8 max-w-7xl mx-auto px-6 reveal-element">
                <TiltCard className="p-8 relative overflow-hidden" soundEnabled={soundEnabled}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
                                <i data-lucide="building" className="w-4 h-4"></i> University Education
                            </div>
                            <h3 className="text-2xl font-black text-white">{PORTFOLIO_DATA.university}</h3>
                            <p className="text-purple-300 font-medium text-sm">{PORTFOLIO_DATA.degree}</p>
                            <p className="text-xs text-gray-400">{PORTFOLIO_DATA.department} • Chattogram, Bangladesh</p>
                        </div>

                        <div className="flex items-center gap-3 bg-purple-950/60 border border-purple-700/50 px-4 py-2.5 rounded-xl self-start md:self-auto shadow-inner">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-xs font-mono text-purple-200 font-semibold">{PORTFOLIO_DATA.status}</span>
                        </div>
                    </div>
                </TiltCard>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="space-y-12">
                    
                    <div className="space-y-2">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Capabilities & Expertise</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
                            Technical Skills & Languages
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Detailed breakdown of programming languages, computer science fundamentals, and development tools I work with.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {PORTFOLIO_DATA.skills.map((skill, idx) => (
                            <TiltCard key={idx} className="p-5 space-y-4" soundEnabled={soundEnabled}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-lg bg-purple-900/30 border border-purple-700/40 text-purple-300">
                                            <i data-lucide={skill.icon} className="w-4 h-4"></i>
                                        </div>
                                        <span className="font-bold text-sm text-white">{skill.name}</span>
                                    </div>
                                    <span className="text-xs font-mono font-semibold text-purple-300">{skill.level}%</span>
                                </div>

                                <div className="w-full h-2 rounded-full bg-purple-950/80 overflow-hidden p-0.5 border border-purple-900/40">
                                    <div 
                                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] transition-all duration-1000 ease-out"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>

                                <p className="text-xs text-gray-400 leading-relaxed">{skill.desc}</p>
                            </TiltCard>
                        ))}
                    </div>

                </div>
            </section>

            {/* COMPETITIVE PROGRAMMING SECTION */}
            <section id="cp" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="grid md:grid-cols-12 gap-12 items-center">
                    
                    <div className="md:col-span-6 space-y-6">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Algorithmic Problem Solving</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
                            Competitive Programming
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            I regularly participate in coding contests to sharpen my problem-solving speed, dynamic logic, graph theory, math strategies, and complexity optimization under strict time limits.
                        </p>

                        <div className="space-y-3 text-xs text-gray-300 font-mono">
                            <div className="flex items-center gap-3 p-3 rounded-xl glass-card">
                                <i data-lucide="check-circle-2" className="w-5 h-5 text-purple-400"></i>
                                <span>C++ STL containers (vector, map, set, priority_queue)</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl glass-card">
                                <i data-lucide="check-circle-2" className="w-5 h-5 text-purple-400"></i>
                                <span>Binary search, recursion, divide & conquer techniques</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl glass-card">
                                <i data-lucide="check-circle-2" className="w-5 h-5 text-purple-400"></i>
                                <span>Big-O Time & Space Complexity analysis</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-6">
                        <TiltCard className="p-8 space-y-6 border border-purple-500/40" soundEnabled={soundEnabled}>
                            <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center font-black text-white text-lg font-mono shadow-md">
                                        CF
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-white text-lg">Codeforces Platform</h3>
                                        <p className="text-xs text-gray-400">Handle: <span className="text-purple-300 font-mono font-bold">@{PORTFOLIO_DATA.socials.codeforces.username}</span></p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-purple-900/40 border border-purple-700/40 text-purple-300 text-[11px] font-mono">
                                    Active Contested
                                </span>
                            </div>

                            <p className="text-xs text-gray-300 leading-relaxed">
                                Check out my latest submissions, solved problems, contest history, and competitive programming statistics directly on Codeforces.
                            </p>

                            <a 
                                href={PORTFOLIO_DATA.socials.codeforces.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="purple-gradient-btn inline-flex items-center justify-center w-full py-3.5 rounded-xl text-white text-xs font-bold shadow-lg shadow-purple-600/30 gap-2"
                            >
                                <span>Visit Codeforces Profile</span>
                                <i data-lucide="external-link" className="w-4 h-4"></i>
                            </a>
                        </TiltCard>
                    </div>

                </div>
            </section>

            {/* FEATURED PROJECTS */}
            <section id="projects" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="space-y-12">
                    
                    <div className="space-y-2">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Portfolio Showcase</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
                            Featured Projects
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Selected software engineering projects, academic implementations, and web utilities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {PORTFOLIO_DATA.projects.map((proj) => (
                            <TiltCard key={proj.id} className="p-6 flex flex-col justify-between space-y-6" soundEnabled={soundEnabled}>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-purple-400">PROJECT {proj.id}</span>
                                        <span className="text-[10px] font-mono bg-purple-950/80 border border-purple-800/40 text-purple-300 px-2.5 py-0.5 rounded-full">
                                            {proj.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-extrabold text-white group-hover:text-purple-300 transition-colors">
                                        {proj.title}
                                    </h3>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {proj.technologies.map((tech) => (
                                            <span key={tech} className="text-[10px] font-mono bg-purple-950/60 border border-purple-800/40 text-purple-200 px-2.5 py-1 rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between">
                                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-purple-300 hover:text-white flex items-center gap-1.5 font-mono transition-colors font-semibold">
                                            <i data-lucide="github" className="w-4 h-4"></i> View Repository
                                        </a>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>

                </div>
            </section>

            {/* JOURNEY & TIMELINE */}
            <section className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="space-y-12">
                    <div className="space-y-2">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Roadmap</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
                            Academic & Coding Journey
                        </h2>
                        <p className="text-gray-400 text-sm">Key milestones in my technical growth as a CSE student.</p>
                    </div>

                    <div className="relative border-l-2 border-purple-900/60 ml-4 space-y-8 pl-8">
                        {PORTFOLIO_DATA.journeySteps.map((item) => (
                            <div key={item.step} className="relative group">
                                <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#040308] border-2 border-[#7C3AED] group-hover:bg-[#A855F7] group-hover:scale-125 transition-all shadow-md shadow-purple-600/50"></span>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <span className="text-xs font-mono text-purple-400 font-bold">[{item.step}]</span> {item.title}
                                </h3>
                                <p className="text-xs text-gray-300 mt-1 leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PHOTOGRAPHY */}
            <section className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Personal Hobbies</div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gradient">
                            Beyond Code: Photography
                        </h2>
                        <p className="text-gray-400 text-sm">Capturing perspective, light, and geometry when taking a break from programming.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {PORTFOLIO_DATA.photography.map((item, idx) => (
                            <TiltCard key={idx} className="p-4 space-y-3" soundEnabled={soundEnabled}>
                                <div className="w-full h-32 bg-purple-950/40 rounded-xl flex items-center justify-center border border-purple-900/40 text-purple-400">
                                    <i data-lucide="camera" className="w-8 h-8 opacity-70"></i>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">{item.title}</span>
                                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-800/30">{item.tag}</span>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-purple-900/20 reveal-element">
                <div className="grid md:grid-cols-12 gap-12">
                    
                    <div className="md:col-span-5 space-y-6">
                        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">Get In Touch</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
                            Let's Connect & Collaborate
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            I am always interested in discussing computer science topics, algorithm strategies, web development, and software opportunities.
                        </p>

                        <div className="space-y-3 font-mono text-xs text-gray-300">
                            <TiltCard className="p-4 flex items-center justify-between" soundEnabled={soundEnabled}>
                                <span className="text-gray-400 flex items-center gap-2"><i data-lucide="mail" className="w-4 h-4 text-purple-400"></i> Email</span>
                                <button onClick={() => copyToClipboard(PORTFOLIO_DATA.email, 'email')} className="text-purple-300 hover:text-white font-semibold transition-colors">
                                    {copiedField === 'email' ? 'Copied to Clipboard!' : PORTFOLIO_DATA.email}
                                </button>
                            </TiltCard>

                            <TiltCard className="p-4 flex items-center justify-between" soundEnabled={soundEnabled}>
                                <span className="text-gray-400 flex items-center gap-2"><i data-lucide="phone" className="w-4 h-4 text-purple-400"></i> Phone</span>
                                <button onClick={() => copyToClipboard(PORTFOLIO_DATA.phone, 'phone')} className="text-purple-300 hover:text-white font-semibold transition-colors">
                                    {copiedField === 'phone' ? 'Copied to Clipboard!' : PORTFOLIO_DATA.phone}
                                </button>
                            </TiltCard>

                            <TiltCard className="p-4 flex items-center justify-between" soundEnabled={soundEnabled}>
                                <span className="text-gray-400 flex items-center gap-2"><i data-lucide="github" className="w-4 h-4 text-purple-400"></i> GitHub</span>
                                <a href={PORTFOLIO_DATA.socials.github.url} target="_blank" rel="noreferrer" className="text-purple-300 hover:text-white transition-colors">
                                    @{PORTFOLIO_DATA.socials.github.username}
                                </a>
                            </TiltCard>

                            <TiltCard className="p-4 flex items-center justify-between" soundEnabled={soundEnabled}>
                                <span className="text-gray-400 flex items-center gap-2"><i data-lucide="map-pin" className="w-4 h-4 text-purple-400"></i> Location</span>
                                <span className="text-gray-200">{PORTFOLIO_DATA.location}</span>
                            </TiltCard>
                        </div>
                    </div>

                    <div className="md:col-span-7">
                        <TiltCard className="p-8 space-y-4" soundEnabled={soundEnabled}>
                            {formSubmitted && (
                                <div className="p-4 rounded-xl bg-purple-950/80 border border-purple-600 text-purple-200 text-xs font-mono text-center shadow-lg">
                                    ✓ Message received! Thank you for connecting with {PORTFOLIO_DATA.fullName}.
                                </div>
                            )}

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-gray-300">Your Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="e.g. Alex Johnson"
                                        className="w-full px-4 py-3 rounded-xl bg-[#040308] border border-purple-900/50 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-gray-300">Your Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder="alex@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-[#040308] border border-purple-900/50 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-gray-300">Message</label>
                                    <textarea
                                        rows="4"
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Hello Shahriar, I would like to connect with you regarding..."
                                        className="w-full px-4 py-3 rounded-xl bg-[#040308] border border-purple-900/50 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    ></textarea>
                                </div>

                                <button type="submit" className="purple-gradient-btn w-full py-3.5 rounded-xl text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
                                    <span>Send Direct Message</span>
                                    <i data-lucide="send" className="w-4 h-4"></i>
                                </button>
                            </form>
                        </TiltCard>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 py-12 border-t border-purple-900/30 bg-[#040308] text-xs text-gray-400">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <span className="font-extrabold text-gray-200 text-sm">{PORTFOLIO_DATA.fullName}</span>
                        <p className="text-[11px] text-gray-400 mt-0.5">{PORTFOLIO_DATA.roleHeadline}</p>
                    </div>

                    <p className="font-mono text-[11px] text-gray-400">
                        © 2026 {PORTFOLIO_DATA.fullName}. Engineered with code & motion.
                    </p>
                </div>
            </footer>

        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);