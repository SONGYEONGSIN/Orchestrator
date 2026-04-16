import { IconCalendarEvent, IconChevronDown } from "@tabler/icons-react";

const events = [
  { title: "Client Sync Call", time: "9 AM - 10 AM", color: "bg-[var(--color-primary)]" },
  { title: "Design Review", time: "11:30 AM - 1 PM", color: "bg-[var(--color-warning)]" },
  { title: "Team Standup", time: "3 PM - 4 PM", color: "bg-[var(--color-success)]" },
];

export default function ScheduleEvents() {
  return (
    <div className="card-base p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
            <div className="w-[5px] h-[5px] border-[1.5px] border-[var(--color-text-faint)] rounded-[1px]"></div>
          </div>
          <h3 className="text-[15px] font-bold text-[var(--color-text)]">Schedule & Events</h3>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-1.5 text-[12px] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
          <IconCalendarEvent size={14} className="text-[var(--color-text-faint)]" />
          <span>24 Oct 23</span>
          <IconChevronDown size={14} className="text-[var(--color-text-faint)]" />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 px-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
          const dateString = (29 + i) > 31 ? (29 + i) - 31 : (29 + i);
          const isToday = i === 2;
          return (
            <div key={day} className="flex flex-col items-center gap-3 group cursor-pointer w-9">
              <span className="text-[11px] font-bold text-[var(--color-text-faint)] group-hover:text-[var(--color-text)] transition-colors">{day}</span>
              <span className={`w-8 h-8 flex items-center justify-center text-[12px] font-bold rounded-[8px] transition-all duration-300 ${isToday ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(0,128,128,0.3)]' : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'}`}>
                {dateString}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex-1 space-y-6 mt-4">
        {events.map((event, idx) => (
          <div key={idx} className="relative pl-6 group cursor-pointer">
            <div className="absolute left-[3.5px] top-3 bottom-[-24px] w-[1px] bg-[#E2E8F0] last:hidden"></div>
            <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full ${event.color} ring-[3px] ring-white shadow-sm group-hover:scale-125 transition-transform`}></div>
            <div className="group-hover:-translate-y-[1px] transition-transform duration-200 pl-1">
              <h4 className="text-[13px] font-bold text-[var(--color-text)] tracking-tight">{event.title}</h4>
              <p className="text-[11px] font-semibold text-[var(--color-text-faint)] mt-1">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
