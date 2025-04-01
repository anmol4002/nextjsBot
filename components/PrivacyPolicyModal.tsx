import React from "react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({
  isOpen,
  onClose,
}: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-md shadow-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">
            CHATBOT PRIVACY POLICY
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 py-3 space-y-3 max-h-[70vh] overflow-y-auto text-sm text-gray-600">
          <p>
            All users of the chatbot agree to our Chatbot Policy as outlined
            below.
          </p>

          <ol className="list-decimal pl-5 space-y-2">
            <li>
              General Information Purposes Only: Please be aware that the
              chatbot is an automated system, and it may not always provide 100%
              accurate information. While we strive to provide accurate
              information, we cannot guarantee the accuracy, completeness, or
              timeliness of the information provided by the chatbot.
            </li>
            <li>
              Chatbot users must not enter any personal information such as PAN
              Card, aadhaar, email address, passwords, account numbers, address,
              phone number etc. unless specifically asked for by the chatbot.
            </li>
            <li>
              The chatbot must not be used for commercial purposes. It must not
              be used by an individual or business as part of a free or paid
              service without authorisation from The Cyber Helpline.
            </li>
          </ol>

          <p>
            Reporting Inaccuracies: If you discover any inaccuracies in the
            information provided by the Chatbot, we kindly ask you to notify us
            so that we may address the issue. Please contact us through{" "}
            <a
              href="https://connect.punjab.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Connect Punjab
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
