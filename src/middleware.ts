import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(request.method, request.url)
}



export const config = {
  matcher: ['/:path*'],
}