"use client";
import { FilePlus } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

const PdfUpload = ({
  title,
  desc,
  name,
  error,
}: {
  title: string;
  desc: string;
  name: string;
  error?: any;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [pdf, setPdf] = useState<string | null>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setPdf(url);
      console.log(url);
    }
  };

  const handleupload = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div className="flex flex-row items-center gap-x-20 lg:justify-center">
        <div
          className="relative w-[300px] h-[300px] flex flex-col items-center justify-center rounded-2xl gap-y-2 text-2xl border-2 border-dashed active:scale-90 duration-200 cursor-pointer"
          onClick={handleupload}
        >
          上傳 <FilePlus size={35} />
          <input
            ref={fileRef}
            type="file"
            name={name}
            id={name}
            className="hidden"
            onChange={handleChangeImage}
          />
          {pdf && (
            <iframe src={pdf} className="absolute w-full h-full rounded-2xl" />
          )}
        </div>
        <div className="max-w-[500px] flex flex-col justify-start gap-y-8">
          <h1 className="w-full  text-[27px] py-4 text-start lg:text-[36px]">
            {title}
          </h1>
          <div
            className="w-full h-[70px] overflow-scroll bg-black/10 rounded-xl p-4 px-8
                             lg:h-[100px]"
          >
            <p className="text-[#5F5D5D] text-[19px] ">{desc}</p>
          </div>{" "}
          {error &&
            error?.pattern &&
            error.pattern.map((error: any, index: number) => (
              <p key={index} className="text-red-600">
                {error}
              </p>
            ))}
          <div
            className="w-max bg-secondary px-4 py-2 text-white font-medium rounded-3xl cursor-pointer"
            onClick={() => setPdf(null)}
          >
            重 置 模 板
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfUpload;
