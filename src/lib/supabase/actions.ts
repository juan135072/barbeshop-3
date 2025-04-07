import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'

// Function specifically for creating a client in Server Actions
export const createActionClient = () => {
  const cookieStore = cookies()

  // Create a Supabase client configured to use cookies, including set/remove for actions
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // @ts-expect-error: Vercel build environment wrongly infers Promise type for cookieStore
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // @ts-expect-error: Next.js Server Actions allow setting cookies directly
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // @ts-expect-error: Next.js Server Actions allow setting cookies directly
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  )
}
