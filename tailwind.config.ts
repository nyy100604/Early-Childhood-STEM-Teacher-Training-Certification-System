const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFD983",
        },
        secondary: {
          DEFAULT: "#7165ff",
          dark: "#4232aa",
        },
        bg: {
          DEFAULT: "#FCFCFC",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    backgroundImage: {
      homefunction: "url(/home/functionbg.png)",
      signupdesktop: "url(/signup/signupdesktop.png)",
      signupmobile: "url(/signup/signupmobile.png)",
      logindesktop: "url(/login/logindesktop.png)",
      loginmobile: "url(/login/loginmobile.png)",
      manage: "url(/manage/browsercertificate.png)",
      uploadselect: "url(/upload/select.png)",
      lookupDesktop: "url(/lookup/lookupDesktop.png)",
      lookupMobile: "url(/lookup/lookupMobile.png)",
      verifidCertificate: "url(/profile-manage/verifiedCertificate.png)",
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
