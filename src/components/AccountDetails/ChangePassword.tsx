"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

const ChangePassword = () => {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    reTypeNew: "",
  });

  const { data: session } = useSession();
  const { currentPassword, newPassword } = data;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      return toast.error("Missing fields!");
    }

    axios
      .post("/api/update-password", {
        currentPassword,
        newPassword,
        email: session?.user?.email,
      })
      .then(() => {
        toast.success("Password has been updated!");
        setData({
          currentPassword: "",
          newPassword: "",
          reTypeNew: "",
        });
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <div className="shadow-box max-w-[550px] rounded-xl bg-white p-4 sm:p-7.5 xl:p-10">
      <h2 className="text-custom-4 text-dark mb-3.5 font-bold">Password</h2>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="text-custom-sm text-dark mb-3 block font-medium"
            >
              Current password
            </label>
            <input
              value={data.currentPassword}
              onChange={(e) =>
                setData({ ...data, currentPassword: e.target.value })
              }
              type="text"
              placeholder="Enter your current password"
              required
              className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:ring-primary w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="text-custom-sm text-dark mb-3 block font-medium"
            >
              New password
            </label>
            <input
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              type="text"
              placeholder="Enter your new password"
              required
              className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:ring-primary w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="text-custom-sm text-dark mb-3 block font-medium"
            >
              Re-type new password
            </label>
            <input
              value={data.reTypeNew}
              onChange={(e) => setData({ ...data, reTypeNew: e.target.value })}
              type="text"
              placeholder="Re-type new password"
              required
              className="border-gray-4 placeholder:text-dark-2 focus:border-gray-7 focus:ring-primary w-full rounded-md border bg-white px-6 py-3.5 outline-hidden duration-200 focus:border-transparent focus:ring-2"
            />
          </div>

          <button
            type="submit"
            className="bg-dark flex w-full justify-center rounded-md px-5 py-3.5 font-medium text-white transition-all duration-200 hover:opacity-90"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
