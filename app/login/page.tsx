import ErrorMessage from "@/components/pages/Login/ErrorMessage";
import Loginform from "@/components/pages/Login/Loginform";
import Link from "next/link";

const page = ({ searchParams }: { searchParams?: { code: string } }) => {
  return (
    <section className="w-full lg:flex">
      {/* login form(mobile) */}
      <div className="lg:hidden absolute top-0 bg-loginmobile bg-cover bg-center w-[100%] h-[100vh] z-0"></div>
      {/* login form(desktop) */}
      <div className="hidden lg:block top-0 bg-logindesktop bg-cover bg-center w-[1900px] h-[100vh] z-0 shadow-2xl"></div>

      {/* common form */}
      <div className="container mx-auto pt-12 pb-10 lg:pt-14 lg:mx-0  lg:max-w-[450px] w-full flex flex-col lg:justify-center h-[100vh] overflow-scroll">
        {" "}
        <Loginform />
      </div>
      <ErrorMessage errorMsg={searchParams?.code as string} />
    </section>
  );
};

export default page;
