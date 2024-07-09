import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import UploadBox from "@/components/pages/certificate-upload/UploadBox";
import React from "react";

const page = ({
  params,
  searchParams,
}: {
  params: { certificate: string };
  searchParams: { kingdergarten: string };
}) => {
  const certificateName = decodeURIComponent(params.certificate.toString());
  // console.log("log", searchParams.kingdergarten);

  return (
    <main className="w-full absolute top-0 bg-primary">
      <Header />
      <UploadBox
        certificateName={certificateName}
        kingdergarten={searchParams.kingdergarten}
      />
      <Footer />
    </main>
  );
};

export default page;
export const dynamic = "force-dynamic";
