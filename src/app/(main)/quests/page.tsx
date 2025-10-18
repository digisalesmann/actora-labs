"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; 
import { 
  Search, X as CloseIcon, Filter, Zap, ChevronDown, Trophy, Clock, 
  Award, Check, BookOpen, Layers, Target, TrendingUp, DollarSign, Image as ImageIcon, ArrowRight
} from 'lucide-react';

// --- DATA & CONSTANTS ---

// UPDATED Project List
const allProjects = ['Monad', 'Berachain', 'Arbitrum', 'Optimism', 'Polygon', 'zkSync', 'Linea', 'Starknet', 'Solana', 'Binance', 'Scroll'];
const allCategories = ['Social', 'On-Chain', 'Community', 'Testnet', 'DeFi', 'NFT'];
const allDifficulties = ['Easy', 'Medium', 'Hard', 'Pro'];
const allStatuses = ['Live', 'New', 'Expiring', 'Completed'];

// UPDATED Mapped logos using placehold.co (using project initials as placeholders since local files are unavailable)
const projectLogos: Record<string, string> = {
    'Monad': 'logos/monad.png',
    'Berachain': 'logos/bera.png',
    'Arbitrum': 'logos/arb.svg',
    'Optimism': 'logos/op.svg',
    'Polygon': 'logos/poly.svg',
    'zkSync': 'logos/zk.png',
    'Linea': 'logos/linea.svg',
    'Starknet': 'logos/starknet.svg',
    'Solana': 'logos/solana.svg',
    'Binance': 'logos/bnb.svg',
    'Scroll': 'logos/scroll.svg',
};

// --- TYPE DEFINITIONS ---
type QuestCategory = typeof allCategories[number];
type QuestDifficulty = typeof allDifficulties[number];
type QuestStatus = typeof allStatuses[number];
type SortOption = 'newest' | 'xp' | 'difficulty' | 'timeEstimate';

interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  timeEstimate: string;
  xpReward: number;
  project: string;
}

// --- MOCK DATA GENERATION ---
const generateQuests = (count: number): Quest[] => {
  const quests: Quest[] = [];
  for (let i = 1; i <= count; i++) {
    const project = allProjects[Math.floor(Math.random() * allProjects.length)];
    const category = allCategories[Math.floor(Math.random() * allCategories.length)];
    const difficulty = allDifficulties[Math.floor(Math.random() * allDifficulties.length)];
    const status = allStatuses[Math.floor(Math.random() * allStatuses.length)];
    const xpReward = Math.floor(Math.random() * (difficulty === 'Pro' ? 1000 : difficulty === 'Hard' ? 500 : 200) + 50);
    const timeEstimate = `${Math.floor(Math.random() * 30) + 5} mins`;

    quests.push({
      id: `${i}`,
      title: `The ${difficulty} ${category} Challenge on ${project}`,
      category,
      difficulty,
      status,
      timeEstimate,
      xpReward,
      project,
    });
  }
  return quests;
};

const allQuests: Quest[] = generateQuests(30);

// Helper functions
const difficultyOrder: QuestDifficulty[] = ['Easy', 'Medium', 'Hard', 'Pro'];
const getSortLabel = (key: SortOption) => {
  switch(key) {
      case 'newest': return 'Newest';
      case 'xp': return 'Highest XP';
      case 'difficulty': return 'Difficulty (Asc)';
      case 'timeEstimate': return 'Time (Shortest)';
      default: return 'Newest';
  }
}

// --- UTILITY STYLES & ANIMATIONS ---
const CustomStyles = `
  /* Custom Scrollbar */
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #7c3aed; border-radius: 10px; } 
  .custom-scrollbar::-webkit-scrollbar-track { background-color: #1e293b; border-radius: 10px; }
  
  /* Animated Background Grid */
  .grid-background {
      background-color: #000000; /* Black background for high contrast */
  }

  /* Keyframes for Hero Animations */
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 40px) scale(0.9); }
  }
  .animate-blob {
    animation: blob 7s infinite ease-in-out;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 60s linear infinite;
  }

  @keyframes spin-slow-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  .animate-spin-slow-reverse {
    animation: spin-slow-reverse 45s linear infinite;
  }
`;

// --- CUSTOM HOOKS ---

// A custom hook to get mouse position
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
  
    return mousePosition;
};

// --- COMPONENTS ---

