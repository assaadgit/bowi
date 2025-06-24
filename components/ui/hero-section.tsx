import React from "react";

export function HeroSection() {
  return (
    <section className="py-20 text-center md:py-28 lg:py-32">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Automate any browser workflow
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        Turn any manual process into a fully automated workflow, in seconds.
        Describe your task in natural language, and our AI agents will handle
        the rest.
      </p>
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-2xl px-4">
          <input
            type="text"
            placeholder="e.g. Find 10 venture-backed fintech startups..."
            className="w-full rounded-full border border-input bg-background py-4 pl-4 pr-32 sm:pr-48"
          />
          <div className="absolute inset-y-0 right-6 flex items-center space-x-2">
            <div className="hidden rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground sm:block">
              Deep Work PRO
            </div>
            <a
              href="#"
              className="rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4 text-sm text-muted-foreground">
        e.g.{" "}
        <a href="#" className="underline hover:text-primary">
          Find 10 venture-backed fintech startups...
        </a>
        ,{" "}
        <a href="#" className="underline hover:text-primary">
          Find the top 5 stories on Hacker News...
        </a>
        ,{" "}
        <a href="#" className="underline hover:text-primary">
          What are the most popular repos on GitHub...
        </a>
      </div>
    </section>
  );
}