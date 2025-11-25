"use client";

import React, { useEffect, useRef } from "react";
import { Message } from "@/app/types";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/app/context/ChatContext";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: Message) => void;
  onChangeUser: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onChangeUser,
}) => {
  const { currentUser } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getHeaderColor = () => {
    return currentUser === "Gaetan"
      ? "bg-gradient-to-r from-blue-500 to-blue-600"
      : "bg-gradient-to-r from-pink-500 to-pink-600";
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className={`${getHeaderColor()} text-white shadow-lg`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">
              {currentUser === "Gaetan" ? "👨 Gaetan" : "👩 Wynonaa"}
            </h1>
            <p className="text-sm opacity-90">Conversation privée</p>
          </div>
          <button
            onClick={onChangeUser}
            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium transition-all hover:bg-white/30"
          >
            Changer d'utilisateur
          </button>
        </div>

        <div className="border-t border-white/20 px-6 py-2 text-sm">
          <p className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                currentUser === "Gaetan" ? "bg-blue-300" : "bg-pink-300"
              }`}
            />
            En ligne
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-2xl mb-2">💬</p>
                <p className="font-medium">Aucun message pour le moment</p>
                <p className="text-sm">Commencez la conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isCurrentUser={message.sender === currentUser}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};
