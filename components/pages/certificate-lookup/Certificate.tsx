"use client";

import SlideBtn from "../profile-manage/SlideBtn";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
const Certificate = ({
  certificateStatus,
  updateResults,
}: {
  certificateStatus: any[];
  updateResults: boolean;
}) => {
  console.log("certificateStatus", certificateStatus);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const fetchImages = async () => {
    const images: string[] = [];
    for (const item of certificateStatus) {
      if (item.certificate.image) {
        console.log(item.certificate.image);

        const response = await fetch(
          `/api/getcertificate?filename=${item.certificate.image}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const bolb = await response.blob();
          const url = URL.createObjectURL(bolb);
          images.push(url);
        } else {
          console.log("failed to get image");
        }
      }
    }

    setImagesUrl(images);
    console.log("images", images);
  };

  console.log("imagesUrl", imagesUrl);

  useEffect(() => {
    fetchImages();
  }, [updateResults]);

  return (
    <Drawer>
      <DrawerTrigger>
        {" "}
        <div className="flex items-center gap-x-2 py-4">
          {" "}
          <h1>證書</h1>
          <div className="bg-secondary text-white font-bold px-5 py-2 rounded-full cursor-pointer active:scale-95 duration-300 text-sm">
            查看
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-black/60">
        {/* <DrawerTitle>Are you absolutely sure?</DrawerTitle> */}
        <Swiper slidesPerView={1} className="w-full">
          {certificateStatus &&
            certificateStatus.map((item: any, index: number) => {
              console.log("item", item);
              console.log("length", imagesUrl.length);

              return (
                <SwiperSlide key={index} className="text-white">
                  <div className="w-full flex flex-col items-center lg:flex-row">
                    {" "}
                    <div className="max-w-[376px] mx-auto pt-10 flex flex-col items-center gap-y-6 lg:mx-0 lg:ml-auto">
                      {" "}
                      {imagesUrl.length !== 0 ? (
                        <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden">
                          {" "}
                          <Image
                            src={imagesUrl[index]}
                            fill
                            alt="image"
                            className="rounded-2xl hover:scale-105 duration-200"
                          />
                        </div>
                      ) : (
                        <Skeleton className="h-[300px] w-[300px] rounded-2xl" />
                      )}
                      <div className="text-white font-black text-2xl pt-0 w-full text-center">
                        {item.certificate.certicatename}
                      </div>
                      <div className="rounded-full border-2 border-white max-w-max active:scale-95 duration-200">
                        <Link href={item.certificateurl}>
                          <span className="block px-4 py-2 font-bold tracking-widest">
                            證書查看
                          </span>
                        </Link>
                      </div>{" "}
                    </div>
                    <div className="max-w-[376px] mx-auto h-[27vh] overflow-scroll py-4 mt-6 lg:h-[33vh]">
                      {" "}
                      <div>
                        <span className="font-black block text-xl">
                          證書目的：
                        </span>
                        {item.certificate.purposeOfcerticate}
                      </div>
                      <div>
                        <span className="font-black block text-xl">
                          課程內容：
                        </span>
                        {item.certificate.coursecontent
                          .split("\r\n")
                          .map((data: string, index: number) => {
                            return <p key={index}>{data}</p>;
                          })}
                      </div>
                      <div>
                        <span className="font-black block text-xl">
                          課程標準：
                        </span>
                        {item.certificate.coursestandard
                          .split("\r\n")
                          .map((data: string, index: number) => {
                            return <p key={index}>{data}</p>;
                          })}
                      </div>
                    </div>
                  </div>{" "}
                </SwiperSlide>
              );
            })}{" "}
          <SlideBtn />
        </Swiper>{" "}
        <DrawerFooter>
          {/* <Button>Submit</Button> */}
          <DrawerClose>
            {/* <Button variant="outline">Cancel</Button> */}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Certificate;
