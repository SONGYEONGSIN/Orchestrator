"use client";

import { useEffect, useId, useState } from "react";
import { IconTrendingUp, IconArrowUpRight } from "@tabler/icons-react";

const INIT_SERIES = [18, 22, 20, 28, 26, 32, 30, 36, 38, 42, 48, 44, 52];

const STATS = [
  { label: "배포 빈도", delta: "+24%" },
  { label: "장애 복구", delta: "-38%" },
  { label: "SLA", delta: "99.98%" },
];

export default function LiveTickerDemo() {
  const uid = useId().replace(/:/g, "");
  const fillGrad = `fill-${uid}`;
  const [kpi, setKpi] = useState(0);
  const [series, setSeries] = useState<number[]>(INIT_SERIES);

  useEffect(() => {
    const target = 1284;
    const steps = 55;
    let step = 0;
    const id = setInterval(() => {
      step++;
      if (step <= steps) {
        setKpi(Math.round((target / steps) * step));
      } else if (step >= steps + 40) {
        step = 0;
        setKpi(0);
      }
    }, 28);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(
          10,
          Math.min(60, last + (Math.random() - 0.4) * 8),
        );
        return [...prev.slice(1), next];
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  const max = Math.max(...series);
  const pathD = series
    .map((p, i) => {
      const x = (i / (series.length - 1)) * 100;
      const y = 100 - (p / max) * 85;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const lastY = 100 - (series[series.length - 1] / max) * 85;

  return (
    <div className="mt-auto h-[180px] rounded-xl bg-gradient-to-br from-[#0F172A] via-[#0B1220] to-[#0F172A] p-3 flex flex-col gap-2 relative overflow-hidden">
      {/* Top row: big KPI + trend badge */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#94A3B8] mb-0.5">
            주간 운영 점수
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-extrabold tabular-nums text-white leading-none">
              {kpi.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-[#CBD5E1]">pts</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#5EEAD4]/20 text-[#5EEAD4]">
          <IconTrendingUp size={11} stroke={2.6} />
          <span className="text-[10px] font-bold tabular-nums">+12.4%</span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="flex-1 relative">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={fillGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${pathD} L100,100 L0,100 Z`} fill={`url(#${fillGrad})`} />
          <path
            d={pathD}
            fill="none"
            stroke="#5EEAD4"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={100}
            cy={lastY}
            r="2"
            fill="#5EEAD4"
            stroke="#0F172A"
            strokeWidth="1"
          >
            <animate
              attributeName="r"
              values="2;3.8;2"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Bottom stats row */}
      <div className="grid grid-cols-3 gap-1.5">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] px-2 py-1.5"
          >
            <span className="text-[8.5px] font-semibold text-[#94A3B8] uppercase tracking-wider">
              {s.label}
            </span>
            <span className="flex items-center gap-0.5 text-[11px] font-extrabold tabular-nums text-white">
              {s.delta}
              <IconArrowUpRight
                size={9}
                stroke={2.4}
                className="text-[#5EEAD4]"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
