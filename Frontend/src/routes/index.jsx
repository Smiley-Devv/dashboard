import React from "react";
import { Button, ModeToggle } from "@/components/ui";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Router } from "@tanstack/react-router";

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Button>Click me</Button>
      <ModeToggle />

      <SignedOut>
        <Button asChild>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <Link to="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
