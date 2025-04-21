// "use client";
// import dynamic from "next/dynamic";
// import { Suspense } from "react";

// const ChatWidget = dynamic(() => import("@/app/page"), {
//   ssr: false,
//   loading: () => <div className="text-blue-500 font-normal">Loading...</div>
// });

// export default function WidgetPage() {
//   return (
//     <div className="w-full h-full bg-transparent">
//       <Suspense fallback={<div className="text-blue-500 font-normal">Loading...</div>}>
//         <ChatWidget />
//       </Suspense>
//     </div>
//   );
// }



"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Chat = dynamic(() => import("@/app/page"), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-full">
    <div className="animate-pulse text-blue-500">Loading chatbot...</div>
  </div>
});

export default function WidgetPage() {
  return (
    <div className="w-full h-full bg-transparent">
      <Suspense fallback={<div className="animate-pulse text-blue-500">Loading...</div>}>
        <Chat />
      </Suspense>
    </div>
  );
}

