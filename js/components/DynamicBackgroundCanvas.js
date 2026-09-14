function DynamicBackgroundCanvas() {
    const canvasRef = React.useRef(null);
    const [mousePos, setMousePos] = React.useState({ x: -500, y: -500 });

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const mouse = { x: width / 2, y: height / 2, radius: 220 };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        const codeSymbols = ["C++", "STL", "DP", "O(N log N)", "BFS", "DFS", "Tree", "Graph", "IIUC", "0101", "Vector", "Codeforces"];
        const particleCount = Math.min(Math.floor(width / 14), 95);
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2.2 + 1,
                alpha: Math.random() * 0.7 + 0.2,
                isSymbol: Math.random() < 0.22,
                symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
                fontSize: Math.floor(Math.random() * 3) + 10
            });
        }

        const meteors = Array.from({ length: 5 }, () => ({
            x: Math.random() * width,
            y: Math.random() * (height * 0.6),
            length: Math.random() * 90 + 40,
            speed: Math.random() * 3.5 + 2.5,
            alpha: Math.random() * 0.5 + 0.2
        }));

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            meteors.forEach(m => {
                m.x += m.speed;
                m.y += m.speed * 0.6;
                if (m.x > width || m.y > height) {
                    m.x = Math.random() * width * 0.5 - 200;
                    m.y = Math.random() * height * 0.3;
                }
                const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.length, m.y - m.length * 0.6);
                grad.addColorStop(0, `rgba(168, 85, 247, ${m.alpha})`);
                grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x - m.length, m.y - m.length * 0.6);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                p1.x += p1.vx;
                p1.y += p1.vy;

                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                const dxMouse = mouse.x - p1.x;
                const dyMouse = mouse.y - p1.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouse.radius) {
                    const force = (mouse.radius - distMouse) / mouse.radius;
                    p1.x -= (dxMouse / distMouse) * force * 2.5;
                    p1.y -= (dyMouse / distMouse) * force * 2.5;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 * (1 - distMouse / mouse.radius)})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }

                if (p1.isSymbol) {
                    ctx.font = `${p1.fontSize}px 'Fira Code', monospace`;
                    ctx.fillStyle = `rgba(192, 132, 252, ${p1.alpha * 0.85})`;
                    ctx.fillText(p1.symbol, p1.x, p1.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(168, 85, 247, ${p1.alpha})`;
                    ctx.fill();
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 125) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(124, 58, 237, ${0.25 * (1 - dist / 125)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-90" />
            <div 
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    background: `
                        radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.16), transparent 70%),
                        radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)
                    `
                }}
            />
        </>
    );
}