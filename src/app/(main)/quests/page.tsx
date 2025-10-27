// src/app/(main)/quests/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, X, Zap, Trophy, Clock, Award, Users, Flame, Sparkles,
  Calendar, Target, ChevronDown, SlidersHorizontal, ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { allQuests, type Quest, type QuestCategory, type QuestDifficulty, type QuestStatus } from '@/lib/questData';

const categories: QuestCategory[] = ['Social', 'On-Chain', 'Community', 'Testnet', 'DeFi', 'NFT'];
const difficulties: QuestDifficulty[] = ['Easy', 'Medium', 'Hard', 'Expert'];
const statuses: QuestStatus[] = ['Live', 'Hot', 'New', 'Ending Soon'];

// Quest Card Component
const QuestCard = ({ quest }: { quest: Quest }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyColors = {
    Easy: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    Medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
    Hard: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
    Expert: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  };

  const statusColors = {
    Live: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: Zap },
    Hot: { bg: 'bg-red-500/10', text: 'text-red-400', icon: Flame },
    New: { bg: 'bg-green-500/10', text: 'text-green-400', icon: Sparkles },
    'Ending Soon': { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Clock },
  };

  const diff = difficultyColors[quest.difficulty];
  const stat = statusColors[quest.status];
  const StatusIcon = stat.icon;
  const daysLeft = Math.ceil((new Date(quest.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const handleStartQuest = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/quests/${quest.id}`);
  };

  const handleCardClick = () => {
    router.push(`/quests/${quest.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl bg-slate-950 border border-slate-700 p-2 group-hover:border-purple-500/50 transition-colors overflow-hidden">
              <Image
                src={quest.project.logo}
                alt={quest.project.name}
                width={44}
                height={44}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/44x44/1E293B/94A3B8?text=${quest.project.name[0]}`;
                }}
              />
            </div>
            <div>
              <span className="font-semibold text-white text-sm block">{quest.project.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${diff.bg} ${diff.border} ${diff.text} border font-medium`}>
                  {quest.difficulty}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${stat.bg} ${stat.text} font-medium flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {quest.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/40">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-purple-300 text-sm">{quest.xpReward}</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-100 transition-colors">
          {quest.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {quest.description}
        </p>

        <div className="flex items-center gap-3 mb-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{(quest.participants / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{quest.timeEstimate} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{daysLeft}d left</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Completion</span>
            <span>{quest.completionRate}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: isHovered ? `${quest.completionRate}%` : '0%' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {quest.rewards.badges && (
              <div className="flex items-center gap-1 text-xs text-purple-400">
                <Award className="w-3.5 h-3.5" />
                <span>Badge</span>
              </div>
            )}
            {quest.rewards.tokens && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <Zap className="w-3.5 h-3.5" />
                <span>{quest.rewards.tokens.amount}</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleStartQuest}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/50"
          >
            Start
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function QuestBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<QuestCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulty] = useState<QuestDifficulty[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<QuestStatus[]>([]);
  const [sortBy, setSortBy] = useState<'xp' | 'participants' | 'ending' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredQuests = useMemo(() => {
    const filtered = allQuests.filter(quest => {
      const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(quest.category);
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(quest.difficulty);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(quest.status);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'xp': return b.xpReward - a.xpReward;
        case 'participants': return b.participants - a.participants;
        case 'ending': return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        default: return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, selectedDifficulties, selectedStatuses, sortBy]);

  const totalXP = useMemo(() => filteredQuests.reduce((sum, q) => sum + q.xpReward, 0), [filteredQuests]);
  const activeFilters = selectedCategories.length + selectedDifficulties.length + selectedStatuses.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),transparent_50%)]" />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  Quest Board
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Discover and complete challenges to earn rewards
              </p>
            </div>

            <div className="hidden md:flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <Trophy className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-bold text-white">{filteredQuests.length}</div>
                  <div className="text-xs text-slate-400">Active Quests</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <Zap className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-sm font-bold text-white">{(totalXP / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-slate-400">Total XP</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm font-bold text-white">100K+</div>
                  <div className="text-xs text-slate-400">Quest Hunters</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search quests or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeFilters > 0
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900/50 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilters > 0 && (
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                  {activeFilters}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-4 pr-10 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer transition-all"
              >
                <option value="newest">Newest</option>
                <option value="xp">Highest XP</option>
                <option value="participants">Most Popular</option>
                <option value="ending">Ending Soon</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-800/50 mb-6">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-medium self-center">Category:</span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategories(prev =>
                      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                    )}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedCategories.includes(cat)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-medium self-center">Difficulty:</span>
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(prev =>
                      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
                    )}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedDifficulties.includes(diff)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-medium self-center">Status:</span>
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatuses(prev =>
                      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
                    )}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedStatuses.includes(status)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {activeFilters > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedDifficulty([]);
                    setSelectedStatuses([]);
                  }}
                  className="ml-auto px-4 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          )}

          {filteredQuests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Target className="w-16 h-16 text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-slate-300 mb-2">No Quests Found</h3>
              <p className="text-slate-500 text-center max-w-md">
                Try adjusting your filters or search query to find more quests
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}