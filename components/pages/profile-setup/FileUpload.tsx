"use client";
import { Input } from "@/components/ui/input";
import { FilePlus, FileSearch2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

// components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const FileUpload = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const uploadFile = () => {
    fileRef.current?.click();
  };
  return (
    <div className="flex flex-col gap-y-6 pt-4 pb-2">
      <div className="flex gap-x-4 pl-[8rem]">
        <div
          className="flex gap-x-2 active:scale-95 bg-secondary text-white min-w-[130px] justify-center rounded-2xl py-3 px-4 font-bold hover:cursor-pointer duration-200 shadow-2xl"
          onClick={uploadFile}
        >
          <FilePlus /> 上傳教學資源
        </div>
        {fileUrl && (
          <Dialog>
            <DialogTrigger>
              <div className="flex gap-x-2 active:scale-95 bg-bg text-secondary min-w-[160px] justify-center rounded-2xl py-3 px-4 font-bold hover:cursor-pointer duration-200 shadow-2xl">
                <FileSearch2 /> 瀏覽上傳檔案
              </div>
            </DialogTrigger>

            <DialogContent>
              <iframe
                src={fileUrl}
                className="container w-full h-[70vh] rounded-2xl"
              ></iframe>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <p className="text-[#5F5D5D] text-[19px]  pl-[10rem]">
        請以Pdf檔格式上傳
      </p>

      <Input
        type="file"
        className="hidden"
        name="downloadableTeachingResources"
        onChange={handleChangeFile}
        ref={fileRef}
      />
    </div>
  );
};

export default FileUpload;
