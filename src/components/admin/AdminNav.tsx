"use client";

import { IconType } from "react-icons";
import { Container } from "../Container";
import Link from "next/link";
import {
  MdAddBox,
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function AdminNav() {
  return (
    <div className="top-20 w-full border-b pt-4 shadow-sm">
      <Container>
        <div className="flex flex-row flex-nowrap items-center justify-between gap-8 overflow-x-auto md:justify-center md:gap-12">
          <AdminNavItem href={"/admin"} Icon={MdDashboard} label="Summary" />

          <AdminNavItem
            href={"/admin/add-products"}
            Icon={MdAddBox}
            label="Add Products"
          />

          <AdminNavItem
            href={"/admin/manage-products"}
            Icon={MdDns}
            label="Manage Products"
          />

          <AdminNavItem
            href={"/admin/manage-orders"}
            Icon={MdFormatListBulleted}
            label="Manage Orders"
          />
        </div>
      </Container>
    </div>
  );
}

type AdminNavItemProps = {
  Icon: IconType;
  label: string;
};

function AdminNavItem({
  Icon,
  label,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & AdminNavItemProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={`flex cursor-pointer items-center justify-center gap-1 border-b-2 p-2 text-center transition hover:text-slate-800 ${pathname === props.href ? "border-b-slate-800 text-slate-800" : "border-transparent text-slate-500"}`}
    >
      <Icon size={20} />
      <span className="break-normal text-center text-sm font-medium">
        {label}
      </span>
    </Link>
  );
}
