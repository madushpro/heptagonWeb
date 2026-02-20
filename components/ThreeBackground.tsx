import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { useTheme } from "./theme-provider";

const ThreeBackground: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (pointsRef.current) {
      gsap.to(pointsRef.current.material, {
        opacity: theme === "dark" ? 0.35 : 0.15,
        duration: 1,
      });
    }
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colorAttribute = [];

    for (let i = 0; i < 2000; i++) {
      const x = THREE.MathUtils.randFloatSpread(3000);
      const y = THREE.MathUtils.randFloatSpread(4000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      vertices.push(x, y, z);

      const mixedColor = new THREE.Color(0xff6b00).lerp(
        new THREE.Color(theme === "dark" ? 0x221100 : 0xaaaaaa),
        Math.random(),
      );
      colorAttribute.push(mixedColor.r, mixedColor.g, mixedColor.b);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorAttribute, 3),
    );

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: theme === "dark" ? 0.35 : 0.15,
      blending:
        theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    const torusGeometry = new THREE.TorusKnotGeometry(25, 8, 150, 20);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: theme === "dark" ? 0.03 : 0.015,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(100, 0, -200);
    scene.add(torus);

    camera.position.z = 600;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.03;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.03;

      points.rotation.y += 0.00015;
      points.position.y = scrollY.current * 0.15;

      const pulse = Math.sin(time * 0.5) * 0.05;
      torus.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.001;
      torus.position.y = -scrollY.current * 0.3 + 100;

      const targetCamX = mouse.current.x * 20;
      const targetCamY = -scrollY.current * 0.1 + mouse.current.y * 20;

      camera.position.x += (targetCamX - camera.position.x) * 0.03;
      camera.position.y += (targetCamY - camera.position.y) * 0.03;
      camera.lookAt(0, -scrollY.current * 0.1, 0);

      renderer.render(scene, camera);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    animate();

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none -z-10 transition-colors duration-1000 ${theme === "dark" ? "bg-[#050505]" : "bg-white"}`}
    />
  );
};

export default ThreeBackground;
