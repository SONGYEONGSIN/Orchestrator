"use client";

import { useEffect, useId, useState } from "react";
import { IconCpu } from "@tabler/icons-react";

const NODES: { x: number; y: number; label?: string }[] = [
  { x: 28, y: 36 },
  { x: 60, y: 22 },
  { x: 98, y: 28 },
  { x: 140, y: 22 },
  { x: 170, y: 42 },
  { x: 30, y: 86 },
  { x: 70, y: 100 },
  { x: 128, y: 102 },
  { x: 168, y: 86 },
];

const CENTER = { x: 100, y: 66 };

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [2, 7],
  [3, 7],
  [4, 8],
  [5, 6],
  [6, 7],
  [7, 8],
];

export default function NeuralMeshDemo() {
  const uid = useId().replace(/:/g, "");
  const cpuGrad = `cpu-${uid}`;
  const glow = `glow-${uid}`;
  const [firingIdx, setFiringIdx] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const n = 1 + Math.floor(Math.random() * 3);
      const picks: number[] = [];
      for (let i = 0; i < n; i++) {
        picks.push(Math.floor(Math.random() * EDGES.length));
      }
      setFiringIdx(picks);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto h-[180px] rounded-xl bg-gradient-to-br from-[#0F172A] via-[#0B1220] to-[#0F172A] overflow-hidden relative">
      <svg viewBox="0 0 200 130" className="w-full h-full">
        <defs>
          <radialGradient id={cpuGrad} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#7EEAD9" />
            <stop offset="55%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-primary-dim)" />
          </radialGradient>
          <filter id={glow} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient id={`edge-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              stopColor="var(--color-primary)"
              stopOpacity="0"
            />
            <stop offset="50%" stopColor="#7EEAD9" stopOpacity="1" />
            <stop
              offset="100%"
              stopColor="var(--color-primary)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* edges — base */}
        {EDGES.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#5EEAD4"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
        ))}

        {/* firing edges */}
        {firingIdx.map((idx, i) => {
          const [a, b] = EDGES[idx];
          return (
            <line
              key={`fire-${i}-${idx}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#7EEAD9"
              strokeWidth="2.5"
              strokeOpacity="1"
              filter={`url(#${glow})`}
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-opacity"
                values="0;1;0"
                dur="0.6s"
                repeatCount="1"
              />
            </line>
          );
        })}

        {/* lines from each node to center (connection) */}
        {NODES.map((n, i) => (
          <line
            key={`c-${i}`}
            x1={n.x}
            y1={n.y}
            x2={CENTER.x}
            y2={CENTER.y}
            stroke="#5EEAD4"
            strokeOpacity="0.2"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
        ))}

        {/* nodes */}
        {NODES.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="4.5"
              fill="#0F172A"
              stroke="#5EEAD4"
              strokeWidth="1.8"
            />
            <circle cx={n.x} cy={n.y} r="2" fill="#7EEAD9">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur={`${1 + (i % 3) * 0.3}s`}
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Central CPU glow halo */}
        <circle cx={CENTER.x} cy={CENTER.y} r="16" fill="#5EEAD4" opacity="0.3">
          <animate
            attributeName="r"
            values="14;24;14"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0.15;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Central CPU node */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="11"
          fill={`url(#${cpuGrad})`}
          filter={`url(#${glow})`}
        />
      </svg>

      {/* Center CPU icon overlay */}
      <div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: `${(CENTER.x / 200) * 100}%`,
          top: `${(CENTER.y / 130) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <IconCpu size={14} stroke={2.4} className="text-white" />
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#CBD5E1]">
          NEURAL · ACTIVE
        </span>
      </div>
    </div>
  );
}
