// src/features/quests/QuestCard.tsx
import Link from 'next/link';

// Define the shape of the quest data we expect
export type QuestWithProject = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  project: {
    name: string;
    logoUrl: string;
  };
};

type QuestCardProps = {
  quest: QuestWithProject;
};

export const QuestCard = ({ quest }: QuestCardProps) => {
  return (
    <Link
      href={`/quests/${quest.id}`}
      className="block rounded-xl border border-border/40 bg-background/80 p-6 backdrop-blur-lg transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-900/10"
    >
      <div className="mb-4 flex items-center">
        {/* Placeholder for project logo */}
        <div className="mr-4 h-10 w-10 rounded-full bg-purple-900/50"></div>
        <span className="font-semibold text-muted-foreground">{quest.project.name}</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">{quest.title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{quest.description}</p>
      <div className="flex justify-end">
        <span className="font-bold text-purple-400">{quest.xpReward} XP</span>
      </div>
    </Link>
  );
};