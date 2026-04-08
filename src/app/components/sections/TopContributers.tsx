import Link from "next/link";
import { Crown, Trophy } from "lucide-react";
import { Query } from "node-appwrite";

import { avatars } from "@/models/client/config";
import { users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import slugify from "@/utils/slugify";

export const dynamic = "force-dynamic";

export default async function TopContributors() {
  let sortedUsers: UserPrefs[] = [];
  let hasConnectionError = false;

  try {
    const topUsers = await users.list<UserPrefs>([Query.limit(5)]);
    sortedUsers = [...topUsers.users].sort(
      (a, b) => b.prefs.reputation - a.prefs.reputation
    );
  } catch (error) {
    hasConnectionError = true;
    console.error("Failed to load top contributors", error);
  }

  return (
    <div className="glass-panel rounded-[30px] p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mono-label">Leaderboard snapshot</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
            Top contributors
          </h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--accent-soft)] text-[var(--accent)]">
          <Trophy size={18} />
        </div>
      </div>

      {sortedUsers.length > 0 ? (
        <>
          <div className="space-y-3">
            {sortedUsers.map((user, index) => (
              <Link
                key={user.$id}
                href={`/users/${user.$id}/${slugify(user.name)}`}
                className="glass-panel flex items-center gap-4 rounded-[22px] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatars.getInitials(user.name, 48, 48).href}
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                  />
                  {index === 0 ? (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--text)] text-white">
                      <Crown size={11} />
                    </div>
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[var(--text)]">{user.name}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {user.prefs.reputation.toLocaleString()} reputation
                  </p>
                </div>

                <div className="text-right">
                  <p className="mono-label text-[10px] text-[var(--soft)]">Rank</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.05em] text-[var(--text)]">
                    #{index + 1}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/leaderboard"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
          >
            View full leaderboard
          </Link>
        </>
      ) : (
        <div className="glass-panel rounded-[22px] p-4">
          <p className="text-sm text-[var(--muted)]">
            {hasConnectionError
              ? "Leaderboard data is temporarily unavailable because the server connection was interrupted."
              : "No contributors to show yet."}
          </p>
        </div>
      )}
    </div>
  );
}
