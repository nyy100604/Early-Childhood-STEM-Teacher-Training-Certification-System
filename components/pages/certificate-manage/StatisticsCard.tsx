"use client";
import CountUp from "react-countup";

const StatisticsCard = ({
  title,
  num,
  unit,
}: {
  title: string;
  num: number;
  unit: string;
}) => {
  return (
    <div className="border-2 text-black rounded-2xl shadow-xl p-8">
      <h1 className="text-[19px] lg:text-[25px]">{title}</h1>
      <p className="flex gap-x-3 items-end justify-center">
        <span className="font-black flex items-end text-7xl">
          {num < 10 ? (
            <span>
              0<CountUp start={0} end={num} />
            </span>
          ) : (
            <CountUp start={0} end={num} />
          )}
        </span>
        <span className="text-xl font-medium">{unit}</span>
      </p>
    </div>
  );
};

export default StatisticsCard;
