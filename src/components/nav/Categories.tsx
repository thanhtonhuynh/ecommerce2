"use client";

import { categories } from "@/_utils/Categories";
import { Container } from "../Container";
import { Category } from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

export function Categories() {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="flex items-center justify-between overflow-x-auto pt-4">
          {categories.map((item) => (
            <Category
              key={item.label}
              selected={
                category === item.label || (!category && item.label === "All")
              }
              {...item}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
