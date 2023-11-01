export interface Notification {
    id?: string
    title: string,
    message: string,
    toUserId: string,
    seen?: boolean
}