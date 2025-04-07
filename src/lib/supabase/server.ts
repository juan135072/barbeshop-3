import { createServerClient } from '@supabase/ssr' // Removed unused CookieOptions import
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'

// Function specifically for creating a client in Server Components
export const createClient = () => {
  const cookieStore = cookies()

  // Create a Supabase client configured to use cookies
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // @ts-expect-error: Vercel build environment wrongly infers Promise type for cookieStore
          // Trusting runtime behavior of cookieStore.get
          return cookieStore.get(name)?.value;
        },
        // Note: Setting cookies from Server Components is not directly supported.
        // Use Server Actions or Route Handlers for operations that modify cookies.
        // Therefore, 'set' and 'remove' are omitted here.
      },
    }
  )
}

// You might want separate functions for Server Actions and Route Handlers later,
// using the same createServerClient but potentially needing set/remove handlers.
