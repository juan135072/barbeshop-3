import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types' // Assuming you will create this type file later

export const createClient = () => {
  const cookieStore = cookies()

  return createServerComponentClient<Database>( // Specify Database type
    {
      cookies: () => cookieStore, // Pass the cookie store correctly
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  )
}

// Note: This client is specifically for Server Components.
// For Server Actions or Route Handlers, you might need createServerActionClient
// or createRouteHandlerClient from '@supabase/auth-helpers-nextjs' 