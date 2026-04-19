"use client";

import { useId } from "react";

const ORBITS = [
  { tilt: 0, rx: 72, ry: 22, dur: 7, phase: 0, label: "서비스" },
  { tilt: 55, rx: 72, ry: 22, dur: 9, phase: 1.8, label: "계약" },
  { tilt: -55, rx: 72, ry: 22, dur: 8, phase: 3.4, label: "인수인계" },
];

export default function OrbitalDemo() {
  const uid = useId().replace(/:/g, "");
  const hub = `hub-${uid}`;
  const halo = `halo-${uid}`;
  const glow = `glow-${uid}`;
  const sat = `sat-${uid}`;

  return (
    <div className="mt-auto h-[180px] rounded-xl bg-gradient-to-br from-[#0F172A] via-[#0B1220] to-[#0F172A] overflow-hidden relative">
      {/* starfield */}
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 7) % 100}%`,
              width: `${1 + (i % 3) * 0.7}px`,
              height: `${1 + (i % 3) * 0.7}px`,
              opacity: 0.2 + (i % 4) * 0.12,
            }}
          />
        ))}
      </div>
      <svg viewBox="0 0 200 140" className="w-full h-full relative">
        <defs>
          <radialGradient id={hub} cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#7EEAD9" />
            <stop offset="45%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-primary-dim)" />
          </radialGradient>
          <radialGradient id={halo} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={sat} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="var(--color-primary-dim)" />
          </radialGradient>
          <filter id={glow} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>

        {/* Halo pulse */}
        <circle cx="100" cy="70" r="40" fill={`url(#${halo})`}>
          <animate
            attributeName="r"
            values="38;58;38"
            dur="3.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.25;0.8"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Orbital rings */}
        {ORBITS.map((o, i) => (
          <g key={`o-${i}`} transform={`rotate(${o.tilt} 100 70)`}>
            <ellipse
              cx="100"
              cy="70"
              rx={o.rx}
              ry={o.ry}
              fill="none"
              stroke="#5EEAD4"
              strokeWidth="0.8"
              strokeOpacity="0.45"
              strokeDasharray="2.5 3.5"
            />
          </g>
        ))}

        {/* Central sphere with 3D look */}
        <circle
          cx="100"
          cy="70"
          r="22"
          fill={`url(#${hub})`}
          filter={`url(#${glow})`}
          opacity="0.85"
        />
        <circle cx="100" cy="70" r="15" fill={`url(#${hub})`} />
        <ellipse
          cx="96"
          cy="65"
          rx="4"
          ry="2.5"
          fill="white"
          fillOpacity="0.55"
        />
        <circle cx="100" cy="70" r="3" fill="white" fillOpacity="0.25" />

        {/* Satellites on orbits */}
        {ORBITS.map((o, i) => (
          <g key={`sat-${i}`} transform={`rotate(${o.tilt} 100 70)`}>
            {/* trail (larger, more transparent) */}
            <circle r="6" fill={`url(#${sat})`} opacity="0.15">
              <animateMotion
                dur={`${o.dur}s`}
                begin={`${o.phase}s`}
                repeatCount="indefinite"
                path={`M ${100 + o.rx},70 A ${o.rx},${o.ry} 0 1,1 ${100 - o.rx},70 A ${o.rx},${o.ry} 0 1,1 ${100 + o.rx},70`}
              />
            </circle>
            <circle r="3.5" fill={`url(#${sat})`} filter={`url(#${glow})`}>
              <animateMotion
                dur={`${o.dur}s`}
                begin={`${o.phase}s`}
                repeatCount="indefinite"
                path={`M ${100 + o.rx},70 A ${o.rx},${o.ry} 0 1,1 ${100 - o.rx},70 A ${o.rx},${o.ry} 0 1,1 ${100 + o.rx},70`}
              />
            </circle>
          </g>
        ))}

        <text
          x="100"
          y="130"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#CBD5E1"
          letterSpacing="0.25em"
        >
          UNIFIED · ORCHESTRATED
        </text>
      </svg>
    </div>
  );
}
