import { auth } from "@/auth";
import { getTeacherInfoByTeacherId } from "@/lib/actions/getTeacherAllData";
import Image from "next/image";

// components
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import SetupForm from "@/components/pages/profile-setup/SetupForm";

const page = async () => {
  const session = await auth();
  const user = session?.user as {
    email: string;
    id: string;
    role: string;
    username: string;
    kingdergarten: string;
    address: string;
  };
  console.log(user.id);

  const haveTeachingInfo = await getTeacherInfoByTeacherId(user.id);
  // console.log("teachingInfo", haveTeachingInfo);

  return (
    <>
      <div className="bg-primary w-full">
        <Header />
        {haveTeachingInfo ? (
          <div className="containerTop pb-12">
            <div
              className="max-w-[376px] mx-auto bg-[#f1f3e7] rounded-3xl flex flex-col items-center justify-center
                            lg:max-w-[900px] lg:flex-row lg:gap-x-4"
            >
              <Image
                src="/profile-setup/haveFilledInfo.png"
                width={350}
                height={350}
                alt="haveFilled"
                className="pt-6"
              />
              <h1 className="text-2xl font-black py-6 lg:text-4xl">
                {`${user.username}老師您已填寫老師資料`}
              </h1>
            </div>
          </div>
        ) : (
          <SetupForm session={session} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;
