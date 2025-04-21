
// "use client";

// import dynamic from "next/dynamic";
// import { Suspense } from "react";


// const ChatWidget = dynamic(() => import("@/app/page"), {
//   ssr: false,
//   loading: () => <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 animate-pulse"></div>
// });

// export default function WidgetPage() {
//   return (
//     <div className="w-full h-full bg-transparent">
//       <Suspense fallback={<div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 animate-pulse"></div>}>
//         <ChatWidget />
//       </Suspense>
//     </div>
//   );
// }



"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ChatWidget = dynamic(() => import("@/app/page"), {
  ssr: false,
  loading: () => <div ></div>
});

export default function WidgetPage() {
  return (
    <div className="w-full h-full bg-transparent relative">
      <Suspense fallback={<div></div>}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
