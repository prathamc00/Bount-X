import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Make Three.js available from the global scope, as it's included via CDN
declare const THREE: any;

const ConstellationBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

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
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const canvas = renderer.domElement;
    currentMount.appendChild(canvas);
    
    // Particles
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorFuchsia = new THREE.Color(0xd946ef);
    const colorBlue = new THREE.Color(0x3b82f6);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        
        let mixedColor;
        const rand = Math.random();
        if (rand > 0.9) {
          mixedColor = colorWhite;
        } else {
          mixedColor = colorFuchsia.clone().lerp(colorBlue, Math.random());
        }

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
        opacity: theme === 'dark' ? 0.8 : 0.5,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lines
    const MAX_LINES = 10000;
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_LINES * 3 * 2);
    const lineColors = new Float32Array(MAX_LINES * 3 * 2);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: theme === 'dark' ? 0.15 : 0.1,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Animation loop
    let animationFrameId: number;
    let frameCount = 0;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        frameCount++;

        const posAttribute = particles.geometry.getAttribute('position');
        const colAttribute = particles.geometry.getAttribute('color');
        const particlePositions = posAttribute.array;
        
        for (let i = 0; i < particlesCount; i++) {
            particlePositions[i * 3] += velocities[i * 3];
            particlePositions[i * 3 + 1] += velocities[i * 3 + 1];
            particlePositions[i * 3 + 2] += velocities[i * 3 + 2];
            
            if (particlePositions[i * 3 + 1] < -50 || particlePositions[i * 3 + 1] > 50) velocities[i * 3 + 1] *= -1;
            if (particlePositions[i * 3] < -50 || particlePositions[i * 3] > 50) velocities[i * 3] *= -1;
            if (particlePositions[i * 3 + 2] < -50 || particlePositions[i * 3 + 2] > 50) velocities[i * 3 + 2] *= -1;
        }
        posAttribute.needsUpdate = true;

        if (frameCount % 2 === 0) {
            const linePosAttr = lines.geometry.getAttribute('position');
            const lineColAttr = lines.geometry.getAttribute('color');
            let lineCount = 0;
            const connectDistanceSq = 4 * 4;

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
        
        scene.rotation.y += 0.0002;
        scene.rotation.x += 0.0001;

        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && canvas) {
        currentMount.removeChild(canvas);
      }
      scene.remove(particles);
      particles.geometry.dispose();
      particles.material.dispose();
      scene.remove(lines);
      lines.geometry.dispose();
      lines.material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default ConstellationBackground;