"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ChatWidget = dynamic(() => import("@/app/page"), {
  ssr: false,
  loading: () => <div className="text-blue-500 font-normal">Loading...</div>
});

export default function WidgetPage() {
  return (
    <div className="w-full h-full bg-transparent">
      <Suspense fallback={<div className="text-blue-500 font-normal">Loading...</div>}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}


