"use client";
import { useAppSelector, useAppStore } from "@/Redux/hook";
import { initialShowBlackBg } from "@/Redux/features/showBlackbg/showBlackbgSlice";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const BlackBg = () => {
  // Initialize the store with the blackBg information

  const showblack = useAppSelector((state) => state.ShowBlackBgReducer.isShow);
  const initialized = useRef(false);
  const store = useAppStore();

  if (!initialized.current) {
    store.dispatch(initialShowBlackBg());
    initialized.current = true;
  }

  return (
    <>
      <div
        className={cn(
          "absolute opacity-0 bg-black/80 inset-0 bottom-0 z-40 duration-700 ease-in-out pointer-events-none",
          showblack ? "opacity-100" : ""
        )}
      ></div>
    </>
  );
};

export default BlackBg;
