"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CircleCheckBig, CircleX } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center">
              {/* {title && <ToastTitle>{title}</ToastTitle>} */}
              {title === "註冊成功" && (
                <CircleCheckBig className="text-green-600 font-bold mr-4" />
              )}
              {title === "成功" && (
                <CircleCheckBig className="text-green-600 font-bold mr-4" />
              )}

              {title === "失敗" && (
                <CircleX className="text-rose-600 font-bold mr-4" />
              )}
              {description && (
                <ToastDescription className="text-xl font-medium">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
