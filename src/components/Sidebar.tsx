"use client";

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
import { signOutAction } from "../features/auth/actions";

const navigation = [
  { label: "Home", icon: IconHome, active: false },
  { label: "Quick Access", icon: IconClock, active: false },
  { label: "Datasets", icon: IconChartPie, active: false, hasSub: true },
  { label: "Task Manager", icon: IconChecklist, active: false, hasSub: true },
  { label: "Projects", icon: IconFolder, active: false },
  { label: "Workflows", icon: IconGitMerge, active: false },
  { label: "Organization", icon: IconUsers, active: true },
  { label: "Manage Apps", icon: IconApps, active: false },
  { label: "Reports", icon: IconFileReport, active: false, hasSub: true },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Organization");

  return (
    <aside className="fixed top-0 left-0 h-full w-[260px] bg-white border-r border-[#E2E8F0] flex flex-col z-40 p-5 shadow-[4px_0_24px_rgba(0,0,0,0.04)]">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-3 py-4 shrink-0 mb-6">
        <div className="relative flex items-center justify-center">
          {/* Hexagon shape mimicking Nexus */}
          <svg
            width="28"
            height="32"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L23.2583 6.5V19.5L12 26L0.74167 19.5V6.5L12 0Z"
              fill="var(--color-primary)"
            />
            <path
              d="M12 6L18 9.5V16.5L12 20L6 16.5V9.5L12 6Z"
              fill="#F4F7F9"
              stroke="var(--color-primary)"
              strokeWidth="1"
            />
            <path
              d="M6 9.5L12 13M12 13L18 9.5M12 13V20"
              stroke="#F4F7F9"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <h1 className="text-[20px] font-bold text-[var(--color-text)] tracking-tight">
          NEXUS
        </h1>
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
                  : "text-[var(--color-text-muted)] hover:bg-slate-100",
              )}
            >
              <div className="flex items-center gap-3.5">
                {/* Active dot indicator on the icon */}
                <div className="relative">
                  <item.icon
                    size={20}
                    stroke={2}
                    className={
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-text-faint)]"
                    }
                  />
                  {isActive && (
                    <div className="absolute -right-0.5 top-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-success)] ring-2 ring-white"></div>
                  )}
                </div>
                <span>{item.label}</span>
              </div>

              {item.hasSub && (
                <span className="text-[var(--color-text-faint)] opacity-60">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="pt-6 mt-4">
        <button className="w-full h-12 bg-[#008080] text-white font-semibold rounded-full text-[14px] shadow-[0_8px_16px_rgba(0,128,128,0.25)] hover:shadow-[0_12px_20px_rgba(0,128,128,0.35)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
          <IconPlus size={18} stroke={3} />
          Create Project
        </button>

        <button className="w-full flex items-center gap-2 px-4 py-4 mt-2 text-[13px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <IconHelp size={18} className="text-[var(--color-text-faint)]" />
          Help and Support
        </button>

        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-4 py-3 text-[13px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors"
          >
            <IconLogout size={18} className="text-[var(--color-text-faint)]" />
            로그아웃
          </button>
        </form>
      </div>
    </aside>
  );
}
