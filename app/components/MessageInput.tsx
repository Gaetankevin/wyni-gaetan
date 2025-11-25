"use client";

import React, { useState, useRef } from "react";
import { Message, MediaItem } from "@/app/types";
import { useChat } from "@/app/context/ChatContext";

interface MessageInputProps {
  onSendMessage: (message: Message) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const { currentUser } = useChat();
  const [content, setContent] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isGaetan = currentUser === "Gaetan";

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    setError(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();

        const mediaType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : "document";

        const newMedia: MediaItem = {
          id: Date.now().toString() + i,
          type: mediaType as "image" | "video" | "document",
          filename: data.filename,
          path: data.path,
          size: data.size,
          uploadedAt: new Date().toISOString(),
        };

        setMediaItems((prev) => [...prev, newMedia]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSendMessage = () => {
    if (!content.trim() && mediaItems.length === 0) {
      return;
    }

    if (!currentUser) {
      setError("User not selected");
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      mediaItems,
    };

    onSendMessage(message);
    setContent("");
    setMediaItems([]);
    setError(null);
  };

  return (
    <div className="p-2 sm:p-6 space-y-2 sm:space-y-4">
      {error && (
        <div className="rounded-lg sm:rounded-xl bg-red-500/20 border border-red-400/50 p-2 sm:p-3 text-xs sm:text-sm text-red-300 backdrop-blur">
          {error}
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="space-y-1 sm:space-y-3">
          <p className="text-xs sm:text-sm font-medium text-gray-300">📎 Attachés:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-3">
            {mediaItems.map((media) => (
              <div
                key={media.id}
                className={`flex items-center gap-1.5 sm:gap-3 rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 sm:py-2 backdrop-blur transition-all duration-300 border text-xs sm:text-sm ${
                  isGaetan
                    ? "bg-cyan-600/20 border-cyan-400/40 hover:bg-cyan-600/30"
                    : "bg-purple-600/20 border-purple-400/40 hover:bg-purple-600/30"
                }`}
              >
                <span className="text-base sm:text-lg">
                  {media.type === "image"
                    ? "🖼️"
                    : media.type === "video"
                      ? "🎥"
                      : "📄"}
                </span>
                <span className="truncate text-xs sm:text-sm font-medium text-white">
                  {media.filename}
                </span>
                <button
                  onClick={() => handleRemoveMedia(media.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm sm:text-base"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-1.5 sm:gap-3">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files)}
          accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`group flex h-9 sm:h-12 w-9 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 backdrop-blur border disabled:opacity-50 focus:outline-none focus:ring-2 flex-shrink-0 ${
            isGaetan
              ? "bg-cyan-600/20 border-cyan-400/40 hover:bg-cyan-600/30 focus:ring-cyan-400"
              : "bg-purple-600/20 border-purple-400/40 hover:bg-purple-600/30 focus:ring-purple-400"
          }`}
          title="Attacher un fichier"
        >
          <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">
            📎
          </span>
        </button>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              handleSendMessage();
            }
          }}
          placeholder="Dis-moi quelque chose... 😏"
          className={`flex-1 resize-none rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur border transition-all duration-300 bg-slate-900/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 text-sm sm:text-base ${
            isGaetan
              ? "border-cyan-400/30 focus:border-cyan-400/60 focus:ring-cyan-400"
              : "border-purple-400/30 focus:border-purple-400/60 focus:ring-purple-400"
          }`}
          rows={2}
        />

        <button
          onClick={handleSendMessage}
          disabled={uploading || (!content.trim() && mediaItems.length === 0)}
          className={`group flex h-9 sm:h-12 w-9 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 backdrop-blur border disabled:opacity-50 focus:outline-none focus:ring-2 hover:scale-105 active:scale-95 flex-shrink-0 ${
            isGaetan
              ? "bg-gradient-to-br from-cyan-600/40 to-blue-600/40 border-cyan-400/40 hover:from-cyan-600/60 hover:to-blue-600/60 focus:ring-cyan-400"
              : "bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-purple-400/40 hover:from-purple-600/60 hover:to-pink-600/60 focus:ring-purple-400"
          }`}
          title="Envoyer"
        >
          <span className="text-lg sm:text-xl group-hover:animate-float">✈️</span>
        </button>
      </div>

      <div className="text-[10px] sm:text-xs text-gray-400 text-center">
        💬 Ctrl+Entrée
      </div>
    </div>
  );
};
