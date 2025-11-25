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
  const userColor = message.sender === "Gaetan" ? "blue" : "pink";
  const bgColor =
    userColor === "blue" ? "bg-blue-100 text-blue-900" : "bg-pink-100 text-pink-900";
  const messageColor = isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900";

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs lg:max-w-md`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {message.content && (
            <p className="break-words whitespace-pre-wrap">{message.content}</p>
          )}

          {message.mediaItems.length > 0 && (
            <div className={`mt-2 space-y-2 ${message.content ? "border-t pt-2" : ""} ${
              isCurrentUser ? "border-blue-400" : "border-gray-300"
            }`}>
              {message.mediaItems.map((media) => (
                <div key={media.id} className="space-y-1">
                  {media.type === "image" && (
                    <img
                      src={media.path}
                      alt={media.filename}
                      className="max-h-48 max-w-48 rounded"
                    />
                  )}
                  {media.type === "video" && (
                    <video
                      src={media.path}
                      controls
                      className="max-h-48 max-w-48 rounded"
                    />
                  )}
                  {media.type === "document" && (
                    <a
                      href={media.path}
                      download={media.filename}
                      className={`flex items-center gap-2 rounded px-3 py-2 ${
                        isCurrentUser
                          ? "bg-blue-400 hover:bg-blue-600"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    >
                      <span className="text-lg">{getMediaIcon(media.type)}</span>
                      <span className="truncate text-sm font-medium">
                        {media.filename}
                      </span>
                    </a>
                  )}
                  <p className="text-xs opacity-75">
                    {(media.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`mt-1 text-xs ${
            isCurrentUser ? "text-right text-gray-500" : "text-left text-gray-500"
          }`}
        >
          {message.sender} • {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};
