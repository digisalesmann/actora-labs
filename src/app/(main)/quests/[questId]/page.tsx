// src/app/(main)/quests/[questId]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
   Share2, 
  Check, Loader2, ExternalLink, Twitter, MessageCircle,
  Globe, ChevronRight, AlertCircle, Lock, Zap, Award, 
  Sparkles, CheckCheck, X, Link2
} from 'lucide-react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { getQuestById, type Quest, type QuestStep } from '@/lib/questData';

// Minimalist Step Component
const QuestStepCard = ({ 
  step, 
  index, 
  onVerify,
  totalSteps
}: { 
  step: QuestStep; 
  index: number; 
  onVerify: (stepId: string) => void;
  totalSteps: number;
}) => {
  const isLocked = step.status === 'locked';
  const isCompleted = step.status === 'completed';
  const isVerifying = step.status === 'verifying';
  const isFailed = step.status === 'failed';

  const getStepIcon = () => {
    switch (step.type) {
      case 'twitter': return Twitter;
      case 'discord': return MessageCircle;
      case 'onchain': return Zap;
      case 'visit': return Globe;
      default: return Check;
    }
  };

  const StepIcon = getStepIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative py-5 sm:py-6 border-b border-slate-800/50 transition-all ${
        isCompleted ? 'opacity-60' : ''
      } ${!isLocked && !isCompleted ? 'hover:bg-slate-900/20' : ''}`}
    >
      <div className="flex items-start gap-3 sm:gap-6">
        {/* Step Indicator */}
        <div className="flex flex-col items-center">
          <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            isCompleted
              ? 'bg-purple-500/20 border-2 border-purple-500'
              : isLocked
              ? 'bg-slate-800/50 border border-slate-700'
              : 'bg-slate-800 border border-slate-600'
          }`}>
            {isCompleted ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            ) : isLocked ? (
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
            ) : (
              <span className="text-xs sm:text-sm font-bold text-slate-400">{index + 1}</span>
            )}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-px h-10 sm:h-12 mt-2 transition-colors ${
              isCompleted ? 'bg-purple-500/30' : 'bg-slate-800'
            }`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h4 className={`text-sm sm:text-base font-semibold ${
                  isLocked ? 'text-slate-500' : 'text-white'
                }`}>
                  {step.title}
                </h4>
                {step.optional && (
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-500 font-medium whitespace-nowrap">
                    Optional
                  </span>
                )}
              </div>
              <p className={`text-xs sm:text-sm ${isLocked ? 'text-slate-600' : 'text-slate-400'} line-clamp-2 sm:line-clamp-none`}>
                {step.description}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                isCompleted ? 'bg-purple-500/10' : 'bg-slate-800/50'
              }`}>
                <StepIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  isCompleted ? 'text-purple-400' : 'text-slate-500'
                }`} />
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-bold text-amber-400">+{step.points}</div>
                <div className="text-[10px] sm:text-xs text-slate-500">XP</div>
              </div>
            </div>
          </div>

          {/* Action */}
          {!isLocked && !isCompleted && (
            <button
              onClick={() => onVerify(step.id)}
              disabled={isVerifying}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isFailed
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                  : 'bg-purple-600 text-white hover:bg-purple-500'
              }`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : isFailed ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Retry</span>
                </>
              ) : (
                <>
                  <span>Verify</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </>
              )}
            </button>
          )}

          {isCompleted && (
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-purple-400">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">Completed</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main Quest Detail Page
export default function QuestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isConnected } = useAccount();
  
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimingReward, setClaimingReward] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadQuest = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getQuestById(params.questId as string);
      setQuest(data || null);
    } catch (error) {
      console.error('Failed to load quest:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.questId]);

  const handleVerifyStep = async (stepId: string) => {
    if (!quest || !quest.steps) return;

    if (!isConnected) {
      setShowConnectWallet(true);
      return;
    }

    const stepIndex = quest.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    const updatedSteps = [...quest.steps];
    updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], status: 'verifying' };
    setQuest({ ...quest, steps: updatedSteps });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = Math.random() > 0.2;

    updatedSteps[stepIndex] = {
      ...updatedSteps[stepIndex],
      status: success ? 'completed' : 'failed'
    };

    if (success && stepIndex < updatedSteps.length - 1) {
      updatedSteps[stepIndex + 1] = {
        ...updatedSteps[stepIndex + 1],
        status: 'available'
      };
    }

    setQuest({ ...quest, steps: updatedSteps });
  };

  const handleClaimReward = async () => {
    if (!isConnected) {
      setShowConnectWallet(true);
      return;
    }

    setClaimingReward(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setClaimingReward(false);
    setShowSuccessModal(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedSteps = quest?.steps?.filter(s => s.status === 'completed').length || 0;
  const totalSteps = quest?.steps?.filter(s => !s.optional).length || 0;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isQuestComplete = completedSteps >= totalSteps;

  const earnedXP = quest?.steps
    ?.filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.points, 0) || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-slate-800 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-xs sm:text-sm text-slate-500">Loading quest...</p>
        </div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-slate-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Quest Not Found</h2>
          <p className="text-sm sm:text-base text-slate-500 mb-8">This quest doesn&apos;t exist or has been removed.</p>
          <button 
            onClick={() => router.push('/quests')} 
            className="px-6 py-2.5 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-500 transition-colors"
          >
            Browse Quests
          </button>
        </motion.div>
      </div>
    );
  }

  const daysLeft = Math.ceil((new Date(quest.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-950 to-slate-950" />
      
      {/* Connect Wallet Modal */}
      <AnimatePresence>
        {showConnectWallet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowConnectWallet(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Connect Wallet</h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Connect your wallet to verify tasks and claim rewards
                  </p>
                </div>
                <button
                  onClick={() => setShowConnectWallet(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => setShowConnectWallet(false)}
                className="w-full py-3 bg-purple-600 rounded-lg font-medium hover:bg-purple-500 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10" />
              
              <div className="relative text-center">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Rewards Claimed!</h3>
                  <p className="text-slate-400 mb-6">
                    Your rewards have been successfully claimed
                  </p>
                </motion.div>

                {/* Reward Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                      +{quest?.xpReward}
                    </span>
                    <span className="text-xl font-semibold text-slate-400">XP</span>
                  </div>
                  <p className="text-sm text-slate-500">Added to your account</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="flex-1 py-3 bg-slate-800 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      router.push('/quests');
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-colors text-sm"
                  >
                    View More Quests
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 pt-16 sm:pt-16 lg:pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            {/* Removed back button and share - share moved to sidebar */}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Main Content - 8 columns */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
              
              {/* Quest Header */}
              <div>
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-900 border border-slate-800 p-2 sm:p-2.5 flex-shrink-0">
                    <Image
                      src={quest.project.logo}
                      alt={quest.project.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/56x56/1E293B/94A3B8?text=${quest.project.name[0]}`;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs sm:text-sm text-purple-400 font-medium">{quest.project.name}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] sm:text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-400 font-medium uppercase tracking-wide">
                        {quest.difficulty}
                      </span>
                      <span className="text-[10px] sm:text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-400 font-medium">
                        {quest.category}
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 break-words">{quest.title}</h1>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{quest.description}</p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-4 sm:py-6 border-t border-b border-slate-800/50">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{quest.xpReward}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Total XP</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{quest.timeEstimate}m</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Duration</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{(quest.participants / 1000).toFixed(1)}K</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Participants</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{daysLeft}d</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Time Left</div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-1">Progress</h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {completedSteps} of {totalSteps} tasks completed
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold">{progress.toFixed(0)}%</div>
                    <div className="text-xs sm:text-sm text-purple-400">+{earnedXP} XP earned</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500"
                  />
                </div>

                {/* Claim Button */}
                {isQuestComplete && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClaimReward}
                    disabled={claimingReward}
                    className="w-full py-3 sm:py-4 bg-purple-600 rounded-xl text-sm sm:text-base font-semibold hover:bg-purple-500 transition-colors flex items-center justify-center gap-2"
                  >
                    {claimingReward ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span>Claiming...</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Claim {quest.xpReward} XP</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Quest Steps */}
              {quest.steps && quest.steps.length > 0 && (
                <div>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold mb-1">Tasks</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Complete all tasks to unlock your rewards</p>
                  </div>
                  
                  <div className="border-t border-slate-800/50">
                    {quest.steps?.map((step, index) => (
                      <QuestStepCard
                        key={step.id}
                        step={step}
                        index={index}
                        onVerify={handleVerifyStep}
                        totalSteps={quest.steps?.length || 0}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* About */}
              {quest.longDescription && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">About</h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed whitespace-pre-line">
                    {quest.longDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4 space-y-6 min-w-0">
              
              {/* Requirements */}
              {quest.requirements && quest.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500 mb-3 sm:mb-4">Requirements</h4>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {quest.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-400">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rewards */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500 mb-3 sm:mb-4">Rewards</h4>
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-slate-800/50">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300 truncate">XP Points</span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-purple-400 ml-2">+{quest.xpReward}</span>
                  </div>
                  
                  {quest.rewards.tokens && (
                    <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-slate-800/50">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300 truncate">Tokens</span>
                      </div>
                      <span className="text-sm sm:text-base font-bold text-green-400 ml-2 whitespace-nowrap">
                        {quest.rewards.tokens.amount} {quest.rewards.tokens.symbol}
                      </span>
                    </div>
                  )}
                  
                  {quest.rewards.badges && (
                    <div className="flex items-center justify-between py-2.5 sm:py-3">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300 truncate">Badge</span>
                      </div>
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 ml-2 flex-shrink-0" />
                    </div>
                  )}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500 mb-3 sm:mb-4">Links</h4>
                <div className="space-y-2">
                  {/* Share Link */}
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors text-xs sm:text-sm group"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        <span className="flex-1 text-left text-green-400 transition-colors truncate">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                        <span className="flex-1 text-left text-slate-400 group-hover:text-slate-300 transition-colors truncate">Share Quest</span>
                        <Link2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600 flex-shrink-0" />
                      </>
                    )}
                  </button>

                  {quest.project.website && (
                    <a
                      href={quest.project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors text-xs sm:text-sm group"
                    >
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                      <span className="flex-1 text-slate-400 group-hover:text-slate-300 transition-colors truncate">Website</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600 flex-shrink-0" />
                    </a>
                  )}
                  
                  {quest.project.twitter && (
                    <a
                      href={quest.project.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors text-xs sm:text-sm group"
                    >
                      <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                      <span className="flex-1 text-slate-400 group-hover:text-slate-300 transition-colors truncate">Twitter</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600 flex-shrink-0" />
                    </a>
                  )}
                  
                  {quest.project.discord && (
                    <a
                      href={quest.project.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors text-xs sm:text-sm group"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                      <span className="flex-1 text-slate-400 group-hover:text-slate-300 transition-colors truncate">Discord</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600 flex-shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}