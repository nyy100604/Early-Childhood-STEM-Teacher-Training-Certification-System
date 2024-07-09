"use client";
import React, { FormEvent } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// data
import { kingdergardtenPosition } from "../Signup.tsx/kingdergartenPosition";
import { Button } from "@/components/ui/button";

type SearchFormType = {
  getTeacherData: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const SearchForm: React.FC<SearchFormType> = ({ getTeacherData }) => {
  return (
    <form onSubmit={getTeacherData}>
      {" "}
      <div className="container text-[19px] px-12 pb-10">
        <Label className="text-white flex flex-col gap-y-3">
          幼稚園位置{" "}
          <Select name="position">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選擇老師的幼稚園位置" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>幼稚園位置</SelectLabel>
                {kingdergardtenPosition.map((position, index) => {
                  return (
                    <SelectItem value={position.name} key={index}>
                      {position.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>
      </div>
      <div className="container grid grid-cols-1 text-[19px] px-12 gap-y-8 lg:grid-cols-2 lg:gap-x-5 pb-[4rem]">
        <Label className="text-white flex flex-col gap-y-3">
          老師的電子信箱{" "}
          <Input
            placeholder="輸入老師的電子信箱"
            className="text-black"
            name="email"
          />
        </Label>
        <Label className="text-white flex flex-col gap-y-3">
          老師姓名
          <Input
            placeholder="輸入老師的姓名"
            className="text-black"
            name="username"
          />
        </Label>
      </div>
      <div className="pb-[8rem] text-center">
        <Button>快速搜尋</Button>
      </div>
    </form>
  );
};

export default SearchForm;
