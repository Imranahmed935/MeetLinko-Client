"use client";
import { useRouter } from "next/navigation";

export default function FinalAction() {
  const router = useRouter();

  return (
    <section className="bg-blue-600 text-white py-24 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Find Your Travel Buddy?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Connect with like-minded travelers and start your next adventure today!
        </p>
        <button
          onClick={() => router.push("/find-buddy")}
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
