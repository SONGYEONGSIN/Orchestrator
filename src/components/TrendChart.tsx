import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { IconCalendarEvent, IconMaximize, IconChevronDown } from "@tabler/icons-react";

export default function TrendChart() {
  const chartData = useMemo(() => {
    const mock = [];
    for (let i = 1; i <= 22; i++) {
        const x = i;
        // Replicate the smooth curves from the image visually
        let metricA = 10 + Math.sin(x * 0.4) * 15;
        let metricB = 20 + Math.cos(x * 0.3) * 10;
        
        // Emulate the massive peak and drop at ~12 for Metric A
        if (x >= 9 && x <= 12) metricA += (x-8) * 10;
        if (x === 13) metricA = 10;
        if (x >= 14 && x <= 22) metricA = 10 + (x-13);
        
        // Emulate the counter drop for Metric B
        if (x === 12) metricB = 5;
        if (x >= 14 && x <= 18) metricB = 30 - Math.abs(16-x)*5;

        mock.push({ name: x.toString(), metricA: Math.max(0, metricA), metricB: Math.max(0, metricB) });
    }
    return mock;
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-neu-strong border border-[var(--color-surface)] relative bottom-4">
          <div className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 border-[6px] border-t-white border-x-transparent border-b-transparent"></div>
          <span className="font-display text-[14px] font-bold text-[var(--color-text)] tracking-tighter">{payload[0].value.toFixed(0)}</span>
        </div>
      );
    }
    return null;
  };

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
          <h3 className="text-[15px] font-bold text-[var(--color-text)]">Campaigns</h3>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3.5 py-1.5 text-[12px] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
                <IconCalendarEvent size={14} className="text-[var(--color-text-faint)]" />
                <span>24 Oct 23</span>
                <IconChevronDown size={14} className="text-[var(--color-text-faint)]" />
            </button>
            <button className="flex items-center gap-2 px-3.5 py-1.5 text-[12px] font-bold text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
                View
                <IconChevronDown size={14} className="text-[var(--color-text-faint)]" />
            </button>
            <button className="p-1.5 text-[var(--color-text-faint)] bg-[var(--color-surface)] rounded-[8px] hover:shadow-neu-inset-soft transition-all duration-200">
                <IconMaximize size={16} />
            </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CBD5E1" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-text-faint)', fontWeight: 600 }} dy={10} minTickGap={5} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-text-faint)', fontWeight: 600 }} dx={-10} tickCount={8} domain={[0, 70]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.05)', strokeWidth: 1, strokeDasharray: "4 4" }} />
            
            {/* Dashed line matching the peak point 42 */}
            <ReferenceDot x="12" y={42} r={3} fill="var(--color-primary)" stroke="white" strokeWidth={2} />

            <Area type="monotone" dataKey="metricB" stroke="#94A3B8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGray)" activeDot={{ r: 5, fill: "#94A3B8", stroke: "white", strokeWidth: 2 }} />
            <Area type="monotone" dataKey="metricA" stroke="var(--color-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrimary)" activeDot={{ r: 5, fill: "var(--color-primary)", stroke: "white", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center items-center gap-6 text-[11px] font-bold text-[var(--color-text-faint)] tracking-wide">
          <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
              <span>Metric A</span>
          </div>
          <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span>
              <span>Metric B</span>
          </div>
      </div>
    </div>
  );
}
