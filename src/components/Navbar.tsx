/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-cyan-900 flex items-center py-3 justify-between px-20 text-white">
      <Link href={"/"}>Next Google</Link>

      {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <div className="mx-2">
            <p className="text-xl">{session.user.name}</p>
            <p>{session.user.email}</p>
          </div>

          <img
            src={session.user.image as string}
            alt="Avatar"
            className="w-12 h-12 mx-4 rounded-full cursor-pointer"
          />
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              });
            }}
            className="bg-red-800 px-3 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-indigo-700 px-3 py-2 rounded"
        >
          Sing In
        </button>
      )}
    </nav>
  );
}

export default Navbar;
