import React, { useState, useEffect, useRef } from "react";

/* ─── Animated starfield canvas ─── */
const StarCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const NUM = 160;
        const particles = Array.from({ length: NUM }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 2 + 0.4,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.6 + 0.2,
        }));

        let angle = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(cx, cy) * 0.9);
            grad.addColorStop(0, "rgba(249,115,22,0.08)");
            grad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            angle += 0.003;
            [240, 340, 440].forEach((radius, i) => {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle * (i % 2 === 0 ? 1 : -1));
                ctx.strokeStyle = `rgba(249,115,22,${0.07 - i * 0.015})`;
                ctx.lineWidth = 1;
                ctx.setLineDash([6, 14]);
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            });

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
};

/* ─── Main Launcher component ─── */
const Launcher: React.FC<{ onLaunchComplete: () => void }> = ({ onLaunchComplete }) => {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [popKey, setPopKey] = useState(0);

    const startLaunch = () => {
        setCountdown(3);
        setPopKey((k) => k + 1);
    };

    useEffect(() => {
        if (countdown === null) return;
        setPopKey((k) => k + 1);

        if (countdown > 0) {
            const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
            return () => clearTimeout(t);
        } else {
            // Countdown done — go directly to home page, no animation
            onLaunchComplete();
        }
    }, [countdown, onLaunchComplete]);

    return (
        <>
            <style>{`
        @keyframes btn-blink {
          0%, 100% {
            box-shadow: 0 0 28px 6px rgba(249,115,22,0.45),
                        0 0 55px 14px rgba(249,115,22,0.2);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 50px 16px rgba(249,115,22,0.85),
                        0 0 90px 28px rgba(249,115,22,0.4);
            opacity: 0.88;
          }
        }
        .launcher-btn-blink {
          animation: btn-blink 2.4s ease-in-out infinite;
        }
        @keyframes cd-pop {
          0%   { transform: scale(0.45); opacity: 0; }
          55%  { transform: scale(1.12); opacity: 1; }
          80%  { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        @keyframes cd-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 40px rgba(249,115,22,0.65)); }
          50%       { filter: drop-shadow(0 0 100px rgba(249,115,22,1)); }
        }
        .cd-number {
          animation: cd-pop 0.55s cubic-bezier(0.22,1,0.36,1) forwards,
                     cd-glow-pulse 1s ease-in-out infinite;
        }
      `}</style>

            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden">
                <StarCanvas />

                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
                    }}
                />

                {countdown === null ? (
                    <button
                        id="launch-btn"
                        onClick={startLaunch}
                        className="relative z-10 cursor-pointer rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-20 py-9 text-4xl md:text-6xl font-black uppercase tracking-[0.25em] text-white select-none hover:scale-110 active:scale-95 transition-transform duration-200 launcher-btn-blink"
                    >
                        Launch
                    </button>
                ) : (
                    <div className="relative z-10 flex items-center justify-center">
                        <span
                            key={popKey}
                            className="cd-number text-[12rem] md:text-[18rem] font-black leading-none select-none text-transparent bg-clip-text"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)",
                            }}
                        >
                            {countdown}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Launcher;
