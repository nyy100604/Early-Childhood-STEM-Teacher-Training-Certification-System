export const headingData = {
  certificateLookup: { title: "證書查詢", href: "/certificate-lookup" },
  ProfileManage: { title: "個人資料", href: "/profile-manage" },
  profileSetup: {
    title: "教師資料填寫",
    href: "/profile-setup",
  },
  //   UserGuide: { title: "系統指引", icon: <Milestone /> },
  //   ContactUs: { title: "聯絡我們", icon: <Contact /> },
};

export const profileData: {
  description: { title: string; content: string }[];
} = {
  description: [
    {
      title: "查看老師的基本個人資訊",
      content: "姓名、聯絡方式與教學經驗",
    },
    {
      title: "查看已驗證的證書列表",
      content: "頁面中呈現已受區塊鏈驗證之證書",
    },
  ],
};

export const profileSetup: {
  description: { title: string; content: string }[];
} = {
  description: [
    {
      title: "教學經驗",
      content: "填寫教學經驗，包括教授的課程、年齡段和學校，教學成果和榮譽",
    },
    {
      title: "專業技能",
      content: "填寫專業技能，列出與幼兒STEM教育相關的技能和資格",
    },
    {
      title: "教學理念",
      content: "填寫教學理念，描述教學方法和實踐案例",
    },
    {
      title: "聯繫方式",
      content: "填寫聯絡方式，設置聯絡偏好和時間",
    },
    {
      title: "上傳可供下載的教學資源",
      content: "上傳和管理教學資源，供家長和其他教師下載使用",
    },
  ],
};
