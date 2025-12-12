"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAllUsers = async () => {
  try {
    const res = await serverFetch.get(`/admin/users`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await res.json();
    return users; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return null; 
  }
};


export const deleteUser = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/admin/${id}`);

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

export const updateStatus = async (id: string, userStatus: string) => {
  try {
    const res = await serverFetch.patch(`/admin/${id}`, {
      body: JSON.stringify({ userStatus }),
    });

    if (!res.ok) throw new Error("Failed to update user status");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating status:", error);
    return null;
  }
};




