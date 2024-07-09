import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BtnHoverCard = ({
  go,
  btnStyles,
  btnContent,
  hintContent,
  imgHref,
}: {
  go: string;
  btnStyles: string;
  btnContent: string;
  hintContent: string;
  imgHref: string;
}) => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger href={go}>
        <div className={`${btnStyles}`}>{btnContent}</div>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          "rounded-2xl border-2 border-[#4D4444] bg-white/80 flex gap-x-4",
          btnContent === "立即註冊" ? "w-[340px]" : "w-[370px]"
        )}
        align="start"
      >
        <div className="text-[17px]">{hintContent}</div>
        <Image
          src={`${imgHref}`}
          width={60}
          height={60}
          alt="signupHint"
          priority
          quality={100}
        />
      </HoverCardContent>
    </HoverCard>
  );
};

export default BtnHoverCard;
