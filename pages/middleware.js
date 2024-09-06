import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const subdomain = host?.split('.')[0];  // Extract the first part of the host as subdomain
  
  // Check if the subdomain is 'wren'
  if (subdomain === 'wren') {
    // Rewrite to /wedding if the subdomain is 'wren'
    return NextResponse.rewrite(new URL('/wedding', request.url));
  }
}