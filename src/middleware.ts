import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/dashboard"]

export default function middleware(request: NextRequest) {
	// Check if the current path is a protected route
	const isProtectedRoute = protectedRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	)

	if (isProtectedRoute) {
		const sessionCookie = request.cookies.get("token")
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/login", request.url))
		}
		return NextResponse.next()
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|.*\\.png$).*)",
		"/dashboard/:path",
	], // Match protected routes
}
