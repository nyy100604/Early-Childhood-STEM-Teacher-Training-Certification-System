"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/varients";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TeachingData = ({
  session,
  teachingData,
}: {
  session: any;
  teachingData: any;
}) => {
  // console.log("session", session);
  // console.log("teachingData", teachingData);
  const teachingExperience = teachingData.teachingExperience?.split("\r\n");
  const professionalSkills = teachingData.professionalSkills?.split("\r\n");
  const teachingPhilosophy = teachingData.teachingPhilosophy?.split("\r\n");
  const contactInformation = teachingData.contactInformation?.split("\r\n");

  const data1 = teachingExperience?.map((section: string, index: number) => {
    return (
      <p className="py-2" key={index}>
        {section}
      </p>
    );
  });

  const data2 = professionalSkills?.map((section: string, index: number) => {
    return (
      <p className="py-2" key={index}>
        {section}
      </p>
    );
  });

  const data3 = teachingPhilosophy?.map((section: string, index: number) => {
    return (
      <p className="py-2" key={index}>
        {section}
      </p>
    );
  });

  const data4 = contactInformation?.map((section: string, index: number) => {
    return <p key={index}>{section}</p>;
  });

  const handleDownloadTeachingFile = async () => {
    const filename = teachingData.downloadableTeachingResources;

    try {
      const response = await fetch(
        `/api/getteachingfile?filename=${filename}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const bolb = await response.blob();
      const url = URL.createObjectURL(bolb);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="flex flex-col pt-[150px] bg-primary
                    lg:pt-[150px]"
    >
      {/* title */}
      <div className="flex items-center justify-center pb-4 gap-x-2">
        <div
          className="relative w-[110px] h-[110px]  
                        lg:hidden"
        >
          <Image
            alt="teachingProfile"
            src="/profile-manage/teachingProfile.png"
            fill
          />
        </div>
        <h1 className="text-[40px] text-center py-3">老師基本資料</h1>
      </div>

      <div
        className="max-w-[376px] max-h-max mx-auto relative pb-16
                      lg:max-w-[950px] lg:pb-0 lg:mb-32"
      >
        <div className="bg-bg rounded-2xl lg:flex lg:flex-row lg:w-full relative z-10 lg:h-[60vh]">
          {" "}
          {/* top / left */}
          <div
            className="p-8 flex flex-col gap-y-3 
                          lg:box-border lg:min-w-[400px] lg:p-14"
          >
            <p>
              <span className="font-black text-xl">老師姓名：</span>{" "}
              {`${session?.user?.username}`}
            </p>

            <p>
              <span className="font-black text-xl">幼稚園位置：</span>
              {`${session?.user?.kingdergarten}`}
            </p>

            <div>
              {" "}
              <h1 className="text-xl">聯絡資訊：</h1>
              {data4}
            </div>
            <div className="pt-4 pb-6 lg:p-0 flex items-center gap-x-3">
              {" "}
              <h1 className="text-xl">下載教學資源</h1>
              <Button
                className="active:scale-95 duration-300"
                onClick={handleDownloadTeachingFile}
              >
                下載
              </Button>
            </div>
          </div>
          {/* bottom / right */}
          <div
            className="bg-black/60 text-white overflow-y-scroll shadow-2xl rounded-2xl duration-300 rounded-tl-none p-8 h-[40vh] flex flex-col gap-y-4 no-scrollbar
                           lg:hover:-skew-x-3 lg:hover:z-50 lg:h-full lg:p-16 lg:pt-8 "
          >
            <h1 className="text-2xl text-center pb-6">教學資訊</h1>
            <div>
              <h1 className="text-xl">教學經驗</h1>
              {data1}
            </div>
            <div>
              {" "}
              <h1 className="text-xl">專業技能</h1> {data2}
            </div>
            <div>
              {" "}
              <h1 className="text-xl">教學理念</h1> {data3}
            </div>
          </div>
          <div className="absolute top-[100%] pointer-events-none">
            {" "}
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              className="hidden lg:block relative w-[300px] h-[300px] -top-32 left-[21rem] z-10"
            >
              <Image
                alt="teachingProfile"
                src="/profile-manage/teachingProfile.png"
                fill
              />
            </motion.div>
          </div>
        </div>

        {/* shadow */}
        <div className="hidden lg:block bg-black w-full absolute left-2 top-2 h-full rounded-2xl"></div>
      </div>
    </div>
  );
};

export default TeachingData;
