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

  const isGaetan = currentUser === "Gaetan";
  const headerGradient = isGaetan
    ? "from-cyan-600/30 to-blue-900/30"
    : "from-purple-600/30 to-pink-900/30";
  const borderColor = isGaetan ? "border-cyan-400/40" : "border-purple-400/40";
  const glowText = isGaetan ? "glow-text-blue" : "glow-text-purple";

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-32 h-32 sm:w-96 sm:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float`}></div>
        <div className={`absolute bottom-0 right-1/4 w-32 h-32 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float`} style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Header */}
      <div className={`relative glass-effect ${borderColor} border-b backdrop-blur-2xl`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${headerGradient}`}></div>
        
        <div className="relative flex items-center justify-between px-3 sm:px-6 py-3 sm:py-6 z-10 gap-2">
          <div className="min-w-0">
            <h1 className={`text-lg sm:text-3xl font-black tracking-tight ${glowText} truncate`}>
              {isGaetan ? "👨 Gaetan" : "👩 Wynonaa"}
            </h1>
            <p className="text-[10px] sm:text-sm text-gray-300 mt-0.5 sm:mt-2 flex items-center gap-1">
              <span className={`inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isGaetan ? "bg-cyan-400 animate-pulse" : "bg-purple-400 animate-pulse"}`}></span>
              <span className="truncate">En ligne 😏</span>
            </p>
          </div>
          
          <button
            onClick={onChangeUser}
            className={`group relative px-2 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 text-xs sm:text-sm font-semibold whitespace-nowrap ${
              isGaetan
                ? "focus:ring-cyan-400 hover:border-cyan-400/60"
                : "focus:ring-purple-400 hover:border-purple-400/60"
            }`}
          >
            <div className={`absolute inset-0 ${isGaetan ? "bg-gradient-to-r from-cyan-600/20 to-blue-900/20" : "bg-gradient-to-r from-purple-600/20 to-pink-900/20"}`}></div>
            <div className={`absolute inset-0 backdrop-blur-md border ${isGaetan ? "border-cyan-400/30" : "border-purple-400/30"}`}></div>
            <span className="relative text-white">Autre</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        <div className="space-y-2 sm:space-y-4 px-3 sm:px-6 py-4 sm:py-8">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-2 sm:mb-4 animate-float">💬</div>
                <p className="text-base sm:text-xl font-bold text-gray-300">Entre nous...</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Commence la conversation coquine 😉</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={message.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <ChatMessage
                  message={message}
                  isCurrentUser={message.sender === currentUser}
                />
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`relative glass-effect ${borderColor} border-t backdrop-blur-2xl`}>
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};
