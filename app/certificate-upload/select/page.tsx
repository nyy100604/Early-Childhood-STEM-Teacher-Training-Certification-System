import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import Select from "@/components/pages/certificate-upload/Select";
import React from "react";

const page = () => {
  return (
    <main className="bg-primary w-full absolute top-0">
      <Header />
      <Select />
      <Footer />
    </main>
  );
};

export default page;
