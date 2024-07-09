import { Button } from "@/components/ui/button";
import React from "react";
import { useSwiper } from "swiper/react";

import { ChevronRight, ChevronLeft } from "lucide-react";

const SlideBtn = () => {
  const swiper = useSwiper();
  return (
    <div className="flex w-full justify-end">
      <Button onClick={() => swiper.slidePrev()}>
        <ChevronLeft />
      </Button>
      <Button onClick={() => swiper.slideNext()}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default SlideBtn;
