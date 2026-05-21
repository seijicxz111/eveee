'use client';

import { useEffect, useRef } from 'react';

export default function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    let THREE;

    async function init() {
      THREE = (await import('three')).default || await import('three');

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(0, 0, 40);

      // ── Floating spheres (bubbles) ──
      const bubbleGeo = new THREE.SphereGeometry(1, 16, 16);
      const bubbles = [];
      const bubbleColors = [0x9CD5FF, 0x7AAACE, 0xC8EFD4, 0xFFD6E0, 0xF9C5D1];
      for (let i = 0; i < 28; i++) {
        const mat = new THREE.MeshPhongMaterial({
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          transparent: true,
          opacity: 0.18 + Math.random() * 0.14,
          shininess: 80,
        });
        const scale = 0.4 + Math.random() * 1.2;
        const mesh = new THREE.Mesh(bubbleGeo, mat);
        mesh.scale.setScalar(scale);
        mesh.position.set(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30
        );
        mesh.userData = {
          speedY: (Math.random() - 0.5) * 0.012,
          speedX: (Math.random() - 0.5) * 0.008,
          phase:  Math.random() * Math.PI * 2,
          amp:    0.5 + Math.random() * 1.5,
        };
        scene.add(mesh);
        bubbles.push(mesh);
      }

      // ── Star particles ──
      const starGeo = new THREE.BufferGeometry();
      const starCount = 120;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 120;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0x7AAACE,
        size: 0.22,
        transparent: true,
        opacity: 0.55,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // ── Lights ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const dirLight = new THREE.DirectionalLight(0x9CD5FF, 0.8);
      dirLight.position.set(10, 20, 10);
      scene.add(dirLight);
      const pointLight = new THREE.PointLight(0xF9C5D1, 0.6, 60);
      pointLight.position.set(-20, -10, 15);
      scene.add(pointLight);

      let t = 0;
      function animate() {
        animId = requestAnimationFrame(animate);
        t += 0.008;
        bubbles.forEach((b) => {
          b.position.y += Math.sin(t + b.userData.phase) * b.userData.amp * 0.005;
          b.position.x += Math.cos(t * 0.7 + b.userData.phase) * 0.003;
          b.rotation.x += 0.003;
          b.rotation.y += 0.004;

          // wrap around
          if (b.position.y > 30) b.position.y = -30;
          if (b.position.x > 45) b.position.x = -45;
        });
        stars.rotation.y += 0.0003;
        renderer.render(scene, camera);
      }
      animate();

      function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const cleanup = init();
    return () => {
      cancelAnimationFrame(animId);
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.65,
      }}
    />
  );
}
