"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/varients";

import Link from "next/link";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

//components
import { Skeleton } from "@/components/ui/skeleton";
import SlideBtn from "./SlideBtn";
import { Button } from "@/components/ui/button";

const SelectBox = ({ alldata }: { alldata: any }) => {
  // test:no certificate available
  // alldata = "";
  if (!alldata) {
    return (
      <div className="w-full bg-white/80 rounded-3xl h-[70vh] mx-auto p-7 flex items-center justify-center lg:max-w-[750px]">
        <h1 className="text-secondary text-[2.5rem] flex flex-col items-center gap-y-6">
          <Image
            src="/upload/noCertificateAvailable.png"
            width={250}
            height={100}
            alt="noCertificateAvailable"
          />
          目前無建立證書
        </h1>
      </div>
    );
  }

  const [images, setImages] = useState<Array<string>>();

  //get all certificate info which is a Array
  // console.log("alldata", alldata);

  const getImage = async () => {
    let imagesurls: string[] = [];
    // After retrieving all certificate data (Array), extract the image of each certificate and
    // send it to the backend to fetch the images.

    for (const certi of alldata) {
      const response = await fetch(
        `/api/getcertificate?filename=${certi.certicatename}_png`
      );
      if (!response.ok) {
        // console.log("failed get image file");
        return;
      } else {
        const bolb = await response.blob();
        const url = URL.createObjectURL(bolb);
        // console.log("url", url);
        imagesurls.push(url);
      }
    }
    setImages(imagesurls);
  };

  const handleDownloadCertificatePattern = async (filename: string) => {
    try {
      const response = await fetch(
        `/api/getcertificatePattern?filename=${filename}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network respons was not ok");
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      className="w-full bg-white/80 rounded-3xl lg:max-w-[750px] mx-auto p-7"
    >
      <h1 className="text-secondary tracking-widest text-[2.5rem]">選擇證書</h1>
      <p className="text-[#616161] font-medium">
        歡迎來到證書上傳頁面，首先請選擇您欲上傳的證書！
      </p>
      <div>
        <Swiper spaceBetween={60} slidesPerView={1} className="relative">
          {alldata.map((data: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="w-full flex flex-col gap-4 items-center py-6 lg:flex-row lg:gap-x-10 lg:justify-center">
                  {" "}
                  {images && images?.length > 0 ? (
                    <div className="relative w-[250px] h-[250px]">
                      <Image
                        alt="certificateImage"
                        src={images[index]}
                        fill
                        className="rounded-t-3xl"
                      />
                    </div>
                  ) : (
                    <Skeleton className="w-[250px] h-[250px]" />
                  )}
                  <div className="flex  flex-col gap-y-2 lg:items-start">
                    {" "}
                    <h1 className="text-2xl py-4">
                      <span className="text-[3rem] text-outline text-transparent">
                        {index + 1}
                      </span>{" "}
                      {data.certicatename}
                    </h1>{" "}
                    <div className="flex gap-x-4 pb-4 justify-center">
                      <Button
                        variant="outline"
                        className="bg-transparent border-black border"
                        onClick={() =>
                          handleDownloadCertificatePattern(data.pattern)
                        }
                      >
                        檢視模板
                      </Button>
                      <Link href={`/certificate-upload/${data.certicatename}`}>
                        {" "}
                        <Button
                          variant="outline"
                          className="bg-transparent border-black border"
                        >
                          進入證書
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <SlideBtn />
        </Swiper>
      </div>
    </motion.div>
  );
};

export default SelectBox;
