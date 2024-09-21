import Link from "next/link";
import { Container } from "../Container";
import { Foldit } from "next/font/google";
import { CartCount } from "./CartCount";
import { UserMenu } from "./UserMenu";
import { auth } from "@/auth";
import { Categories } from "./Categories";
import { SearchBar } from "./SearchBar";

const foldit = Foldit({ subsets: ["latin"], weight: ["700"] });

export async function NavBar() {
  const user = (await auth())?.user;

  return (
    <div className="sticky top-0 z-30 w-full bg-slate-900 text-slate-200 shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className={`${foldit.className} text-4xl`}>
              ESHOP
            </Link>

            <div className="hidden md:block">
              <SearchBar />
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu user={user} />
            </div>
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
}
