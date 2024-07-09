"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/varients";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";

// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import WorkSliderBtn from "./WorkSlideBtn";

const BrowserCertificate = ({ alldata }: { alldata: Array<any> }) => {
  // console.log(alldata);
  const [images, setImages] = useState<Array<string>>([]);
  // console.log("images", images);
  const swiper = useSwiper();

  const getCertificateImage = async () => {
    const imageurl: string[] = [];
    for (let i = 0; i < alldata.length; i++) {
      const certicatename = alldata[i].certicatename;

      // 确保 certificatename 存在
      if (certicatename) {
        const response = await fetch(
          `/api/getcertificate?filename=${certicatename}_png`,
          {
            method: "GET",
          }
        );
        console.log("image", response);
        if (!response.ok) {
          console.log("failed get image file");

          return;
        } else {
          const bolb = await response.blob();
          const url = URL.createObjectURL(bolb);
          console.log("url", url);
          imageurl.push(url);
        }
      }
    }
    setImages(imageurl);
  };

  useEffect(() => {
    getCertificateImage();
  }, []);

  return (
    <main
      className="p-0 m-0 relative container mx-auto bg-manage bg-cover bg-center w-full h-[100vh]
                     lg:h-[70vh]"
    >
      <motion.div
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        whileInView="show"
        className="absolute w-full h-[calc(100%+80px)] bg-black/70 -top-20 lg:rounded-tr-[20%]"
      >
        <h1 className="text-white font-bold text-[55px] tracking-widest text-center py-8">
          證書瀏覽
        </h1>
        <div>
          <Swiper spaceBetween={50} slidesPerView={1} className="relative">
            {alldata.map((cerficate, index) => {
              // console.log(cerficate);

              const coursecontent = cerficate.coursecontent.split("\r\n");
              const coursestandard = cerficate.coursestandard.split("\r\n");
              console.log(coursecontent);

              return (
                <SwiperSlide key={index}>
                  <div className="flex flex-col lg:flex-row w-full items-center gap-y-6 lg:gap-x-12 lg:justify-center">
                    <div className="w-[300px] flex flex-col ">
                      {" "}
                      {images.length !== 0 ? (
                        <div className="w-[300px] h-[300px] overflow-hidden">
                          {" "}
                          <Image
                            alt=""
                            src={images[index]}
                            width={300}
                            height={300}
                            className="rounded-t-[20%] hover:scale-110 duration-200"
                          />
                        </div>
                      ) : (
                        <Skeleton className="h-[300px] w-[300px] " />
                      )}
                      <Link
                        href=""
                        className="text-white w-[300px] text-center text-2xl font-bold py-4 bg-black"
                      >
                        證 書
                      </Link>
                    </div>

                    {/* content */}
                    <div
                      className="text-white max-w-[300px] h-[30vh] overflow-scroll no-scrollbar
                                    lg:h-[45vh]"
                    >
                      <div className="text-xl font-bold text-center py-2 lg:pt-0">
                        {cerficate.certicatename}
                      </div>
                      <div className="text-base text-justify py-2">
                        <p className="font-bold">證書目的：</p>{" "}
                        {cerficate.purposeOfcerticate}
                      </div>
                      <div className="text-base py-2">
                        {" "}
                        <p className="font-bold">課程名稱：</p>
                        {cerficate.coursename}
                      </div>
                      <div className="py-2">
                        <p className="text-base font-bold">課程內容：</p>
                        {coursecontent.map((element: string, index: number) => {
                          return (
                            <p key={index} className="text-justify">
                              {element}
                            </p>
                          );
                        })}
                      </div>
                      <div>
                        <p className="text-base font-bold">課程評估：</p>
                        {coursestandard.map(
                          (element: string, index: number) => {
                            return (
                              <p key={index} className="text-justify">
                                {element}
                              </p>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>{" "}
                </SwiperSlide>
              );
            })}
            <WorkSliderBtn />;
          </Swiper>

          {/* img */}
        </div>
      </motion.div>
    </main>
  );
};

export default BrowserCertificate;
