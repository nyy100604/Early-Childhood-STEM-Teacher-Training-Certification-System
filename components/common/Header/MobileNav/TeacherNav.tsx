import React from "react";

import { Item } from "./LoginBeforeNav";

const TeacherNav = () => {
  return (
    <div className="flex flex-col gap-y-10 font-bold text-xl text-slate-600 pl-[5.5rem] pt-[5rem]">
      <Item title="證書查詢" href="/certificate-lookup" />
      <Item title="個人資料" href="/profile-manage" />
      <Item title="教師資料填寫" href="/profile-setup" />
    </div>
  );
};

export default TeacherNav;
