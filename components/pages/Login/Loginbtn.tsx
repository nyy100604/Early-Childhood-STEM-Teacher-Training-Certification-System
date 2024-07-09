"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoginbtnProps = {
  pending: boolean;
  handleSignin: () => void;
};

const Loginbtn: React.FC<LoginbtnProps> = ({ pending, handleSignin }) => {
  return (
    <Button type="submit" className="mt-8" onClick={handleSignin}>
      {pending ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 登 入 中
        </div>
      ) : (
        <div className="flex items-center">登 入</div>
      )}
    </Button>
  );
};

export default Loginbtn;
