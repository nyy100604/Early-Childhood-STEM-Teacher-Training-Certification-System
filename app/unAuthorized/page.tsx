import React from "react";
import Image from "next/image";

// components
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
const UnAuthorized = () => {
  return (
    <div className="bg-primary">
      <Header />
      <div className="containerTop mb-10">
        <div className="max-w-[376px] md:container mx-auto bg-white/70 py-[6rem] rounded-3xl flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-x-8">
          <h1 className="text-3xl lg:text-[3rem]">您未被授權使用此頁面</h1>{" "}
          <Image
            src="/unAuthorized/unauthorized.png"
            width={300}
            height={200}
            alt="404"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UnAuthorized;
