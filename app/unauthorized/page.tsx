import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/access-denied.png"
            alt="Access Denied"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-3">Access Restricted</h1>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-100">
          <p className="text-gray-600 text-sm">
            You do not have permission to access this resource. 
          </p>
        </div>
        
        <Link
          href="https://connect.punjab.gov.in"
          className="inline-block bg-gray-800 text-white px-5 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
        >
          Return to Homepage
        </Link>
      </div>
      
      <p className="text-xs text-gray-500 mt-6">
        © Punjab Government • Security Portal
      </p>
    </div>
  );
}
