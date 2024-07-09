import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import LoginBeforeNav from "./MobileNav/LoginBeforeNav";
import TeacherNav from "./MobileNav/TeacherNav";
import IssureNav from "./MobileNav/IssureNav";
import { Button } from "@/components/ui/button";

const MobileNav = async () => {
  const session = (await auth()) as any;
  // console.log("Mobile session", session?.user);

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {" "}
          <AlignRight size={34} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="flex items-center gap-x-3 justify-center pt-24">
            {" "}
            <Image alt="Logo" src="/logo/Logo.png" width={80} height={80} />
            <div>
              {" "}
              <h1>幼兒教育師資</h1>
              <h1>培育認證系統</h1>
            </div>
          </SheetTitle>
          <div>
            {" "}
            <div>{!session && <LoginBeforeNav />}</div>
            {session?.user && (
              <div>
                {session?.user.role === "教師" ? <TeacherNav /> : <IssureNav />}
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                  className="pt-10 pl-[5.5rem]"
                >
                  <Button className="rounded-none rounded-r-full">登出</Button>
                </form>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
