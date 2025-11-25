"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Message, User, UserRole, ConversationData } from "@/app/types";

interface ChatContextType {
  currentUser: UserRole | null;
  users: ConversationData["users"];
  messages: Message[];
  setCurrentUser: (role: UserRole) => void;
  resetUser: () => void;
  addMessage: (message: Message) => void;
  loadData: () => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);
  const [users, setUsers] = useState<ConversationData["users"]>({
    gaetan: null,
    wynonaa: null,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      // Load messages from API
      const messagesResponse = await fetch("/api/messages");
      if (messagesResponse.ok) {
        const loadedMessages = await messagesResponse.json();
        setMessages(loadedMessages || []);
      }

      // Load users from API
      const usersResponse = await fetch("/api/users");
      if (usersResponse.ok) {
        const loadedUsers = await usersResponse.json();
        setUsers(loadedUsers || { gaetan: null, wynonaa: null });
      }

      // Load current user from localStorage (only for UI state, not for persistence)
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
          setCurrentUser(savedUser as UserRole);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Set up auto-refresh every 2 seconds to sync between tabs
    const interval = setInterval(() => {
      loadData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSetCurrentUser = async (role: UserRole) => {
    setCurrentUser(role);
    
    // Save current user to localStorage for UI persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", role);
    }

    // Update user in JSON database
    const newUsers = {
      ...users,
      [role.toLowerCase() as "gaetan" | "wynonaa"]: {
        role,
        joinedAt: new Date().toISOString(),
      },
    };

    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUsers),
      });
      setUsers(newUsers);
    } catch (error) {
      console.error("Error updating users:", error);
    }
  };

  const handleAddMessage = async (message: Message) => {
    // Add to local state immediately for UI responsiveness
    setMessages((prev) => [...prev, message]);

    // Save to JSON database
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        console.error("Error saving message to database");
        // Remove from local state if save failed
        setMessages((prev) => prev.filter((m) => m.id !== message.id));
      }
    } catch (error) {
      console.error("Error saving message:", error);
      // Remove from local state if save failed
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
    }
  };

  const handleResetUser = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        users,
        messages,
        setCurrentUser: handleSetCurrentUser,
        resetUser: handleResetUser,
        addMessage: handleAddMessage,
        loadData,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
