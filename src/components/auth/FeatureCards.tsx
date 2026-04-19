import { IconStack2, IconBrain, IconChartLine } from "@tabler/icons-react";
import OrbitalDemo from "./demos/OrbitalDemo";
import NeuralMeshDemo from "./demos/NeuralMeshDemo";
import LiveTickerDemo from "./demos/LiveTickerDemo";

type Feature = {
  icon: typeof IconStack2;
  title: string;
  body: string;
  demo: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: IconStack2,
    title: "통합 운영 관리",
    body: "서비스, 계약, 인수인계 등 파편화된 운영 업무를 단일 대시보드에서 제어합니다.",
    demo: <OrbitalDemo />,
  },
  {
    icon: IconBrain,
    title: "AI & 자동화",
    body: "반복 태스크는 자동화 워크플로우로, 복잡한 판단은 AI 어시스턴트가 보조합니다.",
    demo: <NeuralMeshDemo />,
  },
  {
    icon: IconChartLine,
    title: "분석 & 리포트",
    body: "실시간 지표와 주간 리포트로 데이터 기반의 운영 의사결정을 빠르게 내립니다.",
    demo: <LiveTickerDemo />,
  },
];

export default function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, body, demo }) => (
          <div
            key={title}
            className="card-base rounded-3xl p-7 md:p-8 relative overflow-hidden flex flex-col h-full group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)] opacity-[0.04] blur-[60px] rounded-full pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Icon size={22} stroke={2} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text)] mb-3">
              {title}
            </h3>
            <p className="text-sm md:text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-8">
              {body}
            </p>
            {demo}
          </div>
        ))}
      </div>
    </section>
  );
}
