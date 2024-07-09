"use client";
import React, { FormEvent, useState } from "react";

import { z } from "zod";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";
import Createtextarea from "../certificate-create/Createtextarea";
import FileUpload from "./FileUpload";
import { useToast } from "@/components/ui/use-toast";
import SubmitBtn from "./SubmitBtn";

const teachingInfoValidate = z.object({
  downloadableTeachingResources: z.custom<File>(
    (value) => value instanceof File && value.size > 0,
    {
      message: "請務必上傳教學資源",
    }
  ),
  teachingExperience: z.string().min(1, { message: "必須填入教學經驗" }),
  professionalSkills: z.string().min(1, { message: "必須填入專業技能" }),
  teachingPhilosophy: z.string().min(1, { message: "必須填入教學理念" }),
  contactInformation: z.string().min(1, { message: "必須填入聯絡資訊" }),
});

const SetupForm = ({ session }: { session: any }) => {
  // console.log("session", session);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formDataObj: { [key: string]: any } = {};
    const form = new FormData(e.currentTarget);

    form.forEach((value, key) => {
      // console.log(value, key);
      formDataObj[key] = value;
    });
    // console.log(formDataObj);
    const validateFields = teachingInfoValidate.safeParse(formDataObj);

    if (!validateFields.success) {
      // console.log(validateFields.error.flatten().fieldErrors);
      setError(validateFields.error.flatten().fieldErrors);
      return;
    } else {
      setError(null);
      form.append("_id", session.user.id);
      form.append("teacher", session.user.username);
      // console.log(form.get("_id"));
      try {
        const resData = await fetch("/api/uploadteachingInfo", {
          method: "POST",
          body: form,
        });
        const data = await resData.json();

        if (resData.ok) {
          setPending(false);
          router.push("/profile-manage");
          toast({
            variant: "default",
            title: "成功",
            description: data.message,
          });
        } else {
          setPending(false);
          toast({
            variant: "default",
            title: "失敗",
            description: data.message,
          });
        }
      } catch (error) {
        setPending(false);
        console.log("error", error);
        toast({
          variant: "default",
          title: "失敗",
          description: "系統發生錯誤請重新上傳",
        });
      }
    }
  };

  return (
    <main className="containerTop pb-14">
      <div className="container w-full mx-auto rounded-2xl bg-[#FCFCFC] overflow-scroll">
        <div className="min-w-[1100px]">
          <h1 className="text-[27px] py-8 px-8">{`${session.user.username}老師資料填寫`}</h1>
          <p className="text-[#5F5D5D] text-[19px] px-12 pb-10">
            {`歡迎來${session.user.username}老師來到老師資料填寫頁面，，此介面僅響應電腦版！！在這裡，您可以建立自己的個人教學檔案。請按照以下步驟盡力填寫您的教學資訊，以利家長更認識您。`}
          </p>
          <div className="pl-12 mb-12">
            {" "}
            <div className="bg-[#9E9A9A] h-[2px]"></div>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Createtextarea
              title="教學經驗"
              placehoder="輸入教學經驗"
              desc="這一欄讓您可以詳細記錄您的教學經驗，包括您曾教授的課程、學生年齡段、工作學校以及您在教學過程中獲得的成就和榮譽。這些資訊能夠展示您在STEM教育領域的專業能力和經驗豐富程度。"
              name="teachingExperience"
            />
            {error &&
              error?.teachingExperience?.map((error: any, index: number) => {
                return (
                  <p className="text-red-600 pl-[12rem]" key={index}>
                    {error}
                  </p>
                );
              })}
            <Createtextarea
              title="專業技能"
              placehoder="輸入專業技能"
              desc="您可以列出與幼兒STEM教育相關的專業技能和資格。這些技能包括您在科學、技術、工程和數學領域的專長，展示您在這些領域的知識和能力。"
              name="professionalSkills"
            />
            {error &&
              error?.professionalSkills?.map((error: any, index: number) => {
                return (
                  <p className="text-red-600 pl-[12rem]" key={index}>
                    {error}
                  </p>
                );
              })}
            <Createtextarea
              title="教學理念"
              placehoder="輸入教學理念"
              desc="這一部分讓您可以描述您的教學理念和方法，包括您如何通過實踐案例來啟發學生對科學的興趣和培養他們的批判性思維能力。這些理念和實踐展示了您作為一名教育者的教學風格和價值觀。"
              name="teachingPhilosophy"
            />
            {error &&
              error?.teachingPhilosophy?.map((error: any, index: number) => {
                return (
                  <p className="text-red-600 pl-[12rem]" key={index}>
                    {error}
                  </p>
                );
              })}
            <Createtextarea
              title="聯繫方式"
              placehoder="輸入聯繫方式"
              desc="最後一項讓您可以填寫和更新您的聯繫方式，包括您的電話號碼、電子郵件地址以及地址。您還可以設置您的聯繫偏好和最佳聯繫時間，確保與其他人之間的溝通順暢和高效。"
              name="contactInformation"
            />
            {error &&
              error?.contactInformation?.map((error: any, index: number) => {
                return (
                  <p className="text-red-600 pl-[12rem]" key={index}>
                    {error}
                  </p>
                );
              })}
            <FileUpload />
            {error &&
              error?.downloadableTeachingResources?.map(
                (error: any, index: number) => {
                  return (
                    <p className="text-red-600 pl-[12rem]" key={index}>
                      {error}
                    </p>
                  );
                }
              )}
            <div className="text-center pt-3 pb-[4rem]">
              <SubmitBtn pending={pending} />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SetupForm;
