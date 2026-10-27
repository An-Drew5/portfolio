import { HeroTerminal } from '@/components/home/HeroTerminal';
import { CurrentlyBlock } from '@/components/home/CurrentlyBlock';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { SkillsSection } from '@/components/home/SkillsSection';
import { ClosingCTA } from '@/components/home/ClosingCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with typing terminal & skippable interaction */}
      <HeroTerminal />

      {/* 2. Currently Block (Arrow RHEL DevOps & RHCSA prep) */}
      <CurrentlyBlock />

      {/* 3. Featured Projects with systemctl status pills */}
      <FeaturedProjects />

      {/* 4. Compact Grouped Skills with RHCSA focus */}
      <SkillsSection />

      {/* 5. Closing CTA to Contact */}
      <ClosingCTA />
    </div>
  );
}
