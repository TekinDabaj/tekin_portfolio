"use client";

import { useEffect, useRef } from "react";

interface GridLight {
  color: { set: (color: number) => void };
  intensity: number;
}

interface Grid2BackgroundInstance {
  grid: {
    setColors: (colors: number[]) => void;
    light1: GridLight;
    light2: GridLight;
  };
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<Grid2BackgroundInstance | null>(null);

  useEffect(() => {
    if (!canvasRef.current || bgRef.current) return;

    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import Grid2Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.17/build/backgrounds/grid2.cdn.min.js';
      const canvas = document.getElementById('webgl-canvas');
      if (canvas) {
        window.__gridBg = Grid2Background(canvas);
      }
    `;
    document.body.appendChild(script);

    const checkInit = setInterval(() => {
      const win = window as Window & { __gridBg?: Grid2BackgroundInstance };
      if (win.__gridBg) {
        bgRef.current = win.__gridBg;
        clearInterval(checkInit);
      }
    }, 100);

    return () => {
      clearInterval(checkInit);
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (!bgRef.current) return;

      const bg = bgRef.current;
      bg.grid.setColors([
        0xffffff * Math.random(),
        0xffffff * Math.random(),
        0xffffff * Math.random(),
      ]);
      bg.grid.light1.color.set(0xffffff * Math.random());
      bg.grid.light1.intensity = 500 + Math.random() * 1000;
      bg.grid.light2.color.set(0xffffff * Math.random());
      bg.grid.light2.intensity = 250 + Math.random() * 250;
    };

    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="webgl-canvas"
      className="fixed inset-0 w-full h-full"
    />
  );
}
