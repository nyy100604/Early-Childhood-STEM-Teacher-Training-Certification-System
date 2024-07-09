"use client";
import { useEffect, useState } from "react";

import CountUp from "react-countup";

import { Progress } from "@/components/ui/progress";

export function ProgressAnimate({ percent }: { percent: number }) {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percent), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-end gap-4">
      <Progress value={progress} className="w-[100%]" />
      <p className="font-bold text-2xl">
        <CountUp start={0} end={progress} />%
      </p>
    </div>
  );
}
