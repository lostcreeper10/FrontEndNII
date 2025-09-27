import { NextResponse } from "next/server";

export function middleware(request){
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/home", "/change-password", "/manage-profile", "/on-boarding", "/about", "/contact", "/logout"];
  const authRoutes = ["/login", "register", "/forgot-password"];

  if(!token && protectedRoutes.includes(pathname)){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(token && authRoutes.includes(pathname)){
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/home", "/about", "/login", "/register", "/change-password", "/forgot-password", "/profile", "/user-onboarding", "/contact", "/logout" ]
}