import React from "react";
import { Item } from "./LoginBeforeNav";

const IssureNav = () => {
  return (
    <div className="flex flex-col gap-y-10 font-bold text-xl text-slate-600 pl-[5.5rem] pt-[4rem]">
      <Item title="證書查詢" href="/certificate-lookup" />
      <Item title="證書管理" href="/certificate-manage" />
      <Item title="證書創建" href="/certificate-create" />
      <Item title="證書上傳" href="/certificate-upload/select" />
    </div>
  );
};

export default IssureNav;
