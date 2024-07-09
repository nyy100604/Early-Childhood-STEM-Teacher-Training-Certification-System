"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

// cpmponents
import SlideBtn from "./SlideBtn";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { motion } from "framer-motion";
import { fadeIn } from "@/varients";

const VerifiedCertificate = ({
  session,
  beVerfidCertificate,
}: {
  session: any;
  beVerfidCertificate: any;
}) => {
  // console.log("beVerfidCertificate", beVerfidCertificate);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const getCertificateImages = async () => {
    const images: string[] = [];
    for (const item of beVerfidCertificate) {
      // console.log("item", item);
      const res = await fetch(
        `/api/getcertificate?filename=${item.certificate.image}`
      );
      if (res.ok) {
        const bolb = await res.blob();
        const url = URL.createObjectURL(bolb);
        images.push(url);
      } else {
        console.log("failed to get image");
      }
    }
    setImageUrl(images);
    // console.log("imageUrl", images);
  };

  useEffect(() => {
    getCertificateImages();
  }, []);

  return (
    <div className="bg-verifidCertificate bg-cover bg-center w-full lg:pb-12">
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        className="container w-full bg-black/60
                      lg:rounded-b-3xl"
      >
        <h1 className="text-white text-[36px] text-center py-8">{`${session?.user.username}老師的證書 (${beVerfidCertificate.length})`}</h1>
        <div className="text-white">
          <Swiper>
            {beVerfidCertificate.map((item: any, index: number) => {
              console.log("item", item);

              return (
                <SwiperSlide key={index}>
                  <div
                    className="flex flex-col items-center justify-center gap-y-6
                                   lg:flex-row lg:gap-y-0 lg:gap-x-12"
                  >
                    {" "}
                    {imageUrl.length !== 0 ? (
                      <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden">
                        <Image
                          src={imageUrl[index]}
                          fill
                          alt="images"
                          className="rounded-2xl hover:scale-105 duration-200"
                        />
                      </div>
                    ) : (
                      <Skeleton className="h-[300px] w-[300px] rounded-2xl" />
                    )}
                    <div
                      className="flex flex-col gap-y-10 items-center
                                    lg:items-start"
                    >
                      {" "}
                      <h1 className="text-white text-3xl">
                        {item.certificate.certicatename}
                      </h1>{" "}
                      <div className="flex gap-x-2">
                        <Dialog>
                          <DialogTrigger className="border bg-transparent px-5 py-2 text-lg font-bold rounded-full">
                            證書介紹
                          </DialogTrigger>
                          <DialogContent className="overflow-scroll">
                            <h1 className="text-2xl">
                              {item.certificate.certicatename}
                            </h1>
                            <p>
                              <h1>證書目的</h1>
                              <span>{item.certificate.purposeOfcerticate}</span>
                            </p>{" "}
                            <p>
                              <h1>課程名稱</h1>
                              <span>{item.certificate.coursename}</span>
                            </p>
                            <p>
                              <h1>課程內容</h1>
                              {item.certificate.coursecontent
                                .split("\r\n")
                                .map((text: string, index: number) => {
                                  return <p key={index}>{text}</p>;
                                })}
                            </p>{" "}
                            <p>
                              <h1>證書標準</h1>
                              {item.certificate.coursestandard
                                .split("\r\n")
                                .map((text: string, index: number) => {
                                  return <p key={index}>{text}</p>;
                                })}
                            </p>
                          </DialogContent>
                        </Dialog>
                        <Link href={item.certificateurl}>
                          <div className="border bg-transparent px-5 py-2 text-lg font-bold rounded-full">
                            查看證書
                          </div>
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
    </div>
  );
};

export default VerifiedCertificate;
