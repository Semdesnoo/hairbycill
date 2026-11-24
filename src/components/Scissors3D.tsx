"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/**
 * Real 3D salon shears (three.js, loaded only when this mounts): two extruded, bevelled steel halves with
 * gold finger rings, lit by a studio environment map so the metal actually reflects. Scroll progress
 * `p` (0..1) spins the shears a full turn and snips them open/closed three times; `still` = reduced motion.
 */
export default function Scissors3D({ p, still, className = "" }: { p: MotionValue<number>; still: boolean; className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (cancelled) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // no WebGL: the section still reads fine without the shears
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      const key = new THREE.DirectionalLight(0xfff3dc, 2.2);
      key.position.set(3, 5, 6);
      scene.add(key);

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

      // --- geometry: one half, pivot at the origin, blade pointing up, finger ring lower-left ---
      const blade = new THREE.Shape();
      blade.moveTo(-0.17, -0.22);
      blade.lineTo(0.2, -0.22);
      blade.bezierCurveTo(0.27, 1.0, 0.17, 2.4, 0.02, 3.4); // spine
      blade.bezierCurveTo(-0.03, 2.4, -0.12, 1.0, -0.17, -0.22); // cutting edge

      const shank = new THREE.Shape();
      shank.moveTo(-0.17, -0.12);
      shank.lineTo(0.2, -0.12);
      shank.quadraticCurveTo(0.08, -0.85, -0.3, -1.4);
      shank.lineTo(-0.66, -1.3);
      shank.quadraticCurveTo(-0.32, -0.8, -0.17, -0.12);

      const ring = new THREE.Shape();
      ring.absellipse(-0.66, -1.92, 0.56, 0.66, 0, Math.PI * 2, false, 0);
      const hole = new THREE.Path();
      hole.absellipse(-0.66, -1.92, 0.38, 0.48, 0, Math.PI * 2, true, 0);
      ring.holes.push(hole);

      const extrude = { depth: 0.07, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.03, bevelSegments: 4, curveSegments: 48 };
      const steelGeo = new THREE.ExtrudeGeometry([blade, shank], extrude);
      const ringGeo = new THREE.ExtrudeGeometry(ring, { ...extrude, depth: 0.12, bevelThickness: 0.05, bevelSize: 0.05 });
      const screwGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.42, 40);

      const steel = new THREE.MeshPhysicalMaterial({ color: 0xe7e5e0, metalness: 1, roughness: 0.2, clearcoat: 0.6, clearcoatRoughness: 0.15 });
      const gold = new THREE.MeshPhysicalMaterial({ color: 0xd2ae62, metalness: 1, roughness: 0.28, clearcoat: 0.4 });

      // Each half = steel blade+shank + gold ring, in its own pivot group so it can swing open.
      const makeHalf = (z: number, mirror: boolean) => {
        const outer = new THREE.Group();
        const pivot = new THREE.Group();
        const s = new THREE.Mesh(steelGeo, steel);
        const r = new THREE.Mesh(ringGeo, gold);
        s.position.z = r.position.z = -0.05;
        pivot.add(s, r);
        outer.add(pivot);
        outer.position.z = z;
        if (mirror) outer.scale.x = -1;
        return { outer, pivot };
      };
      const a = makeHalf(0.08, false);
      const b = makeHalf(-0.08, true);
      const screw = new THREE.Mesh(screwGeo, gold);
      screw.rotation.x = Math.PI / 2;

      const root = new THREE.Group();
      const body = new THREE.Group();
      body.add(a.outer, b.outer, screw);
      body.position.y = -0.42; // centre the 6-unit tall shears on the rotation axis
      root.add(body);
      scene.add(root);

      const fit = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // keep the full 6.6-unit height in view; on narrow boxes back off so the spin never clips
        camera.position.set(0, 0, Math.max(13.5, (13.5 * 0.55) / camera.aspect));
        camera.updateProjectionMatrix();
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(el);

      const pose = (v: number, t: number) => {
        const open = still ? 0.2 : 0.3 * Math.abs(Math.sin(v * Math.PI * 3));
        a.pivot.rotation.z = b.pivot.rotation.z = -open;
        root.rotation.y = still ? -0.45 : -0.7 + v * Math.PI * 2;
        root.rotation.z = still ? -0.55 : -0.75 + v * 1.1 + Math.sin(t * 0.6) * 0.03;
        root.rotation.x = still ? 0.15 : 0.15 + 0.25 * Math.sin(v * Math.PI);
        root.position.y = still ? 0 : Math.sin(t * 0.8) * 0.08;
        renderer.render(scene, camera);
      };

      let raf = 0;
      const loop = (ms: number) => {
        pose(p.get(), ms / 1000);
        raf = requestAnimationFrame(loop);
      };
      // Only burn frames while the shears are on screen.
      const io = new IntersectionObserver(([e]) => {
        cancelAnimationFrame(raf);
        if (e.isIntersecting && !still) raf = requestAnimationFrame(loop);
      });
      if (still) pose(0, 0);
      else io.observe(el);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        [steelGeo, ringGeo, screwGeo, steel, gold, envTex].forEach((d) => d.dispose());
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [p, still]);

  return <div ref={host} aria-hidden className={className} />;
}
