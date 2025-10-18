// src/app/(main)/quests/[questId]/page.tsx

interface QuestDetailPageProps {
  params: {
    questId: string;
  };
}

export default function QuestDetailPage({ params }: QuestDetailPageProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Quest Details</h1>
      <p className="mt-4 text-slate-400">
        Viewing details for Quest ID:
      </p>
      <p className="mt-2 text-lg font-mono text-purple-400">
        {params.questId}
      </p>
    </div>
  );
}