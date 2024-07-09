"use client";

import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const ErrorMessage = ({ errorMsg }: { errorMsg: string }) => {
  const { toast } = useToast();
  const [error, setError] = useState("");

  useEffect(() => {
    if (errorMsg) {
      setError(errorMsg);
    }
  }, []);

  useEffect(() => {
    if (errorMsg) {
      toast({
        variant: "default",
        title: "失敗",
        description: errorMsg,
        action: <ToastAction altText="Try again">再登入一次</ToastAction>,
      });
    }
  }, [error]);
  return <div className="hidden">{errorMsg}</div>;
};

// useEffect(() => {
//   console.log("error");
//   console.log(params);

//   const loginError = params.get("code");
//   console.log(loginError);

//   if (loginError) {
//     toast({
//       variant: "default",
//       title: "失敗",
//       description: loginError,
//       action: <ToastAction altText="Try again">再登入一次</ToastAction>,
//     });
//   }
// }, [error]);
export default ErrorMessage;
