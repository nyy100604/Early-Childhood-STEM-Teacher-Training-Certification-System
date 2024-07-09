import { auth } from "./auth";
import { NextResponse } from "next/server";

const routes = [
  //common
  "/",
  "/login",
  "/signup",
  "/404",
  "/unAuthorized",
  "/certificate-lookup",
  //teacher
  "/profile-setup",
  "/profile-manage",
  // issuer
  "/certificate-create",
  "/certificate-manage",
];

const dynamicRoutePrefixes = ["/certificate-upload/"];

const isRouteExist = (pathname: string) => {
  // console.log("pathname", pathname);
  // Check if the pathname exactly matches any static route
  if (routes.includes(pathname)) {
    // console.log("included routes");

    return true;
  }

  if (pathname === "/certificate-upload") {
    return false;
  }

  // Check if the pathname starts with any of the dynamic route prefixes
  for (const prefix of dynamicRoutePrefixes) {
    if (pathname.startsWith(prefix)) {
      return true;
    }
  }

  return false;
};

export default auth((req) => {
  const user = req.auth?.user as {
    email: string;
    id: string;
    role: string;
    username: string;
    kingdergarten: string;
    address: string;
  };

  // console.log("user", user);

  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;

  const loginurl = new URL("/login", req.url);
  const certificatemanageurl = new URL("/certificate-manage", req.url);
  const profilemanage = new URL("/profile-manage", req.url);
  const unAuthorized = new URL("/unAuthorized", req.url);
  const notFoundurl = new URL("/404", req.url);

  if (!isRouteExist(pathname)) {
    console.log("!isRouteExist", !isRouteExist(pathname));

    return NextResponse.redirect(notFoundurl);
  }

  // If the user is not logged in and tries to access protected routes, redirect to login
  if (
    !isLoggedIn &&
    (pathname.startsWith("/certificate-manage") ||
      pathname.startsWith("/certificate-upload") ||
      pathname.startsWith("/certificate-create") ||
      pathname.startsWith("/profile-manage") ||
      pathname.startsWith("/profile-setup"))
  ) {
    return NextResponse.redirect(loginurl);
  }

  // If the user is logged in and tries to access the login page, redirect to manage page
  if (isLoggedIn && pathname === "/login") {
    console.log(
      `User logged in as ${user.role}, redirecting to respective manage page`
    );
    if (user.role === "發證者") {
      return NextResponse.redirect(certificatemanageurl);
    }
    if (user.role === "教師") {
      return NextResponse.redirect(profilemanage);
    }
  }
  //common

  if (
    isLoggedIn &&
    (pathname.startsWith("/profile-setup") ||
      pathname.startsWith("/profile-manage")) &&
    user.role !== "教師"
  ) {
    return NextResponse.redirect(unAuthorized);
  }

  if (
    isLoggedIn &&
    (pathname.startsWith("/certificate-create") ||
      pathname.startsWith("/certificate-manage") ||
      pathname.startsWith("/certificate-upload/select") ||
      pathname.startsWith("/certificate-upload/[...certificate]")) &&
    user.role !== "發證者"
  ) {
    return NextResponse.redirect(unAuthorized);
  }

  // Allow the request to proceed as usual
  return NextResponse.next();
});

export const config = {
  runtime: "experimental-edge", // 使用 experimental-edge runtime
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/login"],
  unstable_allowDynamic: [
    "/mongoDb/schema/certificateSchema.ts",
    "/mongoDb/schema/certificateStatusSchema.ts",
    "/mongoDb/schema/teachingInfo.ts",
    "/mongoDb/schema/userSchema.ts",
    "/mongoDb/connect/index.ts",
    "/node_modules/mongoose/**",
    "/auth.ts",
    "/lib/actions/getTeacherAllData.ts",
    "/lib/actions/saveCertificate.ts",
    "/lib/data.ts",
    "/app/api/createcertificate/route.ts",
    "/app/api/createcertificate/route.ts",
    "/app/api/signup/route.ts",
    "/app/api/uploadIpfs/route.ts",
    "/app/api/uploadteachingInfo/route.ts",
  ],
};
