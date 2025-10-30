import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Make Typed.js available from the global scope
declare const Typed: any;

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick }) => {
  const typedEl = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof Typed === 'undefined' || !typedEl.current) {
      return;
    }

    const typed = new Typed(typedEl.current, {
      strings: [
        'Bount-X is a high-velocity network for <strong>Hackers</strong>...',
        'Bount-X is a high-velocity network for <strong>Designers</strong>...',
        'Bount-X is a high-velocity network for <strong>Developers</strong> united to build the future.'
      ],
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 1200,
      startDelay: 600,
      smartBackspace: true,
      loop: false,
      showCursor: true,
      cursorChar: '_',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 80
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 1;
        this.density = (Math.random() * 30) + 1;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX * 0.1;
          this.y -= directionY * 0.1;
        } else {
            // Return to base position
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 20;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }

        // Add subtle random movement
        this.x += this.vx;
        this.y += this.vy;

        // Boundary check
        if (this.x > canvas.width + this.size || this.x < -this.size) this.vx *= -1;
        if (this.y > canvas.height + this.size || this.y < -this.size) this.vy *= -1;
      }
    }
    
    const createParticles = () => {
        particles = [];
        const particleCount = window.innerWidth < 768 ? 60 : 120;
        const colorsDark = ['#d946ef', '#3b82f6', '#f8fafc'];
        const colorsLight = ['#c026d3', '#2563eb', '#475569'];
        const colors = theme === 'dark' ? colorsDark : colorsLight;

        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    };

    const connectParticles = () => {
        if (!ctx) return;
        let opacityValue = 1;
        const lineColor = theme === 'dark' ? 'rgba(203, 213, 225, 0.08)' : 'rgba(51, 65, 85, 0.1)';
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    opacityValue = 1 - (distance / 100);
                    ctx.strokeStyle = lineColor.replace('1)', `${opacityValue})`);
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        connectParticles();
        animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);


  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight animate-fade-in-up animate-subtle-glitch" style={{ animationDelay: '200ms' }}>
              Forge & Build<br />
              The Digital Frontier.
            </h1>
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 max-w-lg hero-text-animation min-h-[6rem] sm:min-h-[4rem]">
              <span ref={typedEl}></span>
            </p>
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="relative inline-block group">
                <button
                  onClick={onApplyClick}
                  className="px-8 py-3 font-semibold text-white dark:text-slate-950 bg-slate-900 dark:bg-white rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                >
                  Join as Member
                </button>
                <div 
                  role="tooltip" 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                >
                  Begin your application now!
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;