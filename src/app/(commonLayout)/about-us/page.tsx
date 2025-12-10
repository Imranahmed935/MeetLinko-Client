import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AboutPage = () => {
  const teamMembers = [
    { name: "Alice Johnson", role: "CEO", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Bob Smith", role: "CTO", img: "https://i.pravatar.cc/150?img=2" },
    { name: "Carol Lee", role: "Marketing Head", img: "https://i.pravatar.cc/150?img=3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            Learn more about our mission, vision, and the team behind our success.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          We started our journey with a simple goal: to create a platform that
          connects people with the experiences they love. Over the years, our
          team has grown, and so has our vision. We are committed to delivering
          value, building trust, and making a positive impact in the community.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To empower people through innovative solutions, delivering
              exceptional experiences, and fostering a community of
              like-minded adventurers and professionals.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To become a global platform that bridges gaps, inspires
              exploration, and provides seamless experiences for everyone
              involved.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition"
            >
              <Avatar className="mx-auto mb-4 w-24 h-24">
                <AvatarImage src={member.img} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
