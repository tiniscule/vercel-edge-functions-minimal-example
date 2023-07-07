// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { RequestCookies } from "@edge-runtime/cookies"
import { NextResponse } from 'next/server'

export const runtime = 'edge';

export async function GET(req: Request) {
  // Create a Supabase client configured to use cookies
  // NOTE: Temp workaround until supabase support edge function cookies natively
  // we have to pass in a function that returns the cookie object as that's what's expected
  const cookies = new RequestCookies(req.headers) as any;
  const supabase = createRouteHandlerClient({ cookies: () => cookies });

  const {data: {session}, error} = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ message: error || 'User logged in inside edge function'});
}
