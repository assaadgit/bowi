import { Button } from "./button";

export function DeepWorkBanner() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Deep Work is now live.</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Automate any workflow on the web, no matter how complex.
            </p>
          </div>
          <a href="#">
            <Button>Get Started</Button>
          </a>
        </div>
      </div>
    </section>
  );
}