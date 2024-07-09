"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

const SlideBtn = () => {
  const swiper = useSwiper();
  return (
    <div className="my-10 text-center lg:text-end lg:pr-28">
      <Button onClick={() => swiper.slidePrev()}>
        <ChevronLeft />
      </Button>
      <Button>
        <ChevronRight onClick={() => swiper.slideNext()} />
      </Button>
    </div>
  );
};

export default SlideBtn;
