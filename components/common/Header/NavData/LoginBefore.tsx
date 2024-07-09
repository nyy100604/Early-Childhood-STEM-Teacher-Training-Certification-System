import { Search, Contact, Milestone } from "lucide-react";

export const headingData = {
  CertificateLookup: { title: "證書查詢", href: "/certificate-lookup" },
  UserGuide: { title: "系統指引" },
  ContactUs: { title: "聯絡我們" },
};

export const userGuideData: {
  title: string;
  href: string;
  description: string[];
}[] = [
  {
    title: "快速開始",
    href: "/guide/getting-started",
    description: [
      "註冊和登入指南：幫助新用戶註冊和登入網站",
      "功能概覽：概述網站的主要功能",
    ],
  },
  {
    title: "功能使用指南",
    href: "/guide/feature-guides",
    description: [
      "證書查詢指南：如何使用證書查詢功能",
      "證書管理指南：如何管理個人或機構證書",
      "證書創建和上傳指南：如何創建和上傳證書",
    ],
  },
];

export const contactUsData: {
  title: string;
  href: string;
  description: string[];
}[] = [
  {
    title: "聯絡表單",
    href: "/contact/form",
    description: ["提交問題或反饋：用戶可以提交他們的問題或反饋"],
  },
  {
    title: "聯絡資訊",
    href: "/contact/info",
    description: [
      "電子郵件地址：提供網站管理團隊的聯絡電子郵件",
      "電話號碼：提供聯絡電話號碼",
    ],
  },
];
