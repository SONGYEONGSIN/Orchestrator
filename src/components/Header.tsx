import { IconBell, IconSearch } from "@tabler/icons-react";

export default function Header() {
  return (
    <header className="h-[90px] flex items-center justify-between px-8 z-30">
      <div className="flex items-center text-[13px] font-bold text-[var(--color-text-faint)] tracking-wide">
        <span>홈</span>
        <span className="mx-2 opacity-50">›</span>
        <span className="text-[var(--color-text)]">대시보드</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-[45%] text-[var(--color-text-faint)]" size={16} stroke={2.5} />
          <input 
            type="text" 
            placeholder="무엇이든 검색하세요..." 
            className="pl-11 pr-4 py-2.5 bg-[#E2E8F0] bg-opacity-60 rounded-full text-[13px] font-bold text-[var(--color-text)] placeholder-[var(--color-text-faint)] outline-none focus:bg-white focus:shadow-neu-soft transition-all w-[300px]"
          />
        </div>
        
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-neu-soft hover:shadow-neu-strong transition-all duration-200">
          <IconBell size={18} className="text-[var(--color-text)]" stroke={2} />
        </button>

        <button className="w-9 h-9 rounded-full bg-white p-[2px] shadow-neu-soft overflow-hidden group">
          <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </header>
  );
}
