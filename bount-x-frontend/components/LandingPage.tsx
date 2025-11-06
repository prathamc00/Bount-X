import React, { useEffect, useRef } from 'react';

// Make Three.js available from the global scope, as it's included via CDN
declare const THREE: any;

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof THREE === 'undefined') {
      console.error('Three.js is not loaded');
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020617, 1);
    
    const canvas = renderer.domElement;
    canvas.id = 'webgl-canvas';
    currentMount.appendChild(canvas);
    
    // Particles
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorFuchsia = new THREE.Color(0xd946ef);
    const colorBlue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        
        const mixedColor = colorFuchsia.clone().lerp(colorBlue, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lines (Optimized)
    const MAX_LINES = 10000; // Pre-allocate buffer for up to 10k lines
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_LINES * 3 * 2);
    const lineColors = new Float32Array(MAX_LINES * 3 * 2);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.2,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2(-100, -100);
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    let frameCount = 0;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        frameCount++;

        const posAttribute = particles.geometry.getAttribute('position');
        const colAttribute = particles.geometry.getAttribute('color');
        const particlePositions = posAttribute.array;
        
        // Update particles
        for (let i = 0; i < particlesCount; i++) {
            particlePositions[i * 3] += velocities[i * 3];
            particlePositions[i * 3 + 1] += velocities[i * 3 + 1];
            particlePositions[i * 3 + 2] += velocities[i * 3 + 2];
            
            // Boundary checks
            if (particlePositions[i * 3 + 1] < -50 || particlePositions[i * 3 + 1] > 50) velocities[i * 3 + 1] *= -1;
            if (particlePositions[i * 3] < -50 || particlePositions[i * 3] > 50) velocities[i * 3] *= -1;
            if (particlePositions[i * 3 + 2] < -50 || particlePositions[i * 3 + 2] > 50) velocities[i * 3 + 2] *= -1;
        }
        posAttribute.needsUpdate = true;

        // Update lines (Throttled for performance)
        if (frameCount % 2 === 0) {
            const linePosAttr = lines.geometry.getAttribute('position');
            const lineColAttr = lines.geometry.getAttribute('color');
            let lineCount = 0;
            const connectDistanceSq = 4 * 4; // Use squared distance for performance

            for (let i = 0; i < particlesCount; i++) {
                for (let j = i + 1; j < particlesCount; j++) {
                    if (lineCount >= MAX_LINES) break;
                    
                    const dx = particlePositions[i * 3] - particlePositions[j * 3];
                    const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                    const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                    const distanceSq = dx * dx + dy * dy + dz * dz;

                    if (distanceSq < connectDistanceSq) {
                        const i3 = i * 3;
                        const j3 = j * 3;
                        const lc6 = lineCount * 6;
                        
                        linePosAttr.array[lc6 + 0] = particlePositions[i3 + 0];
                        linePosAttr.array[lc6 + 1] = particlePositions[i3 + 1];
                        linePosAttr.array[lc6 + 2] = particlePositions[i3 + 2];
                        linePosAttr.array[lc6 + 3] = particlePositions[j3 + 0];
                        linePosAttr.array[lc6 + 4] = particlePositions[j3 + 1];
                        linePosAttr.array[lc6 + 5] = particlePositions[j3 + 2];
                        
                        lineColAttr.array[lc6 + 0] = colAttribute.array[i3 + 0];
                        lineColAttr.array[lc6 + 1] = colAttribute.array[i3 + 1];
                        lineColAttr.array[lc6 + 2] = colAttribute.array[i3 + 2];
                        lineColAttr.array[lc6 + 3] = colAttribute.array[j3 + 0];
                        lineColAttr.array[lc6 + 4] = colAttribute.array[j3 + 1];
                        lineColAttr.array[lc6 + 5] = colAttribute.array[j3 + 2];
                        
                        lineCount++;
                    }
                }
                if (lineCount >= MAX_LINES) break;
            }
            
            linePosAttr.needsUpdate = true;
            lineColAttr.needsUpdate = true;
            lines.geometry.setDrawRange(0, lineCount * 2);
        }
        
        camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(canvas);
      scene.remove(particles);
      particles.geometry.dispose();
      particles.material.dispose();
      scene.remove(lines);
      lines.geometry.dispose();
      lines.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden">
        <div ref={mountRef} className="absolute inset-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
            <div className="animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl font-bold font-mono tracking-tighter animate-subtle-glitch">Bount-X</h1>
                <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-xl">
                    A high-velocity network for Hackers, Designers, and Developers united to build the future.
                </p>
            </div>
            <button
                onClick={onEnter}
                className="mt-10 px-8 py-3 font-semibold text-slate-950 bg-white rounded-full shadow-lg hover:bg-slate-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
            >
                Start Building
            </button>
        </div>
    </div>
  );
};

export default LandingPage;