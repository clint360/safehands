import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Auth from "@/components/templates/auth/Auth";
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function () {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/app/reports');
  }

  return <Auth action="LOGIN" />;
}
