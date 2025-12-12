"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/services/auth/changePassword";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updatePassword(oldPassword, newPassword);
      if (res.success) {
        toast.success("password updated successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter old password"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter new password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
