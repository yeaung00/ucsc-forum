import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname
  const isNotLoginPage = !pathname.startsWith('/api/auth')
  const token = await getToken({ req })
  
  console.log('url: ', req.nextUrl.pathname)
  if (isNotLoginPage && !token) {
    const url = new URL(`/api/auth/signin`, req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next()
}