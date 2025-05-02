// "use client";

// import React, { useEffect, useState } from "react";
// import { CheckCircle, XCircle, X, Loader2 } from "lucide-react";

// interface ToastProps {
//   message: string;
//   type: "success" | "error" | "info" | "loading";
//   icon?: React.ReactNode;
//   duration?: number;
//   onClose: () => void;
// }

// export const Toast = ({ message, type, onClose }: ToastProps) => {
//   const [visible, setVisible] = useState(true);

//     useEffect(() => {
//     if (type !== "loading") {
//       const timer = setTimeout(() => {
//         setVisible(false);
//         setTimeout(onClose, 200);
//       }, 4000);
  
//       return () => clearTimeout(timer);
//     }
//   }, [type, onClose]);
  
//   useEffect(() => {
//     setVisible(true);
//   }, [message]);
  

//   return (
//     <div
//       className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
//       } ${
//         type === "success"
//           ? "bg-white"
//           : type === "error"
//           ? "bg-white"
//           : "bg-white"
//       }`}
//       style={{ 
//         boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -4px rgba(0, 0, 0, 0.06)'
//       }}
//     >
//       <div className={`flex-shrink-0 p-1 rounded-full ${
//         type === "success" 
//           ? "bg-green-50" 
//           : type === "error" 
//           ? "bg-red-50" 
//           : "bg-yellow-50"
//       }`}>
//         {type === "success" ? (
//           <CheckCircle size={20} className="text-green-500" />
//         ) : type === "error" ? (
//           <XCircle size={20} className="text-red-500" />
//         ) : (
//           <Loader2 size={20} className="text-yellow-500 animate-spin" />
//         )}
//       </div>

//       <div className="flex-1 mr-1">
//         <p className="text-sm font-medium text-gray-800">{message}</p>
//       </div>

//       {type !== "loading" && (
//         <button
//           onClick={onClose}
//           className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors duration-150"
//           aria-label="Close"
//         >
//           <X size={16} className="text-gray-400" />
//         </button>
//       )}
      
//       {type !== "loading" && (
//         <div className="absolute bottom-0 left-3 right-0 h-1 bg-gray-50 rounded-b-full overflow-hidden">
//           <div 
//             className={`h-full rounded-full ${
//               type === "success" 
//                 ? "bg-green-500" 
//                 : "bg-red-500"
//             }`}
//             style={{
//               width: "100%",
//               animation: "shrink 5s linear forwards"
//             }}
//           />
//         </div>
//       )}
      
//       <style jsx>{`
//         @keyframes shrink {
//           from { width: 100%; }
//           to { width: 0%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Toast;



"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle, XCircle, X, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "loading";

interface ToastProps {
  message: string;
  type: ToastType;
  icon?: React.ReactNode;
  duration?: number;
  onClose: () => void;
}

const typeConfig = {
  success: {
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
    icon: CheckCircle,
    progressColor: "bg-green-500",
  },
  error: {
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    icon: XCircle,
    progressColor: "bg-red-500",
  },
  loading: {
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
    icon: Loader2,
    progressColor: "bg-yellow-500",
  },
};

export const Toast = ({
  message,
  type,
  icon,
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsExiting(true);
      setTimeout(() => {
        setVisible(false);
        onClose();
      }, 200);
    },
    [onClose]
  );

  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration, handleClose]);

  if (!visible) return null;

  const config = typeConfig[type];
  const IconComponent = icon ? () => <>{icon}</> : config.icon;
  const isPermanent = type === "loading";

  return (
    <div
      className={`fixed bottom-6 left-6 z-[50] flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isExiting ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
      }`}
      role="alert"
      aria-live={isPermanent ? "assertive" : "polite"}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`flex-shrink-0 p-1 rounded-full ${config.bgColor}`}>
        <IconComponent
          size={20}
          className={`${config.iconColor} ${
            type === "loading" ? "animate-spin" : ""
          }`}
        />
      </div>

      <div className="flex-1 mr-1 min-w-[100px] max-w-[200px]">
        <p className="text-sm font-medium text-gray-800 truncate">{message}</p>
      </div>

      {!isPermanent && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          aria-label="Close notification"
        >
          <X size={16} className="text-gray-400" />
        </button>
      )}

      {!isPermanent && (
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-full overflow-hidden">
          <div
            className={`h-full ${config.progressColor}`}
            style={{
              animation: `shrink ${duration / 1000}s linear forwards`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
