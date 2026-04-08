import Link from "next/link";
import React from "react";
import { ArrowRight, DivideIcon as LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  link: string;
  linkText: string;
  requireAuth?: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  link,
  linkText,
  requireAuth,
}) => {
  const isExternal = link.startsWith("http");

  return (
    <div className="glass-panel group flex h-full flex-col rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] md:p-7">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="mono-label text-[10px] text-[var(--soft)]">
          {requireAuth ? "Members area" : "Product block"}
        </span>
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon size={20} />
        </div>
      </div>

      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[0.98rem] text-[var(--muted)]">{description}</p>

      <div className="mt-6">
        <Link
          href={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-transform group-hover:translate-x-0.5"
        >
          <span>{linkText}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
