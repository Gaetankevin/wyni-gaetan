import type { Metadata } from "next";
import { ChatProvider } from "@/app/context/ChatContext";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Conversation Privée - Gaetan & Wynonaa",
  description: "Application de messagerie privée et sécurisée",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
