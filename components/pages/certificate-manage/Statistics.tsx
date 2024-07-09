import { ProgressAnimate } from "./ProgressAnimate";
// components
import StatisticsCard from "./StatisticsCard";

// icons
import { BarChartBig } from "lucide-react";

// data
import { kingdergardtenPosition } from "../Signup.tsx/kingdergartenPosition";
import { getVerfiedCertificateStatus } from "@/lib/data";

const Statistics = async ({ alldata }: { alldata: any[] }) => {
  const getVerfiedCertificate = await getVerfiedCertificateStatus();
  // console.log("getVerfiedCertificate", getVerfiedCertificate);

  const totalCertificateNum = alldata.length;
  const getVerifiedCertificateNum = getVerfiedCertificate.length;
  const totalTeacherNum = alldata[0].teachers.length;

  const date = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <main
      className="pb-28 mt-[100px] lg:mt-[200px] container w-full mx-auto bg-[#FCFCFC] flex flex-col gap-y-6 items-center rounded-t-2xl
                      lg:gap-y-14"
    >
      <div className="w-full flex justify-center lg:justify-end lg:pr-24">
        {" "}
        <div className="bg-black text-white rounded-full text-center mt-12 text-[19px] font-bold px-8 py-2">
          {date}
        </div>
      </div>

      <div className="px-8 max-w-[884px] text-black w-full text-left text-[27px] font-bold lg:flex lg:items-center gap-x-2">
        <BarChartBig />
        統計數據
      </div>
      <div className="px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {" "}
        <StatisticsCard
          title="合作幼稚園"
          num={kingdergardtenPosition.length}
          unit="間"
        />
        <StatisticsCard title="老師總人數" num={totalTeacherNum} unit="人" />
        <StatisticsCard
          title="發證數"
          num={getVerifiedCertificateNum}
          unit="張"
        />
        <StatisticsCard
          title="創建證書數"
          num={totalCertificateNum}
          unit="張"
        />
        <div className="w-full p-8 border-2 col-span-2 text-black rounded-2xl shadow-xl">
          {" "}
          <h1 className="text-[19px] lg:text-[25px]">發證率</h1>
          <ProgressAnimate
            percent={
              (getVerifiedCertificateNum /
                (totalCertificateNum * totalTeacherNum)) *
              100
            }
          />
        </div>
      </div>
    </main>
  );
};

export default Statistics;