// 1. HERO SECTION (Incorporates the animated background)
const HeroSection: React.FC = () => {
    const { x, y } = useMousePosition();
    const [orbTransform, setOrbTransform] = useState('');
  
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dx = x - window.innerWidth / 2;
            const dy = y - window.innerHeight / 2;
            // The -15 and 15 values control the intensity of the tilt
            const tiltX = dy / window.innerHeight * -15; 
            const tiltY = dx / window.innerWidth * 15;
            setOrbTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
        }
    }, [x, y]);
  
    // Staggered text animation variants
    const FADE_UP_ANIMATION_VARIANTS: Variants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    };

    return (
        <section className="relative w-full pt-32 pb-24 flex items-center justify-center overflow-hidden bg-black border-b border-purple-900/50">
            <div className='absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]'></div>

            {/* Animated Background Glows */}
            <div className="absolute top-[10%] left-1/4 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl animate-blob -z-10 opacity-70"></div>
            <div className="absolute bottom-[10%] right-1/4 w-96 h-96 bg-indigo-600/40 rounded-full blur-3xl animate-blob animation-delay-4000 -z-10 opacity-70"></div>

            {/* Interactive Orb (Tilt effect based on mouse position) */}
            <motion.div
                className="absolute inset-0 z-10 hidden md:flex items-center justify-center pointer-events-none"
                style={{ transform: orbTransform }}
            >
                <div className="relative w-96 h-96">
                    {/* Rings */}
                    <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-8 border-2 border-indigo-400/30 rounded-full animate-spin-slow-reverse"></div>
                    
                    {/* Center Core */}
                    <div className="absolute inset-16 bg-purple-900/30 rounded-full shadow-inner shadow-black flex items-center justify-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-full blur-xl shadow-[0_0_20px_theme(colors.purple.500)]"></div>
                    </div>
                </div>
            </motion.div>

            {/* Content (Z-indexed above animations) */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
                className="relative z-20 flex flex-col items-center text-center max-w-7xl mx-auto px-4"
            >
                <motion.h1 
                    className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 drop-shadow-lg"
                    variants={FADE_UP_ANIMATION_VARIANTS}
                >
                    The <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Quest Board</span>
                </motion.h1>

                <motion.p 
                    className="mt-6 max-w-3xl text-lg sm:text-xl text-slate-300 px-4"
                    variants={FADE_UP_ANIMATION_VARIANTS}
                >
                    Unlock premium roles and exclusive rewards by completing challenges from leading Web3 ecosystems.
                </motion.p>

                <motion.div 
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4"
                    variants={FADE_UP_ANIMATION_VARIANTS}
                >
                    {/* START QUEST Button */}
                    <motion.a 
                        href="#"
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-900/50 transition-all duration-300 hover:shadow-purple-700/70 w-full sm:w-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Zap className="w-5 h-5 mr-2" />
                        Start Your First Quest
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.a>
                    
                    {/* FOR BUILDERS Button (Removed "View My Progress" mock) */}
                    <motion.a 
                        href="#"
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-slate-300 bg-slate-900/50 border border-slate-700 rounded-xl shadow-lg transition-all duration-300 hover:border-slate-500 hover:text-white w-full sm:w-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Progress
                        <Award className="w-5 h-5 ml-2 p-0.5 rounded-full bg-slate-800/60 group-hover:bg-slate-700/60 transition" />
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};


// 2. PROJECT LOGO
interface ProjectLogoProps {
  project: string;
  size?: number;
}
const ProjectLogo: React.FC<ProjectLogoProps> = ({ project, size = 40 }) => (
  <div 
    className="rounded-xl overflow-hidden shadow-lg border-2 border-purple-500/20 flex-shrink-0"
    style={{ width: size, height: size }}
  >
    {/* NOTE: The images below use placeholder URLs since local paths (logos/monad.png, etc.) 
      are inaccessible in this environment. The onError fallback handles cases where the 
      placeholder might fail (though unlikely).
    */}
    <img 
        src={projectLogos[project]} 
        alt={`${project} Logo`} 
        className="w-full h-full object-cover"
        onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = `https://placehold.co/${size}x${size}/0B1227/ffffff?text=${project.charAt(0)}`;
        }}
    />
  </div>
);


