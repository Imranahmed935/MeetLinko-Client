"use client"
import React, { useState } from "react";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your API call
      console.log("Submitting contact form:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Contact Info Section */}
        <div className="bg-indigo-600 text-white p-8 flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-indigo-100">
            We d love to hear from you! Whether you have a question about our services or want to provide feedback, reach out and we will respond promptly.
          </p>
          <div>
            <p className="font-semibold">Email:</p>
            <p>support@example.com</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>+1 234 567 890</p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p>123 Main Street, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="resize-none h-32"
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
