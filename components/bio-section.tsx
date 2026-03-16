"use client";

import { CodeIcon, BoxesIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function BioSection() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [shouldFlip, setShouldFlip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldFlip(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div className="mb-12 pb-12">
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center text-center md:text-left">
        <div 
          className="relative w-64 h-64 md:w-72 md:h-72 [perspective:1000px] order-first md:order-last"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={containerRef}
            className={`relative w-full h-full transition-all duration-300 hover:scale-[1.02] ${shouldFlip ? 'animate-coin-flip' : '[transform-style:preserve-3d]'}`}
          >
            {/* Front Face */}
            <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl bg-stone-100 dark:bg-stone-900 [backface-visibility:hidden]">
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-150 ease-out"
                style={{
                  transform: `scale(1.1) translate(${coords.x * 30}px, ${coords.y * 30}px) rotateX(${-coords.y * 10}deg) rotateY(${coords.x * 10}deg)`,
                  backgroundImage: 'url("/avatar.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full border-[10px] border-black/5 pointer-events-none" />
            </div>

            {/* Back Face (Same Avatar) */}
            <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl bg-stone-100 dark:bg-stone-900 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: 'url("/avatar.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full border-[10px] border-black/5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent pb-1 leading-normal">
              Hi, I&apos;m Kaili (Kelly)
            </h1>
            <p className="text-2xl text-muted-foreground font-medium">
              Architect | AI Developer | Writer
            </p>
          </div>

          <div className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 space-y-6">
            <p className="mx-auto md:mx-0">
              🌟 Active <span className="font-semibold text-primary">open-source contributor</span> with a passion for collaboration and community engagement.
            </p>
            <p className="mx-auto md:mx-0">
              🛠️ Years of <span className="font-semibold text-primary">pre-AI era engineering experience</span> provide me with the deep <span className="font-semibold text-primary">technical intuition</span> 🧠 required to <span className="font-semibold text-primary">audit AI-generated code</span> 🔍 and identify subtle regressions.
            </p>
            <p className="mx-auto md:mx-0">
              🏛️ <span className="font-semibold text-primary">Architectural-minded</span>, specializing in the development of <span className="font-semibold text-primary">from-the-ground-up ecosystems</span> 🌱.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex flex-col items-center md:items-start gap-3 p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/30">
              <CodeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-bold text-lg">AI & Architecture</h3>
                <p className="text-sm text-muted-foreground">Designing intelligent, scalable systems.</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-3 p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
              <BoxesIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-bold text-lg">Writing & Rendering</h3>
                <p className="text-sm text-muted-foreground">Exploration through words and pixels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
