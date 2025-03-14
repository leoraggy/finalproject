"use client";
//bring in the session provider
//this is build around useContext
//Because it uses context it must be a client component
//this is how we will access the session in client components
import { SessionProvider as Provider } from "next-auth/react";
import { Session } from "next-auth";

export default function MySessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return <Provider session={session}>{children}</Provider>;
}
