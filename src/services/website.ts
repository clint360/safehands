import { supabase } from "@/utils";

export async function getWebSite() {
    try {
        const { data, error } = await supabase
          .from('website')
          .select()
          .eq('id', 'website')
          .limit(1)
          .single();
    
        if (error) {
          throw error;
        }
    
        return data;
      } catch (error) {
        console.error('Error retrieving item:');
        return null;
      }
}

export async function updateWebsite( updatedFields: Record<any, any>) {
    try {
      const { data, error } = await supabase
        .from('website')
        .update(updatedFields)
        .eq('id', 'website');
  
      if (error) {
        throw error;
      }
     
      return true;
    } catch (error) {
      console.error('Error updating report:');
      return null;
    }
  }