import { AnnouncementBanner } from "@/components/ui/announcement-banner";
import { DeepWorkBanner } from "@/components/ui/deep-work-banner";
import { HeroSection } from "@/components/ui/hero-section";
import SocialProofSection from "@/components/ui/social-proof-section";
import { SiteHeader } from "@/components/ui/site-header";

export default function Home() {
  return (
    <div>
      <AnnouncementBanner />
      <SiteHeader />
      <HeroSection />
      <SocialProofSection />
      <DeepWorkBanner />
    </div>
  );
}