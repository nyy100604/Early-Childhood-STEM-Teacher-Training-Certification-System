import React from "react";
import Image from "next/image";

// components
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";

const NotFound = () => {
  return (
    <div className="bg-primary">
      <Header />
      <div className="containerTop mb-10">
        <div className="max-w-[376px] md:container mx-auto bg-white/70 py-[6rem] rounded-3xl flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-x-8">
          <Image src="/404/404.png" width={300} height={200} alt="404" />
          <h1 className="text-3xl lg:text-[3rem]">查無此頁面</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
