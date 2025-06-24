import React from "react";

const SocialProofSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by teams at
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-12">
            {/* Placeholder Logos */}
            <div className="flex h-12 items-center justify-center">
              <span className="text-muted-foreground">Salesforce</span>
            </div>
            <div className="flex h-12 items-center justify-center">
              <span className="text-muted-foreground">Brex</span>
            </div>
            <div className="flex h-12 items-center justify-center">
              <span className="text-muted-foreground">Ramp</span>
            </div>
            <div className="flex h-12 items-center justify-center">
              <span className="text-muted-foreground">Rippling</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-16 sm:mt-20 sm:pt-20 lg:mt-24 lg:pt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 text-center sm:grid-cols-3 sm:gap-y-16">
            <div>
              <h3 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                10k+
              </h3>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Users
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                1M+
              </h3>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Tasks automated
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                90%
              </h3>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Success rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;