import { useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 44, className }: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const arcGrad = `logo-arc-${uid}`;
  const coreGrad = `logo-core-${uid}`;
  const glow = `logo-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={arcGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>
        <radialGradient id={coreGrad} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#4F46E5" />
        </radialGradient>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="1.6"
            floodColor="#6366F1"
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      <g filter={`url(#${glow})`}>
        {/* Triad arcs — 120° 간격으로 배치된 3개의 오케스트레이션 스트림 */}
        <path
          d="M 30.39,14 A 12,12 0 0 1 30.39,26"
          stroke={`url(#${arcGrad})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 20,32 A 12,12 0 0 1 9.61,26"
          stroke={`url(#${arcGrad})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 9.61,14 A 12,12 0 0 1 20,8"
          stroke={`url(#${arcGrad})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Comet heads — 각 호의 리딩 엔드포인트 */}
        <circle cx="30.39" cy="26" r="2.3" fill="#4F46E5" />
        <circle cx="9.61" cy="26" r="2.3" fill="#4F46E5" />
        <circle cx="20" cy="8" r="2.3" fill="#4F46E5" />

        {/* Central pivot — 오케스트레이터 코어 */}
        <circle cx="20" cy="20" r="4.8" fill={`url(#${coreGrad})`} />
      </g>
    </svg>
  );
}
