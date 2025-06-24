"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/ui/google-button";
import { Icon } from "@/components/ui/icon";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Simulate a successful login
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center space-x-2">
              <Icon name="zap" className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                Convergence
              </span>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <GoogleButton onClick={handleLogin} className="w-full" />

            <div className="my-4 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button onClick={handleLogin} className="w-full">
              Continue
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            Don't have an account?{" "}
          </span>
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}