"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
// icon
import { Check, Upload, LoaderCircle } from "lucide-react";

const UploadIpfs = ({ info }: { info: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // upload ipfs
  const handleUploadIpfs = async (
    username: string,
    certificatename: string,
    certificateid: string,
    teacherid: string
  ) => {
    setLoading(true);
    try {
      const result = await fetch("/api/uploadIpfs", {
        method: "POST",
        body: JSON.stringify({
          username,
          certificatename,
          certificateid,
          teacherid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        setLoading(false);
        const resData = await result.json();
        console.log(
          `https://yellow-secondary-blackbird-515.mypinata.cloud/ipfs/${resData.IpfsHash}`
        );

        router.refresh();
      } else {
        setLoading(false);
        toast({
          title: "失敗",
          description: "上傳失敗，請重新上傳",
        });
      }
    } catch (e) {
      setLoading(false);
      toast({
        title: "失敗",
        description: "系統發生錯誤，請重新上傳",
      });
      console.log(e);
    }
  };

  return (
    <>
      {info.makeStatus ? (
        <Link href={info?.certificateurl}>
          {" "}
          <span className="flex gap-x-3 cursor-pointer">
            {" "}
            <Check size={20} className="text-green-600" />
            查看證書
          </span>
        </Link>
      ) : (
        <span
          className="flex gap-x-2 cursor-pointer"
          onClick={() =>
            handleUploadIpfs(
              info.teacher.username,
              info.certificate.certicatename,
              info.certificate._id,
              info.teacher._id
            )
          }
        >
          {loading ? (
            <div className="flex items-center gap-x-3">
              <LoaderCircle className="text-gray-500 animate-spin" size={20} />
              上傳中
            </div>
          ) : (
            <div className="flex items-center gap-x-3">
              <Upload className="text-gray-500 " size={20} />
              未上傳
            </div>
          )}
        </span>
      )}
    </>
  );
};

export default UploadIpfs;
