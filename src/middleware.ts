import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  const isPublicPath = ["/auth/login", "/auth/register"].includes(pathname);

  // Redirect user yang sudah login dari halaman publik ke dashboard sesuai role
  if (token && (isPublicPath || pathname === "/")) {
    const role = token.user?.role;
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (role === "santri") {
      return NextResponse.redirect(new URL("/santri/dashboard", request.url));
    }
  }

  // Jika user belum login dan mencoba akses halaman selain public, redirect ke login
  if (!token && !isPublicPath) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Jika user login sebagai admin dan mengakses /admin
  if (pathname.startsWith("/admin")) {
    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Jika user login sebagai santri dan mengakses /santri
  if (pathname.startsWith("/santri")) {
    if (token?.user?.role !== "santri") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname === "/santri") {
      return NextResponse.redirect(new URL("/santri/dashboard", request.url));
    }
  }

  return NextResponse.next(); // lanjutkan request jika tidak ada kondisi redirect
}

export const config = {
  matcher: ["/", "/auth/:path*", "/admin/:path*", "/santri/:path*"],
};
