"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/varients";
import { Pencil } from "lucide-react";

const functionData = [
  {
    title: "證書查詢",
    content:
      "大眾可以通過輸入教師姓名、信箱與幼稚園名稱，快速查詢並驗證證書的真實性。",
    image: "/home/function1.png",
  },
  {
    title: "證書管理",
    content: "老師可以查看、下載證書和更新老師個人的資訊。",
    image: "/home/function2.png",
  },
  {
    title: "證書創建",
    content: "發證機構可以創建新的教師證書，並介紹證書的目的與用途。",
    image: "/home/function3.png",
  },
  {
    title: "證書上傳",
    content: "發證機構可以將幼兒STEM證書上傳至區塊鏈，進行即時的驗證。",
    image: "/home/function4.png",
  },
];

const FunctionIntroduce = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView="show"
      className="relative top-0 bg-homefunction bg-cover bg-center w-full flex flex-col py-16"
    >
      <h1 className="text-[#424242] text-4xl text-center lg:order-2 lg:text-end col-span-4 pt-9 lg:pr-20 lg:text-5xl">
        系統功能
      </h1>{" "}
      <div className="container pt-16 grid grid-cols-1  sm:grid-cols-2  xl:grid-cols-4 gap-8">
        {functionData.map((data, index) => {
          return (
            <div key={index} className="relative max-w-[250px] mx-auto group">
              {" "}
              <div className="hover:-skew-x-3 bg-transparent duration-200 relative z-10 rounded-3xl rounded-b-none shadow-2xl">
                <div className="relative w-[250px] h-[250px] overflow-hidden rounded-3xl rounded-b-none">
                  {" "}
                  <Image
                    src={data.image}
                    alt="image"
                    className="rounded-3xl rounded-b-none hover:scale-105 duration-300"
                    fill
                  />
                  <div className="absolute w-full h-full bg-black/70 -translate-x-[100%] group-hover:translate-x-0 delay-500 duration-300 text-white text-xl font-bold p-8 pt-10">
                    {data.content}
                    <div className="flex justify-end">
                      {" "}
                      <Pencil size={30} />
                    </div>
                  </div>
                </div>
                <div className="bg-transparent  text-white rounded-b-3xl p-4 text-3xl hover:cursor-pointer">
                  <h1 className="text-center">{data.title}</h1>
                </div>
              </div>{" "}
              <div className="bg-[#424242] absolute w-full h-full top-2 left-2 rounded-3xl"></div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FunctionIntroduce;