// 3. QUEST CARD
const QuestCardPro: React.FC<{ quest: Quest }> = ({ quest }) => {
  const isCompleted = quest.status === 'Completed';

  const getDifficultyColor = (diff: QuestDifficulty) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-400 border-emerald-700/50 bg-emerald-900/20';
      case 'Medium': return 'text-yellow-400 border-yellow-700/50 bg-yellow-900/20';
      case 'Hard': return 'text-orange-400 border-orange-700/50 bg-orange-900/20';
      case 'Pro': return 'text-red-500 border-red-700/50 bg-red-900/20';
    }
  };

  const difficultyClasses = getDifficultyColor(quest.difficulty);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`relative min-h-full flex flex-col bg-slate-900/70 border rounded-3xl p-6 overflow-hidden transition-all duration-300 shadow-xl shadow-black/50 hover:shadow-purple-900/60 cursor-pointer backdrop-blur-sm ${
        isCompleted ? 'border-green-700/50 opacity-80' : 'border-slate-800 hover:border-purple-600/70'
      }`}
    >
      {/* Subtle Corner Glow */}
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl transition-all duration-700 opacity-20 pointer-events-none ${
          isCompleted ? 'bg-green-500/50' : 'bg-purple-500/50'
      }`}></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 h-16">
        <div className="flex items-center space-x-3">
          <ProjectLogo project={quest.project} />
          <div>
            <span className="text-sm font-medium text-slate-300 block leading-snug">{quest.project}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyClasses} uppercase tracking-wider`}>
              {quest.difficulty}
            </span>
          </div>
        </div>
        
        {/* XP Reward (Prominent) */}
        <div className="flex flex-col items-center">
          <Trophy size={20} className="text-amber-400" />
          <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 tracking-wider">
              {quest.xpReward}
          </span>
          <span className="text-xs text-slate-400 uppercase leading-none">XP</span>
        </div>
      </div>

      {/* Title and Category */}
      <h3 className={`text-lg font-bold leading-snug mb-3 ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
        {quest.title}
      </h3>
      
      {/* Metadata */}
      <div className="flex justify-between items-center text-sm mb-4 border-t border-slate-800 pt-4">
        <div className="flex items-center text-slate-400 space-x-1">
          <BookOpen size={16} />
          <span className="text-xs">{quest.category}</span>
        </div>
        <div className="flex items-center text-slate-400 space-x-1">
          <Clock size={16} />
          <span className="text-xs">{quest.timeEstimate}</span>
        </div>
      </div>
      
      {/* Footer: Action Button (Sticks to bottom, removes mock progress) */}
      <div className="mt-auto flex flex-col space-y-3 pt-2">
        
        <motion.button
          whileHover={{ scale: isCompleted ? 1 : 1.02, boxShadow: '0 4px 15px rgba(124, 58, 237, 0.6)' }}
          whileTap={{ scale: isCompleted ? 1 : 0.98 }}
          className={`w-full py-3 rounded-xl font-extrabold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
            isCompleted 
              ? 'bg-green-700/50 text-green-300 cursor-not-allowed border border-green-700' 
              : quest.status === 'Expiring'
                ? 'bg-red-600/80 text-white border border-red-500 hover:bg-red-700/90 shadow-red-900/50'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-purple-900/50'
          }`}
        >
          {isCompleted ? <Check size={18} /> : quest.status === 'Expiring' ? <Clock size={18} /> : <Zap size={18} />}
          <span>{isCompleted ? 'CLAIMED' : quest.status === 'Expiring' ? 'EXPIRING' : 'START QUEST'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// 4. FILTER DRAWER (Kept same as previous version)
interface FilterProps {
    search: string; setSearch: (s: string) => void;
    filters: { 
        projects: string[]; categories: QuestCategory[]; difficulties: QuestDifficulty[]; statuses: QuestStatus[]; 
        toggleProject: (p: string) => void; toggleCategory: (c: QuestCategory) => void; 
        toggleDifficulty: (d: QuestDifficulty) => void; toggleStatus: (s: QuestStatus) => void;
    };
    onClose: () => void;
    filteredCount: number;
}

const FilterDrawer: React.FC<FilterProps> = ({ filters, search, setSearch, onClose, filteredCount }) => {
    
    const CheckboxItem: React.FC<{ label: string; checked: boolean; toggle: () => void; icon?: React.ReactNode }> = ({ label, checked, toggle, icon }) => (
        <motion.label 
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                checked 
                ? 'bg-purple-900/50 border-purple-600 text-white shadow-md shadow-purple-900/40' 
                : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/70 text-slate-300'
            }`}
            onClick={toggle}
        >
            <div className='flex items-center space-x-2'>
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            <motion.div 
                animate={{ scale: checked ? 1 : 0.7 }}
                className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-300 ${checked ? 'bg-purple-500 border-purple-500' : 'bg-slate-700 border-slate-600'}`}>
                {checked && <Check size={14} className="text-white" />}
            </motion.div>
        </motion.label>
    );

    const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className='pb-6'>
            <h3 className="font-semibold text-purple-400 text-xs mb-3 uppercase tracking-widest border-b border-slate-800 pb-2">{title}</h3>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
    
    const CategoryIcons: Record<QuestCategory, React.ReactNode> = {
        'Social': <Layers size={16} className="text-blue-400" />,
        'On-Chain': <Target size={16} className="text-orange-400" />,
        'Community': <Award size={16} className="text-yellow-400" />,
        'Testnet': <Zap size={16} className="text-green-400" />,
        'DeFi': <DollarSign size={16} className="text-red-400" />,
        'NFT': <ImageIcon size={16} className="text-pink-400" />,
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-slate-950 border-l border-purple-800/50 overflow-y-auto flex flex-col shadow-2xl shadow-purple-900/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6 flex-grow overflow-y-auto custom-scrollbar'>
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4 sticky top-0 bg-slate-950 z-10">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Filter Quest Board</h2>
                    <motion.button 
                        whileTap={{ scale: 0.85 }}
                        onClick={onClose} 
                        className="p-2 rounded-full text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                        <CloseIcon size={24} />
                    </motion.button>
                </div>
            
                {/* Search */}
                <FilterSection title="Search">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Project or quest title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-800/80 border border-purple-500/30 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500/80 focus:border-purple-500 transition-all duration-300 placeholder:text-slate-500"
                        />
                    </div>
                </FilterSection>

                {/* Projects Filter */}
                <FilterSection title="Projects">
                    <div className={`space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar`}> 
                        {allProjects.map(proj => (
                            <CheckboxItem 
                                key={proj} 
                                label={proj} 
                                checked={filters.projects.includes(proj)} 
                                toggle={() => filters.toggleProject(proj)} 
                            />
                        ))}
                    </div>
                </FilterSection>
                
                {/* Status Filter */}
                <FilterSection title="Status">
                    <div className="grid grid-cols-2 gap-2">
                        {allStatuses.map(status => (
                            <CheckboxItem 
                                key={status} 
                                label={status} 
                                checked={filters.statuses.includes(status)} 
                                toggle={() => filters.toggleStatus(status)} 
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Categories Filter */}
                <FilterSection title="Category">
                    <div className="grid grid-cols-2 gap-2">
                        {allCategories.map(cat => (
                            <CheckboxItem 
                                key={cat} 
                                label={cat} 
                                checked={filters.categories.includes(cat)} 
                                toggle={() => filters.toggleCategory(cat)} 
                                icon={CategoryIcons[cat]}
                            />
                        ))}
                    </div>
                </FilterSection>
                
                {/* Difficulty Filter */}
                <FilterSection title="Difficulty">
                    <div className="grid grid-cols-2 gap-2">
                        {allDifficulties.map(diff => (
                            <CheckboxItem 
                                key={diff} 
                                label={diff} 
                                checked={filters.difficulties.includes(diff)} 
                                toggle={() => filters.toggleDifficulty(diff)} 
                            />
                        ))}
                    </div>
                </FilterSection>
            </div>
            
            {/* Sticky Button Footer */}
            <div className='p-4 border-t border-slate-800 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]'>
                <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose} 
                    className='w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-900/50'
                >
                    Show {filteredCount} Quests
                </motion.button>
            </div>
          </motion.div>
        </motion.div>
      );
}

// 5. MAIN APP
export default function App() {
  const [search, setSearch] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<QuestCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<QuestDifficulty[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<QuestStatus[]>(['Live', 'New', 'Expiring']); 
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  
  // Toggle handlers
  const toggleProject = useCallback((project: string) => setSelectedProjects(prev => prev.includes(project) ? prev.filter(p => p !== project) : [...prev, project]), []);
  const toggleCategory = useCallback((category: QuestCategory) => setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]), []);
  const toggleDifficulty = useCallback((difficulty: QuestDifficulty) => setSelectedDifficulties(prev => prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]), []);
  const toggleStatus = useCallback((status: QuestStatus) => setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]), []);

  // Filter and Sort Logic (Memoized)
  const filteredQuests = useMemo(() => {
    const filtered = allQuests.filter(quest => {
      const searchMatch = quest.title.toLowerCase().includes(search.toLowerCase()) || quest.project.toLowerCase().includes(search.toLowerCase());
      const projectMatch = selectedProjects.length === 0 || selectedProjects.includes(quest.project);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(quest.category);
      const difficultyMatch = selectedDifficulties.length === 0 || selectedDifficulties.includes(quest.difficulty);
      const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(quest.status);

      return searchMatch && projectMatch && categoryMatch && difficultyMatch && statusMatch;
    });

    // Apply Sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'xp') {
        return b.xpReward - a.xpReward;
      } else if (sortBy === 'difficulty') {
        return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
      } else if (sortBy === 'timeEstimate') {
        const timeA = parseInt(a.timeEstimate.split(' ')[0]) || Infinity;
        const timeB = parseInt(b.timeEstimate.split(' ')[0]) || Infinity;
        return timeA - timeB; 
      }
      return parseInt(b.id) - parseInt(a.id); 
    });
  }, [search, selectedProjects, selectedCategories, selectedDifficulties, selectedStatuses, sortBy]);
  
  // Count active filters
  const filterCount = selectedCategories.length + selectedProjects.length + selectedDifficulties.length + (selectedStatuses.length < allStatuses.length ? selectedStatuses.length : 0);

  // Handle outside click for sorting dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortRef]);
  
  const filterProps = {
    projects: selectedProjects, categories: selectedCategories, difficulties: selectedDifficulties, statuses: selectedStatuses,
    toggleProject, toggleCategory, toggleDifficulty, toggleStatus, filteredCount: filteredQuests.length
  };

  return (
    <div className={`text-white min-h-screen font-sans grid-background relative`}>
      <style>{CustomStyles}</style>

      {/* 1. Hero Header */}
      <HeroSection />
      
      {/* 2. Main Layout: Quest Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        
        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800 sticky top-0 z-20 bg-black/90 backdrop-blur-sm -mx-4 px-4 lg:mx-0 lg:px-0">
            <h2 className="text-xl font-bold text-slate-200">
                {filteredQuests.length} Live Quests
            </h2>
            
            <div className="flex items-center space-x-4">
                {/* Filter Drawer Trigger (Always visible) */}
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFiltersOpen(true)} 
                    className="flex items-center gap-2 py-2 px-4 text-sm bg-purple-600/20 text-purple-300 rounded-xl border border-purple-600 relative font-medium hover:bg-purple-600/30 transition-colors"
                >
                    <Filter size={18} />
                    <span>Filter Quests</span>
                    {filterCount > 0 && (
                        <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-black"
                        >
                            {filterCount}
                        </motion.span>
                    )}
                </motion.button>

                {/* Custom Sorting Dropdown */}
                <div className="relative" ref={sortRef}>
                    <motion.button 
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-700/80 transition-colors"
                    >
                        <TrendingUp size={16} className='text-purple-400'/>
                        {getSortLabel(sortBy)}
                        <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
                            <ChevronDown size={16} />
                        </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                        {isSortOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-slate-900 border border-purple-700/50 rounded-xl shadow-2xl overflow-hidden z-30 origin-top-right"
                            >
                                {(['newest', 'xp', 'difficulty', 'timeEstimate'] as SortOption[]).map((option) => (
                                    <motion.button
                                        key={option}
                                        onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                                            sortBy === option ? 'bg-purple-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                                        }`}
                                    >
                                        {getSortLabel(option)}
                                        {sortBy === option && <Check size={16} />}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Quest Grid */}
        <div className="w-full">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredQuests.length > 0 ? (
                        filteredQuests.map(quest => <QuestCardPro key={quest.id} quest={quest} />)
                    ) : (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="col-span-full text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
                            <Zap size={48} className="text-purple-600 mx-auto mb-4"/>
                            <p className="text-xl font-bold text-slate-300 mb-2">No Quests Match Your Filters</p>
                            <p className="text-slate-400">Open the Filter Drawer to adjust your settings.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
      </div>

      {/* Filter Drawer Modal (Always used) */}
      <AnimatePresence>
          {isFiltersOpen && (
              <FilterDrawer 
                  filters={filterProps} 
                  search={search} 
                  setSearch={setSearch} 
                  onClose={() => setIsFiltersOpen(false)}
                  filteredCount={filteredQuests.length}
              />
          )}
      </AnimatePresence>
    </div>
  );
}
