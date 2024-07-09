"use client";
import React, { FormEvent, useRef, useState } from "react";
import SearchForm from "./SearchForm";
import Results from "./Results";
import { getCertificateStatusAndTeachingProfileByUserInfo } from "@/lib/actions/getTeacherAllData";

// icon
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<any>();
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [updateResults, setUpdateResults] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current!;
    setAtTop(scrollTop === 0);
    setAtBottom(scrollTop + clientHeight >= scrollHeight);
  };

  const scrollToTop = () => {
    console.log("scrollToTop");

    divRef.current?.scroll({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    divRef.current?.scroll({
      top: divRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const getTeacherData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateResults(!updateResults);
    const formdata = new FormData(e.currentTarget);
    // console.log(formdata.get("position"));
    // console.log(formdata.get("email"));
    // console.log(formdata.get("username"));

    const position = formdata.get("position") as string;
    const email = formdata.get("email") as string;
    const username = formdata.get("username") as string;
    console.log(position, email, username);
    try {
      // the data incluedes certificateStatus and teacherInfo
      const data = await getCertificateStatusAndTeachingProfileByUserInfo(
        username,
        email,
        position
      );
      // console.log("data", data);

      if (!data) {
        setShowResults(true);
      }
      // console.log(data);
      setShowResults(true);
      setTeacherInfo(data);
    } catch (error) {
      console.log("error", error);
      setShowResults(true);
    }
  };

  return (
    <div
      className="h-screen overflow-y-auto"
      ref={divRef}
      onScroll={handleScroll}
    >
      {" "}
      <main className="pt-[7rem] sm:pt-[9rem] lg:pt-[2rem] md:pb-10">
        {" "}
        <div className="bg-black/75 container mx-auto sm:rounded-xl">
          <h1
            className="text-white text-3xl text-center py-9 
                       lg:text-5xl lg:py-11 lg:pt-32"
          >
            教師資訊查詢
          </h1>
          <p className="text-white text-[19px] pb-10 px-12">
            歡迎來到證書查詢頁面，請選取老師所在的幼稚園位置、老師的電子信箱與姓名以查詢相關資訊。
          </p>
          <SearchForm getTeacherData={getTeacherData} />
        </div>{" "}
      </main>{" "}
      {showResults && (
        <Results teacherInfo={teacherInfo} updateResults={updateResults} />
      )}
      {showResults && (
        <div className="fixed bottom-5 right-4 z-20">
          {!atTop && (
            <div
              onClick={scrollToTop}
              className="bg-secondary rounded-full p-3 active:scale-105 duration-200 hover:cursor-pointer shadow-2xl"
            >
              <ArrowBigUpDash className="text-white" size={50} />
            </div>
          )}{" "}
          {!atBottom && (
            <div
              onClick={scrollToBottom}
              className="bg-secondary rounded-full p-3 active:scale-105 duration-200 hover:cursor-pointer shadow-2xl"
            >
              <ArrowBigDownDash className="text-white" size={50} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
