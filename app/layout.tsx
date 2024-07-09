import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/Redux/StoreProviders";
import "./globals.css";

const NotoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "幼兒教育師資培育認證系統",
    default: "幼兒教育師資培育認證系統",
  },
  description: "",
  icons: "/logo/Logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${NotoSansTC.className} bg-bg relative`}>
        {/* redux provider */}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
