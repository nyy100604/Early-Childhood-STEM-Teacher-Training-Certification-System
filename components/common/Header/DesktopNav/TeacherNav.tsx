"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/Redux/hook";
import { showBlackBg } from "@/Redux/features/showBlackbg/showBlackbgSlice";

// navData
import { headingData, profileData, profileSetup } from "../NavData/Teacher";

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

const TeacherNav = () => {
  const dispatch = useAppDispatch();
  const handleShowBlack = () => {
    // console.log("handleShowBlack");
    dispatch(showBlackBg());
  };
  const handleLeaveShowBlack = () => {
    // console.log("handleShowBlackLeave");
    dispatch(showBlackBg());
  };
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
            >
              {headingData.ProfileManage.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
            >
              <ul className="grid w-[450px] gap-3 p-4 grid-cols-2 ">
                {/* headingData.Profile.href */}
                {profileData.description.map((data, index) => (
                  <ListItem
                    key={index}
                    title={data.title}
                    href={headingData.ProfileManage.href}
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
            >
              {headingData.profileSetup.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onMouseEnter={handleShowBlack}
              onMouseLeave={handleLeaveShowBlack}
            >
              <ul className="grid w-[450px] gap-3 p-4 grid-cols-2 ">
                {/* headingData.Profile.href */}
                {profileSetup.description.map((data, index) => (
                  <ListItem
                    key={index}
                    title={data.title}
                    href={headingData.profileSetup.href}
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

export default TeacherNav;
