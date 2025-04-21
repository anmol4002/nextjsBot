// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Chatbot 🤖",
//   description: "Punjab Government AI Assistant",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <div className="mx-auto max-w-6xl h-screen">
//           {children}
//         </div>
//       </body>
//     </html>
//   );
// }

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
