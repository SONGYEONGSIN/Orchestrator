import {
  IconHome,
  IconClock,
  IconChartPie,
  IconChecklist,
  IconFolder,
  IconGitMerge,
  IconUsers,
  IconApps,
  IconFileReport,
  IconPlus,
  IconHelp,
  IconLogout,
} from "@tabler/icons-react";
import { cn } from "../lib/utils";
import { useState } from "react";

const navigation = [
  { label: "홈", icon: IconHome, active: false },
  { label: "빠른 접근", icon: IconClock, active: false },
  { label: "데이터셋", icon: IconChartPie, active: false, hasSub: true },
  { label: "작업 관리", icon: IconChecklist, active: false, hasSub: true },
  { label: "프로젝트", icon: IconFolder, active: false },
  { label: "워크플로우", icon: IconGitMerge, active: false },
  { label: "조직도", icon: IconUsers, active: true },
  { label: "앱 관리", icon: IconApps, active: false },
  { label: "리포트", icon: IconFileReport, active: false, hasSub: true },
];

export default function Sidebar({ onLogout }: { onLogout?: () => void }) {
  const [activeItem, setActiveItem] = useState("조직도");

  return (
    <aside className="fixed top-0 left-0 h-full w-[260px] bg-white border-r border-[#E2E8F0] flex flex-col z-40 p-5 shadow-[4px_0_24px_rgba(0,0,0,0.04)]">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-3 py-4 shrink-0 mb-6">
        <div className="relative flex items-center justify-center pt-1">
            {/* SyncFlow Vibrant Logo: Overlapping vivid elements mimicking water ripples focusing into a white core */}
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
              <defs>
                <linearGradient id="syncFlowGrad1" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="syncFlowGrad2" x1="32" y1="0" x2="0" y2="32">
                  <stop offset="0%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
              </defs>
              {/* Outer fluid square */}
              <rect x="2" y="10" width="20" height="20" rx="8" fill="url(#syncFlowGrad1)" />
              {/* Overlapping fluid circle indicating flowing motion */}
              <rect x="10" y="2" width="20" height="20" rx="10" fill="url(#syncFlowGrad2)" fillOpacity="0.9" />
              {/* Concentrated core */}
              <circle cx="16" cy="16" r="4.5" fill="white" />
            </svg>
        </div>
        <h1 className="text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 tracking-tighter ml-1">SyncFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar pr-2">
        {navigation.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-full text-[14px] font-semibold transition-all duration-200",
                isActive
                  ? "bg-slate-200 shadow-neu-inset-soft text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3.5">
                {/* Active dot indicator on the icon */}
                <div className="relative">
                  <item.icon size={20} stroke={2} className={isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-faint)]"} />
                  {isActive && (
                      <div className="absolute -right-0.5 top-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-success)] ring-2 ring-white"></div>
                  )}
                </div>
                <span>{item.label}</span>
              </div>
              
              {item.hasSub && (
                  <span className="text-[var(--color-text-faint)] opacity-60">
                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                         <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="pt-6 mt-4">
         <button className="w-full h-12 bg-[#008080] text-white font-semibold rounded-full text-[14px] shadow-[0_8px_16px_rgba(0,128,128,0.25)] hover:shadow-[0_12px_20px_rgba(0,128,128,0.35)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
            <IconPlus size={18} stroke={3} />
            프로젝트 생성
         </button>
         
         <button className="w-full flex items-center gap-2 px-4 py-3 mt-2 text-[13px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            <IconHelp size={18} className="text-[var(--color-text-faint)]" />
            도움말 및 지원
         </button>
         
         <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-3 text-[13px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors group">
            <IconLogout size={18} className="text-[var(--color-text-faint)] group-hover:text-[var(--color-danger)] transition-colors" />
            로그아웃
         </button>
      </div>
    </aside>
  );
}
