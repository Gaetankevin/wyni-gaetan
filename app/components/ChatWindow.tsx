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
  const glowClass = isGaetan ? "animate-glow" : "animate-glow-purple";
  const glowText = isGaetan ? "glow-text-blue" : "glow-text-purple";

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float`} style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Header */}
      <div className={`relative glass-effect ${borderColor} border-b backdrop-blur-2xl`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${headerGradient}`}></div>
        
        <div className="relative flex items-center justify-between px-6 py-6 z-10">
          <div>
            <h1 className={`text-3xl font-black tracking-tight ${glowText}`}>
              {isGaetan ? "👨 Gaetan" : "👩 Wynonaa"}
            </h1>
            <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${isGaetan ? "bg-cyan-400 animate-pulse" : "bg-purple-400 animate-pulse"}`}></span>
              Connexion établie
            </p>
          </div>
          
          <button
            onClick={onChangeUser}
            className={`group relative px-6 py-2 rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 ${
              isGaetan
                ? "focus:ring-cyan-400 hover:border-cyan-400/60"
                : "focus:ring-purple-400 hover:border-purple-400/60"
            }`}
          >
            <div className={`absolute inset-0 ${isGaetan ? "bg-gradient-to-r from-cyan-600/20 to-blue-900/20" : "bg-gradient-to-r from-purple-600/20 to-pink-900/20"}`}></div>
            <div className={`absolute inset-0 backdrop-blur-md border ${isGaetan ? "border-cyan-400/30" : "border-purple-400/30"}`}></div>
            <span className="relative text-sm font-semibold text-white">Changer</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        <div className="space-y-4 px-6 py-8">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-float">💬</div>
                <p className="text-xl font-bold text-gray-300">Conversation vierge</p>
                <p className="text-sm text-gray-500 mt-2">Commencez la conversation magique...</p>
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
