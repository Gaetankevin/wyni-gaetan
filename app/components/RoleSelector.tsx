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
    <div className="flex min-h-screen items-center justify-center relative p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="w-full max-w-2xl animate-slide-up">
        <div className="glass-effect rounded-3xl overflow-hidden border-2 border-cyan-400/30">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10"></div>
            <div className="relative px-8 lg:px-12 py-12 text-center">
              <div className="mb-8">
                <h1 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
                  <span className="glow-text-blue">Connexion</span>
                  <br />
                  <span className="glow-text-purple">Mystérieuse</span>
                </h1>
                <p className="text-lg text-gray-300 mt-4">
                  Choisissez votre identité pour entrer dans la conversation
                </p>
              </div>

              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full mb-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <button
                  onClick={() => handleSelectRole("Gaetan")}
                  className="group relative h-32 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-900/40 group-hover:from-cyan-500/30 group-hover:to-blue-800/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 backdrop-blur-xl group-hover:backdrop-blur-2xl transition-all duration-300"></div>
                  <div className="absolute inset-0 border border-cyan-400/30 group-hover:border-cyan-400/60 rounded-2xl transition-all duration-300"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center gap-3 z-10">
                    <span className="text-6xl group-hover:animate-float">👨</span>
                    <div>
                      <p className="text-2xl font-bold glow-text-blue group-hover:text-xl transition-all">Gaetan</p>
                      <p className="text-xs text-cyan-300/70 mt-1">Bleu électrique</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300 rounded-2xl"></div>
                </button>

                <button
                  onClick={() => handleSelectRole("Wynonaa")}
                  className="group relative h-32 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-900/40 group-hover:from-purple-500/30 group-hover:to-pink-800/50 transition-all duration-300"></div>
                  <div className="absolute inset-0 backdrop-blur-xl group-hover:backdrop-blur-2xl transition-all duration-300"></div>
                  <div className="absolute inset-0 border border-purple-400/30 group-hover:border-purple-400/60 rounded-2xl transition-all duration-300"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center gap-3 z-10">
                    <span className="text-6xl group-hover:animate-float">👩</span>
                    <div>
                      <p className="text-2xl font-bold glow-text-purple group-hover:text-xl transition-all">Wynonaa</p>
                      <p className="text-xs text-purple-300/70 mt-1">Magie rose</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300 rounded-2xl"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="relative border-t border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 px-8 py-4 text-center">
            <p className="text-sm text-gray-400">
              ✨ Conversation privée, sécurisée et mystérieuse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
