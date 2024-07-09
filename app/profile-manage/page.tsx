import Header from "@/components/common/Header/Header";
import TeachingData from "@/components/pages/profile-manage/TeachingData";
import React from "react";
import { auth } from "@/auth";
import {
  getTeacherTeachingInfo,
  getVerfiedCertificateStatusByteacherId,
} from "@/lib/data";
import Footer from "@/components/common/Footer/Footer";
import VerifiedCertificate from "@/components/pages/profile-manage/VerifiedCertificate";

const page = async () => {
  const session = await auth();
  const teachingData = await getTeacherTeachingInfo(
    session?.user?.id as string
  );
  const beVerfidCertificate = await getVerfiedCertificateStatusByteacherId(
    session?.user?.id as string
  );
  // console.log("teachingData", teachingData);

  return (
    <main className="">
      <Header />
      <TeachingData session={session} teachingData={teachingData} />
      <VerifiedCertificate
        session={session}
        beVerfidCertificate={beVerfidCertificate}
      />
      <Footer />
    </main>
  );
};

export default page;
export const dynamic = "force-dynamic";
