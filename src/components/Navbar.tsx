"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";

type LoginProps = {
  session: Session | null;
};

export default function Navbar({ session }: LoginProps) {
  const user = session?.user;

  return (
    <nav className="flex items-center justify-between p-10 bg-slate-500 text-white mb-10">
      <Link href='/' className="text-2xl sm:text-4xl">UCSC Forum</Link>
      <div>
        <p>{user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </nav>
  );
}
