import React from "react";
import Header from "@/components/common/Header/Header";
import Statistics from "@/components/pages/certificate-manage/Statistics";
import BrowserCertificate from "@/components/pages/certificate-manage/BrowserCertificate";
import Footer from "@/components/common/Footer/Footer";
import { auth } from "@/auth";

// data
import { getAllCertificationInformation } from "@/lib/data";
import NotAuthorized from "@/components/common/Authorized/NotAuthorized";

const page = async () => {
  const session = (await auth()) as any;

  if (session.user.role === "教師") return <NotAuthorized />;
  const alldata = (await getAllCertificationInformation()) as any;
  // console.log("alldata", alldata);

  return (
    <main className="absolute top-0 bg-primary w-full">
      <Header />
      <Statistics alldata={alldata} />
      <BrowserCertificate alldata={alldata} />
      <Footer />
    </main>
  );
};
export const dynamic = "force-dynamic";
export default page;
