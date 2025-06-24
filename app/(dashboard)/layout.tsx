"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { AnnouncementBanner } from "@/components/ui/announcement-banner";
import { Sidebar } from "@/components/ui/sidebar";
import { DevBanner } from "@/components/ui/dev-banner";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DevBanner />
        <AnnouncementBanner />
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

// Conditionally apply auth protection based on environment
function ConditionalAuthLayout({ children }: { children: React.ReactNode }) {
  // Bypass auth in development when flag is set
  const isDevelopmentBypass =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_BYPASS_AUTH === "true";

  if (isDevelopmentBypass) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Apply auth protection in production or when bypass is disabled
  const ProtectedLayout = withPageAuthRequired(DashboardLayout as any) as any;
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

export default ConditionalAuthLayout;