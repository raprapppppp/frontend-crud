import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest){

const protectedRoutes = ['/dashboard']

 // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if(isProtectedRoute){
    const sessionCookie = request.cookies.get('token')
    if(!sessionCookie){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/dashboard/:path'], // Match protected routes
};
