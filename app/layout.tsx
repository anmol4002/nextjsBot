
import type { Metadata } from "next";

import "./globals.css";
export const metadata: Metadata = {
  title: "Chatbot 🤖",
  description: "Punjab Government AI Assistant",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add these meta tags for iframe compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="bg-transparent">
        {children}
      </body>
    </html>
  );
}
