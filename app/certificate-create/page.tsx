import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import Createform from "@/components/pages/certificate-create/Createform";
import React from "react";

const page = () => {
  return (
    <main className="absolute top-0 w-full bg-primary">
      <Header />
      <Createform />
      <Footer />
    </main>
  );
};

export default page;
