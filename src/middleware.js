import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;

    if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && request.nextUrl.pathname.startsWith("/register")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (token && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/register", "/dashboard/:path*", "/login"],
};
