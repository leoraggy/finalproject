"use client";
// sign in and sign out functions getSessionHook
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between p-5">
      <Link className={buttonVariants({ variant: "outline" })} href="/">
        Home
      </Link>
      <Link className={buttonVariants({ variant: "outline" })} href="/account">
        Account
      </Link>
      <Link className={buttonVariants({ variant: "outline" })} href="/deposit">
        Deposit
      </Link>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.user?.image ?? ""} />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button onClick={() => signIn()}>Switch Account</button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => signOut()}>Sign Out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button onClick={() => signIn()}>Sign In</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}
