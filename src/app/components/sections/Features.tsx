"use client";

import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";

import FeatureCardClientWrapper from "./FeatureCardClientWrapper";

export default function Features() {
  const { user } = useAuthStore();

  const features = [
    {
      icon: "LayoutDashboard",
      title: "Personal dashboard",
      description:
        "A student profile that feels like a living activity log, with your questions, reputation, and contributions in one place.",
      link: user ? `/users/${user.$id}/${slugify(user.name)}` : "/register",
      linkText: user ? "Open your profile" : "Create your profile",
    },
    {
      icon: "MessagesSquare",
      title: "Discussion threads",
      description:
        "Browse problem-solving threads that stay readable, contextual, and much easier to revisit than campus chat apps.",
      link: "/questions",
      linkText: "Browse questions",
    },
    {
      icon: "Users",
      title: "Clubs and circles",
      description:
        "Surface student communities in a format that helps newcomers understand where to go, who to follow, and what is active.",
      link: "/club",
      linkText: "See clubs",
    },
    {
      icon: "CalendarRange",
      title: "Event rhythm",
      description:
        "Discover events with more intention, so deadlines, announcements, and campus happenings stop feeling scattered.",
      link: "/events",
      linkText: "View events",
    },
    {
      icon: "Compass",
      title: "Remap integration",
      description:
        "Keep campus navigation close to the rest of the student experience instead of hiding it as a separate utility.",
      link: "https://re-maps.vercel.app/",
      linkText: "Open Remap",
    },
    {
      icon: "Trophy",
      title: "Recognition loop",
      description:
        "Celebrate active contributors with a leaderboard that makes progress visible without overwhelming the experience.",
      link: "/leaderboard",
      linkText: "See leaderboard",
    },
  ];

  return (
    <section id="features" className="page-shell py-16 md:py-20">
      <div className="mb-10 max-w-3xl space-y-4 md:mb-12">
        <p className="mono-label">Platform overview</p>
        <h2 className="section-title max-w-[12ch] text-[clamp(2rem,4vw,3.75rem)]">
          Designed like a focused digital commons, not a cluttered portal.
        </h2>
        <p className="section-copy">
          The reference site leaned on editorial hierarchy, warm surfaces, and quiet
          motion. This section carries that same spirit into BitOverflow&apos;s core
          product areas.
        </p>
      </div>

      <FeatureCardClientWrapper features={features} />
    </section>
  );
}
