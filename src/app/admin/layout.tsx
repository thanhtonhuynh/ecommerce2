import { AdminNav } from "@/components/admin/AdminNav";
import { getUser } from "@/_libs/dal";
import { Ban } from "lucide-react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "ESHOP Admin",
  description: "ESHOP Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="mt-72 flex flex-col items-center">
        <div className="mb-4 flex items-center gap-4 rounded bg-rose-500 p-2 text-xl text-white">
          <Ban />
          Access Denied!
        </div>
        <div>You are not authorized to view this page!</div>
      </div>
    );
  }

  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
