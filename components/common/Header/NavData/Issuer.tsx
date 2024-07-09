export const headingData = {
  manage: { title: "證書管理", href: "/certificate-manage" },
  create: { title: "證書創建", href: "/certificate-create" },
  upload: { title: "證書上傳", href: "/certificate-upload" },
  //   UserGuide: { title: "系統指引", icon: <Milestone /> },
  //   ContactUs: { title: "聯絡我們", icon: <Contact /> },
};

export const manage: {
  description: { title: string; content: string }[];
} = {
  description: [
    { title: "查看證書", content: "查看所有頒發的證書" },
    { title: "更新證書", content: "編輯證書資訊" },
  ],
};

export const create: {
  description: { title: string; content: string }[];
} = {
  description: [
    { title: "新建證書", content: "創建新的證書與模板" },
    {
      title: "填寫基本證書資訊",
      content: "輸入證書名稱、證書目的與評估標準等",
    },
    { title: "課程介紹", content: "填寫課程內容和教學方法" },
  ],
};

export const upload: {
  description: { title: string; content: string }[];
} = {
  description: [
    {
      title: "預覽和確認",
      content: "預覽證書與老師姓名是否匹配，確認後上傳區塊鏈",
    },
  ],
};
