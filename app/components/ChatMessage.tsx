"use client";

import React from "react";
import { Message } from "@/app/types";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const getMediaIcon = (type: string) => {
  switch (type) {
    case "image":
      return "🖼️";
    case "video":
      return "🎥";
    case "document":
      return "📄";
    default:
      return "📎";
  }
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
}) => {
  const isGaetan = message.sender === "Gaetan";

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-6 animate-slide-up`}>
      <div className={`max-w-xs lg:max-w-md`}>
        <div
          className={`rounded-2xl px-6 py-4 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
            isGaetan
              ? "glass-effect border-cyan-400/40 shadow-glow-blue"
              : "glass-effect-purple border-purple-400/40 shadow-glow-purple"
          }`}
        >
          {message.content && (
            <p className="break-words whitespace-pre-wrap text-white font-medium leading-relaxed">
              {message.content}
            </p>
          )}

          {message.mediaItems.length > 0 && (
            <div className={`mt-3 space-y-3 ${message.content ? "border-t pt-3" : ""} ${
              isGaetan ? "border-cyan-400/30" : "border-purple-400/30"
            }`}>
              {message.mediaItems.map((media) => (
                <div key={media.id} className="space-y-2">
                  {media.type === "image" && (
                    <img
                      src={media.path}
                      alt={media.filename}
                      className="max-h-48 max-w-48 rounded-xl border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg"
                    />
                  )}
                  {media.type === "video" && (
                    <video
                      src={media.path}
                      controls
                      className="max-h-48 max-w-48 rounded-xl border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300"
                    />
                  )}
                  {media.type === "document" && (
                    <a
                      href={media.path}
                      download={media.filename}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 backdrop-blur transition-all duration-300 hover:scale-105 border ${
                        isGaetan
                          ? "bg-cyan-600/20 border-cyan-400/40 hover:bg-cyan-600/30"
                          : "bg-purple-600/20 border-purple-400/40 hover:bg-purple-600/30"
                      }`}
                    >
                      <span className="text-2xl">{getMediaIcon(media.type)}</span>
                      <div className="flex-1 min-w-0">
                        <span className="truncate text-sm font-semibold text-white block">
                          {media.filename}
                        </span>
                        <span className="text-xs text-gray-300">
                          {(media.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </a>
                  )}
                  {media.type !== "document" && (
                    <p className="text-xs text-gray-300">
                      {(media.size / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`mt-2 text-xs ${
            isCurrentUser ? "text-right text-gray-400" : "text-left text-gray-400"
          }`}
        >
          <span className={isGaetan ? "glow-text-blue" : "glow-text-purple"}>
            {message.sender}
          </span>
          {" • "}
          <span>{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};
