import { Notification } from "@/domains/Notification";
import { supabase } from "@/utils";
import { getAdminUsers } from "./users";

export async function createNotification(notification: Notification) {
    const { error } = await supabase.from("notifications").insert({
    title: notification.title,
    message: notification.message,
    toUserId: notification.toUserId,
    seen: false
});
if (error) { 
    console.log(error);
}
    else return true
}

export async function updateNotificationById(id: string, updatedFields: Record<any, any>) {
    try {
      const { data, error } = await supabase
        .from('notifications')
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

  export async function getUnseenNotificationsCount(toUserId: string) {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('toUserId', toUserId)
        .eq('seen', false);
        
      if (error) {
        console.log(error);
        return 0;
      }
      
      return count;
    } catch (error) {
      console.error('Error fetching unseen notification count:');
      return 0;
    }
  }

  export async function getNotificationsForUser( userId: string | undefined): Promise<any[] | null> {
    let query = supabase.from('notifications').select('*')
  if (userId) {
    query = query.eq('toUserId', userId)
  }
  const { data, error } = await query
  if (error) {
    console.log(error)
    return []
  }
  return data
  }


  export async function newReportNotification(reportId?: string) {
     const admins = await getAdminUsers()

     admins && admins.forEach((admin)=>{
        createNotification({
            title: 'New Report',
            toUserId: admin.id,
            message: 'Hello, you have recieved a new report'
        })
     })
  }

  export async function reportStatusUpdateNotification(userId: string, reportId?: string) {
       createNotification({
           title: 'New Report',
           toUserId: userId,
           message: 'Hello, you have recieved a new Status update on one of your reports'
       })
 }

  export async function updateNotificationsToSeen(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ seen: true })
        .eq('toUserId', userId);
        
      if (error) {
        console.error('Error updating notifications:', error.message);
        return;
      }
      
      console.log('Notifications updated successfully:', data);
    } catch (error) {
      console.error('Error updating notifications:');
    }
  }