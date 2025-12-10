"use client";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your subscription. Your payment has been processed successfully.
      </p>
      <p>Now you are a Verified user.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
