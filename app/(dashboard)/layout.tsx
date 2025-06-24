'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { SiteHeader } from '@/components/ui/site-header';
import { DevBanner } from '@/components/ui/dev-banner';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DevBanner />
      <SiteHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}

// Conditionally apply auth protection based on environment
function ConditionalAuthLayout({ children }: { children: React.ReactNode }) {
  // Bypass auth in development when flag is set
  const isDevelopmentBypass = process.env.NODE_ENV === 'development' && 
                             process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  if (isDevelopmentBypass) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Apply auth protection in production or when bypass is disabled
  const ProtectedLayout = withPageAuthRequired(DashboardLayout);
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

export default ConditionalAuthLayout;