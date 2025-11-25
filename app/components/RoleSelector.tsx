"use client";

import React, { useEffect, useState } from "react";
import { UserRole } from "@/app/types";
import { useChat } from "@/app/context/ChatContext";

export const RoleSelector: React.FC = () => {
  const { setCurrentUser } = useChat();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  const handleSelectRole = (role: UserRole) => {
    setCurrentUser(role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="border-b border-gray-200 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue</h1>
          <p className="mt-2 text-gray-600">
            Choisissez votre identité pour commencer
          </p>
        </div>

        <div className="flex flex-col gap-4 px-6 py-8">
          <button
            onClick={() => handleSelectRole("Gaetan")}
            className="group relative flex h-24 items-center justify-center rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 group-hover:text-blue-700">
                👨
              </div>
              <p className="mt-2 text-lg font-semibold text-blue-900">Gaetan</p>
            </div>
          </button>

          <button
            onClick={() => handleSelectRole("Wynonaa")}
            className="group relative flex h-24 items-center justify-center rounded-lg border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100 transition-all duration-300 hover:border-pink-400 hover:shadow-lg"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 group-hover:text-pink-700">
                👩
              </div>
              <p className="mt-2 text-lg font-semibold text-pink-900">Wynonaa</p>
            </div>
          </button>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
          <p>Conversation privée et sécurisée entre vous deux</p>
        </div>
      </div>
    </div>
  );
};
