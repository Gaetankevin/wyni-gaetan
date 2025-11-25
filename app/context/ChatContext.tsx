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
  loadData: () => void;
  saveData: () => void;
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

  const loadData = () => {
    try {
      const savedData = localStorage.getItem("chatData");
      if (savedData) {
        const data: ConversationData = JSON.parse(savedData);
        setUsers(data.users);
        setMessages(data.messages);
      }

      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setCurrentUser(savedUser as UserRole);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const saveData = () => {
    try {
      const data: ConversationData = { users, messages };
      localStorage.setItem("chatData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [users, messages]);

  const handleSetCurrentUser = (role: UserRole) => {
    setCurrentUser(role);
    localStorage.setItem("currentUser", role);

    const key = role.toLowerCase() as "gaetan" | "wynonaa";
    setUsers((prev) => ({
      ...prev,
      [key]: {
        role,
        joinedAt: new Date().toISOString(),
      },
    }));
  };

  const handleAddMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleResetUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
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
        saveData,
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
