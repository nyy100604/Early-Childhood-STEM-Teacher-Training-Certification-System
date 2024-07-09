import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { memo } from "react";

const SignupBtn = memo(({ pending }: { pending: boolean }) => {
  return (
    <Button type="submit" className="text-[19px]">
      {pending ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 註 冊 中
        </div>
      ) : (
        <div className="flex items-center">註 冊</div>
      )}
    </Button>
  );
});

export default SignupBtn;
