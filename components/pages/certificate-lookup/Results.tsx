import { Button } from "@/components/ui/button";
import React from "react";
import Certificate from "./Certificate";

const Results = ({
  teacherInfo,
  updateResults,
}: {
  teacherInfo: any;
  updateResults: boolean;
}) => {
  const handleDownloadTeachingFile = async () => {
    if (teacherInfo) {
      const filename = teacherInfo.teacherInfo.downloadableTeachingResources;
      try {
        const response = await fetch(
          `/api/getteachingfile?filename=${filename}`,
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
    }
  };

  const contactInformation = teacherInfo?.teacherInfo?.contactInformation
    .split("\r\n")
    .map((msg: string, index: number) => {
      return <div key={index}>{msg}</div>;
    });
  const teachingExperience = teacherInfo?.teacherInfo?.teachingExperience
    .split("\r\n")
    .map((msg: string, index: number) => {
      return <div key={index}>{msg}</div>;
    });
  const professionalSkills = teacherInfo?.teacherInfo?.professionalSkills
    .split("\r\n")
    .map((msg: string, index: number) => {
      return <div key={index}>{msg}</div>;
    });
  const teachingPhilosophy = teacherInfo?.teacherInfo?.teachingPhilosophy
    .split("\r\n")
    .map((msg: string, index: number) => {
      return <div key={index}>{msg}</div>;
    });

  return (
    <div className="bg-primary">
      {" "}
      <div className="max-w-[376px] mx-auto lg:max-w-[960px] lg:max-h-max pt-8">
        <div className="bg-bg w-full mt-11 rounded-t-3xl lg:flex lg:h-[70vh] ">
          {!teacherInfo && (
            <div className="w-full">
              {" "}
              <div className="text-secondary -translate-y-[50%] text-[36px] tracking-widest text-center font-black">
                查詢結果
              </div>{" "}
              <div className="text-center font-bold pt-16 lg:pt-24 pb-20 lg:text-[2.5rem]">
                未查詢到老師的資料
              </div>
            </div>
          )}
          {teacherInfo && (
            <div className="px-10 pb-3 lg:min-w-[500px]">
              {" "}
              <div className="text-secondary -translate-y-[50%] text-[36px] tracking-widest text-center font-black">
                查詢結果
              </div>
              <div className="lg:pl-16">
                {" "}
                <div>
                  <span className="font-black">老師姓名：</span>
                  {`${teacherInfo?.certificateStatus[0].teacher.username}`}
                </div>
                <div>
                  <span className="font-black">電子信箱：</span>
                  {`${teacherInfo?.certificateStatus[0].teacher.email}`}
                </div>
                <div>
                  {" "}
                  <span className="font-black">幼稚園：</span>
                  {`${teacherInfo?.certificateStatus[0].teacher.kingdergarten}`}
                </div>
                <div>
                  {" "}
                  <span className="font-black block">聯繫方式</span>
                  {contactInformation}
                </div>
                <div className="flex items-center gap-x-6 py-4">
                  <div className="flex items-center gap-x-2">
                    {" "}
                    <h1>教學資源</h1>
                    <Button
                      className="active:scale-95 duration-300 text-sm"
                      onClick={handleDownloadTeachingFile}
                    >
                      下載
                    </Button>{" "}
                  </div>

                  <Certificate
                    certificateStatus={teacherInfo.certificateStatus}
                    updateResults={updateResults}
                  />
                </div>
              </div>
            </div>
          )}{" "}
          {teacherInfo && (
            <div className="bg-black/60 w-full text-white px-10 py-4 h-[50vh] overflow-y-scroll lg:h-full lg:rounded-3xl lg:rounded-br-none">
              <h1 className="text-[36px]">教學資料</h1>
              <div className="py-4">
                {" "}
                <span className="font-medium text-2xl pb-4">教學經驗</span>
                {teachingExperience}
              </div>
              <div className="py-4">
                {" "}
                <span className="font-medium text-2xl pb-2">專業技能</span>{" "}
                {professionalSkills}
              </div>
              <div className="py-4">
                <span className="font-medium text-2xl pb-2">教學理念</span>
                {teachingPhilosophy}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
