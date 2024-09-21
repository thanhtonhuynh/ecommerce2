"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function HomepageRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      toast.error("You are not authorized to view this page");
    }
  }, [searchParams]);

  return null;
}
