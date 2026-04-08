"use client";

import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

const quickStats = [
  { label: "Shared spaces", value: "4", detail: "Questions, clubs, events, and remap" },
  { label: "Campus-first UX", value: "1", detail: "Built specifically for BIT Mesra" },
  { label: "Community loop", value: "24/7", detail: "Ask, answer, discover, repeat" },
];

const Hero = () => {
  return (
    <section className="page-shell pt-4 md:pt-6">
      <div className="space-y-6">
        <div className="glass-panel-strong rounded-[32px] p-6 md:p-8 lg:p-10">
          <div className="max-w-5xl space-y-6">
            <p className="mono-label">Student platform / BIT Mesra</p>
            <h1 className="section-title max-w-[11ch]">
              One calmer home for campus questions and discovery.
            </h1>
            <p className="section-copy max-w-[70ch] text-[1.05rem]">
              BitOverflow brings together coding help, clubs, events, and campus
              navigation in a way that feels warm, direct, and genuinely useful to
              students.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/questions/ask"
                className="paper-button paper-button-primary text-sm font-semibold"
              >
                Ask a question
                <ArrowRight size={17} />
              </Link>
              <Link href="/questions" className="paper-button paper-button-secondary text-sm">
                Explore discussions
              </Link>
              <Link href="/leaderboard" className="paper-button paper-button-secondary text-sm">
                View leaderboard
                <Trophy size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {quickStats.map((item) => (
            <div key={item.label} className="glass-panel rounded-[24px] p-5">
              <p className="mono-label text-[10px] text-[var(--soft)]">{item.label}</p>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">{item.value}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
