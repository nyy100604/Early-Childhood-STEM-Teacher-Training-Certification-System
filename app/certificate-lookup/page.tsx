import React from "react";
import Header from "@/components/common/Header/Header";
import Search from "@/components/pages/certificate-lookup/Search";
import Footer from "@/components/common/Footer/Footer";
import Results from "@/components/pages/certificate-lookup/Results";

const page = () => {
  return (
    <>
      {" "}
      <div className="bg-lookupMobile lg:bg-lookupDesktop lg:mt-[128px] w-full  bg-cover bg-center">
        <Header />
        <Search />
        <Footer />
      </div>
    </>
  );
};

export default page;
