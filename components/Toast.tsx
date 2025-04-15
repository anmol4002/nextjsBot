"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, X, Loader2 } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "loading";
  icon?: React.ReactNode;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 200);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [onClose, type]);

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${
        type === "success"
          ? "bg-white"
          : type === "error"
          ? "bg-white"
          : "bg-white"
      }`}
      style={{ 
        boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -4px rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className={`flex-shrink-0 p-1 rounded-full ${
        type === "success" 
          ? "bg-green-50" 
          : type === "error" 
          ? "bg-red-50" 
          : "bg-yellow-50"
      }`}>
        {type === "success" ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : type === "error" ? (
          <XCircle size={20} className="text-red-500" />
        ) : (
          <Loader2 size={20} className="text-yellow-500 animate-spin" />
        )}
      </div>

      <div className="flex-1 mr-1">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>

      {type !== "loading" && (
        <button
          onClick={onClose}
          className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors duration-150"
          aria-label="Close"
        >
          <X size={16} className="text-gray-400" />
        </button>
      )}
      
      {type !== "loading" && (
        <div className="absolute bottom-0 left-3 right-0 h-1 bg-gray-50 rounded-b-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              type === "success" 
                ? "bg-green-500" 
                : "bg-red-500"
            }`}
            style={{
              width: "100%",
              animation: "shrink 5s linear forwards"
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;