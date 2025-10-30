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

    // --- Digital Grid Shader ---
    const vertexShader = `
      uniform float u_time;
      uniform float u_glitch_intensity;
      varying vec2 vUv;

      float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float glitch_amount = u_glitch_intensity * 0.2;
        pos.x += (random(vec2(vUv.y, u_time * 0.1)) - 0.5) * glitch_amount;
        pos.z += (random(vec2(vUv.x, u_time * 0.1)) - 0.5) * glitch_amount;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec3 u_color;
      uniform float u_glitch_intensity;
      varying vec2 vUv;

      float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }

      void main() {
        vec2 st = vUv;
        st.y -= u_time * 0.03;

        float grid_density = 40.0;
        vec2 grid = fract(st * grid_density);
        
        vec2 fw = fwidth(st * grid_density) * 1.5;
        vec2 line = smoothstep(fw, vec2(0.0), grid) - smoothstep(vec2(1.0) - fw, vec2(1.0), grid);
        float grid_lines = max(line.x, line.y);
        
        float fade = 1.0 - (vUv.y * 1.5);
        vec4 color = vec4(u_color, grid_lines * fade);

        float glitch_flash = step(0.95, random(st + u_time * 0.01)) * u_glitch_intensity;
        color.rgb += vec3(glitch_flash * 0.8);

        float scanline = sin(vUv.y * 800.0) * 0.04;
        color.rgb -= scanline;
        
        if (grid_lines < 0.01 || fade < 0.0) discard;
        
        gl_FragColor = color;
      }
    `;
    
    const gridGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_color: { value: new THREE.Color(theme === 'dark' ? 0xd946ef : 0x701a75) },
        u_glitch_intensity: { value: 0.0 },
      },
      vertexShader, fragmentShader, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2.2;
    grid.position.y = -5;
    scene.add(grid);

    // --- Particle Constellation ---
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorFuchsia = new THREE.Color(theme === 'dark' ? 0xd946ef : 0xa21caf);
    const colorBlue = new THREE.Color(theme === 'dark' ? 0x3b82f6 : 0x2563eb);

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
        size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending,
        transparent: true, opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const MAX_LINES = 8000;
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_LINES * 3 * 2), 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_LINES * 3 * 2), 3));
    const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true, blending: THREE.AdditiveBlending,
        transparent: true, opacity: 0.2,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2(-100, -100);
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation ---
    const clock = new THREE.Clock();
    let glitchTimeoutId: number, animationFrameId: number, frameCount = 0;
    
    const triggerGlitch = () => {
        gridMaterial.uniforms.u_glitch_intensity.value = Math.random() * 0.8 + 0.2;
        setTimeout(() => { gridMaterial.uniforms.u_glitch_intensity.value = 0.0; }, Math.random() * 200 + 50);
        glitchTimeoutId = window.setTimeout(triggerGlitch, Math.random() * 5000 + 3000);
    };
    triggerGlitch();

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        frameCount++;
        gridMaterial.uniforms.u_time.value = clock.getElapsedTime();
        
        const posAttr = particles.geometry.getAttribute('position');
        for (let i = 0; i < particlesCount; i++) {
            posAttr.array[i*3] += velocities[i*3];
            posAttr.array[i*3+1] += velocities[i*3+1];
            posAttr.array[i*3+2] += velocities[i*3+2];
            if (posAttr.array[i*3+1] < -50 || posAttr.array[i*3+1] > 50) velocities[i*3+1] *= -1;
            if (posAttr.array[i*3] < -50 || posAttr.array[i*3] > 50) velocities[i*3] *= -1;
            if (posAttr.array[i*3+2] < -50 || posAttr.array[i*3+2] > 50) velocities[i*3+2] *= -1;
        }
        posAttr.needsUpdate = true;

        if (frameCount % 2 === 0) {
            const linePosAttr = lines.geometry.getAttribute('position');
            const lineColAttr = lines.geometry.getAttribute('color');
            const colAttr = particles.geometry.getAttribute('color');
            let lineCount = 0;
            const connectDistanceSq = 4 * 4;
            for (let i = 0; i < particlesCount; i++) {
                for (let j = i + 1; j < particlesCount; j++) {
                    if (lineCount >= MAX_LINES) break;
                    const dx = posAttr.array[i*3] - posAttr.array[j*3];
                    const dy = posAttr.array[i*3+1] - posAttr.array[j*3+1];
                    const dz = posAttr.array[i*3+2] - posAttr.array[j*3+2];
                    if (dx*dx+dy*dy+dz*dz < connectDistanceSq) {
                        const i3 = i * 3, j3 = j * 3, lc6 = lineCount * 6;
                        linePosAttr.array[lc6+0] = posAttr.array[i3+0]; linePosAttr.array[lc6+1] = posAttr.array[i3+1]; linePosAttr.array[lc6+2] = posAttr.array[i3+2];
                        linePosAttr.array[lc6+3] = posAttr.array[j3+0]; linePosAttr.array[lc6+4] = posAttr.array[j3+1]; linePosAttr.array[lc6+5] = posAttr.array[j3+2];
                        lineColAttr.array[lc6+0] = colAttr.array[i3+0]; lineColAttr.array[lc6+1] = colAttr.array[i3+1]; lineColAttr.array[lc6+2] = colAttr.array[i3+2];
                        lineColAttr.array[lc6+3] = colAttr.array[j3+0]; lineColAttr.array[lc6+4] = colAttr.array[j3+1]; lineColAttr.array[lc6+5] = colAttr.array[j3+2];
                        lineCount++;
                    }
                }
                if (lineCount >= MAX_LINES) break;
            }
            linePosAttr.needsUpdate = true; lineColAttr.needsUpdate = true;
            lines.geometry.setDrawRange(0, lineCount * 2);
        }
        
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearTimeout(glitchTimeoutId);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && canvas) currentMount.removeChild(canvas);
      
      scene.remove(grid); scene.remove(particles); scene.remove(lines);
      gridGeometry.dispose(); gridMaterial.dispose();
      particlesGeometry.dispose(); particlesMaterial.dispose();
      linesGeometry.dispose(); linesMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ConstellationBackground;
