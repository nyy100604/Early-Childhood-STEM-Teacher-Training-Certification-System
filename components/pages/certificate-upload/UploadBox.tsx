import StaristicsCard from "../certificate-manage/StatisticsCard";
import MenberTable from "./MenberTable";
import { getCertificateStatusByCertificateNameAndteacherName } from "@/lib/data";

const UploadBox = async ({
  certificateName,
  kingdergarten,
}: {
  certificateName: string;
  kingdergarten: string;
}) => {
  // certificate status (Array).The data indlude certificate, teacher, makeStatus and verifyStatus info.
  let data = await getCertificateStatusByCertificateNameAndteacherName(
    certificateName,
    kingdergarten
  );
  // console.log("data", data);

  // if (!data) {
  //   return <div className="h-[100vh]"></div>;
  // }
  // verified data which is makeStatus and verifyStatus are true.
  const getVerifiedCertificate = await data.filter(
    (obj: any) => obj.makeStatus && obj.verifyStatus
  );
  // console.log("return data", data);

  const date = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div className="relative container mx-auto w-full bg-[#FCFCFC] mt-[150px] lg:mt-[190px] mb-12 rounded-3xl">
      <h1 className="absolute -translate-y-[50%] text-3xl">證書上傳</h1>
      <p className="text-[#5F5D5D] text-[19px] pt-8 pb-6 px-4">
        {`歡迎來到${certificateName}上傳頁面。上傳區塊鏈時確保持有人的資訊與證書內容一致，此外請注意上傳區塊鏈前得先產生證書！`}
      </p>

      <div className="bg-[#9E9A9A] h-[2px]"></div>
      <div className="w-full flex justify-center lg:justify-end lg:pr-24">
        {" "}
        <div className="bg-black text-white rounded-full text-center mt-12 text-[19px] font-bold px-8 py-2">
          {date}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 py-12 px-8 md:grid-cols-3 lg:max-w-[800px] lg:mx-auto">
        {" "}
        <StaristicsCard
          title="總人數"
          num={data.length === 0 ? 0 : data.length}
          unit="人"
        />
        <StaristicsCard
          title="發證數"
          num={getVerifiedCertificate === 0 ? 0 : getVerifiedCertificate.length}
          unit="人"
        />
        <div className="col-span-2 md:col-span-1">
          {" "}
          <StaristicsCard
            title="發證率"
            num={(getVerifiedCertificate.length / data.length) * 100}
            unit="%"
          />
        </div>
      </div>
      <div className="py-6">
        <MenberTable data={data} kingdergarten={kingdergarten} />
      </div>
    </div>
  );
};

export default UploadBox;
