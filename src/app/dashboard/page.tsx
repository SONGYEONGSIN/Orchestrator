import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KpiCard from "@/components/KpiCard";
import TrendChart from "@/components/TrendChart";
import ScheduleEvents from "@/components/ScheduleEvents";
import Timeline from "@/components/Timeline";
import {
  IconCoins,
  IconCreditCardPay,
  IconFileAnalytics,
  IconWallet,
} from "@tabler/icons-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[var(--color-surface)] text-[var(--color-text)] font-sans antialiased overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-full overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar relative">
          <div className="absolute top-20 left-40 w-[600px] h-[400px] bg-[var(--color-primary)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>

          <div className="w-full mx-auto space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <KpiCard
                icon={<IconWallet size={16} />}
                label="Expenses"
                value="₹125,400"
                change="↓ -8.5%"
                trend="down"
              />
              <KpiCard
                icon={<IconCoins size={16} />}
                label="Income"
                value="₹42,850"
                change="↑ +12.3%"
                trend="up"
              />
              <KpiCard
                icon={<IconCreditCardPay size={16} />}
                label="Expenses"
                value="₹132,600"
                change="↓ -9.2%"
                trend="down"
              />
              <KpiCard
                icon={<IconFileAnalytics size={16} />}
                label="Income"
                value="₹48,200"
                change="↑ +15.1%"
                trend="up"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[380px]">
              <div className="xl:col-span-2">
                <TrendChart />
              </div>
              <div className="xl:col-span-1">
                <ScheduleEvents />
              </div>
            </div>

            <div className="w-full">
              <Timeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
