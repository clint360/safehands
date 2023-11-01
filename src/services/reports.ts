import { supabase } from "@/utils";

export async function createNewReport(report: any) {
    const { error } = await supabase.from("reports").insert({
    whatHappened: report.whatHappened,
    derivedLocation: JSON.stringify(report.derivedLocation),
    isAnonymous: report.isAnonymous,
    actions: [],
    status: 'RECEIVED',
    abuseCategory: report.abuseCategory,
    fingerprint: report.fingerprint,
    location: report.location,
    firstName: report.firstName || null,
    lastName: report.lastName || null,
    phoneNumber: report.phoneNumber || null,
    email: report.email || null,
    userId: report.userId || null
  });
 if (error) { 
    console.log(error);
    return error
 }
 else return true
}

export async function getAllReports() {
    const { data, error } = await supabase
    .from('reports')
    .select()

    if (error) { 
        console.log(error);
        return []
     }
     else return data
    }

export async function getReportsForUser(fingerprint: string | undefined, userId: string | undefined): Promise<any[] | null> {
    let query = supabase.from('reports').select('*')
  if (fingerprint) {
    query = query.eq('fingerprint', fingerprint)
  }
  if (userId) {
    query = query.eq('userId', userId)
  }
  const { data, error } = await query
  if (error) {
    console.log(error)
    return []
  }
  return data
  }

export async function getReportById(reportId: string) {
    try {
        const { data, error } = await supabase
          .from('reports')
          .select()
          .eq('id', reportId)
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

export async function updateReportById(id: string, updatedFields: Record<any, any>) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .update(updatedFields)
        .eq('id', id);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error updating report:');
      return null;
    }
  }

  export async function getUnseenReports() {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select()
        .eq('seen', false);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching unseen reports:');
      return null;
    }
  }

  export async function countAllReports() {
    const { count, error } = await supabase.from('reports').select('*', { count: 'exact' })
    if (error) {
      console.log(error)
      return 0
    }
    return count
  }

  export async function countReviewedReports() {
    const { count, error } = await supabase
      .from('reports')
      .select('*', { count: 'exact' })
      .eq('status', 'REVIEWED')
    if (error) {
      console.log(error)
      return 0
    }
    return count
  }

  export async function countReceivedReports() {
    const { count, error } = await supabase
      .from('reports')
      .select('*', { count: 'exact' })
      .eq('status', 'RECEIVED')
    if (error) {
      console.log(error)
      return 0
    }
    return count
  }

  export async function countRejectedReports() {
    const { count, error } = await supabase
      .from('reports')
      .select('*', { count: 'exact' })
      .eq('status', 'REJECTED')
    if (error) {
      console.log(error)
      return 0
    }
    return count
  }

  export async function getReportCountsByCategory(category: string) {
    const { count, error } = await supabase
      .from('reports')
      .select('*', { count: 'exact' })
      .eq('abuseCategory', category)
    if (error) {
      console.log(error)
      return 0
    }
    return count
  }