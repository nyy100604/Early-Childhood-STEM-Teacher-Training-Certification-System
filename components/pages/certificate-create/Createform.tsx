"use client";

import { z } from "zod";
import { FormEvent, useState } from "react";
// components
import Createinput from "./Createinput";
import ImageUpload from "./ImageUpload";
import PdfUpload from "./PdfUpload";
import Createtextarea from "./Createtextarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Submitbtn from "./Submitbtn";

const createcertificatevalidate = z.object({
  image: z.custom<File>((value) => value instanceof File && value.size > 0, {
    message: "請務必上傳證書形象照",
  }),
  pattern: z.custom<File>((value) => value instanceof File && value.size > 0, {
    message: "請務必上傳證書模板",
  }),
  certicatename: z.string().min(1, { message: "必須填入證書名稱" }),
  purposeOfcerticate: z.string().min(1, { message: "必須填入證書目的" }),
  coursename: z.string().min(1, { message: "必須填入課程名稱" }),
  coursecontent: z.string().min(1, { message: "必須填入課程內容" }),
  coursestandard: z.string().min(1, { message: "必須填入課程標準" }),
});

const Createform = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<any>();
  const [pennding, setPending] = useState(false);

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    setPending(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formDataObj: { [key: string]: any } = {};

    form.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const validatedFields = createcertificatevalidate.safeParse(formDataObj);
    // console.log(validatedFields);

    if (!validatedFields.success) {
      setPending(false);
      console.log(validatedFields.error.flatten().fieldErrors);
      setError(validatedFields.error.flatten().fieldErrors);
      return;
    } else {
      setError(null);
      try {
        const resdata = await fetch("/api/createcertificate", {
          method: "POST",
          body: form,
        });
        const data = await resdata.json();
        if (resdata.ok) {
          setPending(false);
          toast({
            variant: "default",
            title: "成功",
            description: data.message,
          });
          router.push("/certificate-manage");
        } else {
          setPending(false);
          toast({
            variant: "default",
            title: "失敗",
            description: data.message,
          });
        }
      } catch (e) {
        console.log(e);
        toast({
          variant: "default",
          title: "失敗",
          description: "系統發生錯誤，請床重新上傳",
        });
      }
    }
  };

  return (
    <div className="containerTop mb-16">
      <div className="container w-full mx-auto rounded-2xl bg-[#FCFCFC] overflow-x-scroll">
        <div className="min-w-[1100px]">
          {" "}
          <h1 className="text-[27px] py-8 px-8">證書創建</h1>
          <p className="text-[#5F5D5D] text-[19px] px-12 pb-10">
            歡迎來到證書創建頁面，此介面僅響應電腦版！在這裡，您可以創建新的證書。請按照以下步驟填寫證書相關資訊。
          </p>
          <div className="pl-12 mb-12">
            {" "}
            <div className="bg-[#9E9A9A] h-[2px]"></div>
          </div>
          <form
            action=""
            className="flex flex-col gap-y-8"
            onSubmit={handlesubmit}
          >
            <ImageUpload
              title="證書形象照"
              desc="請上傳證書的形象照片或設計圖。將用於證書封面的視覺展示，確保證書在瀏覽時具有專業和美觀的外觀"
              name="image"
              error={error}
            />{" "}
            <PdfUpload
              title="證書模板"
              desc="上傳一個合適的證書模板。這將決定證書的佈局和設計風格。您可以預覽模板，確保其符合您的需求和偏好"
              name="pattern"
              error={error}
            />
            <Createinput
              title="證書名稱"
              placehoder="輸入證書名稱"
              desc="請輸入證書的標題名稱，例如「幼兒STEM教育師資培訓證書」"
              name="certicatename"
            />
            {error &&
              error.certicatename.map((error: any, index: number) => (
                <p key={index} className="text-red-600 pl-[12rem]">
                  {error}
                </p>
              ))}
            <Createtextarea
              title="證書目的"
              placehoder="輸入證書目的"
              desc="請填寫證書頒發的目的和意圖，例如“此證書旨在培養具備幼兒STEM教育技能的教師，提升他們在科學、技術、工程和數學領域的教學能力"
              name="purposeOfcerticate"
            />
            {error &&
              error.purposeOfcerticate.map((error: any, index: number) => (
                <p key={index} className="text-red-600 pl-[12rem]">
                  {error}
                </p>
              ))}
            <Createinput
              title="課程名稱"
              placehoder="輸入課程名稱"
              desc="請輸入相關課程的名稱，例如：「幼兒STEM教育師資培訓」"
              name="coursename"
            />{" "}
            {error &&
              error.coursename.map((error: any, index: number) => (
                <p key={index} className="text-red-600 pl-[12rem]">
                  {error}
                </p>
              ))}
            <Createtextarea
              title="課程內容"
              placehoder="輸入課程內容"
              desc="課程內容詳細列出了課程涵蓋的主題和知識領域，幫助理解該證書所代表的專業能力和學術背景"
              name="coursecontent"
            />{" "}
            {error &&
              error.coursecontent.map((error: any, index: number) => (
                <p key={index} className="text-red-600 pl-[12rem]">
                  {error}
                </p>
              ))}
            <Createtextarea
              title="評估標準"
              placehoder="輸入評估標準"
              desc="請描述完成課程和獲得證書所需達到的標準和要求，例如：通過期末筆試和實踐教學評估，出勤率達到90%以上，提交完整的教學計劃"
              name="coursestandard"
            />
            {error &&
              error.coursestandard.map((error: any, index: number) => (
                <p key={index} className="text-red-600 pl-[12rem]">
                  {error}
                </p>
              ))}
            <div className="flex justify-center pt-4 pb-12">
              <Submitbtn pending={pennding} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createform;
