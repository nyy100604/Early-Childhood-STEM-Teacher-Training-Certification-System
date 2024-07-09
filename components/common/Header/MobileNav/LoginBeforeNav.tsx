"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

export const Item = ({ title, href }: { title: string; href: string }) => {
  const [showIcon, setShowIcon] = useState(false);
  return (
    <Link
      href={href}
      className="flex items-end gap-x-2 hover:text-secondary duration-300"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      {title}
      <div className={`opacity-0 ${showIcon && "opacity-100"} duration-300`}>
        <SquareArrowOutUpRight />
      </div>{" "}
    </Link>
  );
};

const LoginBeforeNav = () => {
  return (
    <div className="flex flex-col gap-y-10 font-bold text-xl text-slate-600 pl-[5.5rem] pt-[5rem]">
      <Item title="證書查詢" href="/certificate-lookup" />
      <Item title="系統指引" href="/" />
      <Item title="聯絡我們" href="/" />
      <Item title="登入" href="/login" />
    </div>
  );
};

export default LoginBeforeNav;
