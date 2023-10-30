import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
const supabase = createClientComponentClient();

export async function signIn(formData: any) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { status: 401, value: error };
    } else {
        return {}
    }
  }

export async function signUp(formData: any) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: '/app/reports'
      }
    });

    if (error) {
      return { status: 401, value: error };
    } else {
      return  { status: 200, value: 'Success! Please check your email for further instructions.'};
    }
  }