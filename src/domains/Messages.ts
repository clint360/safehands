export interface Message {
    id?: string;
    fromUserId: string;
    toUserId: string;
    content: string;
    createdAt: string;
    seen: boolean;
  }