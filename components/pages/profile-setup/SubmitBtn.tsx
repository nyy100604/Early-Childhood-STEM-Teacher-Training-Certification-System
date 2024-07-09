import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitBtn = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <Button className="">
          <LoaderCircle size={20} className="mr-2 animate-spin" />
          上傳中
        </Button>
      ) : (
        <Button>上傳資料</Button>
      )}
    </>
  );
};

export default SubmitBtn;
