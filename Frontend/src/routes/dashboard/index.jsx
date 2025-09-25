import React from "react";
import { useUserGuilds } from "@/hooks/user";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // adjust import paths

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn } = useAuth();
  const { isLoading, data: ug } = useUserGuilds();

  if (!isSignedIn) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  if (isLoading) return <div>Loading the Fucking Data...</div>;

  return (
    <div className="flex flex-col gap-4">
      {ug?.withBot.map((guild) => (
        <Guild key={guild.id} guild={guild} />
      ))}
    </div>
  );
}

const Guild = ({ guild }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{guild.name}</CardTitle>
        <CardDescription>ID: {guild.id}</CardDescription>
        <CardAction>Manage</CardAction>
      </CardHeader>
      <CardContent>
        <p>Some additional info here.</p>
      </CardContent>
      <CardFooter>
        <p>Bot is in this guild</p>
      </CardFooter>
    </Card>
  );
};
