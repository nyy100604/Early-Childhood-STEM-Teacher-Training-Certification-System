"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import SelectKindergertenInput from "./SelectKindergertenInput";
import UploadIpfs from "./UploadIpfs";
import UploadBlockchain from "./UploadBlockchain";

const MenberTable = ({
  data,
  kingdergarten,
}: {
  data: any[];
  kingdergarten: string;
}) => {
  // certificate status (Array) from UploadBox
  // console.log("certificate status data", data);

  const [currentPage, setCurrentPage] = useState(1);

  // pagination ----------------------------------------------
  const pageSize = 5;
  const totalPages = Math.ceil(data.length / pageSize);
  const paginate = (array: any[], pageSize: number, pageNumber: number) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedData = paginate(data, pageSize, currentPage);

  //------------------------------------------------------------------------
  return (
    <>
      <div className="pb-10 lg:px-20">
        <SelectKindergertenInput kingdergarten={kingdergarten} />
      </div>

      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="min-w-[130px] pl-10">老師姓名</TableHead>
            <TableHead className="min-w-[200px]">電子信箱</TableHead>
            <TableHead className="min-w-[120px]">證書製造狀態</TableHead>
            <TableHead className="min-w-[120px]">區塊鏈狀態</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((info, index) => {
            return (
              <TableRow key={index}>
                {/* username */}
                <TableCell className="font-medium pl-10">
                  {info.teacher.username}
                </TableCell>

                {/* email */}
                <TableCell>{info.teacher.email}</TableCell>

                {/* certificate make status */}
                <TableCell>
                  <UploadIpfs info={info} />
                </TableCell>

                {/* blockchain status */}
                <TableCell>
                  <UploadBlockchain
                    verifyStatus={info.verifyStatus}
                    makeStatus={info.makeStatus}
                    certificate_id={info.certificate._id}
                    teacher_id={info.teacher._id}
                    token_id={info.certificate.certificateId}
                    certificateurl={info.certificateurl}
                    blockchainurl={info.blockchainurl}
                    recipient={info.teacher.address}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>{" "}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              {" "}
              <div className="w-full flex justify-between items-center px-[4rem]">
                <p>{`第${currentPage}頁，共${totalPages}頁`}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* pagination */}
      <Pagination className="py-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={cn(
                "bg-secondary text-white hover:cursor-pointer hover:bg-secondary-dark hover:text-white",
                currentPage === 1 &&
                  "bg-secondary/45 hover:bg-secondary/45 hover:cursor-no-drop"
              )}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={cn(
                "bg-secondary text-white hover:cursor-pointer hover:bg-secondary-dark hover:text-white",
                (currentPage === totalPages || totalPages < currentPage) &&
                  "bg-secondary/45 hover:bg-secondary/45 hover:cursor-no-drop"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MenberTable;
