import Link from "next/link";
import { ArrowRight, MessageSquarePlus } from "lucide-react";
import { Query } from "node-appwrite";

import { UserPrefs } from "@/store/Auth";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";

import TopContributors from "./TopContributers";
import LatestQuestionCard from "../ui/LatestQuestionCard";

export const dynamic = "force-dynamic";

const FALLBACK_QUESTIONS: Array<{
  $id: string;
  title: string;
  content: string;
  tags: string[];
  $createdAt: string;
  totalAnswers: number;
  totalVotes: number;
  author: {
    $id: string;
    name: string;
    reputation: number;
  };
}> = [];

const LatestQuestions = async () => {
  let questions = FALLBACK_QUESTIONS;
  let hasConnectionError = false;

  try {
    const { documents: docs } = await databases.listDocuments(db, questionCollection, [
      Query.limit(5),
      Query.orderDesc("$createdAt"),
    ]);

    questions = await Promise.all(
      docs.map(async (ques) => {
        const [authorResult, answersResult, votesResult] = await Promise.allSettled([
          users.get<UserPrefs>(ques.authorId),
          databases.listDocuments(db, answerCollection, [
            Query.equal("questionId", ques.$id),
            Query.limit(1),
          ]),
          databases.listDocuments(db, voteCollection, [
            Query.equal("type", "question"),
            Query.equal("typeId", ques.$id),
            Query.limit(1),
          ]),
        ]);

        return {
          ...ques,
          totalAnswers: answersResult.status === "fulfilled" ? answersResult.value.total : 0,
          totalVotes: votesResult.status === "fulfilled" ? votesResult.value.total : 0,
          author: {
            $id:
              authorResult.status === "fulfilled" ? authorResult.value.$id : "unknown-author",
            reputation:
              authorResult.status === "fulfilled"
                ? authorResult.value.prefs.reputation
                : 0,
            name:
              authorResult.status === "fulfilled"
                ? authorResult.value.name
                : "BitOverflow member",
          },
        };
      })
    );
  } catch (error) {
    hasConnectionError = true;
    console.error("Failed to load latest questions", error);
  }

  return (
    <section className="page-shell py-6 md:py-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_360px]">
        <div className="space-y-5">
          <div className="glass-panel rounded-[30px] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="mono-label">Live discussion feed</p>
                <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.05em] leading-[0.98] text-balance">
                  Recent questions, surfaced like a curated campus log.
                </h2>
                <p className="section-copy max-w-[54ch]">
                  Instead of throwing every post into a flat feed, the homepage now
                  frames fresh discussions with clearer hierarchy and metadata.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/questions"
                  className="paper-button paper-button-secondary text-sm"
                >
                  Browse all
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/questions/ask"
                  className="paper-button paper-button-primary text-sm font-semibold"
                >
                  Ask now
                  <MessageSquarePlus size={16} />
                </Link>
              </div>
            </div>
          </div>

          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question) => (
                <LatestQuestionCard key={question.$id} ques={question} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-[28px] p-6">
              <p className="mono-label">Discussion feed</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)]">
                Latest questions are temporarily unavailable.
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {hasConnectionError
                  ? "The homepage could not reach Appwrite just now. The rest of the site still loads, and this section will recover on the next successful request."
                  : "No questions have been posted yet."}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <TopContributors />

        </div>
      </div>
    </section>
  );
};

export default LatestQuestions;
