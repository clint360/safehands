import { supabase } from "@/utils"

export async function createProfile(profile: any) {
    const { error } = await supabase.from("profiles").insert({
    id: profile.id,
    isAdmin: profile.isAdmin,
    email: profile.email
});
if (error) { 
    console.log(error);
}
    else return true
}

export async function getAdminUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('isAdmin', true)
    if (error) {
      console.log(error)
      return []
    }
    return data
  }
