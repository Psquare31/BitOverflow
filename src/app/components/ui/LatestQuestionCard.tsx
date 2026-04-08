import Link from "next/link";
import React from "react";
import { Models } from "appwrite";

import { avatars } from "@/models/client/config";
import convertDateToRelativeTime from "@/utils/relativeTime";
import slugify from "@/utils/slugify";

interface LatestQuestionCardProps {
  ques: Models.Document & {
    totalAnswers: number;
    totalVotes: number;
    author: {
      $id: string;
      name: string;
      reputation: number;
    };
  };
}

const LatestQuestionCard: React.FC<LatestQuestionCardProps> = ({ ques }) => {
  const cleanPreview = String(ques.content ?? "")
    .replace(/[#_*`>|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const preview =
    cleanPreview.length > 170 ? `${cleanPreview.slice(0, 167)}...` : cleanPreview;

  return (
    <article className="glass-panel group rounded-[28px] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="mono-label text-[10px] text-[var(--soft)]">
            Asked {convertDateToRelativeTime(new Date(ques.$createdAt))}
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">
            <Link
              href={`/questions/${ques.$id}/${slugify(ques.title)}`}
              className="transition-colors group-hover:text-[var(--accent)]"
            >
              {ques.title}
            </Link>
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {preview || "Open the thread to read the full question and context."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {ques.tags.map((tag: string) => (
              <Link key={tag} href={`/questions?tag=${tag}`} className="chip">
                {tag}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatars.getInitials(ques.author.name, 40, 40).href}
              alt={ques.author.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <Link
                href={`/users/${ques.author.$id}/${slugify(ques.author.name)}`}
                className="font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]"
              >
                {ques.author.name}
              </Link>
              <p className="text-sm text-[var(--muted)]">
                {ques.author.reputation.toLocaleString()} reputation
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:w-[78px] lg:grid-cols-1">
          <StatCard label="Votes" value={ques.totalVotes} />
          <StatCard label="Answers" value={ques.totalAnswers} />
          <StatCard label="Author rep" value={ques.author.reputation} />
        </div>
      </div>
    </article>
  );
};

type StatCardProps = {
  label: string;
  value: number;
};

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-2">
      <p className="mono-label text-[9px] leading-tight text-[var(--soft)]">{label}</p>
      <p className="mt-1.5 text-base font-semibold tracking-[-0.05em] text-[var(--text)]">
        {value.toLocaleString()}
      </p>
    </div>
  );
};

export default LatestQuestionCard;
