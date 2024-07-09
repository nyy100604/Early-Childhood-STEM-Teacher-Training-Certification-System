"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import SignupBtn from "@/components/pages/Signup.tsx/SignupBtn";

import { kingdergardtenPosition } from "./kingdergartenPosition";
import { useRouter } from "next/navigation";

import { useState } from "react";

// icons
import { Ban } from "lucide-react";

const signupSchema = z
  .object({
    username: z.string().min(2, { message: "姓名最少輸入2個字" }).max(50),
    email: z.string().email({ message: "輸入正確的Email格式" }),
    password: z
      .string()
      .min(7, { message: "至少輸入7個字元" })
      .regex(/[A-Z]/, { message: "至少輸入一個大寫字母" }),
    confirmPassword: z
      .string({ required_error: "請再次輸入密碼" })
      .min(7, { message: "至少輸入7個字元" })
      .regex(/[A-Z]/, { message: "至少輸入一個大寫字母" }),
    kindergartenName: z.string({ required_error: "務必選擇您的位在的幼稚園" }),
    usertype: z.string({ required_error: "請選擇您的用戶角色" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "輸入密碼不匹配",
    path: ["confirmPassword"],
  });

export const Signupform = () => {
  const router = useRouter();
  const [pedding, setPedding] = useState(false);
  const { toast } = useToast();

  // 1.Define form
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      kindergartenName: undefined,
      usertype: undefined,
    },
  });

  //   2.Define a submit handler
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setPedding(true);
    // console.log(values);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const resData = await response.json();
      if (response.ok) {
        setPedding(false);
        console.log(resData.message);
        toast({
          variant: "default",
          title: "註冊成功",
          description: resData.message,
        });
        router.push("/login");
        // appear a toast message
      } else {
        setPedding(false);
        toast({
          variant: "default",
          title: "失敗",
          description: resData.message,
          action: <ToastAction altText="Try again">再 註 冊 一 次</ToastAction>,
        });
      }
    } catch (error) {
      setPedding(false);
      toast({
        variant: "default",
        title: "失敗",
        description: "註 冊 失 敗 !",
        action: <ToastAction altText="Try again">再 註 冊 一 次</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <div className="text-[#333333] text-[27px] font-bold text-center py-11 lg:text-[36px]">
        註冊
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-8 text-[19px] flex flex-col gap-y-6 pb-10"
      >
        {/* username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center">
                <FormLabel className="w-[140px] text-left">姓 名</FormLabel>
                <FormControl>
                  <Input placeholder="輸 入 姓 名" {...field} />
                </FormControl>
              </div>

              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center">
                <FormLabel className="w-[140px] text-left">
                  電 子 郵 件
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="kindergardten.stem@gmail.com"
                    {...field}
                  />
                </FormControl>{" "}
              </div>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center">
                {" "}
                <FormLabel className="w-[140px] text-left">密 碼</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="輸 入 密 碼" {...field} />
                </FormControl>
              </div>

              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center">
                {" "}
                <FormLabel className="w-[140px] text-left">
                  確 認 密 碼
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="輸 入 確 認 密 碼"
                    className="text-[19px]"
                    {...field}
                  />
                </FormControl>
              </div>

              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* select input */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          {" "}
          {/* kingdergarten position */}
          <FormField
            control={form.control}
            name="kindergartenName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center">
                  {" "}
                  <FormLabel className="w-[140px] text-left">
                    幼 稚 園
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選擇幼稚園" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {" "}
                        <SelectLabel>幼 稚 園 名 稱</SelectLabel>{" "}
                        {kingdergardtenPosition.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item.name}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* role name */}
          <FormField
            control={form.control}
            name="usertype"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center">
                  <FormLabel className="w-[140px] text-left">
                    角色名稱
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選擇用戶角色" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectGroup>
                      <SelectContent>
                        {" "}
                        <SelectLabel>角色</SelectLabel>{" "}
                        <SelectItem value="發證機構" key="1" disabled={true}>
                          <div className="flex items-center gap-x-2">
                            {" "}
                            <div> 發證機構</div>
                            <Ban size={20} className="text-red-600" />
                          </div>
                        </SelectItem>
                        <SelectItem value="教師" key="2">
                          老師
                        </SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>{" "}
        <SignupBtn pending={pedding} />
      </form>
    </Form>
  );
};
