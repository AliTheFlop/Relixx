import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
    const token = request.cookies.get("token")?.value;

    if (
        (!token && request.nextUrl.pathname.startsWith("/dashboard")) ||
        (!token && request.nextUrl.pathname.startsWith("/createblog"))
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token) {
        try {
            await jose.jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
        } catch (err) {
            const response = NextResponse.redirect(
                new URL("/login", request.url)
            );
            response.cookies.delete("token");
            return response;
        }
    }

    if (
        token &&
        (request.nextUrl.pathname.startsWith("/register") ||
            request.nextUrl.pathname.startsWith("/login"))
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}
