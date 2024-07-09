"use client";
import { Signupform } from "@/components/pages/Signup.tsx/Signupform";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/varients";

const Signup = () => {
  return (
    <section className="absolute top-0 bg-signupmobile sm:bg-signupdesktop bg-cover w-full min-h-[100vh] lg:bg-center">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        className="container mx-auto lg:max-w-[600px]"
      >
        <div className="bg-white/85 rounded-xl border-2 border-[#CCCCCC] my-[10rem] lg:my-[7rem]">
          <Signupform />
        </div>
      </motion.div>

      {/* return homepage btn */}
      <div className="absolute top-12 left-8 lg:top-16 lg:left-14">
        {" "}
        <HoverCard openDelay={100}>
          <HoverCardTrigger href="/">
            <ArrowLeft
              className=" text-white p-2 rounded-full bg-[#B3E5FC] border-4 border-[#90CAF9] drop-shadow-md active:scale-90 duration-200"
              size={70}
            />
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="bg-black/45 text-white text-[19px] font-medium lg:text-[25px] rounded-full border-0 px-9"
          >
            回首頁
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  );
};

export default Signup;
