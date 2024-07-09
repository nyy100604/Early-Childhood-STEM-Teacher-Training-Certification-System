"use client";
//components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// all kingdergardten position
import { kingdergardtenPosition } from "../Signup.tsx/kingdergartenPosition";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SelectKindergertenInput = ({
  kingdergarten,
}: {
  kingdergarten: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  // Rendering the entire page (/certificate-upload/[certificate])
  // after selecting a specific kindergarten and setting the URL parameters.
  const handleChangeSelect = (value: string) => {
    if (value) {
      params.set("kingdergarten", value);
    } else {
      params.delete("kingdergarten");
    }
    // console.log("newUrl", `${pathname}?${params.toString()}`);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full  lg:px-[6rem]">
      <Select onValueChange={handleChangeSelect} value={kingdergarten}>
        <SelectTrigger className="max-w-[350px] mx-auto lg:mr-auto lg:ml-0">
          <SelectValue placeholder="選擇幼稚園" />
        </SelectTrigger>
        <SelectContent>
          {kingdergardtenPosition.map((position, index) => {
            return (
              <SelectItem key={index} value={position.name}>
                {position.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectKindergertenInput;
