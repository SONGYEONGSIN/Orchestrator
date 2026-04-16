import { IconCheck, IconDotsVertical, IconMaximize, IconCalendarEvent, IconChevronDown } from "@tabler/icons-react";

export default function Timeline() {
  const tasks = [
    { name: "SYS - CORE", progress: 65 },
    { name: "Phase 1", progress: 35 },
  ];

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
          </div>
          <h3 className="text-[15px] font-bold text-[var(--color-text)]">Timeline Chart</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-1.5 text-[12px] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
            <IconCalendarEvent size={14} className="text-[var(--color-text-faint)]" />
            1 Oct 23 - 30 Nov 23
            <IconChevronDown size={14} className="text-[var(--color-text-faint)]" />
          </button>
          <button className="p-1.5 text-[var(--color-text-faint)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
            <IconDotsVertical size={16} />
          </button>
          <button className="p-1.5 text-[var(--color-text-faint)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
            <IconMaximize size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[160px_1fr] flex-1">
        
        {/* Task Names Column */}
        <div className="flex flex-col">
            <div className="h-8 text-[12px] font-bold text-[var(--color-text)] mb-2 mt-1">
                Task
            </div>
            {tasks.map((task) => (
               <div key={task.name} className="h-16 flex items-center text-[12px] font-bold text-[var(--color-text-muted)] group cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                 {task.name}
               </div>
            ))}
        </div>

        {/* Timeline Grid Column */}
        <div className="flex flex-col relative w-full overflow-hidden">
            {/* Header (Weeks & Days) */}
            <div className="flex w-full mb-4">
                {[1, 2, 3].map((week) => (
                    <div key={week} className="flex-1 border-l border-transparent first:border-none flex flex-col justify-end">
                        <div className="text-[11px] font-bold text-[var(--color-text-faint)] text-center mb-2">Week {week}</div>
                        <div className="flex justify-between px-2 text-[10px] font-semibold text-[#CBD5E1]">
                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid Container */}
            <div className="relative">
                {/* Vertical Separators per week */}
                <div className="absolute inset-0 flex pointer-events-none">
                    <div className="flex-1 border-l border-dashed border-[#E2E8F0] opacity-50"></div>
                    <div className="flex-1 border-l border-dashed border-[#E2E8F0] opacity-50"></div>
                    <div className="flex-1 border-l border-dashed border-[#E2E8F0] opacity-50"></div>
                </div>

                {tasks.map((task, i) => {
                  const startOffset = i === 0 ? 0 : 35;
                  const isHatched = i === 1;
                  return (
                    <div key={task.name} className="h-16 flex items-center relative z-10 w-full group cursor-pointer">
                      {/* Background Track Row */}
                      <div className="absolute inset-x-0 h-full bg-[#F8FAFC] opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      
                      <div 
                        className="absolute h-[10px] rounded-full flex items-center justify-end px-1.5 shadow-[0_2px_8px_rgba(0,128,128,0.2)] transition-all duration-300 hover:h-[12px]"
                        style={{ 
                          left: `${startOffset}%`, 
                          width: `${task.progress}%`,
                          backgroundColor: 'var(--color-primary)',
                          backgroundImage: isHatched ? 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 6px, transparent 6px, transparent 12px)' : 'none'
                        }}
                      >
                         <div className="w-[14px] h-[14px] rounded-full bg-[var(--color-surface)] shadow-md flex items-center justify-center -mr-2 ring-[1.5px] ring-[var(--color-primary)]">
                           <IconCheck size={10} className="text-[var(--color-text)]" stroke={3.5} />
                         </div>
                      </div>
                    </div>
                  )
                })}
            </div>
        </div>
      </div>
    </div>
  );
}
