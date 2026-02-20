import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import * as THREE from "three";
import { useTheme } from "./theme-provider";

const PRINCIPLES = [
  "Innovation",
  "Reliability",
  "Scalability",
  "Security",
  "Intelligence",
  "Performance",
  "UX Design",
];

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const glassMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  useEffect(() => {
    if (glassMatRef.current) {
      gsap.to(glassMatRef.current.color, {
        r: theme === "dark" ? 0.04 : 1,
        g: theme === "dark" ? 0.04 : 1,
        b: theme === "dark" ? 0.04 : 1,
        duration: 0.8,
      });
      gsap.to(glassMatRef.current, {
        transmission: theme === "dark" ? 0.95 : 1.0,
        thickness: theme === "dark" ? 1.5 : 2.0,
        opacity: theme === "dark" ? 0.9 : 0.4,
        duration: 0.8,
      });
    }
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const radius = 2.2;
    const shapeHeight = 0.4;
    const heptGeometry = new THREE.CylinderGeometry(
      radius,
      radius,
      shapeHeight,
      7,
    );

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: theme === "dark" ? 0x0a0a0a : 0xffffff,
      metalness: theme === "dark" ? 1 : 0.1,
      roughness: theme === "dark" ? 0.05 : 0.02,
      transmission: theme === "dark" ? 0.95 : 1.0,
      thickness: theme === "dark" ? 1.5 : 2.5,
      transparent: true,
      opacity: theme === "dark" ? 0.9 : 0.4,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissive: 0xff6b00,
      emissiveIntensity: theme === "dark" ? 0.02 : 0.01,
    });
    glassMatRef.current = glassMat;

    const crystal = new THREE.Mesh(heptGeometry, glassMat);
    mainGroup.add(crystal);

    const edges = new THREE.EdgesGeometry(heptGeometry);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    mainGroup.add(wireframe);

    const ringGeom = new THREE.TorusGeometry(3.5, 0.005, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.1,
    });
    const halo = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (i - 1) * 0.5;
      ring.scale.setScalar(1 + i * 0.1);
      halo.add(ring);
    }
    mainGroup.add(halo);

    const markers: THREE.Object3D[] = [];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const marker = new THREE.Object3D();
      marker.position.set(
        Math.cos(angle) * radius,
        shapeHeight / 2,
        Math.sin(angle) * radius,
      );
      mainGroup.add(marker);
      markers.push(marker);
    }

    const pCount = 120;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVels: THREE.Vector3[] = [];
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      pVels.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
        ),
      );
    }
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff6b00,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    mainGroup.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, theme === "dark" ? 0.5 : 0.8));
    const pointLight = new THREE.PointLight(
      0xff6b00,
      theme === "dark" ? 20 : 10,
      50,
    );
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.set(0, 3, 11);
    camera.lookAt(0, 0, 0);

    const clock = new THREE.Clock();
    const vec = new THREE.Vector3();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.03;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.03;

      mainGroup.rotation.y = time * 0.1;
      mainGroup.rotation.x = 0.2 + mouse.current.y * 0.05;
      mainGroup.rotation.z = mouse.current.x * 0.02;

      halo.rotation.y = -time * 0.04;

      const positions = pGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        positions[i * 3] += pVels[i].x;
        positions[i * 3 + 1] += pVels[i].y;
        positions[i * 3 + 2] += pVels[i].z;
        if (Math.abs(positions[i * 3]) > 6) pVels[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 6) pVels[i].y *= -1;
      }
      pGeom.attributes.position.needsUpdate = true;

      if (labelsRef.current) {
        const labelDivs = labelsRef.current.children;
        const rect = containerRef.current!.getBoundingClientRect();

        markers.forEach((marker, i) => {
          marker.getWorldPosition(vec);
          const screenPos = vec.clone().project(camera);
          const isFacingCamera = vec.z > -1.2;

          const x = (screenPos.x * 0.5 + 0.5) * rect.width;
          const y = -(screenPos.y * 0.5 - 0.5) * rect.height;

          const label = labelDivs[i] as HTMLElement;
          if (label) {
            label.style.left = `${x}px`;
            label.style.top = `${y}px`;
            label.style.opacity = isFacingCamera ? "1" : "0";
            label.style.visibility = isFacingCamera ? "visible" : "hidden";
            label.style.transform = `translate(-50%, -140%) scale(${isHovered.current ? 1.05 : 1})`;
          }
        });
      }

      renderer.render(scene, camera);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        targetMouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      heptGeometry.dispose();
      glassMat.dispose();
      lineMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-32 md:pt-48 pb-20 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12"
    >
      <div className="w-full lg:w-1/2 flex flex-col justify-center z-20 relative">
        <div className="reveal inline-flex items-center space-x-3 dark:bg-white/5 bg-orange-500/5 border dark:border-white/10 border-orange-500/10 rounded-full px-5 py-2 mb-10 w-fit">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#FF6B00]"></div>
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">
            We make it happen
          </span>
        </div>

        <h1 className="reveal text-7xl sm:text-8xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
          Design <br />
          <span className="text-orange-gradient">Reality.</span>
        </h1>

        <p className="reveal text-xl md:text-2xl max-w-xl mb-12 leading-relaxed font-medium dark:text-zinc-400  text-zinc-500">
          Architecting elite digital ecosystems through the seven pillars of
          software excellence. Uncompromising performance, definitive design.
        </p>

        <div className="reveal flex flex-col sm:flex-row items-center gap-6">
          <button className="group relative bg-orange-gradient w-full sm:w-auto px-14 py-5 rounded-full flex items-center justify-center space-x-4 text-[11px] font-black transition-all hover:scale-[1.05] shadow-[0_20px_50px_rgba(255,107,0,0.3)] overflow-hidden uppercase tracking-[0.3em] text-white">
            <span className="relative z-10">Start Project</span>
            <ArrowUpRight
              size={18}
              className="relative z-10 group-hover:rotate-45 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
          </button>

          {/* <button className="flex items-center space-x-5 transition-all group dark:text-zinc-400  text-zinc-500 dark:hover:text-white  hover:text-zinc-950">
            <span className="font-bold text-[10px] uppercase tracking-[0.3em]">
              Our Principles
            </span>
            <div className="w-12 h-12 rounded-full border dark:border-white/10  border-zinc-200 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-all">
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button> */}
        </div>
      </div>

      {/* <div 
        className="hero-3d-wrapper relative w-full lg:w-1/2 h-[500px] sm:h-[650px] lg:h-[800px] z-10 flex items-center justify-center"
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => isHovered.current = false}
      >
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-none" />
        
        <div ref={labelsRef} className="absolute inset-0 pointer-events-none z-30">
          {PRINCIPLES.map((name, i) => (
            <div key={i} className="absolute transition-all duration-700 ease-out will-change-transform">
              <div className="flex flex-col items-center">
                <div className={`glass-card px-7 py-4 rounded-2xl border-2 border-orange-500/30 backdrop-blur-2xl shadow-xl min-w-[160px] text-center ${theme === 'dark' ? 'bg-black/80' : 'bg-white/90 shadow-2xl shadow-black/5 border-zinc-200'}`}>
                  <p className="text-[7px] font-black uppercase tracking-[0.5em] text-orange-500/70 mb-1.5">Module 0{i+1}</p>
                  <span className={`text-[14px] font-black uppercase tracking-[0.15em] whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>{name}</span>
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-t from-orange-500/40 to-transparent mt-1"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-orange-600/10 to-transparent pointer-events-none -z-10 opacity-30"></div>
      </div> */}
    </section>
  );
};

export default Hero;
