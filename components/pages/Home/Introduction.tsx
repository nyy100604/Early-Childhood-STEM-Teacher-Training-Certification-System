"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/varients";
import { useEffect, useState } from "react";
const Introduction = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
      className="bg-[#FFFBEC]
                    lg:rounded-bl-[25rem]"
    >
      <div
        className="container mx-auto flex flex-col items-center py-[50px] gap-y-8
                     lg:flex-row lg:items-start lg:justify-center lg:pt-[70px] lg:gap-x-12"
      >
        {/* on/left */}
        <div
          className="flex flex-col items-center gap-y-8
                        lg:items-start lg:max-w-[590px] lg:gap-y-16"
        >
          {" "}
          <h1
            className="text-[#1E88E5] text-[27px]
                         lg:text-[36px]"
          >
            目標和價值
          </h1>
          <p
            className="text-[#424242] text-[19px] font-medium px-10
                        lg:text-[25px] lg:font-medium"
          >
            提供可靠的證書管理和驗證平台，為教育機構、教師和家長創造信任和保障。
          </p>
        </div>
        {/* under/right */}
        <div className="relative w-[280px] h-[280px] lg:w-[350px] lg:h-[350px]">
          <Image
            alt="introduce"
            src="/home/introduce.png"
            fill
            priority
            quality={100}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;
