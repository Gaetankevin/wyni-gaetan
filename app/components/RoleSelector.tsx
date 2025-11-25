"use client";

import React from "react";
import { UserRole } from "@/app/types";
import { useChat } from "@/app/context/ChatContext";

export const RoleSelector: React.FC = () => {
  const { setCurrentUser } = useChat();

  const handleSelectRole = (role: UserRole) => {
    setCurrentUser(role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center relative p-2 sm:p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-5 w-40 h-40 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-5 w-40 h-40 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="w-full max-w-md sm:max-w-2xl animate-slide-up">
        <div className="glass-effect rounded-2xl sm:rounded-3xl overflow-hidden border border-sm:border-2 border-cyan-400/30">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10"></div>
            <div className="relative px-4 sm:px-8 lg:px-12 py-6 sm:py-12 text-center">
              <div className="mb-4 sm:mb-8">
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-2 sm:mb-4">
                  <span className="glow-text-blue block sm:inline">C'est à toi</span>
                  <br className="hidden sm:block" />
                  <span className="glow-text-purple">mon amour 💕</span>
                </h1>
                <p className="text-xs sm:text-base text-gray-300 mt-2 sm:mt-4">
                  Choisis ton identité pour commencer... 😏
                </p>
              </div>

              <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full mb-6 sm:mb-8"></div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 mt-6 sm:mt-12">
                <button
                  onClick={() => handleSelectRole("Gaetan")}
                  className="group relative h-24 sm:h-32 rounded-lg sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-900/40 group-hover:from-cyan-500/30 group-hover:to-blue-800/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 backdrop-blur-xl group-hover:backdrop-blur-2xl transition-all duration-300"></div>
                  <div className="absolute inset-0 border border-cyan-400/30 group-hover:border-cyan-400/60 rounded-lg sm:rounded-2xl transition-all duration-300"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center gap-1 sm:gap-3 z-10">
                    <span className="text-4xl sm:text-6xl group-hover:animate-float">👨</span>
                    <div className="min-w-0">
                      <p className="text-base sm:text-2xl font-bold glow-text-blue group-hover:text-lg sm:group-hover:text-xl transition-all">Gaetan</p>
                      <p className="text-[10px] sm:text-xs text-cyan-300/70 mt-0.5">À toi 💙</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300 rounded-lg sm:rounded-2xl"></div>
                </button>

                <button
                  onClick={() => handleSelectRole("Wynonaa")}
                  className="group relative h-24 sm:h-32 rounded-lg sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-900/40 group-hover:from-purple-500/30 group-hover:to-pink-800/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 backdrop-blur-xl group-hover:backdrop-blur-2xl transition-all duration-300"></div>
                  <div className="absolute inset-0 border border-purple-400/30 group-hover:border-purple-400/60 rounded-lg sm:rounded-2xl transition-all duration-300"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center gap-1 sm:gap-3 z-10">
                    <span className="text-4xl sm:text-6xl group-hover:animate-float">👩</span>
                    <div className="min-w-0">
                      <p className="text-base sm:text-2xl font-bold glow-text-purple group-hover:text-lg sm:group-hover:text-xl transition-all">Wynonaa</p>
                      <p className="text-[10px] sm:text-xs text-purple-300/70 mt-0.5">À toi 💜</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300 rounded-lg sm:rounded-2xl"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="relative border-t border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 px-4 sm:px-8 py-2 sm:py-4 text-center">
            <p className="text-[10px] sm:text-sm text-gray-400">
              🔐 Entre nous, secret garanti 🤐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
