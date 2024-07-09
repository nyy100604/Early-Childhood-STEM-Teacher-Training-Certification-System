import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SubmitbtnType = {
  pending: boolean;
};

const Submitbtn: React.FC<SubmitbtnType> = ({ pending }) => {
  return (
    <Button type="submit" className="mt-8">
      {pending ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />上 傳 中
        </div>
      ) : (
        <div className="flex items-center">建 立 證 書</div>
      )}
    </Button>
  );
};

export default Submitbtn;
