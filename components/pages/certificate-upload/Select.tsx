import React from "react";
import SelectBox from "./SelectBox";
import { getAllCertificationInformation } from "@/lib/data";

const Select = async () => {
  const alldata = await getAllCertificationInformation();

  return (
    <main className="mt-[100px] pt-[80px] pb-12 bg-uploadselect bg-cover bg-center container  mx-auto w-full">
      <SelectBox alldata={alldata} />
    </main>
  );
};

export default Select;
