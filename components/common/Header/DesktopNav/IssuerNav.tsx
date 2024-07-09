"use client";

import Link from "next/link";
import * as React from "react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/Redux/hook";
import { showBlackBg } from "@/Redux/features/showBlackbg/showBlackbgSlice";

// navData
import { headingData, create, manage, upload } from "../NavData/Issuer";

// components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const IssuerNav = () => {
  const dispatch = useAppDispatch();
  const handleShowBlack = () => {
    // console.log("handleShowBlack");
    dispatch(showBlackBg());
  };
  const handleLeaveShowBlack = () => {
    // console.log("handleShowBlackLeave");
    dispatch(showBlackBg());
  };
  const pathname = usePathname();
  //the code is used to cut pathname which only gets the first section.
  const basePath = pathname.split("/").slice(0, 2).join("/");

  // console.log("pathname",pathname);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/certificate-lookup" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                證書查詢
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
              className={cn(
                pathname === headingData.manage.href
                  ? "border-b-[3px] border-secondary rounded-none"
                  : ""
              )}
            >
              {headingData.manage.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
            >
              <ul className="grid w-[400px] gap-3 p-4  md:grid-cols-2  ">
                {/* headingData.Profile.href */}
                {manage.description.map((data, index) => (
                  <ListItem
                    key={index}
                    title={data.title}
                    href={headingData.manage.href}
                  >
                    {data.content}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
              className={cn(
                pathname === headingData.create.href
                  ? "border-b-[3px] border-secondary rounded-none"
                  : ""
              )}
            >
              {headingData.create.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
            >
              <ul className="grid w-[400px] gap-3 p-4  md:grid-cols-2 ">
                {/* headingData.Profile.href */}
                {create.description.map((data, index) => (
                  <ListItem
                    key={index}
                    title={data.title}
                    href={headingData.create.href}
                  >
                    {data.content}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
              className={cn(
                basePath === headingData.upload.href
                  ? "border-b-[3px] border-secondary rounded-none"
                  : ""
              )}
            >
              {headingData.upload.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
            >
              <ul className="grid w-[400px] gap-3 p-4  md:grid-cols-1">
                {/* headingData.Profile.href */}
                {upload.description.map((data, index) => (
                  <ListItem
                    key={index}
                    title={data.title}
                    href="/certificate-upload/select"
                  >
                    {data.content}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li key={title}>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default IssuerNav;
