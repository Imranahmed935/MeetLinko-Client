import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* 🔹 Brand */}
        <div>
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            MeetLinkO
          </span>

          <p className="text-sm">
            Connecting travelers worldwide to explore together and create
            unforgettable experiences.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/explore">Explore Travelers</Link>
            </li>
            <li>
              <Link href="/travel-plans">Travel Plans</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Newsletter / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Connected
          </h3>
          <p className="text-sm mb-4">
            Get updates on new features and travel buddies.
          </p>
          <div className="flex gap-3">
            <span className="cursor-pointer">🌍</span>
            <span className="cursor-pointer">📸</span>
            <span className="cursor-pointer">🐦</span>
            <span className="cursor-pointer">💼</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} TravelBuddy. All rights reserved.
      </div>
    </footer>
  );
}
