"use client";

import React from "react";
import { RoleSelector } from "@/app/components/RoleSelector";
import { ChatWindow } from "@/app/components/ChatWindow";
import { useChat } from "@/app/context/ChatContext";
import { Message } from "@/app/types";

export default function Home() {
  const { currentUser, messages, addMessage, resetUser, isLoading } =
    useChat();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Initialisation...</div>
      </div>
    );
  }

  const handleSendMessage = async (message: Message) => {
    try {
      // Save to state immediately for instant UI update
      addMessage(message);

      // Optionally persist to server (for future cloud sync if needed)
      // await fetch("/api/messages", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(message),
      // });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChangeUser = () => {
    resetUser();
  };

  if (!currentUser) {
    return <RoleSelector />;
  }

  return (
    <ChatWindow
      messages={messages}
      onSendMessage={handleSendMessage}
      onChangeUser={handleChangeUser}
    />
  );
}
