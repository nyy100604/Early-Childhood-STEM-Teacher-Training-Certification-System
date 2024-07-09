"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import "swiper/css";
import { Autoplay } from "swiper/modules";

import { motion } from "framer-motion";
import { fadeIn } from "@/varients";

const systemFunctionContent = [
  {
    title: "區塊鏈技術01",
    subject: "透明公開：",
    content: "所有幼兒STEM教師證書資訊都是公開可查的，任何人都可以驗證。",
    image: "/home/blockchain1.png",
  },
  {
    title: "區塊鏈技術02",
    subject: "安全可靠：",
    content:
      "幼兒STEM教師證書一旦記錄在區塊鏈上，就無法被篡改或刪除，確保其真實性。",
    image: "/home/blockchain2.png",
  },
  {
    title: "區塊鏈技術03",
    subject: "數據分佈：",
    content:
      "幼兒STEM教師證書數據儲存在多個節點上，不依賴於單一的中央機構，減少了數據丟失或被攻擊的風險。",
    image: "/home/blockchain3.png",
  },
];

const BlockchainIntroduce = () => {
  return (
    <motion.section
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={3000}
      >
        {systemFunctionContent.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className={cn(
                "lg:mt-16 ",
                item.title === "區塊鏈技術01"
                  ? "bg-[#FDE8E1]"
                  : item.title === "區塊鏈技術02"
                  ? "bg-[#FFF4CD]"
                  : item.title === "區塊鏈技術03"
                  ? "bg-[#F0FBFE]"
                  : ""
              )}
            >
              <div
                className={cn(
                  "lg:rounded-tr-[15rem]",
                  item.title === "區塊鏈技術01"
                    ? "bg-[#F0FBFE]"
                    : item.title === "區塊鏈技術02"
                    ? "bg-[#FDE8E1]"
                    : item.title === "區塊鏈技術03"
                    ? "bg-[#FFF4CD]"
                    : ""
                )}
              >
                {" "}
                <div
                  className="container mx-auto flex flex-col items-center gap-y-5
                             lg:flex-row lg:justify-center lg:items-start lg:gap-y-0 lg:gap-x-12"
                >
                  {/* up/left */}
                  <div className="relative w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]">
                    <Image
                      alt={item.title}
                      src={item.image}
                      fill
                      priority
                      quality={100}
                    />
                  </div>

                  {/* under/right */}
                  <div className="flex flex-col">
                    <h1
                      className={cn(
                        "text-center text-[27px] lg:-translate-y-[50%] lg:text-[36px]",
                        item.title === "區塊鏈技術01"
                          ? "text-[#556FCC]"
                          : item.title === "區塊鏈技術02"
                          ? "text-[#1976D2]"
                          : item.title === "區塊鏈技術03"
                          ? "text-[#21221F]"
                          : ""
                      )}
                    >
                      {item.title}
                    </h1>
                    <div className="max-w-[376px] w-full py-6 text-center text-[19px] lg:text-[25px]">
                      <p
                        className={cn(
                          "text-center font-medium lg:text-left",
                          item.title === "區塊鏈技術01"
                            ? "text-[#424242]"
                            : item.title === "區塊鏈技術02"
                            ? "text-[#616161]"
                            : item.title === "區塊鏈技術03"
                            ? "text-[#E65100]"
                            : ""
                        )}
                      >
                        {" "}
                        {item.subject}
                      </p>
                      <p
                        className={cn(
                          "text-justify font-medium px-16 py-4 h-[20vh] lg:h-[35vh]",
                          item.title === "區塊鏈技術01"
                            ? "text-[#605555]"
                            : item.title === "區塊鏈技術02"
                            ? "text-[#6D6D6D]"
                            : item.title === "區塊鏈技術03"
                            ? "text-[#E65100]"
                            : ""
                        )}
                      >
                        {" "}
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.section>
  );
};

export default BlockchainIntroduce;
