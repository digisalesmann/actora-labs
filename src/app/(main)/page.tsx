// src/app/(main)/page.tsx

import { HeroSection } from '@/components/sections/HeroSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { FeaturedQuestsSection } from '@/features/quests/FeaturedQuests';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <FeaturedQuestsSection />
      <HowItWorksSection />
    </main>
  );
}