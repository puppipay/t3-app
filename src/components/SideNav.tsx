import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

function SideNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="sticky top-0 px-2  py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <span className="flex items-center gap-4">
              <VscHome className="h-5 w-5" />
              <span className="hidden text-lg md:inline">Home</span>
            </span>
          </Link>
        </li>

        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <span className="flex items-center gap-4">
                <VscAccount className="h-4 w-4" />
                <span className="hidden text-lg md:inline">Profile</span>
              </span>
            </Link>
          </li>
        )}

        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <span className="flex items-center gap-4">
                <VscSignIn className="h-5 w-5" />
                <span className="hidden text-lg md:inline">Login</span>
              </span>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <span className="flex items-center gap-4">
                <VscSignOut className="h-5 w-5" />
                <span className="hidden text-lg md:inline">Logout</span>
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default SideNav;
