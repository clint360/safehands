import { supabase } from "@/utils";

export async function createNewReport(report: any) {
    const { error } = await supabase.from("reports").insert({
    whatHappened: report.whatHappened,
    derivedLocation: JSON.stringify(report.derivedLocation),
    isAnonymous: report.isAnonymous,
    actions: [],
    status: 'RECIEVED',
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
        return error
     }
     else return data
    }

export async function getReportsForUser(userId: string, fingerprint: string) {}
