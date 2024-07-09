import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <main className="bg-[#EEEEEE] w-full flex flex-col justify-center items-center">
      <div
        className="container mx-auto w-full bg-white/75 py-7 flex flex-col items-center justify-center gap-y-6
                      lg:flex-row lg:gap-x-[8rem] lg:py-8 sm:rounded-b-3xl"
      >
        <div
          className="flex flex-col gap-8 items-center
                       lg:items-start"
        >
          {" "}
          <div className="relative w-[200px] h-[50px] lg:w-[250px] lg:h-[60px]">
            {" "}
            <Image src="/footer/schoolicon.png" alt="schoolicon" fill />
          </div>
          <div className="text-lg">
            <p>國立台灣師範大學 ETLAB數位科技學習實驗室</p>
            <p>+886-2-7734-3471</p>
            <p>nyy100604@gmail.com</p>
            <p>106台北市和平東路一段162號</p>
          </div>{" "}
        </div>

        <div
          className="flex flex-col gap-y-4
                        lg:text-lg lg:justify-start"
        >
          <Link href="">關於我們</Link>
          <Link href="">隱私政策</Link>
          <Link href="">使用條款</Link>
          <Link href="">版權資訊</Link>
        </div>
      </div>
      <div className="w-full text-center py-4">
        Copyright © 2024 ETLAB. All rights reserved
      </div>
    </main>
  );
};

export default Footer;
