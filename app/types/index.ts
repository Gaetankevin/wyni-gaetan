export type UserRole = "Gaetan" | "Wynonaa";

export interface User {
  role: UserRole;
  joinedAt: string;
}

export interface Message {
  id: string;
  sender: UserRole;
  content: string;
  timestamp: string;
  mediaItems: MediaItem[];
}

export interface MediaItem {
  id: string;
  type: "image" | "video" | "document";
  filename: string;
  path: string;
  size: number;
  uploadedAt: string;
}

export interface ConversationData {
  users: {
    gaetan: User | null;
    wynonaa: User | null;
  };
  messages: Message[];
}
