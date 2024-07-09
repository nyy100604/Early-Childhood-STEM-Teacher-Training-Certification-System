"use client";

import { Button } from "@/components/ui/button";
import { useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WorkSliderBtn = ({}) => {
  const swiper = useSwiper();
  return (
    <div className="w-full absolute flex justify-between top-[calc(50%-44px)] z-30 px-0 lg:px-8">
      <Button
        onClick={() => swiper.slidePrev()}
        className="bg-slate-400/30 text-white"
      >
        <ChevronLeft size={40} />
      </Button>
      <Button
        onClick={() => swiper.slideNext()}
        className="bg-slate-400/30 text-white"
      >
        <ChevronRight size={40} />
      </Button>
    </div>
  );
};

export default WorkSliderBtn;
