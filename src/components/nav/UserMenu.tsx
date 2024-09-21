"use client";

import { useState } from "react";
import { Avatar } from "../Avatar";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Link from "next/link";
import { MenuItem } from "./MenuItem";
import { signOut } from "next-auth/react";
import { BackDrop } from "./BackDrop";
import { User } from "next-auth";

type UserMenuProps = {
  user: User | undefined;
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-1 rounded-full border border-slate-400 bg-slate-800 p-2 text-slate-200 transition hover:bg-slate-200 hover:text-slate-800"
        >
          <Avatar src={user?.image} />

          <span className="select-none text-sm font-semibold">
            {user?.name}
          </span>

          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </div>

        {isOpen && (
          <div className="absolute right-0 top-12 flex w-[170px] cursor-pointer flex-col overflow-hidden rounded-md bg-white text-sm text-slate-700 shadow-md">
            {user ? (
              <div>
                <Link href={"/orders"}>
                  <MenuItem onClick={toggleOpen}>My Orders</MenuItem>
                </Link>

                {user.role === "ADMIN" && (
                  <Link href={"/admin"}>
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                )}

                <hr />

                <MenuItem
                  onClick={async () => {
                    toggleOpen();
                    await signOut({ callbackUrl: "/" });
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>

                <Link href={"/register"}>
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
}
