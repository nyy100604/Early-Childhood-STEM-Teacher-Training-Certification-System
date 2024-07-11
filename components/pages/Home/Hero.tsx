import Image from "next/image";
import BtnHoverCard from "./BtnHoverCard";
import Header from "@/components/common/Header/Header";

const Hero = () => {
  return (
    <>
      <Header />{" "}
      <div className=" bg-primary">
        <div
          className="container containerTop mx-auto w-full pb-[100px] 
         flex flex-col gap-y-12 justify-center items-center 
         lg:flex-row lg:max-w-[1200px] lg:gap-y-0 lg:gap-x-20 lg:pt-[250px] lg:pb-[130px]"
        >
          {/* left */}
          {/* 標語 */}
          <div
            className="max-w-[376px] flex flex-col gap-y-8 items-center px-4
                       lg:max-w-[457px] lg:items-start"
          >
            <div
              className="text-[27px] leading-10 tracking-[2px]
                          lg:text-[36px] lg:leading-[3.5rem]"
            >
              <h1>
                <span className="text-secondary">區塊鏈</span> 技術，專業認證 |
              </h1>
              <h1>培育幼兒STEM教育精英</h1>
            </div>{" "}
            {/* 簡短介紹 */}
            <p
              className="w-full text-[19px] text-[#424242] text-justify font-medium leading-10
                        lg:text-left lg:text-[25px]"
            >
              利用區塊鏈技術，確保幼兒STEM教育教師的證書真實性，並提升整體教學品質。
            </p>
            {/* 行動呼籲 (CTA) 按鈕 */}
            <div className="flex justify-center gap-x-8">
              {" "}
              <BtnHoverCard
                go="/signup"
                btnStyles="bg-secondary text-white active:scale-90 duration-200 lg:text-[1.4rem] font-medium rounded-full px-4 py-2"
                imgHref="/home/signuphint.png"
                btnContent="立即註冊"
                hintContent="立即註冊，解鎖完整的證書管理功能！"
              />
              <BtnHoverCard
                go="/learn-more"
                btnStyles="bg-white text-secondary active:scale-90 duration-200 lg:text-[1.4rem] font-medium rounded-full px-4 py-2"
                imgHref="/home/understandhint.png"
                btnContent="瞭解更多"
                hintContent="了解我們如何通過區塊鏈技術保障證書的真實性與可靠性。"
              />
            </div>
          </div>

          {/* right */}
          <div
            className="relative max-w-[330px] w-full h-[150px]
                       lg:max-w-[400px] lg:h-[170px] z-0"
          >
            <Image
              src="/home/hero.png"
              alt="hero"
              fill
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
