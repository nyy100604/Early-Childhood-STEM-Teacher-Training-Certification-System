import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { School, CircleUser, Mail } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import BlackBg from "./BlackBg";
import TeacherNav from "./DesktopNav/TeacherNav";
import LoginBeforeNav from "./DesktopNav/LoginBeforeNav";
import IssuerNav from "./DesktopNav/IssuerNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = async () => {
  const session = (await auth()) as any;
  console.log(session?.user);

  return (
    <>
      <header className="w-full bg-bg shadow-xl fixed top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-12 py-6 lg:px-10 ">
          {/* desktop nav */}
          <div className="w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-x-2 lg:gap-x-5">
              <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                <Image
                  src="/logo/Logo.png"
                  alt="websiteLogo"
                  fill
                  priority
                  quality={100}
                />
              </div>

              <h1 className="text-xl font-bold lg:text-xl">
                <div>幼兒教育師資</div> 培育認證系統
              </h1>
            </Link>{" "}
            <div className="hidden lg:flex xl:items-center gap-x-10">
              {/* Nav */}
              {session?.user.role === "教師" ? (
                <TeacherNav />
              ) : session?.user.role === "發證者" ? (
                <IssuerNav />
              ) : (
                <LoginBeforeNav />
              )}

              {/* user avator */}
              {/* <div className="flex items-center gap-2">
                <CircleUser />
                發證者您好
              </div> */}
              {/* Login & Logout */}
              {session?.user.role === "發證者" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-0 outline-offset-0">
                    <div className="flex items-center font-medium gap-x-1 ">
                      {" "}
                      <CircleUser />
                      發證者您好
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-default hover:bg-bg gap-3">
                      <School />
                      {`${session.user.kingdergarten}`}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-default hover:bg-bg gap-3">
                      <Mail />
                      {`${session.user.email}`}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <form
                        className="w-full py-2"
                        action={async () => {
                          "use server";
                          await signOut({ redirectTo: "/" });
                        }}
                      >
                        <Button className="bg-transparent p-0 w-full">
                          <span className="text-sm font-bold w-full text-secondary">
                            登 出
                          </span>
                        </Button>{" "}
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : session?.user.role === "教師" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-0 outline-offset-0">
                    <div className="flex items-center font-medium gap-x-1 ">
                      {" "}
                      <CircleUser />
                      {`${session.user.username} 老師`}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" ml-12">
                    <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-default hover:bg-bg gap-3">
                      <School />
                      {`${session.user.kingdergarten}`}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-default hover:bg-bg gap-3">
                      <Mail />
                      {`${session.user.email}`}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <form
                        className="w-full py-2"
                        action={async () => {
                          "use server";
                          await signOut({ redirectTo: "/" });
                        }}
                      >
                        <Button className="bg-transparent p-0 w-full">
                          <span className="text-sm font-bold w-full text-secondary">
                            登 出
                          </span>
                        </Button>{" "}
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  {" "}
                  <Button className="active:ring-2 active:ring-offset-2 ring-secondary duration-200 ease-in">
                    登 入
                  </Button>
                </Link>
              )}
            </div>
          </div>
          {/* mobile nav */}
          <div className="cursor-pointer lg:hidden">
            <MobileNav />
          </div>
        </div>
      </header>
      {/* 遮罩 */}
      <BlackBg />
    </>
  );
};

export default Header;
