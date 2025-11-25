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
    <div className="border-t border-gray-200 bg-white p-4">
      {error && (
        <div className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="mb-3 space-y-2">
          <p className="text-sm font-medium text-gray-700">Fichiers attachés:</p>
          <div className="flex flex-wrap gap-2">
            {mediaItems.map((media) => (
              <div
                key={media.id}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2"
              >
                <span className="text-lg">
                  {media.type === "image"
                    ? "🖼️"
                    : media.type === "video"
                      ? "🎥"
                      : "📄"}
                </span>
                <span className="truncate text-sm font-medium">
                  {media.filename}
                </span>
                <button
                  onClick={() => handleRemoveMedia(media.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-2">
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
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl hover:bg-gray-200 disabled:opacity-50"
          title="Attacher un fichier"
        >
          📎
        </button>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              handleSendMessage();
            }
          }}
          placeholder="Écrivez votre message..."
          className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          rows={3}
        />

        <button
          onClick={handleSendMessage}
          disabled={uploading || (!content.trim() && mediaItems.length === 0)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          title="Envoyer (Ctrl+Entrée)"
        >
          ✈️
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Ctrl + Entrée pour envoyer
      </div>
    </div>
  );
};
