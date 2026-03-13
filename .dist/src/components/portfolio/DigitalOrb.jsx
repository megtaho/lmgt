import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function DigitalOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    // Central icosphere
    const geoSphere = new THREE.IcosahedronGeometry(1, 2);
    const matWire = new THREE.MeshBasicMaterial({
      color: 0xc8ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const sphere = new THREE.Mesh(geoSphere, matWire);
    scene.add(sphere);

    // Inner glowing core
    const geoCore = new THREE.IcosahedronGeometry(0.55, 1);
    const matCore = new THREE.MeshBasicMaterial({
      color: 0xc8ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const core = new THREE.Mesh(geoCore, matCore);
    scene.add(core);

    // Orbiting rings — representing different digital dimensions
    const ringData = [
      { radius: 1.45, tube: 0.008, tilt: [0, 0, 0], speed: 0.008 },
      { radius: 1.55, tube: 0.006, tilt: [Math.PI / 2.5, 0, 0], speed: -0.006 },
      { radius: 1.65, tube: 0.005, tilt: [0, Math.PI / 3, Math.PI / 4], speed: 0.005 },
    ];

    const rings = ringData.map(({ radius, tube, tilt, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xc8ff00,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(...tilt);
      mesh.userData.speed = speed;
      scene.add(mesh);
      return mesh;
    });

    // Floating icon nodes on orbit
    const nodePositions = 8;
    const nodes = [];
    for (let i = 0; i < nodePositions; i++) {
      const angle = (i / nodePositions) * Math.PI * 2;
      const geo = new THREE.OctahedronGeometry(0.06, 0);
      const mat = new THREE.MeshBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData.angle = angle;
      mesh.userData.orbitRadius = 1.45;
      scene.add(mesh);
      nodes.push(mesh);
    }

    // Particles cloud
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xc8ff00, size: 0.025, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animId;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;

      sphere.rotation.y += 0.004;
      sphere.rotation.x += 0.002;
      core.rotation.y -= 0.006;
      core.rotation.z += 0.003;

      rings.forEach((ring) => {
        ring.rotation.z += ring.userData.speed;
      });

      nodes.forEach((node, i) => {
        const angle = node.userData.angle + t * 0.4;
        node.position.x = Math.cos(angle) * node.userData.orbitRadius;
        node.position.y = Math.sin(angle * 0.3) * 0.3;
        node.position.z = Math.sin(angle) * node.userData.orbitRadius;
        node.rotation.y += 0.04;
      });

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w2 = el.clientWidth;
      const h2 = el.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}