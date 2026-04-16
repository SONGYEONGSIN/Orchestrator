import { IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";
import { cn } from "../lib/utils";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "flat";
}

const trendStyles = {
  up: "text-[var(--color-success)]",
  down: "text-[var(--color-danger)]",
  flat: "text-[var(--color-text-muted)]",
};

const trendIcons = {
  up: IconTrendingUp,
  down: IconTrendingDown,
  flat: IconMinus,
};

export default function KpiCard({ icon, label, value, change, trend }: KpiCardProps) {
  const TrendIcon = trendIcons[trend];

  return (
    <div className="card-base p-6 relative overflow-hidden flex flex-col justify-between group min-h-[150px]">
      
      {/* Nexus Style Sparkline Area Chart */}
      <div className="absolute right-0 bottom-4 w-28 h-16 pointer-events-none transition-transform duration-500 group-hover:-translate-y-1">
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-up" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-down" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-flat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-text-muted)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--color-text-muted)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {trend === "up" && (
            <>
              <path d="M0,45 Q20,20 40,35 T80,15 T100,5 L100,50 L0,50 Z" fill="url(#grad-up)" />
              <path d="M0,45 Q20,20 40,35 T80,15 T100,5" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
          {trend === "down" && (
            <>
              <path d="M0,5 Q20,15 40,5 T80,35 T100,45 L100,50 L0,50 Z" fill="url(#grad-down)" />
              <path d="M0,5 Q20,15 40,5 T80,35 T100,45" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
          {trend === "flat" && (
             <>
             <path d="M0,25 Q20,20 40,25 T80,20 T100,25 L100,50 L0,50 Z" fill="url(#grad-flat)" />
             <path d="M0,25 Q20,20 40,25 T80,20 T100,25" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" />
           </>
          )}
        </svg>
      </div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-8 h-8 rounded-[10px] bg-[var(--color-surface)] shadow-neu-inset-soft text-[var(--color-text-muted)] flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[14px] font-semibold text-[var(--color-text-muted)]">
          {label}
        </span>
      </div>

      <div className="relative z-10">
        <div className="font-display text-[26px] font-bold text-[var(--color-text)] tracking-tight mb-2">
          {value}
        </div>
        <div className={cn("flex items-center gap-1", trendStyles[trend])}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={trend === 'down' ? '' : 'rotate-180'}>
             <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
          <span className="text-[12px] font-bold">{change}</span>
        </div>
      </div>
    </div>
  );
}
