"use client";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import { CircleArrowRight } from "lucide-react";

import { ChangeEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

// components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loginbtn from "./Loginbtn";
import MetamaskLoginBtn from "./MetamaskLoginBtn";
import { useToast } from "@/components/ui/use-toast";

const Loginform = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const checkInputFormat = (email: string, password: string): boolean => {
    const checkInput = z.object({
      email: z.string().email({ message: "請輸入正確的電子郵件" }),
      password: z
        .string()
        .min(7, { message: "至少輸入7個字元" })
        .regex(/[A-Z]/, { message: "至少輸入一個大寫字母" }),
    });
    const validateField = checkInput.safeParse({
      email,
      password,
    });
    console.log(validateField.error?.flatten().fieldErrors);
    if (validateField.error?.flatten().fieldErrors) {
      setPending(false);
      setError(validateField.error?.flatten().fieldErrors);
      return false;
    }
    return true;
  };

  const handleSignin = async () => {
    try {
      setPending(true);
      console.log(pending);
      const validate = checkInputFormat(email, password);
      console.log("validate", validate);

      if (validate) {
        await signIn("Email", { email, password });
      }
      return;
    } catch (e) {
      setPending(false);
      toast({
        variant: "default",
        title: "失敗",
        description: "請重新輸入帳號或密碼",
      });
    }
  };

  return (
    <section className="relative flex flex-col gap-y-12 rounded-3xl bg-white/85 z-10 lg:bg-transparent">
      <div className="flex items-center gap-x-3 justify-center pt-12">
        <div className="relative w-[100px] h-[100px]">
          <Link href="/">
            <Image
              src="/logo/Logo.png"
              alt="logo"
              fill
              priority
              quality={100}
            />
          </Link>
        </div>
        <h1 className="text-left text-[19px]">
          <span>幼兒STEM教育</span>
          <span className="block">師資培育查詢系統</span>
        </h1>
      </div>{" "}
      <div className="px-10 pb-4">
        {" "}
        <div className="flex flex-col gap-y-6 text-[19px]">
          <div className="space-y-4">
            {" "}
            <Label htmlFor="Email">電子郵件</Label>
            <Input
              id="Email"
              type="text"
              placeholder="輸入您的電子郵件"
              onChange={handleChangeEmail}
            />
            <div>
              {error &&
                error?.email?.map((msg: string, index: number) => {
                  return (
                    <p className="text-red-600 pl-3" key={index}>
                      {msg}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="space-y-4">
            {" "}
            <Label htmlFor="Password">密碼</Label>
            <Input
              id="Password"
              type="password"
              placeholder="輸入您的密碼"
              onChange={handleChangePassword}
            />
            <div>
              {error &&
                error?.password?.map((msg: string, index: number) => {
                  return (
                    <p className="text-red-600 pl-3" key={index}>
                      {msg}
                    </p>
                  );
                })}
            </div>
          </div>
          <Loginbtn handleSignin={handleSignin} pending={pending} />
        </div>
        <MetamaskLoginBtn />
        <div className="py-2">
          {" "}
          <Link
            href="/signup"
            className="hover:underline text-gray-500 font-semibold flex items-center justify-center gap-x-1"
          >
            前往註冊
            <CircleArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Loginform;
