import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Createtextarea = ({
  title,
  name,
  placehoder,
  desc,
}: {
  title: string;
  name: string;
  placehoder: string;
  desc: string;
}) => {
  return (
    <div className="max-w-[850px] mx-auto w-full flex flex-col gap-y-2">
      <Label className="text-[27px]" htmlFor={name}>
        {title}
      </Label>
      <Textarea
        name={name}
        id={name}
        placeholder={placehoder}
        className="text-[19px] rounded-3xl"
      />
      <p className="text-[#5F5D5D] text-[19px] pl-8">{desc}</p>
    </div>
  );
};

export default Createtextarea;
